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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
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
  TrendingUp,
  Briefcase,
  BarChart3,
  FileText,
  Award,
  TrendingDown,
  Info,
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
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
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
        <DialogHeader className="select-none">
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
                <DialogTitle className="text-2xl flex items-center gap-2">
                  {ipo.name}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          About {ipo.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {companyDetails?.description ||
                            'Loading company details...'}
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </DialogTitle>
                <DialogDescription className="mt-1.5">
                  {ipo.sector} company going public on {ipo.date}
                </DialogDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{ipo.exchange}</Badge>
                  <Badge variant="secondary">{ipo.sector}</Badge>
                  <Badge variant={ipo.isPositive ? 'default' : 'destructive'}>
                    {ipo.change}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNotification}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant={watched ? 'default' : 'outline'}
                size="icon"
                onClick={toggleWatchlist}
              >
                <Star
                  className={`h-4 w-4 ${
                    watched ? 'fill-primary-foreground' : ''
                  }`}
                />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Valuation
                  </h3>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{ipo.valuation}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Expected market cap
                  </p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Interest Level
                  </h3>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">{ipo.interest}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Market sentiment
                  </p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Trading Status
                  </h3>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">
                    {ipo.status || 'Upcoming'}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Current phase
                  </p>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="overview">
              <TabsList className="select-none">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      Key Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Expected Date
                        </span>
                        <span className="font-medium">{ipo.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Exchange</span>
                        <span className="font-medium">{ipo.exchange}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Sector</span>
                        <span className="font-medium">{ipo.sector}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Symbol</span>
                        <span className="font-medium">
                          {ipo.symbol || 'TBA'}
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-muted-foreground" />
                      Market Position
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Market Interest
                        </span>
                        <Badge variant="outline">{ipo.interest}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Trend</span>
                        <div className="flex items-center gap-1">
                          {ipo.isPositive ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className="font-medium">{ipo.change}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge>{ipo.status || 'Upcoming'}</Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      Expected Performance
                    </h3>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="hsl(var(--brand))"
                          fillOpacity={1}
                          fill="url(#colorPrice)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="timeline">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      IPO Timeline
                    </h3>
                    <Button variant="outline" size="sm">
                      Add to Calendar
                    </Button>
                  </div>
                  <IPOTimeline stages={timelineStages} />
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        Company Overview
                      </h3>
                      <p className="text-muted-foreground">
                        {companyDetails?.description ||
                          'Company description will be available soon.'}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Key Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Revenue Growth
                            </span>
                            <span className="font-medium">+45%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Market Share
                            </span>
                            <span className="font-medium">12%</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Employee Count
                            </span>
                            <span className="font-medium">1,200+</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Risk Factors</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">Market Competition</Badge>
                            <Badge variant="outline">Regulatory Changes</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">Technology Risk</Badge>
                            <Badge variant="outline">Economic Conditions</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                        Market Analysis
                      </h3>
                      <p className="text-muted-foreground">
                        Comprehensive market analysis and predictions will be
                        available as we get closer to the IPO date.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Market Sentiment</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Investor Interest
                            </span>
                            <Badge variant="outline">High</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Media Coverage
                            </span>
                            <Badge variant="outline">Moderate</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Analyst Ratings
                            </span>
                            <Badge variant="outline">Positive</Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">
                          Comparable Companies
                        </h4>
                        <div className="space-y-2">
                          {['Company A', 'Company B', 'Company C'].map(
                            (company) => (
                              <div
                                key={company}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {company}
                                </span>
                                <Badge variant="outline">Similar</Badge>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {companyDetails?.weburl && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(companyDetails.weburl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Company Website
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
