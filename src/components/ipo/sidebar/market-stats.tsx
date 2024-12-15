import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const marketStats = [
  {
    label: 'Average Return',
    value: '+24.5%',
    trend: '+2.3%',
    isPositive: true,
    description: 'Average return of IPOs in the last 30 days',
  },
  {
    label: 'Success Rate',
    value: '92%',
    trend: '+5%',
    isPositive: true,
    description: 'Percentage of IPOs trading above offer price',
  },
  {
    label: 'Investor Interest',
    value: 'High',
    trend: '↑',
    isPositive: true,
    description: 'Current level of investor participation in IPOs',
  },
];

export function MarketStats() {
  return (
    <TooltipProvider>
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Market Stats</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 h-8"
            aria-label="View detailed market statistics"
          >
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            Details
          </Button>
        </div>
        <div
          className="grid grid-cols-3 gap-2"
          role="list"
          aria-label="Market statistics"
        >
          {marketStats.map((stat, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="p-2 rounded-lg bg-muted/50 text-center space-y-0.5 hover:bg-muted/70 transition-colors cursor-help"
                  role="listitem"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-semibold">{stat.value}</p>
                  <p
                    className={`text-xs ${
                      stat.isPositive ? 'text-green-500' : 'text-red-500'
                    }`}
                    aria-label={`Trend: ${stat.trend}`}
                  >
                    {stat.trend}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stat.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Card>
    </TooltipProvider>
  );
}
