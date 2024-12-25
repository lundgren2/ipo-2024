'use client';

import type { NewsItem } from '@/lib/mock-news';
import { NewsCard, MarketAnalysis } from '@/components/news';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, Calendar, LineChart } from 'lucide-react';

interface NewsTabsProps {
  initialNews: NewsItem[];
}

export function NewsSection({ initialNews }: NewsTabsProps) {
  const newsData = {
    trending: initialNews.filter((news) => news.category === 'Trending'),
    latest: initialNews.filter((news) => news.category === 'Latest'),
    analysis: initialNews.filter((news) => news.category === 'Analysis'),
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="trending" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="latest">
                  <Calendar className="h-4 w-4 mr-2" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="analysis">
                  <LineChart className="h-4 w-4 mr-2" />
                  Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4">
                {newsData.trending.map((news) => (
                  <NewsCard key={news.slug} {...news} />
                ))}
              </TabsContent>

              <TabsContent value="latest" className="space-y-4">
                {newsData.latest.map((news) => (
                  <NewsCard key={news.slug} {...news} />
                ))}
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                {newsData.analysis.map((analysis) => (
                  <MarketAnalysis key={analysis.slug} {...analysis} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
