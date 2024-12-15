import { IPO } from '@/components/ipo/ipo-list';

// Update default logo URL to use SVG
const DEFAULT_LOGO = '/images/default-company-logo.svg';

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 3600 * 1000;

// Client-side cache
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Define interface for company details
interface CompanyDetails {
  logo?: string;
  [key: string]: any; // Allow other properties from the API
}

const cache = {
  ipos: new Map<number, CacheEntry<IPO[]>>(),
  details: new Map<string, CacheEntry<CompanyDetails>>(),
};

interface FinnhubIPO {
  symbol: string;
  name: string;
  date: string;
  price?: number;
  shares?: number;
  industry?: string;
  exchange?: string;
}

interface FinnhubIPOResponse {
  ipoCalendar: FinnhubIPO[];
}

interface IPOPerformanceData {
  averageReturn: string;
  successRate: string;
  totalVolume: string;
  marketSentiment: string;
}

function generateUniqueId(ipo: FinnhubIPO): string {
  const symbol = ipo.symbol || 'unknown';
  const date = ipo.date || new Date().toISOString();
  const hash = Math.random().toString(36).substring(2, 8);
  return `${symbol}-${date}-${hash}`;
}

export async function fetchUpcomingIPOs(limit: number = 25): Promise<IPO[]> {
  try {
    // Check cache first
    const cachedData = cache.ipos.get(limit);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await fetch('/api/finnhub?endpoint=/calendar/ipo');
    if (!response.ok) {
      throw new Error('Failed to fetch IPO data');
    }

    const data = (await response.json()) as FinnhubIPOResponse;

    if (!data || !data.ipoCalendar) {
      console.warn('No IPO data received from API');
      return [];
    }

    // Sort by date before limiting
    const sortedIpos = data.ipoCalendar
      .filter((ipo) => ipo.name && ipo.date) // Filter out invalid entries
      .sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    // Apply limit
    const limitedIpos = sortedIpos.slice(0, limit);

    // Process IPOs in batches to avoid too many parallel requests
    const batchSize = 5;
    const processedIpos: IPO[] = [];

    for (let i = 0; i < limitedIpos.length; i += batchSize) {
      const batch = limitedIpos.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (ipo: FinnhubIPO) => {
          try {
            // Calculate estimated valuation safely
            const shares = ipo.shares || 0;
            const price = ipo.price || 0;
            const valuation = shares * price;

            // Fetch company details for logo
            const symbol = ipo.symbol || '';
            let logo = DEFAULT_LOGO; // Set default logo

            if (symbol) {
              const details = await fetchIPODetails(symbol);
              if (details?.logo) {
                logo = details.logo;
              }
            }

            const processedIpo: IPO = {
              id: generateUniqueId(ipo),
              name: ipo.name
                ? `${ipo.name} (${ipo.symbol || 'N/A'})`
                : 'Unknown Company',
              date: new Date(ipo.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              status: getIPOStatus(new Date(ipo.date)),
              valuation: formatMarketCap(valuation),
              sector: ipo.industry || 'N/A',
              exchange: ipo.exchange || 'N/A',
              change: '+0%',
              isPositive: true,
              interest: getInterestLevel(valuation),
              highlights: [
                shares ? `${shares.toLocaleString()} Shares` : 'Shares TBA',
                price ? `$${price} Price` : 'Price TBA',
                ipo.industry || 'Industry N/A',
              ],
              logo,
            };

            return processedIpo;
          } catch (error) {
            console.error('Error processing IPO entry:', error);
            return null;
          }
        })
      );

      processedIpos.push(...(batchResults.filter(Boolean) as IPO[]));
    }

    // Update cache
    cache.ipos.set(limit, {
      data: processedIpos,
      timestamp: Date.now(),
    });

    return processedIpos;
  } catch (error) {
    console.error('Error fetching IPO data:', error);
    return [];
  }
}

export async function fetchIPOPerformance(): Promise<IPOPerformanceData> {
  // This would typically fetch historical IPO performance data
  // For now, returning mock data
  return {
    averageReturn: '+24.5%',
    successRate: '92%',
    totalVolume: '$18.5B',
    marketSentiment: 'Bullish',
  };
}

function getIPOStatus(date: Date): string {
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 3600 * 24)
  );

  if (diffDays < 0) return 'Completed';
  if (diffDays < 7) return 'Next Week';
  if (diffDays < 14) return 'Coming Soon';
  return 'Scheduled';
}

function formatMarketCap(value: number): string {
  if (!value || isNaN(value)) return 'TBA';
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toLocaleString()}`;
}

function getInterestLevel(marketCap: number): string {
  if (!marketCap || isNaN(marketCap)) return 'TBA';
  if (marketCap >= 10e9) return 'Very High';
  if (marketCap >= 5e9) return 'High';
  if (marketCap >= 1e9) return 'Moderate';
  return 'Low';
}

export async function fetchIPODetails(
  symbol: string
): Promise<CompanyDetails | null> {
  if (!symbol) return null;

  try {
    // Check cache first
    const cachedData = cache.details.get(symbol);
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.data;
    }

    const response = await fetch(
      `/api/finnhub?endpoint=/stock/profile2&symbol=${symbol}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch IPO details');
    }

    const data = (await response.json()) as CompanyDetails;

    if (!data) {
      console.warn('No details data received for symbol:', symbol);
      return null;
    }

    // Set default logo if none provided or if URL is invalid
    if (!data.logo) {
      data.logo = DEFAULT_LOGO;
    }

    // Update cache
    cache.details.set(symbol, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    console.error('Error fetching IPO details:', error);
    return null;
  }
}
