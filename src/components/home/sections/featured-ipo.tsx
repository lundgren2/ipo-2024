'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

export function FeaturedIPO() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6 border-primary">
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-2">Featured IPO</Badge>
                  <h3 className="text-2xl font-bold">Reddit (RDDT)</h3>
                  <p className="text-muted-foreground">Expected: Q1 2024</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Set Alert
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated Valuation
                  </p>
                  <p className="text-lg font-semibold">$15B</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Share Price Range
                  </p>
                  <p className="text-lg font-semibold">$31.50 - $34.00</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Shares Offered
                  </p>
                  <p className="text-lg font-semibold">22M</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Expected Raise
                  </p>
                  <p className="text-lg font-semibold">$748M</p>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Market Sentiment</h4>
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                    <div className="h-3 w-3 bg-primary rounded-full relative -top-0.5 ml-[75%]" />
                  </div>
                  <span className="text-sm font-medium">Bullish</span>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card className="p-6">
              <h3 className="font-semibold mb-4">IPOs by Sector</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Technology</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-[75%] h-full bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Healthcare</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-[45%] h-full bg-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Finance</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-primary" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
