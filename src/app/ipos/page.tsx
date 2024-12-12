'use client';

import {
  Search,
  CalendarDays,
  Star,
  Info,
  Share2,
  Download,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data with enhanced details
const mockIpos = [
  {
    id: 1,
    name: 'Reddit (RDDT)',
    date: 'Mar 21, 2024',
    status: 'Next Week',
    valuation: '$15B',
    sector: 'Technology',
    exchange: 'NYSE',
    trend: '+12%',
    interest: 'High',
    highlights: ['Social Media Giant', '500M+ Monthly Users', 'AI Integration'],
  },
  {
    id: 2,
    name: 'Shein',
    date: 'Apr 5, 2024',
    status: 'Coming Soon',
    valuation: '$60B',
    sector: 'Retail',
    exchange: 'NYSE',
    trend: '+8%',
    interest: 'Very High',
    highlights: [
      'Fast Fashion Leader',
      'Global Presence',
      'Supply Chain Innovation',
    ],
  },
  {
    id: 3,
    name: 'Stripe',
    date: 'Q2 2024',
    status: 'Coming Soon',
    valuation: '$95B',
    sector: 'Finance',
    exchange: 'NASDAQ',
    trend: '+15%',
    interest: 'Extreme',
    highlights: [
      'Payment Processing Leader',
      'Tech Infrastructure',
      'Global Scale',
    ],
  },
];

// Achievement definitions with more professional titles
const ACHIEVEMENTS = {
  FIRST_WATCH: {
    id: 'first_watch',
    title: 'Portfolio Initialized',
    description: 'Started tracking your first IPO',
    icon: TrendingUp,
  },
  THIRD_WATCH: {
    id: 'third_watch',
    title: 'Portfolio Expanded',
    description: 'Tracking multiple IPO opportunities',
    icon: TrendingUp,
  },
  FIFTH_WATCH: {
    id: 'fifth_watch',
    title: 'Portfolio Diversified',
    description: 'Comprehensive IPO tracking established',
    icon: TrendingUp,
  },
} as const;

// Add types for market metrics
type MarketMetric = {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
  subtext: string;
};

// Add market metrics data
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

// Add calendar types
type CalendarEvent = {
  date: number;
  ipos: Array<{
    name: string;
    type: 'pricing' | 'trading' | 'filing';
  }>;
};

// Add calendar events data
const calendarEvents: Record<number, CalendarEvent> = {
  5: {
    date: 5,
    ipos: [
      { name: 'TechCorp', type: 'pricing' },
      { name: 'BioMed', type: 'trading' },
    ],
  },
  12: {
    date: 12,
    ipos: [{ name: 'GreenEnergy', type: 'filing' }],
  },
  15: {
    date: 15,
    ipos: [
      { name: 'Reddit', type: 'pricing' },
      { name: 'CloudTech', type: 'trading' },
      { name: 'FinStart', type: 'filing' },
    ],
  },
  22: {
    date: 22,
    ipos: [
      { name: 'DataAI', type: 'pricing' },
      { name: 'SpaceTech', type: 'filing' },
    ],
  },
};

export default function IPOListingsPage() {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Achievement handler
  const [achievements, setAchievements] = useState<string[]>([]);

  // Recent action handler
  const [recentAction, setRecentAction] = useState<string | null>(null);

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedSector, selectedExchange, sortBy]);

  // Animation helpers
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

  // Enhanced handlers
  const checkAchievements = (watchlistCount: number) => {
    const newAchievements: string[] = [];

    if (
      watchlistCount === 1 &&
      !achievements.includes(ACHIEVEMENTS.FIRST_WATCH.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.FIRST_WATCH.id);
    }
    if (
      watchlistCount === 3 &&
      !achievements.includes(ACHIEVEMENTS.THIRD_WATCH.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.THIRD_WATCH.id);
    }
    if (
      watchlistCount === 5 &&
      !achievements.includes(ACHIEVEMENTS.FIFTH_WATCH.id)
    ) {
      newAchievements.push(ACHIEVEMENTS.FIFTH_WATCH.id);
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);
      newAchievements.forEach((achievementId) => {
        const achievement = Object.values(ACHIEVEMENTS).find(
          (a) => a.id === achievementId
        );
        if (achievement) {
          toast({
            title: `${achievement.title} 📈`,
            description: `${achievement.description}. Keep tracking IPOs to unlock more insights!`,
          });
        }
      });
    }
  };

  const toggleWatchlist = (ipoId: number) => {
    const isAdding = !watchlist.includes(ipoId);
    const newWatchlist = isAdding
      ? [...watchlist, ipoId]
      : watchlist.filter((id) => id !== ipoId);

    setWatchlist(newWatchlist);

    if (isAdding) {
      checkAchievements(newWatchlist.length);
    }

    toast({
      title: isAdding ? 'Added to Watchlist ⭐' : 'Removed from Watchlist',
      description: isAdding
        ? "We'll keep you updated on this IPO's progress and market movements."
        : 'IPO has been removed from your tracking list.',
    });
  };

  const setAlert = (ipo: (typeof mockIpos)[0]) => {
    toast({
      title: '🔔 Alert Set Successfully',
      description: `You'll receive timely notifications about important updates and milestones for ${ipo.name}.`,
    });
  };

  // Enhanced visual feedback
  const triggerButtonEffect = (buttonRef: HTMLButtonElement | null) => {
    if (buttonRef) {
      buttonRef.classList.add('animate-ping-once');
      setTimeout(() => buttonRef.classList.remove('animate-ping-once'), 300);
    }
  };

  const downloadReport = (
    ipo: (typeof mockIpos)[0],
    buttonRef: HTMLButtonElement | null
  ) => {
    triggerButtonEffect(buttonRef);
    setRecentAction('download');
    toast({
      title: 'Generating Report 📊',
      description: `Preparing comprehensive market analysis and IPO report for ${ipo.name}.`,
    });
    setTimeout(() => setRecentAction(null), 1000);
  };

  const shareIPO = (
    ipo: (typeof mockIpos)[0],
    buttonRef: HTMLButtonElement | null
  ) => {
    triggerButtonEffect(buttonRef);
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

  // Filter and sort IPOs
  const filteredIpos = mockIpos
    .filter((ipo) => {
      const matchesSearch = ipo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSector =
        selectedSector === 'all' || ipo.sector === selectedSector;
      const matchesExchange =
        selectedExchange === 'all' || ipo.exchange === selectedExchange;
      return matchesSearch && matchesSector && matchesExchange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'valuation':
          return (
            parseInt(b.valuation.replace(/[^0-9]/g, '')) -
            parseInt(a.valuation.replace(/[^0-9]/g, ''))
          );
        case 'date':
        default:
          return new Date(a.date) > new Date(b.date) ? 1 : -1;
      }
    });

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">IPO Listings</h1>
            <p className="text-lg text-muted-foreground">
              Track upcoming and recent Initial Public Offerings, set alerts,
              and analyze market trends.
            </p>
          </div>

          {/* Enhanced Market Overview Section */}
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
                  onClick={() => setSelectedMetric(metric.label)}
                >
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <p className="text-2xl font-bold text-primary">
                      {metric.value}
                    </p>
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

          {/* Enhanced Filters Section */}
          <Card className="p-6 mb-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search IPOs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedExchange}
                onValueChange={setSelectedExchange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Exchange" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Exchanges</SelectItem>
                  <SelectItem value="NYSE">NYSE</SelectItem>
                  <SelectItem value="NASDAQ">NASDAQ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="name">Company Name</SelectItem>
                  <SelectItem value="valuation">Valuation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Enhanced IPO List */}
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="p-4">
                        <Skeleton className="h-24 w-full" />
                      </Card>
                    ))
                  : filteredIpos.map((ipo) => (
                      <Card key={ipo.id} className="p-4 transition-all">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge
                                variant={
                                  ipo.status === 'Next Week'
                                    ? 'default'
                                    : 'secondary'
                                }
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
                                  onClick={() => toggleWatchlist(ipo.id)}
                                >
                                  <Star
                                    className={`h-4 w-4 ${
                                      watchlist.includes(ipo.id)
                                        ? 'fill-primary text-primary'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                {watchlist.includes(ipo.id)
                                  ? 'Remove from watchlist'
                                  : 'Add to watchlist'}
                              </TooltipContent>
                            </Tooltip>

                            <Sheet>
                              <SheetTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                >
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
                                  {/* IPO Details */}
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
                                        <p className="text-lg">
                                          {ipo.valuation}
                                        </p>
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
                                          onClick={() => setAlert(ipo)}
                                        >
                                          <AlertCircle className="h-4 w-4" />
                                          Set Alert
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className={`gap-2 ${
                                            recentAction === 'download'
                                              ? 'animate-ping-once'
                                              : ''
                                          }`}
                                          onClick={(e) =>
                                            downloadReport(ipo, e.currentTarget)
                                          }
                                        >
                                          <Download className="h-4 w-4" />
                                          Download Report
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className={`gap-2 ${
                                            recentAction === 'share'
                                              ? 'animate-ping-once'
                                              : ''
                                          }`}
                                          onClick={(e) =>
                                            shareIPO(ipo, e.currentTarget)
                                          }
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
                    ))}
              </div>

              {/* Enhanced Calendar Section */}
              <div className="mt-8">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-semibold">IPO Calendar</h2>
                    </div>
                    <div className="flex gap-2">
                      <Select value="march" onValueChange={() => {}}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="March 2024" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="march">March 2024</SelectItem>
                          <SelectItem value="april">April 2024</SelectItem>
                          <SelectItem value="may">May 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-sm font-medium text-muted-foreground"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const event = calendarEvents[day];

                      return (
                        <Tooltip key={day}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              className={`aspect-square relative hover:bg-primary/10 ${
                                selectedDate === day
                                  ? 'ring-2 ring-primary'
                                  : ''
                              }`}
                              onClick={() => setSelectedDate(day)}
                            >
                              {day}
                              {event && (
                                <div className="absolute -top-2 -right-2 flex gap-0.5">
                                  {event.ipos.map((ipo, index) => (
                                    <div
                                      key={index}
                                      className={`h-2 w-2 rounded-full ${
                                        ipo.type === 'pricing'
                                          ? 'bg-green-500'
                                          : ipo.type === 'trading'
                                          ? 'bg-blue-500'
                                          : 'bg-orange-500'
                                      }`}
                                    />
                                  ))}
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          {event && (
                            <TooltipContent>
                              <div className="space-y-2">
                                {event.ipos.map((ipo, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        ipo.type === 'pricing'
                                          ? 'bg-green-500'
                                          : ipo.type === 'trading'
                                          ? 'bg-blue-500'
                                          : 'bg-orange-500'
                                      }`}
                                    />
                                    <span>
                                      {ipo.name} -{' '}
                                      {ipo.type.charAt(0).toUpperCase() +
                                        ipo.type.slice(1)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>
                  {selectedDate && calendarEvents[selectedDate] && (
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <h3 className="font-medium mb-2">
                        Events for March {selectedDate}
                      </h3>
                      <div className="space-y-2">
                        {calendarEvents[selectedDate].ipos.map((ipo, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  ipo.type === 'pricing'
                                    ? 'bg-green-500'
                                    : ipo.type === 'trading'
                                    ? 'bg-blue-500'
                                    : 'bg-orange-500'
                                }`}
                              />
                              <span>{ipo.name}</span>
                            </div>
                            <Badge variant="secondary">{ipo.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div>
              <Card className="p-6 sticky top-4">
                <h2 className="text-2xl font-semibold mb-6">Market Insights</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Sector Distribution
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Technology</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-full w-[45%] bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      {mockIpos.slice(0, 3).map((ipo) => (
                        <div key={ipo.id} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm">
                            {ipo.name} filed for IPO
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">
                      Your Watchlist
                    </h3>
                    <div className="space-y-2">
                      {watchlist.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No IPOs in your watchlist
                        </p>
                      ) : (
                        watchlist.map((id) => {
                          const ipo = mockIpos.find((i) => i.id === id);
                          if (!ipo) return null;
                          return (
                            <div
                              key={id}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm">{ipo.name}</span>
                              <Badge variant="outline">{ipo.status}</Badge>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
