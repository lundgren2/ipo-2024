'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type IPO = {
  logo: string;
  name: string;
  ticker: string;
  firstTradingDay: string;
  sector: string;
  exchange: 'NYSE' | 'NASDAQ';
};

const recentIPOs: IPO[] = [
  {
    logo: 'https://logo.clearbit.com/reddit.com',
    name: 'Reddit Inc.',
    ticker: 'RDDT',
    firstTradingDay: 'March 21, 2024',
    sector: 'Technology',
    exchange: 'NYSE',
  },
  {
    logo: 'https://logo.clearbit.com/stripe.com',
    name: 'Stripe',
    ticker: 'STRP',
    firstTradingDay: 'March 15, 2024',
    sector: 'Financial Services',
    exchange: 'NYSE',
  },
  {
    logo: 'https://logo.clearbit.com/shein.com',
    name: 'SHEIN',
    ticker: 'SHEIN',
    firstTradingDay: 'March 14, 2024',
    sector: 'Retail',
    exchange: 'NYSE',
  },
  {
    logo: 'https://logo.clearbit.com/databricks.com',
    name: 'Databricks',
    ticker: 'DBX',
    firstTradingDay: 'March 8, 2024',
    sector: 'Technology',
    exchange: 'NASDAQ',
  },
  {
    logo: 'https://logo.clearbit.com/birkenstock.com',
    name: 'Birkenstock',
    ticker: 'BIRK',
    firstTradingDay: 'March 1, 2024',
    sector: 'Consumer Goods',
    exchange: 'NYSE',
  },
];

export function RecentIPOsSection() {
  return (
    <section className="w-full py-16">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-1">
              Recent IPOs
            </h2>
            <p className="text-sm text-muted-foreground">
              Track the latest companies going public
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
          {recentIPOs.map((ipo) => (
            <Link href={`/ipo/${ipo.ticker.toLowerCase()}`} key={ipo.ticker}>
              <Card className="p-4 flex items-center gap-6 hover:bg-accent/50 transition-colors">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white dark:bg-slate-800 border dark:border-slate-700">
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
                  <p className="text-sm text-muted-foreground">{ipo.sector}</p>
                </div>

                <div className="hidden md:block text-sm text-right">
                  <p className="font-medium">{ipo.firstTradingDay}</p>
                  <p className="text-muted-foreground text-xs">
                    First Trading Day
                  </p>
                </div>

                <div className="text-right">
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
    </section>
  );
}
