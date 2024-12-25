import { getAllNews } from '@/lib/mock-news';
import { HomeLayout } from '@/components/layouts/home-layout';

export default async function HomePage() {
  const initialNews = await getAllNews();
  return <HomeLayout initialNews={initialNews} />;
}
