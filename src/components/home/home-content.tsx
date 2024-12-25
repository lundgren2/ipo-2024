'use client';

import { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useIpoService } from '@/hooks/use-ipo-service';
import { useWatchlist } from '@/context/watchlist-context';
import { getAllNews } from '@/lib/mock-news';
import type { NewsItem } from '@/lib/mock-news';
import { NewsLoadingSkeleton } from '@/components/news/loading-skeleton';
import { NewsCard, MarketAnalysis } from '@/components/news';
import { IPOCard } from '@/components/ipo/ipo-card';
import { SecondarySections } from './secondary-sections';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Bell,
  Sparkles,
  Building,
  TrendingUp,
  Calendar,
  LineChart,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FeaturedIPO } from './sections/featured-ipo';

// Define UpcomingIPOCard props interface
interface UpcomingIPOCardProps {
  ipo: UpcomingIPO;
}

// Memoize components that don't need frequent updates
const UpcomingIPOCard = memo(function UpcomingIPOCard({
  ipo,
}: UpcomingIPOCardProps) {
  const formattedDate = new Date(ipo.expectedDate).getDate();

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
        <span className="font-semibold">{formattedDate}</span>
      </div>
      <div>
        <h4 className="font-medium">{ipo.companyName}</h4>
        <p className="text-sm text-muted-foreground">
          {ipo.exchange}: {ipo.priceRange}
        </p>
      </div>
      <Button variant="ghost" size="icon" className="ml-auto">
        <Bell className="h-4 w-4" />
      </Button>
    </div>
  );
});

UpcomingIPOCard.displayName = 'UpcomingIPOCard';

interface UpcomingIPO {
  id: string;
  companyName: string;
  description: string;
  expectedDate: string;
  priceRange: string;
  exchange: string;
  sector: string;
}

const upcomingIpos: UpcomingIPO[] = [
  {
    id: '1',
    companyName: 'TechVision AI',
    description:
      'Leading artificial intelligence and machine learning solutions provider.',
    expectedDate: '2024-03-15',
    priceRange: '$18 - $20',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    description: 'Renewable energy and sustainable technology company.',
    expectedDate: '2024-04-01',
    priceRange: '$22 - $25',
    exchange: 'NYSE',
    sector: 'Energy',
  },
  {
    id: '3',
    companyName: 'HealthTech Innovations',
    description: 'Digital healthcare platform and telemedicine solutions.',
    expectedDate: '2024-04-15',
    priceRange: '$30 - $35',
    exchange: 'NASDAQ',
    sector: 'Healthcare',
  },
];

const HomeContent = function HomeContent() {
  const {
    data: ipos,
    isLoading: iposLoading,
    error: iposError,
  } = useIpoService();
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [newsData, setNewsData] = useState<{
    featured: Required<
      Pick<
        NewsItem,
        | 'title'
        | 'description'
        | 'date'
        | 'imageUrl'
        | 'category'
        | 'slug'
        | 'author'
      >
    >;
    trending: NewsItem[];
    latest: NewsItem[];
    analysis: NewsItem[];
  } | null>(null);
  const [isNewsLoading, setIsNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNewsData = async () => {
      try {
        setIsNewsLoading(true);
        setNewsError(null);
        const allNews = await getAllNews();
        const featured = allNews.find((news) => news.category === 'Featured');
        const trending = allNews.filter((news) => news.category === 'Trending');
        const latest = allNews.filter((news) => news.category === 'Latest');
        const analysis = allNews.filter((news) => news.category === 'Analysis');

        if (!featured?.author) {
          throw new Error('Featured story is missing required author field');
        }

        setNewsData({
          featured: {
            title: featured.title,
            description: featured.description,
            date: featured.date,
            imageUrl: featured.imageUrl,
            category: featured.category,
            slug: featured.slug,
            author: featured.author,
          },
          trending,
          latest,
          analysis,
        });
      } catch (error) {
        console.error('Error loading news data:', error);
        setNewsError(
          error instanceof Error ? error : new Error('Failed to load news data')
        );
      } finally {
        setIsNewsLoading(false);
      }
    };

    loadNewsData();
  }, []);

  // Loading states
  const isLoading = isNewsLoading || iposLoading;
  const hasError = iposError || newsError;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsLoadingSkeleton />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center">
        <Card className="max-w-md mx-auto p-6 text-center">
          <CardHeader>
            <CardTitle className="text-xl">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              There was an error loading the latest news and IPO data. Please
              try again later.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!newsData) {
    return null;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured News Section */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Featured Stories</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Featured Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:row-span-2"
          >
            <Link href={`/news/${newsData.featured.slug}`}>
              <Card className="group overflow-hidden h-full hover:shadow-lg transition-all">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={newsData.featured.imageUrl}
                    alt={newsData.featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <Badge className="w-fit mb-4 bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {newsData.featured.title}
                    </h3>
                    <p className="text-gray-200 mb-4 line-clamp-2">
                      {newsData.featured.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>{newsData.featured.author}</span>
                      </div>
                      <span>•</span>
                      <time>{newsData.featured.date}</time>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>

          {/* Secondary Featured Stories */}
          <div className="space-y-6">
            {newsData.trending.slice(0, 2).map((story, index) => (
              <motion.div
                key={story.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/news/${story.slug}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative h-48">
                        <Image
                          src={story.imageUrl}
                          alt={story.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover transition-transform group-hover:scale-105"
                          loading="eager"
                          quality={85}
                        />
                        <Badge className="absolute top-4 left-4">
                          {story.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {story.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {story.author && (
                            <>
                              <span>{story.author}</span>
                              <span>•</span>
                            </>
                          )}
                          <time>{story.date}</time>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Tabs Section */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Main Content - Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
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

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Upcoming IPOs Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                This Week&apos;s IPOs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingIpos.map((ipo) => (
                  <UpcomingIPOCard key={ipo.id} ipo={ipo} />
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/ipos">
                <Button variant="ghost" className="w-full">
                  View Full Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* IPO Listings Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Latest IPO Listings
          </h2>
          <Link href="/ipos">
            <Button variant="outline">
              View All IPOs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ipos?.slice(0, 6).map((ipo) => (
            <IPOCard
              key={ipo.id}
              ipo={ipo}
              isWatched={isWatched(ipo.id)}
              onToggleWatch={(watched) =>
                watched ? addToWatchlist(ipo) : removeFromWatchlist(ipo.id)
              }
            />
          ))}
        </div>
      </div>

      <FeaturedIPO />

      <SecondarySections />
    </main>
  );
};

export { HomeContent };
