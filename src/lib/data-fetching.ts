import { getAllNews } from './mock-news';
import type { NewsData, NewsItem } from '@/types/news';

export async function getHomePageData(): Promise<{ news: NewsData }> {
  const allNews = await getAllNews();

  return {
    news: {
      trending: allNews.filter(
        (news: NewsItem) => news.category === 'Trending'
      ),
      latest: allNews.filter((news: NewsItem) => news.category === 'Latest'),
      analysis: allNews.filter(
        (news: NewsItem) => news.category === 'Analysis'
      ),
      featured: allNews.find((news: NewsItem) => news.category === 'Featured'),
    },
  };
}
