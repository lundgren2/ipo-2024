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
  status: string;
  valuation: string;
  sector: string;
  exchange: string;
  change: string;
  isPositive: boolean;
  interest: string;
  highlights: string[];
  logo: string;
  // Additional company details
  companyDetails?: CompanyDetails;
  // Raw data
  shares?: number;
  price?: number;
  symbol?: string;
  isin?: string;
  cusip?: string;
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
