'use client';

import { useState } from 'react';
import {
  Star,
  Info,
  AlertCircle,
  Download,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import type { IPO } from './ipo-list';

interface IPOCardProps {
  ipo: IPO;
}

export function IPOCard({ ipo }: IPOCardProps) {
  const [isWatched, setIsWatched] = useState(false);
  const [recentAction, setRecentAction] = useState<'download' | 'share' | null>(
    null
  );
  const { toast } = useToast();

  const getInterestColor = (interest: string) => {
    switch (interest.toLowerCase()) {
      case 'high':
        return 'text-yellow-500';
      case 'very high':
        return 'text-orange-500';
      case 'extreme':
        return 'text-red-500';
      default:
        return 'text-green-500';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-500' : 'text-red-500';
  };

  const handleWatchlistToggle = () => {
    setIsWatched(!isWatched);
    toast({
      title: isWatched ? 'Removed from Watchlist' : 'Added to Watchlist ⭐',
      description: isWatched
        ? 'IPO has been removed from your tracking list.'
        : "We'll keep you updated on this IPO's progress and market movements.",
    });
  };

  const handleSetAlert = () => {
    toast({
      title: '🔔 Alert Set Successfully',
      description: `You'll receive timely notifications about important updates and milestones for ${ipo.name}.`,
    });
  };

  const handleDownload = () => {
    setRecentAction('download');
    toast({
      title: 'Generating Report 📊',
      description: `Preparing comprehensive market analysis and IPO report for ${ipo.name}.`,
    });
    setTimeout(() => setRecentAction(null), 1000);
  };

  const handleShare = () => {
    setRecentAction('share');
    navigator.clipboard.writeText(
      `View detailed analysis for ${ipo.name} IPO.`
    );
    toast({
      title: 'Link Generated 🔗',
      description:
        'Analysis link copied to clipboard. Share with your team or network.',
    });
    setTimeout(() => setRecentAction(null), 1000);
  };

  return (
    <Card className="p-4 transition-all">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant={ipo.status === 'Next Week' ? 'default' : 'secondary'}
            >
              {ipo.status}
            </Badge>
            <Badge variant="outline">{ipo.exchange}</Badge>
            <Badge variant="outline">{ipo.sector}</Badge>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(
                ipo.trend
              )}`}
            >
              <TrendingUp className="h-3 w-3" />
              {ipo.trend}
            </span>
          </div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {ipo.name}
            <span
              className={`text-sm font-normal ${getInterestColor(
                ipo.interest
              )}`}
            >
              {ipo.interest} Interest
            </span>
          </h3>
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>Expected: {ipo.date}</span>
            <span>Valuation: {ipo.valuation}</span>
          </div>
          {recentAction === 'download' && (
            <div className="mt-3 flex gap-2 animate-in fade-in-50 duration-300">
              <Download className="h-4 w-4 animate-ping-once" />
              <span>Downloading Report</span>
            </div>
          )}
          {recentAction === 'share' && (
            <div className="mt-3 flex gap-2 animate-in fade-in-50 duration-300">
              <Share2 className="h-4 w-4 animate-ping-once" />
              <span>Link Copied!</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleWatchlistToggle}
              >
                <Star
                  className={`h-4 w-4 ${
                    isWatched
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground'
                  }`}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
            </TooltipContent>
          </Tooltip>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <Info className="h-4 w-4" />
                Details
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>{ipo.name}</SheetTitle>
                <SheetDescription>
                  Detailed IPO information and analysis
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Expected Date
                      </h4>
                      <p className="text-lg">{ipo.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Valuation
                      </h4>
                      <p className="text-lg">{ipo.valuation}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      Quick Actions
                    </h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={handleSetAlert}
                      >
                        <AlertCircle className="h-4 w-4" />
                        Set Alert
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${
                          recentAction === 'download' ? 'animate-ping-once' : ''
                        }`}
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-2 ${
                          recentAction === 'share' ? 'animate-ping-once' : ''
                        }`}
                        onClick={handleShare}
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
}
