import { Suspense } from 'react';
import { NewsLoadingSkeleton } from '@/components/news/loading-skeleton';
import { HeroSection } from '@/components/home/sections/hero';
import { BreakingNews } from '@/components/home/sections/breaking-news';
import { FeaturedIPO } from '@/components/home/sections/featured-ipo';
import { NewsSection } from '@/components/home/sections/news-section';
import { SecondarySections } from '@/components/home/secondary-sections';
import type { NewsItem } from '@/types/news';

interface HomeLayoutProps {
  initialNews: NewsItem[];
}

export function HomeLayout({ initialNews }: HomeLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BreakingNews />
      <HeroSection />
      <FeaturedIPO />
      <SecondarySections />
      <Suspense fallback={<NewsLoadingSkeleton />}>
        <NewsSection initialNews={initialNews} />
      </Suspense>
    </div>
  );
}
