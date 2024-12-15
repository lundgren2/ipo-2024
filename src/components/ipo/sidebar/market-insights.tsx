import { Card } from '@/components/ui/card';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const marketInsights = [
  {
    text: 'Tech IPOs showing strong momentum in Q1',
    link: '#tech-ipos',
  },
  {
    text: 'Retail sector IPOs outperforming expectations',
    link: '#retail-ipos',
  },
  {
    text: 'Healthcare IPOs gaining investor interest',
    link: '#healthcare-ipos',
  },
];

export function MarketInsights() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Market Insights</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="View all market insights"
        >
          View All
          <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </div>
      <div className="space-y-2" role="list">
        {marketInsights.map((insight, index) => (
          <a
            key={index}
            href={insight.link}
            className="flex items-start gap-2 py-1 px-2 rounded-lg hover:bg-muted/50 transition-colors group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            role="listitem"
          >
            <div
              className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 group-hover:scale-110 transition-transform absolute left-2"
              aria-hidden="true"
            />
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors pl-4">
              {insight.text}
            </p>
            <ArrowRight
              className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 ml-auto shrink-0"
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </Card>
  );
}
