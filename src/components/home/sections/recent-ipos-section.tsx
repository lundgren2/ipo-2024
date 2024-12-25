'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

type IPO = {
  logo: string;
  name: string;
  ticker: string;
  firstTradingDay: string;
  sector: string;
  exchange: 'NYSE' | 'NASDAQ';
  country: string;
  popularity?: number; // 1-100
  backgroundImage?: string;
  status: 'active' | 'listed';
  priceRange?: string;
  sharesOffered?: string;
  marketCap?: string;
};

const ipoData: IPO[] = [
  {
    logo: 'https://logo.clearbit.com/reddit.com',
    name: 'Reddit Inc.',
    ticker: 'RDDT',
    firstTradingDay: 'March 21, 2024',
    sector: 'Technology',
    exchange: 'NYSE',
    country: 'us',
    popularity: 98,
    backgroundImage:
      'https://images.unsplash.com/photo-1432821596592-e2c18b78144f',
    status: 'active',
    priceRange: '$31.00 - $34.00',
    sharesOffered: '22M',
    marketCap: '$6.5B',
  },
  {
    logo: 'https://logo.clearbit.com/stripe.com',
    name: 'Stripe',
    ticker: 'STRP',
    firstTradingDay: 'March 15, 2024',
    sector: 'Financial Services',
    exchange: 'NYSE',
    country: 'us',
    popularity: 95,
    backgroundImage:
      'https://images.unsplash.com/photo-1559526324-593bc073d938',
    status: 'active',
    priceRange: '$75.00 - $85.00',
    sharesOffered: '30M',
    marketCap: '$80B',
  },
  {
    logo: 'https://logo.clearbit.com/shein.com',
    name: 'SHEIN',
    ticker: 'SHEIN',
    firstTradingDay: 'March 14, 2024',
    sector: 'Retail',
    exchange: 'NYSE',
    country: 'cn',
    status: 'listed',
  },
  {
    logo: 'https://logo.clearbit.com/databricks.com',
    name: 'Databricks',
    ticker: 'DBX',
    firstTradingDay: 'March 8, 2024',
    sector: 'Technology',
    exchange: 'NASDAQ',
    country: 'us',
    status: 'listed',
  },
  {
    logo: 'https://logo.clearbit.com/birkenstock.com',
    name: 'Birkenstock',
    ticker: 'BIRK',
    firstTradingDay: 'March 1, 2024',
    sector: 'Consumer Goods',
    exchange: 'NYSE',
    country: 'de',
    status: 'listed',
  },
];

export function RecentIPOsSection() {
  const activeIPOs = ipoData.filter((ipo) => ipo.status === 'active');
  const listedIPOs = ipoData.filter((ipo) => ipo.status === 'listed');

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl container mx-auto px-4">
        {/* Active IPOs */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-1">
                Active IPOs
              </h2>
              <p className="text-sm text-muted-foreground">
                Currently active IPO offerings
              </p>
            </div>
            <Link
              href="/active-ipos"
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              View all active IPOs →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {activeIPOs.map((ipo) => (
              <Link href={`/ipo/${ipo.ticker.toLowerCase()}`} key={ipo.ticker}>
                <Card className="group relative overflow-hidden h-64">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={ipo.backgroundImage!}
                      alt=""
                      fill
                      className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-accent/50 border dark:border-slate-700">
                            <Image
                              src={ipo.logo}
                              alt={`${ipo.name} logo`}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-lg text-white">
                                {ipo.name}
                              </h3>
                              <span className="text-sm text-white/80 font-mono">
                                ${ipo.ticker}
                              </span>
                            </div>
                            <p className="text-sm text-white/60">
                              {ipo.sector}
                            </p>
                          </div>
                        </div>
                        <Image
                          src={`https://flagcdn.com/w40/${ipo.country}.png`}
                          alt={ipo.country}
                          width={24}
                          height={16}
                          className="rounded"
                        />
                      </div>

                      {/* IPO Details */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-white/60 mb-1">
                            Price Range
                          </p>
                          <p className="text-sm text-white font-medium">
                            {ipo.priceRange}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-1">
                            Shares Offered
                          </p>
                          <p className="text-sm text-white font-medium">
                            {ipo.sharesOffered}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-1">
                            Market Cap
                          </p>
                          <p className="text-sm text-white font-medium">
                            {ipo.marketCap}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-white/60 mb-1">
                            Expected Trading
                          </p>
                          <p className="text-sm text-white font-medium">
                            {ipo.firstTradingDay}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white/80">
                          {ipo.popularity}% Interest
                        </span>
                      </div>
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
                        {ipo.exchange}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Listed IPOs */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-1">
                Recently Listed
              </h2>
              <p className="text-sm text-muted-foreground">
                Companies that recently went public
              </p>
            </div>
            <Link
              href="/ipos"
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              View all IPOs →
            </Link>
          </div>

          <div className="grid gap-3">
            {listedIPOs.map((ipo) => (
              <Link href={`/ipo/${ipo.ticker.toLowerCase()}`} key={ipo.ticker}>
                <Card className="p-4 flex items-center gap-6 hover:bg-accent/50 transition-colors">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-accent border dark:border-accent">
                    <Image
                      src={ipo.logo}
                      alt={`${ipo.name} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{ipo.name}</h3>
                      <span className="text-sm text-muted-foreground font-mono">
                        ${ipo.ticker}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {ipo.sector}
                    </p>
                  </div>

                  <div className="hidden md:block text-sm text-right">
                    <p className="font-medium">{ipo.firstTradingDay}</p>
                    <p className="text-muted-foreground text-xs">
                      First Trading Day
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Image
                      src={`https://flagcdn.com/w40/${ipo.country}.png`}
                      alt={ipo.country}
                      width={20}
                      height={14}
                      className="rounded"
                    />
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                        ${
                          ipo.exchange === 'NYSE'
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10'
                            : 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 ring-1 ring-inset ring-purple-700/10'
                        }`}
                    >
                      {ipo.exchange}
                    </span>
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
