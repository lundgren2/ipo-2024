import { NewsSection } from '@/components/home/sections/news-section';
import { RecentIPOsSection } from '@/components/home/sections/recent-ipos-section';
import { HeroSection } from '@/components/home/sections/hero';
import { FeaturedIPO } from '@/components/home/sections/featured-ipo';
import { SecondarySections } from '@/components/home/secondary-sections';
import { BreakingNews } from '@/components/home/sections/breaking-news';

export function HomeLayout() {
  return (
    <main className="flex min-h-screen flex-col">
      <BreakingNews />
      <NewsSection />
      <RecentIPOsSection />
      <HeroSection />
      <FeaturedIPO />
      <SecondarySections />
      {/* Other sections */}
    </main>
  );
}
