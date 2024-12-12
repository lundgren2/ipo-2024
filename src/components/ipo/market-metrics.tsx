'use client';

import { Card } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export type MarketMetric = {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext: string;
};

const marketMetrics: MarketMetric[] = [
  {
    label: 'Total IPOs',
    value: '24',
    trend: '+15%',
    trendDirection: 'up',
    subtext: 'This Quarter',
  },
  {
    label: 'Average Valuation',
    value: '$2.8B',
    trend: '+12%',
    trendDirection: 'up',
    subtext: 'vs Last Quarter',
  },
  {
    label: 'Success Rate',
    value: '92%',
    trend: '+5%',
    trendDirection: 'up',
    subtext: 'Above Target Price',
  },
  {
    label: 'Market Sentiment',
    value: 'Bullish',
    subtext: 'Strong Demand',
  },
  {
    label: 'Avg. First Day Return',
    value: '+32%',
    trendDirection: 'up',
    subtext: 'Last 30 Days',
  },
  {
    label: 'Total Capital Raised',
    value: '$18.5B',
    trend: '+28%',
    trendDirection: 'up',
    subtext: 'This Quarter',
  },
];

interface MarketMetricsProps {
  onMetricSelect?: (metric: string) => void;
  selectedMetric?: string | null;
}

export function MarketMetrics({
  onMetricSelect,
  selectedMetric,
}: MarketMetricsProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {marketMetrics.map((metric, index) => (
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
