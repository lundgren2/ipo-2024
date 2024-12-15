export interface NewsItem {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  slug: string;
  content?: string;
  author?: string;
}

export const featuredStory: NewsItem = {
  title: 'Reddit IPO: A New Era for Social Media Platforms',
  description:
    "Reddit's highly anticipated IPO marks a significant milestone in the evolution of social media platforms and community-driven content.",
  date: '2024-03-21',
  imageUrl:
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop',
  category: 'Featured',
  author: 'Sarah Johnson',
  slug: 'reddit-ipo-new-era-social-media',
  content: `Reddit's journey to the public markets marks a pivotal moment in the evolution of social media platforms. The company's IPO filing reveals not just impressive growth metrics but also a unique story of community-driven content and user engagement.

## Key Highlights

* Valuation expectations around $15 billion
* Plans to list on the NYSE under ticker "RDDT"
* Strong revenue growth driven by advertising
* Unique position in social media landscape

## Community Impact

Reddit's success has been built on its vibrant communities, with over 100,000 active subreddits covering virtually every topic imaginable. The platform's unique approach to content moderation and community governance has created a distinct ecosystem in the social media landscape.

## Market Opportunity

The social media advertising market continues to grow, presenting significant opportunities for Reddit. The company's targeted advertising capabilities and engaged user base provide a strong foundation for future growth.

## Looking Ahead

As Reddit prepares to enter the public markets, investors will be watching closely to see how the platform balances its community-first approach with the demands of being a public company.`,
};

export const trendingNews: NewsItem[] = [
  {
    title: "Stripe's Path to Public Markets",
    description:
      'Payment giant Stripe takes steps toward a potential 2024 IPO, signaling a major shift in fintech landscape.',
    date: '2024-03-20',
    imageUrl:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2940&auto=format&fit=crop',
    category: 'Trending',
    slug: 'stripe-path-to-public-markets',
    author: 'Michael Chen',
    content: `Stripe, the payments processing giant, is making significant moves toward a potential public offering in 2024. This development represents a major milestone in the fintech sector and could set new benchmarks for technology IPOs.

## Market Position

* Leading position in digital payments
* Strong presence in enterprise solutions
* Innovative product development

## IPO Preparations

The company has been strengthening its executive team and corporate governance structures in preparation for public markets. Recent hires in key positions signal a clear intention to build a robust public company infrastructure.

## Industry Impact

Stripe's potential IPO could have far-reaching implications for the fintech sector, potentially inspiring other private fintech companies to consider public listings.`,
  },
  {
    title: 'AI Startups Rush to IPO Market',
    description:
      'Artificial intelligence companies are leading the new wave of tech IPOs in 2024.',
    date: '2024-03-19',
    imageUrl:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2940&auto=format&fit=crop',
    category: 'Technology',
    slug: 'ai-startups-rush-ipo-market',
    content: `The artificial intelligence sector is experiencing unprecedented activity in the IPO market, with multiple companies preparing for public debuts. This surge reflects growing investor interest in AI technologies and their potential to transform industries.

## Key Trends

* Increased valuations for AI companies
* Strong investor demand
* Focus on enterprise AI solutions
* Competition for market share

## Market Impact

The rush of AI companies to public markets is creating new opportunities for investors while also raising questions about valuations and long-term sustainability.`,
  },
  {
    title: 'Healthcare IPOs Surge in Q1',
    description:
      'Healthcare sector sees unprecedented IPO activity driven by biotech innovations.',
    date: '2024-03-18',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop',
    category: 'Healthcare',
    slug: 'healthcare-ipos-surge-q1',
    content: `The healthcare sector has witnessed a remarkable surge in IPO activity during the first quarter of 2024, driven by breakthrough innovations in biotechnology and digital health solutions.

## Sector Highlights

* Biotech leads the way with innovative treatments
* Digital health platforms gaining traction
* Strong investor interest in healthcare tech
* Regulatory environment supporting innovation

## Market Dynamics

The convergence of healthcare and technology is creating new opportunities for companies and investors alike.`,
  },
];

