export interface NewsItem {
  id: string;
  category: 'IPO' | 'Market' | 'Tech' | 'Finance' | 'Regulatory';
  title: string;
  description: string;
  content: string;
  time: string;
  date: string;
  isoDate: string;
  slug: string;
  imageUrl: string;
  author?: {
    name: string;
    avatar?: string;
  };
  relatedTags?: string[];
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    category: 'IPO',
    title: 'Reddit shares surge 48% on NYSE debut as retail investors pile in',
    description:
      'Social media platform sees strong demand in first day of trading as retail investors show significant interest.',
    content: `Reddit's highly anticipated initial public offering (IPO) saw its shares surge 48% in their trading debut on the New York Stock Exchange (NYSE) as retail investors showed strong interest in the social media platform.

The stock, trading under the ticker symbol "RDDT," opened at $47 per share, well above its IPO price of $34, and reached a high of $57.80 during the session. This strong performance values Reddit at approximately $8.5 billion on a fully diluted basis.

The successful debut marks a significant milestone for Reddit, which has taken a unique approach to its public offering by reserving shares for its most active users and moderators. This strategy appears to have paid off, with many of these community members participating in the IPO.

Market analysts note that the strong performance is particularly noteworthy given the challenging market conditions for technology IPOs in recent years. The positive reception could potentially encourage other tech companies considering public offerings to move forward with their plans.

Reddit's IPO is also notable for its emphasis on artificial intelligence, with the company highlighting its data licensing agreements with AI companies as a growing revenue stream. This focus on AI capabilities and data monetization has attracted significant investor interest.

However, some analysts caution about the company's path to profitability, noting that Reddit has yet to turn a consistent profit despite its large user base and cultural influence. The platform will need to balance monetization efforts with maintaining its unique community-driven culture.`,
    time: '2h ago',
    date: 'March 21, 2024',
    isoDate: '2024-03-21',
    slug: 'reddit-ipo-debut',
    imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    relatedTags: [
      'Reddit',
      'Social Media',
      'NYSE',
      'Tech IPO',
      'Retail Investors',
    ],
  },
  {
    id: '6',
    category: 'IPO',
    title: 'Shein eyes $90B valuation in upcoming US listing',
    description:
      'Fast-fashion giant Shein is preparing for a US IPO with an ambitious valuation target of $90 billion.',
    content: `Fast-fashion retailer Shein is reportedly targeting a valuation of $90 billion in its upcoming US initial public offering (IPO), according to sources familiar with the matter. This ambitious valuation reflects the company's dominant position in the global fast-fashion market and its rapid growth trajectory.

The company, known for its ultra-fast production cycles and competitive pricing, has revolutionized the fashion retail landscape through its data-driven approach and direct-to-consumer model. Shein's potential IPO would mark one of the largest public offerings by a Chinese-founded company in the US markets.

Key aspects of Shein's IPO preparation:
- Target valuation: $90 billion
- Expected listing venue: New York Stock Exchange
- Timeline: Second half of 2024
- Lead underwriters: Major global investment banks
- Regulatory considerations: Enhanced scrutiny expected

The company's growth metrics:
- Over 150 million active users globally
- Present in more than 150 countries
- Revenue growth exceeding 100% annually
- Significant market share in key regions

However, analysts note several challenges:
- Increased regulatory scrutiny
- Environmental concerns
- Supply chain transparency
- Competition from established retailers
- Geopolitical considerations

The success of Shein's IPO could set a precedent for other fast-fashion retailers and influence the broader retail technology sector.`,
    time: '7h ago',
    date: 'March 21, 2024',
    isoDate: '2024-03-21',
    slug: 'shein-ipo-valuation',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
    author: {
      name: 'Alex Zhang',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    relatedTags: ['Shein', 'Fast Fashion', 'Retail', 'US Markets', 'Valuation'],
  },
  {
    id: '7',
    category: 'Market',
    title: 'Tech IPOs outperform traditional sectors in Q1 returns',
    description:
      'Technology sector IPOs show strong performance in the first quarter, outpacing traditional sectors by significant margins.',
    content: `Technology sector IPOs have demonstrated exceptional performance in the first quarter of 2024, significantly outpacing traditional sectors in terms of returns and investor interest. This trend highlights the continued strong appetite for technology companies in the public markets.

Key performance metrics:
- Average first-day pop: +45%
- 30-day return: +32%
- Sector-wide valuation multiple: 12x revenue
- Total capital raised: $15.2 billion
- Number of successful tech IPOs: 28

Factors contributing to strong performance:
1. AI-driven innovation and growth
2. Strong enterprise technology demand
3. Cloud computing expansion
4. Digital transformation acceleration
5. Robust venture capital backing

The outperformance has been particularly notable in:
- Enterprise software
- Artificial Intelligence
- Cybersecurity
- Cloud infrastructure
- Digital payments

Market analysts attribute this success to:
- Improved market conditions
- Strong fundamentals
- Clear path to profitability
- Strategic positioning
- Innovation leadership`,
    time: '8h ago',
    date: 'March 21, 2024',
    isoDate: '2024-03-21',
    slug: 'tech-ipo-performance',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7',
    author: {
      name: 'Jennifer Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
    },
    relatedTags: [
      'Technology',
      'IPO Performance',
      'Market Analysis',
      'Tech Sector',
      'Investment Returns',
    ],
  },
  {
    id: '8',
    category: 'Tech',
    title: 'AI startup Anthropic plans 2024 IPO amid AI boom',
    description:
      'Artificial intelligence company Anthropic is preparing for a public offering, capitalizing on the growing interest in AI technology.',
    content: `Anthropic, a leading artificial intelligence research company, is reportedly planning to go public in 2024, seeking to capitalize on the unprecedented interest in AI technology. The company, known for its advanced language models and ethical AI development approach, is expected to attract significant investor attention.

Key details about Anthropic's IPO plans:
- Expected valuation: $20+ billion
- Projected timeline: Q4 2024
- Focus areas: AI safety and development
- Key products: Claude AI assistant
- Strategic partnerships: Major tech companies

Company highlights:
- Industry-leading AI research
- Strong focus on AI safety
- Significant corporate partnerships
- Robust intellectual property portfolio
- Experienced leadership team

Market opportunity:
- Growing demand for AI solutions
- Enterprise adoption acceleration
- Research commercialization potential
- International expansion opportunities
- Strategic technology partnerships

The company's differentiation:
1. Focus on AI safety and ethics
2. Advanced language model capabilities
3. Enterprise-ready solutions
4. Research-driven approach
5. Strong governance framework

Anthropic's IPO is expected to be a significant milestone for the AI industry, potentially setting new benchmarks for AI company valuations and public market expectations.`,
    time: '9h ago',
    date: 'March 21, 2024',
    isoDate: '2024-03-21',
    slug: 'anthropic-ipo',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    author: {
      name: 'Mark Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
    },
    relatedTags: [
      'Anthropic',
      'Artificial Intelligence',
      'AI Safety',
      'Tech IPO',
      'AI Industry',
    ],
  },
];
