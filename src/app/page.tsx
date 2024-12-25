import { SecondarySections } from '@/components/home/secondary-sections';
import { BreakingNews } from '@/components/home/sections/breaking-news';
import { FeaturedIPO } from '@/components/home/sections/featured-ipo';
import { HeroSection } from '@/components/home/sections/hero';
import { NewsSection } from '@/components/home/sections/news-section';
import { NewsletterSection } from '@/components/home/sections/newsletter-section';
import { RecentIPOsSection } from '@/components/home/sections/recent-ipos-section';

export default function Home() {
  return (
    <main>
      <BreakingNews />
      <NewsSection />
      <RecentIPOsSection />
      <NewsletterSection />
      <HeroSection />
      <FeaturedIPO />
      <SecondarySections />
    </main>
  );
}
