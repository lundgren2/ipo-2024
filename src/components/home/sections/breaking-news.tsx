'use client';

import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';

type NewsItem = {
  id: string;
  category: 'IPO' | 'Market' | 'Tech' | 'Finance' | 'Regulatory';
  title: string;
  time: string;
  slug: string;
};

const newsItems: NewsItem[] = [
  {
    id: '1',
    category: 'IPO',
    title: 'Reddit shares surge 48% on NYSE debut as retail investors pile in',
    time: '2h ago',
    slug: 'reddit-ipo-debut',
  },
  {
    id: '2',
    category: 'Market',
    title: 'Stripe sets $50B valuation target for direct listing, sources say',
    time: '3h ago',
    slug: 'stripe-valuation',
  },
  {
    id: '3',
    category: 'IPO',
    title: 'Discord files confidentially for IPO, targeting $15B valuation',
    time: '4h ago',
    slug: 'discord-ipo-filing',
  },
  {
    id: '4',
    category: 'Market',
    title: 'Q1 2024 IPO market sees 200% increase in listings year-over-year',
    time: '5h ago',
    slug: 'q1-ipo-surge',
  },
  {
    id: '5',
    category: 'Finance',
    title: 'JPMorgan predicts strongest IPO pipeline since 2021',
    time: '6h ago',
    slug: 'jpmorgan-forecast',
  },
  {
    id: '6',
    category: 'IPO',
    title: 'Shein eyes $90B valuation in upcoming US listing',
    time: '7h ago',
    slug: 'shein-ipo-valuation',
  },
  {
    id: '7',
    category: 'Market',
    title: 'Tech IPOs outperform traditional sectors in Q1 returns',
    time: '8h ago',
    slug: 'tech-ipo-performance',
  },
  {
    id: '8',
    category: 'Tech',
    title: 'AI startup Anthropic plans 2024 IPO amid AI boom',
    time: '9h ago',
    slug: 'anthropic-ipo',
  },
];

export function BreakingNews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrolling = useRef(true);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationFrameId: number;
    const speed = 0.5; // Pixels per frame

    const animate = () => {
      if (scrolling.current && scrollElement) {
        scrollElement.scrollLeft += speed;

        // Reset to start when reaching the end
        if (
          scrollElement.scrollLeft >=
          scrollElement.scrollWidth - scrollElement.clientWidth
        ) {
          scrollElement.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b">
      <div className="max-w-full mx-auto px-4 py-2.5">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => (scrolling.current = false)}
          onMouseLeave={() => (scrolling.current = true)}
        >
          {[...newsItems, ...newsItems].map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              href={`/news/${item.slug}`}
              className="flex-none max-w-lg group"
            >
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 shrink-0">
                  <Badge
                    variant="secondary"
                    className={`uppercase text-[10px] font-semibold px-2 py-0.5 shrink-0 ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                </div>
                <span className="font-medium truncate group-hover:text-primary transition-colors">
                  {item.title}
                </span>
                <ChevronRight className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category: NewsItem['category']): string {
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
