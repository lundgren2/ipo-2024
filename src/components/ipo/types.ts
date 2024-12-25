export type SortOption = 'date' | 'name' | 'valuation';

export type FilterKey =
  | 'searchQuery'
  | 'sector'
  | 'exchange'
  | 'sortBy'
  | 'limit';

export interface Filters {
  searchQuery: string;
  sector: string;
  exchange: string;
  sortBy: SortOption;
  limit: number;
}

export const EXCHANGES = [
  'NYSE',
  'NASDAQ',
  'AMEX',
  'LSE',
  'TSX',
  'ASX',
  'JSE',
] as const;
