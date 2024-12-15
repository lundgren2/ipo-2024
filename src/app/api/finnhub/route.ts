import { NextResponse } from 'next/server';

// Use server-side environment variable instead of client-side
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Cache duration in seconds (1 hour)
const CACHE_DURATION = 3600;

// In-memory cache for development
const cache = new Map<string, { data: any; timestamp: number }>();

export async function GET(request: Request) {
  try {
    // Verify API key exists
    if (!FINNHUB_API_KEY) {
      console.error('Finnhub API key is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const symbol = searchParams.get('symbol');

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Missing endpoint parameter' },
        { status: 400 }
      );
    }

    // Create cache key based on endpoint and symbol
    const cacheKey = `${endpoint}${symbol ? `-${symbol}` : ''}`;

    // Check cache first
    const cachedData = cache.get(cacheKey);
    if (
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_DURATION * 1000
    ) {
      return NextResponse.json(cachedData.data);
    }

    // Build the URL with the symbol parameter if it exists
    const url = symbol
      ? `${FINNHUB_BASE_URL}${endpoint}?symbol=${symbol}&token=${FINNHUB_API_KEY}`
      : `${FINNHUB_BASE_URL}${endpoint}?token=${FINNHUB_API_KEY}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Finnhub-Token': FINNHUB_API_KEY,
      },
      next: {
        revalidate: CACHE_DURATION, // Enable Next.js built-in cache
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Finnhub API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        endpoint,
        symbol,
      });

      // Handle rate limiting specifically
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to fetch from Finnhub' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Update cache
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
