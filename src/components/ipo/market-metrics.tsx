'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { fetchIPOPerformance } from '@/services/ipo-service';
import { Skeleton } from '@/components/ui/skeleton';

export type MarketMetric = {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext: string;
};

interface MarketMetricsProps {
  onMetricSelect?: (metric: string) => void;
  selectedMetric?: string | null;
  className?: string;
}

export function MarketMetrics({
  onMetricSelect,
  selectedMetric,
}: MarketMetricsProps) {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<MarketMetric[]>([]);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const performance = await fetchIPOPerformance();
        setMetrics([
          {
            label: 'Average Return',
            value: performance.averageReturn,
            trend: '+12%',
            trendDirection: 'up',
            subtext: 'vs Last Quarter',
          },
          {
            label: 'Success Rate',
            value: performance.successRate,
            trend: '+5%',
            trendDirection: 'up',
            subtext: 'Above Target Price',
          },
          {
            label: 'Market Sentiment',
            value: performance.marketSentiment,
            subtext: 'Strong Demand',
          },
          {
            label: 'Total Volume',
            value: performance.totalVolume,
            trend: '+28%',
            trendDirection: 'up',
            subtext: 'This Quarter',
          },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error loading market metrics:', error);
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="text-center p-4">
              <Skeleton className="h-4 w-24 mx-auto mb-2" />
              <Skeleton className="h-8 w-32 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-lg transition-colors ${
              selectedMetric === metric.label
                ? 'bg-primary/5 ring-1 ring-primary/20'
                : 'hover:bg-muted/50 cursor-pointer'
            }`}
            onClick={() => onMetricSelect?.(metric.label)}
          >
            <h3 className="text-sm font-medium text-muted-foreground">
              {metric.label}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
              {metric.trend && (
                <span
                  className={`text-sm font-medium ${
                    metric.trendDirection === 'up'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {metric.trend}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
