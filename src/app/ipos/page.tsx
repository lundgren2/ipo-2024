'use client';

import { useState } from 'react';
import { MarketMetrics } from '@/components/ipo/market-metrics';
import { IPOCalendar } from '@/components/ipo/calendar';
import { IPOList } from '@/components/ipo/ipo-list';
import { Watchlist } from '@/components/ipo/watchlist';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function IPOListings() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">IPO Listings</h1>

          <div className="space-y-8">
            <MarketMetrics
              selectedMetric={selectedMetric}
              onMetricSelect={setSelectedMetric}
            />

            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <IPOList />
              </div>
              <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-8">
                <IPOCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
                <Watchlist />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
