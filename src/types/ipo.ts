export interface CompanyDetails {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  // Optional fields that might not always be present
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  description?: string;
  ggroup?: string;
  gind?: string;
  gsector?: string;
  gsubind?: string;
  isin?: string;
  naicsNationalIndustry?: string;
  naics?: string;
  cusip?: string;
}

export interface IPO {
  id: string;
  name: string;
  date: string;
  change: string;
  isPositive: boolean;
  isFavorite?: boolean;
  status?: 'Next Week' | 'Completed' | 'Filing';
  // Additional company details
  companyDetails?: CompanyDetails;
  // Raw data
  shares?: number;
  price?: number;
  symbol?: string;
  isin?: string;
  exchange?: string;
  sector?: string;
  valuation?: number;
  interest?: number;
  trend?: number;
  marketSentiment?: number;
  totalVolume?: number;
  averageReturn?: number;
  successRate?: number;

  cusip?: string;
  logo?: string; // TODO: this is not populated?
  highlights?: string[];
}

export interface FinnhubIPO {
  symbol: string;
  name: string;
  date: string;
  price?: number;
  shares?: number;
  industry?: string;
  exchange?: string;
  isin?: string;
  cusip?: string;
}

export interface FinnhubIPOResponse {
  ipoCalendar: FinnhubIPO[];
}

export interface IPOPerformanceData {
  averageReturn: string;
  successRate: string;
  totalVolume: string;
  marketSentiment: string;
}

export interface WatchlistContextType {
  watchedIpos: IPO[];
  addToWatchlist: (ipo: IPO) => void;
  removeFromWatchlist: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isWatched: (id: string) => boolean;
}
