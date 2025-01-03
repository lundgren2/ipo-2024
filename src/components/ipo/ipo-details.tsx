'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Building,
  Users,
  DollarSign,
  Calendar,
  Info,
  AlertCircle,
  ChevronRight,
  Bookmark,
  Download,
  Mail,
} from 'lucide-react';
import { fetchIPODetails } from '@/services/ipo-service';
import { IPO, CompanyDetails } from '@/types/ipo';
import { useWatchlist } from '@/context/watchlist-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { IPOTimeline, type TimelineStage } from './ipo-timeline';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
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
            <stop offset="5%" stopColor="hsl(var(--brand))" stopOpacity={0.1} />
            <stop offset="95%" stopColor="hsl(var(--brand))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header Section */}
        <DialogHeader className="select-none pb-6 border-b">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {ipo.logo || companyDetails?.logo ? (
                  <Image
                    src={ipo.logo || companyDetails?.logo || ''}
                    alt={ipo.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <Building className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-2xl">{ipo.name}</DialogTitle>
                  <Badge variant="outline" className="text-xs">
                    {ipo.symbol || 'TBA'}
                  </Badge>
                </div>
                <DialogDescription className="mt-1.5 flex items-center gap-2">
                  <span>{ipo.sector}</span>
                  <span>•</span>
                  <span>{ipo.exchange}</span>
                </DialogDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant={ipo.isPositive ? 'default' : 'destructive'}>
                    {ipo.change}
                  </Badge>
                  <Badge variant="secondary">Interest: {ipo.interest}</Badge>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNotification}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Alert
                </Button>
                <Button
                  variant={watched ? 'default' : 'outline'}
                  size="sm"
                  onClick={toggleWatchlist}
                >
                  <Star
                    className={`h-4 w-4 mr-2 ${
                      watched ? 'fill-primary-foreground' : ''
                    }`}
                  />
                  {watched ? 'Watching' : 'Watch'}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                IPO Date: {ipo.date}
              </div>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <LoadingState />
        ) : (
          <div className="mt-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <QuickActionCard
                icon={<Download className="h-4 w-4" />}
                title="Prospectus"
                description="Download IPO documents"
                onClick={() => {}}
              />
              <QuickActionCard
                icon={<Mail className="h-4 w-4" />}
                title="Updates"
                description="Subscribe to IPO updates"
                onClick={() => {}}
              />
              <QuickActionCard
                icon={<Calendar className="h-4 w-4" />}
                title="Calendar"
                description="Add key dates to calendar"
                onClick={() => {}}
              />
              <QuickActionCard
                icon={<Bookmark className="h-4 w-4" />}
                title="Save"
                description="Save for later reference"
                onClick={() => {}}
              />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <MetricCard
                title="Expected Valuation"
                value={ipo.valuation || 'TBA'}
                change={ipo.change}
                icon={<DollarSign className="h-5 w-5" />}
                description="Based on latest estimates"
              />
              <MetricCard
                title="Market Interest"
                value={ipo.interest ? `${ipo.interest}%` : 'TBA'}
                trend={
                  ipo.interest ? (
                    <Progress value={ipo.interest} className="h-2 mt-2" />
                  ) : undefined
                }
                icon={<Users className="h-5 w-5" />}
                description="Investor demand level"
              />
              <MetricCard
                title="IPO Status"
                value={ipo.status || 'Upcoming'}
                badge={
                  <Badge variant="outline" className="mt-2">
                    {getStatusLabel(ipo.status)}
                  </Badge>
                }
                icon={<AlertCircle className="h-5 w-5" />}
                description="Current phase"
              />
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="select-none grid grid-cols-4 gap-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-6">
                  {/* Company Description */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      About {ipo.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {companyDetails?.description ||
                        'Company description will be available soon.'}
                    </p>
                    {companyDetails?.weburl && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                          window.open(companyDetails.weburl, '_blank')
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                  </Card>

                  {/* Key Highlights */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Investment Highlights
                      </h3>
                      <div className="space-y-4">
                        {ipo.highlights?.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 text-sm"
                          >
                            <div className="mt-1">
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Risk Factors
                      </h3>
                      <div className="space-y-2">
                        {getRiskFactors().map((risk, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {risk.name}
                            </span>
                            <RiskBadge level={risk.level} />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Market Performance */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">
                        Expected Performance
                      </h3>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <p className="text-sm text-muted-foreground">
                            Projected performance based on market analysis and
                            comparable companies.
                          </p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockPriceData}>
                          <defs>
                            <linearGradient
                              id="colorPrice"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="hsl(var(--brand))"
                                stopOpacity={0.1}
                              />
                              <stop
                                offset="95%"
                                stopColor="hsl(var(--brand))"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{
                              background: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '6px',
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
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">IPO Timeline</h3>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                  </div>
                  <IPOTimeline stages={timelineStages} />
                </Card>
              </TabsContent>

              <TabsContent value="financials">
                <FinancialsTab ipo={ipo} details={companyDetails} />
              </TabsContent>

              <TabsContent value="insights">
                <InsightsTab ipo={ipo} />
              </TabsContent>
            </Tabs>
          </div>
        )}
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
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-[200px]" />
        <Skeleton className="h-[200px]" />
      </div>
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary">{icon}</div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  badge,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  change?: string;
  trend?: React.ReactNode;
  badge?: React.ReactNode;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-muted-foreground">{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div
            className={cn(
              'text-sm',
              change.startsWith('+')
                ? 'text-green-500'
                : change.startsWith('-')
                ? 'text-red-500'
                : 'text-muted-foreground'
            )}
          >
            {change}
          </div>
        )}
      </div>
      {(trend || badge) && <div className="mt-1">{trend || badge}</div>}
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </Card>
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

function getStatusLabel(status: string | undefined): string {
  switch (status) {
    case 'Next Week':
      return '🚀 Coming Soon';
    case 'Completed':
      return '✓ Listed';
    case 'Filing':
      return '📝 In Progress';
    default:
      return '⏳ Upcoming';
  }
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

function FinancialsTab({
  ipo,
  details,
}: {
  ipo: IPO;
  details: CompanyDetails | null;
}) {
  // Mock financial data
  const financialMetrics = {
    revenueGrowth: '45%',
    marketShare: '12%',
  };

  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Financial Overview - {ipo.name}
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Revenue Growth</h4>
              <p className="text-2xl font-bold">
                {financialMetrics.revenueGrowth}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Market Share</h4>
              <p className="text-2xl font-bold">
                {financialMetrics.marketShare}
              </p>
            </div>
          </div>
          {details && (
            <div className="text-sm text-muted-foreground">
              {details.description}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function InsightsTab({ ipo }: { ipo: IPO }) {
  return (
    <div className="grid gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Market Sentiment</h4>
            <p className="text-2xl font-bold">{ipo.interest}%</p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on investor interest and market analysis
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Trading Status</h4>
            <Badge variant="outline">{ipo.status || 'Upcoming'}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
