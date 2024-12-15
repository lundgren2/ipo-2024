'use client';

import { useState } from 'react';
import { MarketMetrics } from '@/components/ipo/market-metrics';
import { IPOCalendar } from '@/components/ipo/calendar';
import { IPOList } from '@/components/ipo/ipo-list';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WatchlistProvider } from '@/context/watchlist-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IPO } from '@/types/ipo';
import { Sidebar } from '@/components/ipo/sidebar';

export default function IPOListings() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [activeView, setActiveView] = useState('list');

  // This function will be passed to IPOList to update the shared IPO data
  const handleIPOsLoaded = (loadedIpos: IPO[]) => {
    setIpos(loadedIpos);
  };

  return (
    <WatchlistProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col gap-8">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">IPO Listings</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track upcoming Initial Public Offerings, analyze market
                  trends, and manage your watchlist.
                </p>
              </div>

              {/* Market Overview Section */}
              <MarketMetrics
                selectedMetric={selectedMetric}
                onMetricSelect={setSelectedMetric}
                className="animate-in fade-in-50"
              />

              {/* Main Content */}
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Left Column - IPO List */}
                <div className="lg:col-span-3 space-y-6">
                  <Tabs
                    value={activeView}
                    onValueChange={setActiveView}
                    className="w-full"
                  >
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="mt-6">
                      <IPOList onIPOsLoaded={handleIPOsLoaded} />
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-6">
                      <IPOCalendar
                        selectedDate={selectedDate}
                        onDateSelect={setSelectedDate}
                        ipos={ipos}
                      />
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-2">
                  <div className="lg:sticky lg:top-8">
                    <Sidebar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </WatchlistProvider>
  );
}
