import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const communityStats = [
  {
    value: '1.2k',
    label: 'Active Traders',
    description: 'Users actively trading IPOs in the last 24 hours',
    trend: '+12% from last week',
  },
  {
    value: '85%',
    label: 'Bullish Sentiment',
    description: 'Percentage of traders with positive market outlook',
    trend: '+5% from last week',
  },
];

export function CommunityActivity() {
  return (
    <TooltipProvider>
      <Card className="p-4 group">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" aria-hidden="true" />
            <h2 className="text-lg font-semibold">Community</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="View all community activity"
          >
            View All
            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div
          className="grid grid-cols-2 gap-2"
          role="list"
          aria-label="Community statistics"
        >
          {communityStats.map((stat, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className="p-2 rounded-lg bg-muted/50 text-center hover:bg-muted/70 transition-colors cursor-help group/stat"
                  role="listitem"
                >
                  <p className="text-lg font-bold leading-none mb-1 group-hover/stat:text-primary transition-colors">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1">
                  <p>{stat.description}</p>
                  <p className="text-xs text-muted-foreground">{stat.trend}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Card>
    </TooltipProvider>
  );
}
