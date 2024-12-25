import {
  IPO,
  FinnhubIPO,
  FinnhubIPOResponse,
  IPOPerformanceData,
  CompanyDetails,
} from '@/types/ipo';

// Type definitions
export type IdentifierType = 'symbol' | 'isin' | 'cusip';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

type CacheKey = `${IdentifierType}:${string}`;

// Configuration
const CONFIG = {
  CACHE: {
    DURATION: 3600 * 1000, // 1 hour in milliseconds
    BATCH_SIZE: 5,
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
  },
  API: {
    DEFAULT_LIMIT: 25,
    MIN_LIMIT: 5,
    MAX_LIMIT: 100,
  },
  DEFAULTS: {
    LOGO: '/images/default-company-logo.svg',
    CURRENCY: 'USD',
    COUNTRY: 'N/A',
    INDUSTRY: 'N/A',
    EXCHANGE: 'N/A',
  },
} as const;

// Cache maps with TTL and automatic cleanup
class TTLCache<T> {
  private cache = new Map<string, { data: T; timestamp: number }>();
  private cleanupInterval: NodeJS.Timeout;

  constructor(private ttl: number) {
    // Run cleanup every minute
    this.cleanupInterval = setInterval(() => this.cleanup(), 60 * 1000);
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, value: T): void {
    this.cache.set(key, { data: value, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.ttl) {
        this.cache.delete(key);
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.cache.clear();
  }
}

// Initialize caches
const dateCache = new TTLCache<number>(CONFIG.CACHE.DURATION);
const valuationCache = new TTLCache<number>(CONFIG.CACHE.DURATION);
const ipoCache = new TTLCache<IPO[]>(CONFIG.CACHE.DURATION);
const detailsCache = new TTLCache<CompanyDetails>(CONFIG.CACHE.DURATION);

// Utility functions with error handling
export function parseDate(dateStr: string): number {
  if (!dateStr) return 0;

  const cached = dateCache.get(dateStr);
  if (cached !== null) return cached;

  try {
    const timestamp = new Date(dateStr).getTime();
    if (isNaN(timestamp)) throw new Error('Invalid date');

    dateCache.set(dateStr, timestamp);
    return timestamp;
  } catch (error) {
    console.warn(`Failed to parse date: ${dateStr}`, error);
    return 0;
  }
}

export function parseValuation(val: string | number): number {
  if (typeof val === 'number') return val;
  if (!val) return 0;

  const cached = valuationCache.get(String(val));
  if (cached !== null) return cached;

  try {
    const numStr = String(val).replace(/[^0-9.]/g, '');
    const multiplier = String(val).includes('T')
      ? 1e12
      : String(val).includes('B')
      ? 1e9
      : String(val).includes('M')
      ? 1e6
      : 1;

    const result = parseFloat(numStr) * multiplier;
    if (isNaN(result)) throw new Error('Invalid number');

    valuationCache.set(String(val), result);
    return result;
  } catch (error) {
    console.warn(`Failed to parse valuation: ${val}`, error);
    return 0;
  }
}

export function formatMarketCap(value: number): string {
  if (!value || isNaN(value)) return 'TBA';

  try {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  } catch (error) {
    console.warn(`Failed to format market cap: ${value}`, error);
    return 'TBA';
  }
}

// Helper function for retrying failed requests
async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = CONFIG.CACHE.MAX_RETRIES,
  delay: number = CONFIG.CACHE.RETRY_DELAY
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay * 2);
  }
}

// Cache class implementation
class APICache {
  private ipos = new Map<number, CacheEntry<IPO[]>>();
  private details = new Map<CacheKey, CacheEntry<CompanyDetails>>();

  isValid(timestamp: number): boolean {
    return Date.now() - timestamp < CONFIG.CACHE.DURATION;
  }

  getIPOs(limit: number): IPO[] | null {
    const entry = this.ipos.get(limit);
    if (entry && this.isValid(entry.timestamp)) {
      return entry.data;
    }
    return null;
  }

  setIPOs(limit: number, data: IPO[]): void {
    this.ipos.set(limit, {
      data,
      timestamp: Date.now(),
    });
  }

  getDetails(type: IdentifierType, identifier: string): CompanyDetails | null {
    const key = `${type}:${identifier}` as CacheKey;
    const entry = this.details.get(key);
    if (entry && this.isValid(entry.timestamp)) {
      return entry.data;
    }
    return null;
  }

  setDetails(
    type: IdentifierType,
    identifier: string,
    data: CompanyDetails
  ): void {
    const key = `${type}:${identifier}` as CacheKey;
    this.details.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.ipos.clear();
    this.details.clear();
  }
}

const cache = new APICache();

// Helper functions for IPO status and interest level
function getIPOStatus(
  date: Date
): 'Next Week' | 'Completed' | 'Filing' | undefined {
  const now = new Date();
  const diffDays = Math.ceil(
    (date.getTime() - now.getTime()) / (1000 * 3600 * 24)
  );

  if (diffDays < 0) return 'Completed';
  if (diffDays < 7) return 'Next Week';
  return 'Filing';
}

