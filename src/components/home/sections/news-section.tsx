'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const featuredNews = {
  date: 'March 18, 2024',
  title:
    'Reddit IPO: Social Media Giant Sets Terms for $6.5 Billion March Listing',
  description:
    'Reddit aims to raise up to $748 million, offering 22 million shares priced between $31 and $34 each in its highly anticipated IPO.',
  tag: 'FEATURED IPO',
  imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f',
  slug: 'reddit-ipo-terms',
};

const recentNews = [
  {
    date: 'March 15, 2024',
    title: 'Stripe Considers Direct Listing for 2024 Public Market Debut',
    description: 'Payment giant explores alternative path to public markets',
    tag: 'UPCOMING IPO',
    imageUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938',
    slug: 'stripe-direct-listing',
  },
  {
    date: 'March 12, 2024',
    title: 'Shein Files Confidentially for US IPO, Targeting $80B Valuation',
    description: 'Fast-fashion retailer prepares for major market debut',
    tag: 'IPO FILING',
    imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5',
    slug: 'shein-confidential-filing',
  },
  {
    date: 'March 8, 2024',
    title: 'Q1 2024 IPO Market Analysis: Tech Sector Leads Recovery',
    description: 'Comprehensive review of recent IPO performance',
    tag: 'MARKET ANALYSIS',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f',
    slug: 'q1-2024-ipo-analysis',
  },
  {
    date: 'March 5, 2024',
    title: 'CircleCI Prepares for IPO Amid DevOps Market Expansion',
    description: 'Software automation company plans public offering',
    tag: 'IPO PIPELINE',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
    slug: 'circleci-ipo-prep',
  },
];

export function NewsSection() {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Featured Story - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <Link href={`/news/${featuredNews.slug}`}>
              <Card className="overflow-hidden rounded-xl border-0 shadow-sm">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 rounded-xl" />
                  <div className="absolute bottom-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium bg-primary text-white rounded">
                        {featuredNews.tag}
                      </span>
                      <span className="text-sm text-slate-200">
                        {featuredNews.date}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {featuredNews.title}
                    </h3>
                    <p className="text-sm text-slate-200 line-clamp-2">
                      {featuredNews.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          {/* Recent Stories - Takes up 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {recentNews.map((item, index) => (
              <Link key={index} href={`/news/${item.slug}`}>
                <Card className="overflow-hidden rounded-xl border-0">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 33vw, 16vw"
                      />
                    </div>
                    <div className="col-span-2 p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded">
                          {item.tag}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
