'use client';

import { Card } from '@/components/ui/card';
import { newsItems } from '@/data/news';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="w-full py-12">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">IPO News & Updates</h1>
          <p className="text-lg text-muted-foreground">
            Stay informed with the latest news, analysis, and updates from the
            IPO market.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card className="overflow-hidden h-full hover:bg-accent/50 transition-colors">
                <div className="relative aspect-video">
                  <Image
                    src={
                      article.imageUrl ||
                      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f'
                    }
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className={`uppercase text-[10px] font-semibold px-2 py-0.5 ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{article.time}</span>
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'IPO':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10';
    case 'Market':
      return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-inset ring-green-700/10';
    case 'Tech':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 ring-1 ring-inset ring-purple-700/10';
    case 'Finance':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 ring-1 ring-inset ring-yellow-700/10';
    case 'Regulatory':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 ring-1 ring-inset ring-orange-700/10';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400 ring-1 ring-inset ring-gray-700/10';
  }
}