function getInterestLevel(marketCap: number): number {
  if (!marketCap || isNaN(marketCap)) return 0;
  if (marketCap >= 10e9) return 100;
  if (marketCap >= 5e9) return 75;
  if (marketCap >= 1e9) return 50;
  return 25;
}

// Helper function to try different identifiers
async function tryFetchCompanyDetails(
  identifiers: { value: string; type: IdentifierType }[]
): Promise<CompanyDetails | null> {
  for (const { value, type } of identifiers) {
    if (!value?.trim()) continue;
    const details = await fetchIPODetails(value, type);
    if (details) return details;
  }
  return null;
}

// Helper functions
function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

function generateUniqueId(ipo: FinnhubIPO): string {
  const symbol = ipo.symbol || 'unknown';
  const date = ipo.date || new Date().toISOString();
  const hash = Math.random().toString(36).substring(2, 8);
  return `${symbol}-${date}-${hash}`;
}

// Main API functions
export async function fetchIPODetails(
  identifier: string,
  type: IdentifierType = 'symbol'
): Promise<CompanyDetails | null> {
  if (!identifier?.trim()) return null;

  try {
    // Check cache first
    const cachedData = cache.getDetails(type, identifier);
    if (cachedData) {
      return cachedData;
    }

    // Build the query parameter based on the identifier type
    const queryParam = `${type}=${encodeURIComponent(identifier)}`;
    const response = await fetch(
      `/api/finnhub?endpoint=/stock/profile2&${queryParam}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch IPO details:', {
        status: response.status,
        error: errorText,
        identifier,
        type,
      });
      return null;
    }

    const data = (await response.json()) as Partial<CompanyDetails>;

    // Validate required fields
    if (!data || !data.ticker || !data.name) {
      // console.warn('Invalid company details received:', {
      //   identifier,
      //   type,
      //   data,
      // });
      return null;
    }

    // Ensure all required fields are present with defaults
    const validatedData: CompanyDetails = {
      country: data.country || 'N/A',
      currency: data.currency || 'USD',
      exchange: data.exchange || 'N/A',
      finnhubIndustry: data.finnhubIndustry || 'N/A',
      ipo: data.ipo || 'N/A',
      logo: data.logo || CONFIG.DEFAULTS.LOGO,
      marketCapitalization: data.marketCapitalization || 0,
      name: data.name,
      phone: data.phone || 'N/A',
      shareOutstanding: data.shareOutstanding || 0,
      ticker: data.ticker,
      weburl: data.weburl || '',
      // Optional fields
      ...(data.address && { address: data.address }),
      ...(data.city && { city: data.city }),
      ...(data.state && { state: data.state }),
      ...(data.zip && { zip: data.zip }),
      ...(data.description && { description: data.description }),
      ...(data.ggroup && { ggroup: data.ggroup }),
      ...(data.gind && { gind: data.gind }),
      ...(data.gsector && { gsector: data.gsector }),
      ...(data.gsubind && { gsubind: data.gsubind }),
      ...(data.isin && { isin: data.isin }),
      ...(data.naicsNationalIndustry && {
        naicsNationalIndustry: data.naicsNationalIndustry,
      }),
      ...(data.naics && { naics: data.naics }),
      ...(data.cusip && { cusip: data.cusip }),
    };

    // Update cache with validated data
    cache.setDetails(type, identifier, validatedData);

    return validatedData;
  } catch (error) {
    console.error('Error fetching IPO details:', {
      error,
      identifier,
      type,
    });
    return null;
  }
}

export async function fetchUpcomingIPOs(
  limit: number = CONFIG.API.DEFAULT_LIMIT
): Promise<IPO[]> {
  // Validate and normalize limit
  limit = Math.max(CONFIG.API.MIN_LIMIT, Math.min(limit, CONFIG.API.MAX_LIMIT));

  try {
    // Check cache first
    const cached = ipoCache.get(limit.toString());
    if (cached) return cached;

    const data = await retryRequest(async () => {
      const response = await fetch('/api/finnhub?endpoint=/calendar/ipo');
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      return response.json() as Promise<FinnhubIPOResponse>;
    });

    if (!data?.ipoCalendar?.length) {
      console.warn('No IPO data received from API');
      return [];
    }

    // Process and validate IPO data
    const validIpos = data.ipoCalendar.filter((ipo) => {
      const isValid = Boolean(
        ipo.name?.trim() && ipo.date && isValidDate(ipo.date)
      );
      if (!isValid) {
        console.warn('Invalid IPO data:', ipo);
      }
      return isValid;
    });

    // Sort by date and secondary by name
    const sortedIpos = validIpos.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB || (a.name || '').localeCompare(b.name || '');
    });

    // Apply limit
    const limitedIpos = sortedIpos.slice(0, limit);

    // Process IPOs in batches with concurrent limits
    const processedIpos: IPO[] = [];
    const batchSize = CONFIG.CACHE.BATCH_SIZE;

    for (let i = 0; i < limitedIpos.length; i += batchSize) {
      const batch = limitedIpos.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (ipo) => {
          try {
            return await processIPO(ipo);
          } catch (error) {
            console.error('Failed to process IPO:', { error, ipo });
            return null;
          }
        })
      );

      const validResults = batchResults.filter((result): result is IPO =>
        Boolean(result)
      );
      processedIpos.push(...validResults);

      // Add small delay between batches to prevent rate limiting
      if (i + batchSize < limitedIpos.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Cache the results
    ipoCache.set(limit.toString(), processedIpos);
    return processedIpos;
  } catch (error) {
    console.error('Failed to fetch IPO data:', error);
    return [];
  }
}

async function processIPO(ipo: FinnhubIPO): Promise<IPO | null> {
  try {
    // Calculate estimated valuation safely
    const shares = Math.max(0, ipo.shares || 0);
    const price = Math.max(0, ipo.price || 0);
    const valuation = shares * price;

    // Try to fetch company details using available identifiers
    const details = await tryFetchCompanyDetails([
      { value: ipo.symbol || '', type: 'symbol' },
      { value: ipo.isin || '', type: 'isin' },
      { value: ipo.cusip || '', type: 'cusip' },
    ]);

    // Format date consistently
    const ipoDate = new Date(ipo.date);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(ipoDate);

    const transformedIPO: IPO = {
      id: ipo.symbol,
      name: details?.name || ipo.name || 'Unknown Company',
      date: formattedDate,
      status: getIPOStatus(ipoDate),
      valuation: parseValuation(valuation),
      sector:
        details?.finnhubIndustry || ipo.industry || CONFIG.DEFAULTS.INDUSTRY,
      exchange: details?.exchange || ipo.exchange || CONFIG.DEFAULTS.EXCHANGE,
      change: '+0%', // TODO: Implement real change calculation
      isPositive: true,
      interest: getInterestLevel(valuation),
      highlights: generateHighlights(ipo, details, valuation),
      logo: details?.logo || CONFIG.DEFAULTS.LOGO,
      companyDetails: details || undefined,
      shares,
      price,
      symbol: ipo.symbol,
      isin: ipo.isin,
      cusip: ipo.cusip,
    };
  } catch (error) {
    console.error('Error processing IPO:', { error, ipo });
    return null;
  }
}

function generateHighlights(
  ipo: FinnhubIPO,
  details: CompanyDetails | null,
  valuation: number
): string[] {
  const highlights: (string | null)[] = [
    ipo.shares ? `${ipo.shares.toLocaleString()} Shares` : 'Shares TBA',
    ipo.price ? `$${ipo.price} Price` : 'Price TBA',
    details?.finnhubIndustry || ipo.industry || 'Industry N/A',
    details?.country ? `Based in ${details.country}` : null,
    details?.marketCapitalization
      ? `Market Cap: ${formatMarketCap(details.marketCapitalization)}`
      : null,
    details?.ipo ? `Previous IPO: ${details.ipo}` : null,
    details?.weburl ? `Website: ${details.weburl}` : null,
    valuation > 1e9 ? `Estimated Value: ${formatMarketCap(valuation)}` : null,
  ];

  return highlights.filter((h): h is string => Boolean(h));
}

export async function fetchIPOPerformance(): Promise<IPOPerformanceData> {
  // TODO: Implement real performance metrics calculation
  return {
    averageReturn: '+24.5%',
    successRate: '92%',
    totalVolume: '$18.5B',
    marketSentiment: 'Bullish',
  };
}

// Cleanup function to be called when the app unmounts
export function cleanup(): void {
  dateCache.destroy();
  valuationCache.destroy();
  ipoCache.destroy();
  detailsCache.destroy();
}

function transformIPO(ipo: FinnhubIPO, details?: CompanyDetails | null): IPO {
  const ipoDate = new Date(ipo.date);
  const formattedDate = ipoDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const parsedValuation = parseValuation(details?.marketCapitalization || 0);

  return {
    id: ipo.symbol,
    name: details?.name || ipo.name || 'Unknown Company',
    date: formattedDate,
    status: getIPOStatus(ipoDate),
    valuation: parsedValuation,
    sector:
      details?.finnhubIndustry || ipo.industry || CONFIG.DEFAULTS.INDUSTRY,
    exchange: details?.exchange || ipo.exchange || CONFIG.DEFAULTS.EXCHANGE,
    change: '+0%', // TODO: Implement real change calculation
    isPositive: true,
    interest: getInterestLevel(parsedValuation),
    highlights: generateHighlights(ipo, details, parsedValuation),
    logo: details?.logo || CONFIG.DEFAULTS.LOGO,
    companyDetails: details || undefined,
  };
}
