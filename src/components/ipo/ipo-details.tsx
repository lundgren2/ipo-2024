'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Star,
  Bell,
  Share2,
  ExternalLink,
  FileText,
  CalendarPlus,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { fetchIPODetails } from '@/services/ipo-service';
import { IPO, CompanyDetails } from '@/types/ipo';
import { useWatchlist } from '@/context/watchlist-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { type TimelineStage } from './ipo-timeline';
import { cn } from '@/lib/utils';

interface IPODetailsProps {
  ipo: IPO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PriceDataPoint {
  date: string;
  price: number;
}

// Mock data for the price chart
const mockPriceData: PriceDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(
    Date.now() - (30 - i) * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  price: 20 + Math.random() * 10,
}));

// Memoize the chart component to prevent unnecessary re-renders
const PriceChart = memo(({ data }: { data: PriceDataPoint[] }) => (
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--brand))"
              stopOpacity={0.15}
            />
            <stop offset="95%" stopColor="hsl(var(--brand))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--muted-foreground))"
          opacity={0.1}
        />
        <XAxis
          dataKey="date"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dx={-10}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        />
        <Area
          type="monotone"
          dataKey="price"
          stroke="hsl(var(--brand))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPrice)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
));
PriceChart.displayName = 'PriceChart';

export function IPODetails({ ipo, open, onOpenChange }: IPODetailsProps) {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const watched = isWatched(ipo.id);

  const loadDetails = useCallback(async () => {
    if (!open || !ipo.name) return;

    try {
      setLoading(true);
      const symbol = ipo.symbol || ipo.name.match(/\((.*?)\)/)?.[1] || '';
      const details = await fetchIPODetails(symbol);

      if (details) {
        setCompanyDetails(details);
      }
    } catch (error) {
      console.error('Error loading IPO details:', error);
      toast({
        title: 'Error loading details',
        description: 'Could not load company details. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [open, ipo.name, ipo.symbol, toast]);

  useEffect(() => {
    if (open) {
      loadDetails();
    }
  }, [open, loadDetails]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(
      `Check out the upcoming IPO for ${ipo.name} - Expected: ${ipo.date}`
    );
    toast({
      title: 'Link Copied',
      description: 'IPO details link has been copied to clipboard',
    });
  }, [ipo.name, ipo.date, toast]);

  const handleNotification = useCallback(() => {
    toast({
      title: 'Notification Set',
      description: `You'll be notified about important updates for ${ipo.name}`,
    });
  }, [ipo.name, toast]);

  const toggleWatchlist = useCallback(() => {
    if (watched) {
      removeFromWatchlist(ipo.id);
    } else {
      addToWatchlist(ipo);
    }
  }, [watched, ipo, addToWatchlist, removeFromWatchlist]);

  // Add timeline stages based on IPO status and dates
  const timelineStages: TimelineStage[] = [
    {
      id: 'announcement',
      title: 'IPO Announced',
      date: ipo.date,
      status: 'completed',
      description:
        'Company announces intention to go public and files initial paperwork.',
    },
    {
      id: 'bookbuilding',
      title: 'Book Building',
      date: 'April 15, 2024', // This should be dynamic based on your data
      status: 'current',
      description:
        'Investment banks gather interest from institutional investors to determine the IPO price.',
    },
    {
      id: 'pricing',
      title: 'Final Pricing',
      date: 'April 20, 2024', // This should be dynamic based on your data
      status: 'upcoming',
      description:
        'Final IPO price is set based on investor demand and market conditions.',
    },
    {
      id: 'trading',
      title: 'Trading Begins',
      date: 'April 21, 2024', // This should be dynamic based on your data
      status: 'upcoming',
      description: 'Shares begin trading on the public market.',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-0">
        {/* Hero Section */}
        <div className="flex flex-col">
          <div className="relative h-[250px] w-full overflow-hidden">
            <Image
              src={
                'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1964&fit=crop'
              }
              alt={ipo.name}
              fill
              className="object-cover brightness-75"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-background/10 backdrop-blur-lg border border-white/10">
                  <Image
                    src={
                      ipo.logo ||
                      companyDetails?.logo ||
                      '/images/default-company-logo.svg'
                    }
                    alt={`${ipo.name} logo`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-white/10 text-white border-none backdrop-blur-sm"
                  >
                    {ipo.symbol || 'TBA'}
                  </Badge>
                  <h1 className="text-3xl font-semibold text-white">
                    {ipo.name}
                  </h1>
                  <div className="flex items-center gap-3 text-white/80 text-sm mt-1">
                    <span>{ipo.sector}</span>
                    <span className="text-white/40">•</span>
                    <span>{ipo.exchange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 pt-6">
          {/* Quick Stats Bar */}
          <div className="flex items-center justify-between p-4 mb-8 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-8 flex-1">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Expected Date
                </div>
                <div className="font-medium">{ipo.date}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Valuation
                </div>
                <div className="font-medium">{ipo.valuation || 'TBA'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Interest Level
                </div>
                <div className="font-medium">{ipo.interest}% Interest</div>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="group hover:border-brand/30"
              >
                <Share2 className="h-4 w-4 mr-2 group-hover:text-brand transition-colors" />
                Share
              </Button>
              <Button
                variant={watched ? 'default' : 'outline'}
                size="sm"
                onClick={toggleWatchlist}
                className={cn('group', !watched && 'hover:border-brand/30')}
              >
                <Star
                  className={cn(
                    'h-4 w-4 mr-2 transition-colors',
                    watched
                      ? 'fill-primary-foreground'
                      : 'group-hover:text-brand group-hover:fill-brand/20'
                  )}
                />
                {watched ? 'Watching' : 'Watch'}
              </Button>
            </div>
          </div>

          {loading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="col-span-2 space-y-8">
                {/* About Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About {ipo.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {companyDetails?.description ||
                      'Company description will be available soon.'}
                  </p>
                </div>

                {/* Highlights and Risks */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Investment Highlights
                    </h3>
                    <div className="space-y-3">
                      {ipo.highlights?.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-1.5 rounded-full bg-brand/10">
                            <ChevronRight className="h-4 w-4 text-brand" />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Risk Assessment
                    </h3>
                    <div className="space-y-3">
                      {getRiskFactors().map((risk, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground">
                            {risk.name}
                          </span>
                          <RiskBadge level={risk.level} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Market Performance */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Market Performance
                  </h3>
                  <Card className="overflow-hidden border-border/50">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">
                            Current Price
                          </div>
                          <div className="text-2xl font-semibold">$24.50</div>
                        </div>
                        <Badge
                          variant={ipo.isPositive ? 'default' : 'destructive'}
                          className="h-6"
                        >
                          {ipo.change}
                        </Badge>
                      </div>
                      <div className="h-[200px] -mx-2">
                        <PriceChart data={mockPriceData} />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 mt-8 border-t border-border/50">
                  <div className="flex flex-wrap gap-3">
                    {companyDetails?.weburl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(companyDetails.weburl, '_blank')
                        }
                        className="h-9 text-sm bg-background hover:bg-muted hover:border-brand/30"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('#', '_blank')}
                      className="h-9 text-sm bg-background hover:bg-muted hover:border-brand/30"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Download Prospectus
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('#', '_blank')}
                      className="h-9 text-sm bg-background hover:bg-muted hover:border-brand/30"
                    >
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Price Card */}
                <Card className="p-6 sticky top-6 border-border/50 bg-card/50 backdrop-blur">
                  <div className="flex items-baseline justify-between mb-6">
                    <div>
                      <div className="text-2xl font-semibold">
                        {ipo.valuation || 'TBA'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expected Valuation
                      </div>
                    </div>
                    <Badge variant={ipo.isPositive ? 'default' : 'destructive'}>
                      {ipo.change}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Market Interest
                      </span>
                      <span className="font-medium">{ipo.interest}%</span>
                    </div>
                    <Progress
                      value={ipo.interest}
                      className="h-1.5 bg-primary/10"
                    />

                    <Button
                      className="w-full"
                      onClick={() => window.open('#', '_blank')}
                    >
                      Register Interest
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleNotification}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Get Notified
                    </Button>
                  </div>
                </Card>

                {/* Timeline Card */}
                <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur">
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-6">IPO Timeline</h3>
                    <div className="relative">
                      {/* Continuous background line */}
                      <div className="absolute left-4 top-4 w-0.5 h-[calc(100%-2rem)] bg-border/30" />

                      {timelineStages.map((stage, index) => (
                        <div key={stage.id} className="mb-8 last:mb-0">
                          <div className="flex items-start gap-4">
                            <div className="relative">
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-full flex items-center justify-center relative z-10',
                                  stage.status === 'completed'
                                    ? 'bg-brand/10 text-brand'
                                    : stage.status === 'current'
                                    ? 'bg-brand/10 border-2 border-brand text-brand'
                                    : 'bg-muted/50 border-2 border-border text-muted-foreground'
                                )}
                              >
                                {stage.status === 'completed' ? (
                                  <CheckCircle2 className="h-5 w-5 fill-brand text-background" />
                                ) : (
                                  <span className="text-sm font-medium">
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              {index < timelineStages.length - 1 && (
                                <div
                                  className={cn(
                                    'absolute top-4 left-1/2 w-0.5 -translate-x-1/2 h-[calc(100%+2rem)]',
                                    stage.status === 'completed'
                                      ? 'bg-gradient-to-b from-brand to-brand'
                                      : stage.status === 'current'
                                      ? 'bg-gradient-to-b from-brand via-brand/40 to-border/30'
                                      : 'bg-border/30'
                                  )}
                                />
                              )}
                            </div>
                            <div className="flex-1 pt-1 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <h4
                                  className={cn(
                                    'font-medium',
                                    stage.status === 'completed'
                                      ? 'text-brand'
                                      : stage.status === 'current'
                                      ? 'text-foreground'
                                      : 'text-muted-foreground'
                                  )}
                                >
                                  {stage.title}
                                </h4>
                                <time
                                  className={cn(
                                    'text-xs',
                                    stage.status === 'completed'
                                      ? 'text-brand'
                                      : 'text-muted-foreground'
                                  )}
                                >
                                  {stage.date}
                                </time>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {stage.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
        <Skeleton className="h-[100px]" />
      </div>
      <Skeleton className="h-[200px]" />
    </div>
  );
}

function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const variants = {
    low: 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    medium:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  };

  return (
    <span
      className={cn(
        'px-2 py-0.5 rounded-full text-xs font-medium',
        variants[level]
      )}
    >
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

function getRiskFactors() {
  return [
    { name: 'Market Competition', level: 'medium' as const },
    { name: 'Regulatory Environment', level: 'high' as const },
    { name: 'Financial Stability', level: 'low' as const },
    { name: 'Technology Risk', level: 'medium' as const },
    { name: 'Economic Conditions', level: 'high' as const },
  ];
}