export const marketAnalysis: NewsItem[] = [
  {
    title: 'IPO Market Outlook 2024',
    description:
      'Analysis of market conditions and trends shaping IPO landscape.',
    date: '2024-03-21',
    imageUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2940&auto=format&fit=crop',
    category: 'Analysis',
    slug: 'ipo-market-outlook-2024',
    content: `The IPO market in 2024 is showing strong signs of recovery, with several major companies preparing for public debuts. Here's a detailed analysis of the current landscape.

## Market Conditions

The current market conditions are favorable for new listings, with strong investor appetite and stable valuations. Key metrics show positive trends:

\`\`\`typescript
interface MarketMetrics {
  totalIPOs: number;
  averageValuation: number;
  successRate: number;
  sectorDistribution: Record<string, number>;
}

const q1Metrics: MarketMetrics = {
  totalIPOs: 127,
  averageValuation: 2.8e9, // $2.8B
  successRate: 0.89,
  sectorDistribution: {
    technology: 0.45,
    healthcare: 0.25,
    consumer: 0.15,
    finance: 0.15,
  },
};
\`\`\`

## Sector Analysis

Different sectors are showing varying levels of activity:

\`\`\`python
def calculate_sector_performance(sector_data):
    performance = {
        'tech': {
            'avg_return': 24.5,
            'median_size': 850,  # $850M
            'success_rate': 0.92
        },
        'healthcare': {
            'avg_return': 18.2,
            'median_size': 420,  # $420M
            'success_rate': 0.85
        }
    }
    return performance
\`\`\`

## Market Trends

The following trends are shaping the IPO landscape:

* Increased retail investor participation
* Focus on sustainable business models
* Strong pipeline in emerging markets
* Rise of direct listings

## Looking Ahead

As we move further into 2024, we expect continued strength in the IPO market, particularly in the technology and healthcare sectors.`,
  },
  {
    title: 'Sector Performance Review',
    description: 'Detailed analysis of how different sectors perform post-IPO.',
    date: '2024-03-20',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    category: 'Research',
    slug: 'sector-performance-review',
    content: `A comprehensive analysis of post-IPO performance across different sectors reveals interesting patterns and opportunities for investors.

## Performance Metrics

* Technology sector leads with 45% average first-day pop
* Healthcare companies show strong long-term stability
* Consumer brands demonstrate consistent growth
* Financial technology firms exceed market expectations

## Key Findings

The analysis reveals several key patterns in post-IPO performance:

\`\`\`typescript
interface SectorPerformance {
  sector: string;
  firstDayReturn: number;
  sixMonthReturn: number;
  oneYearReturn: number;
  volatility: number;
}

const sectorData: SectorPerformance[] = [
  {
    sector: 'Technology',
    firstDayReturn: 45.2,
    sixMonthReturn: 68.5,
    oneYearReturn: 92.3,
    volatility: 28.4,
  },
  {
    sector: 'Healthcare',
    firstDayReturn: 28.7,
    sixMonthReturn: 42.1,
    oneYearReturn: 65.8,
    volatility: 22.1,
  },
];
\`\`\`

## Market Implications

Understanding sector performance helps investors:

* Make informed investment decisions
* Time market entry points effectively
* Diversify IPO portfolios strategically
* Manage risk exposure appropriately`,
  },
  {
    title: 'Global IPO Trends',
    description:
      'International perspectives on IPO markets and cross-border listings.',
    date: '2024-03-19',
    imageUrl:
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2940&auto=format&fit=crop',
    category: 'Global',
    slug: 'global-ipo-trends',
    content: `Global IPO markets are showing diverse trends across different regions, with emerging markets playing an increasingly important role.

## Regional Analysis

* US markets maintain leadership in tech IPOs
* Asian markets see surge in consumer brands
* European exchanges focus on sustainable companies
* Emerging markets attract cross-border listings

## Market Data

\`\`\`python
def analyze_global_markets():
    market_data = {
        'north_america': {
            'total_ipos': 245,
            'total_value': 52.8,  # billion USD
            'top_sector': 'Technology'
        },
        'asia_pacific': {
            'total_ipos': 312,
            'total_value': 48.2,
            'top_sector': 'Consumer'
        },
        'europe': {
            'total_ipos': 186,
            'total_value': 35.6,
            'top_sector': 'Green Energy'
        }
    }
    return market_data
\`\`\`

## Cross-Border Opportunities

The rise in cross-border listings presents new opportunities:

* Access to larger investor bases
* Increased liquidity options
* Enhanced brand visibility
* Regulatory flexibility`,
  },
];

export const latestNews: NewsItem[] = [
  {
    title: 'Shein Files Confidentially for US IPO',
    description:
      'Fast-fashion giant Shein has confidentially filed for a US IPO, sources say.',
    date: '2024-03-21',
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2940&auto=format&fit=crop',
    category: 'Retail',
    slug: 'shein-files-confidentially-us-ipo',
    content: `Fast-fashion giant Shein has taken a significant step toward going public by confidentially filing for a US IPO. This development marks a major milestone for the company and the retail sector.

## Company Overview

* Global fast-fashion leader
* Strong e-commerce presence
* Innovative supply chain model
* Rapid market expansion

## IPO Details

The company's confidential filing suggests:

* Potential valuation over $60 billion
* NYSE listing targeted
* Goldman Sachs and JPMorgan leading
* Q2 2024 timeline expected

## Market Impact

This IPO could reshape the retail landscape:

* Sets new benchmarks for e-commerce valuations
* Influences future retail tech offerings
* Demonstrates continued market appetite
* Validates digital-first business models`,
  },
  {
    title: 'Green Energy IPOs Gain Momentum',
    description:
      'Renewable energy companies see strong investor interest in public offerings.',
    date: '2024-03-20',
    imageUrl:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2940&auto=format&fit=crop',
    category: 'Energy',
    slug: 'green-energy-ipos-gain-momentum',
    content: `
      The renewable energy sector is experiencing increased momentum in IPO activity, with strong investor interest driving valuations and creating opportunities for sustainable energy companies.
    `,
  },
  {
    title: 'Tech Unicorns Eye Public Markets',
    description:
      'Several technology unicorns prepare for potential IPOs in the coming months.',
    date: '2024-03-19',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2940&auto=format&fit=crop',
    category: 'Technology',
    slug: 'tech-unicorns-eye-public-markets',
    content: `
      Multiple technology unicorns are preparing for potential public offerings in the coming months, signaling continued strength in the tech IPO market despite market volatility.
    `,
  },
];

export const marketInsights = [
  {
    title: 'Market Pulse',
    highlights: [
      'Tech sector leads IPO volume in Q1 2024',
      'Healthcare IPOs show strong aftermarket performance',
      'ESG-focused companies attract premium valuations',
      'SPAC activity continues to normalize',
    ],
  },
  {
    title: 'Market Trends',
    highlights: [
      'Increased retail investor participation in IPOs',
      'Growing focus on sustainable business models',
      'Rise in direct listings among tech companies',
      'Strong pipeline in emerging markets',
    ],
  },
];

// Helper function to get all news items
export async function getAllNews(): Promise<NewsItem[]> {
  return [featuredStory, ...trendingNews, ...marketAnalysis, ...latestNews];
}

// Helper function to get a news item by slug
export async function getNewsBySlug(
  slug: string
): Promise<NewsItem | undefined> {
  const allNews = await getAllNews();
  return allNews.find((item) => item.slug === slug);
}
