export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category:
    | 'Featured'
    | 'Trending'
    | 'Latest'
    | 'Analysis'
    | 'Technology'
    | 'Healthcare'
    | 'Research'
    | 'Global'
    | 'Retail'
    | 'Energy';
  slug: string;
  author?: string;
  content?: string;
}

export interface NewsData {
  trending: NewsItem[];
  latest: NewsItem[];
  analysis: NewsItem[];
  featured?: NewsItem;
}
