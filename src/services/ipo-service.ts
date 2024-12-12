import { IPO } from '@/components/ipo/ipo-list';

const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY || '';

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
    const response = await fetch(
      `https://finnhub.io/api/v1/calendar/ipo?token=${FINNHUB_API_KEY}`
    );
    const data = (await response.json()) as FinnhubIPOResponse;

    // Sort by date before limiting
    const sortedIpos = (data.ipoCalendar || []).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    // Apply limit
    const limitedIpos = sortedIpos.slice(0, limit);

    return limitedIpos.map((ipo: FinnhubIPO) => {
      // Calculate estimated valuation safely
      const shares = ipo.shares || 0;
      const price = ipo.price || 0;
      const valuation = shares * price;

      return {
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
      };
    });
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

interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
}

export async function fetchIPODetails(
  symbol: string
): Promise<CompanyProfile | null> {
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const data = (await response.json()) as CompanyProfile;
    return data;
  } catch (error) {
    console.error('Error fetching IPO details:', error);
    return null;
  }
}
