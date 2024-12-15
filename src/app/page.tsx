'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewsCard, FeaturedStory, MarketAnalysis } from '@/components/news';
import {
  featuredStory,
  trendingNews,
  marketAnalysis,
  latestNews,
  marketInsights,
} from '@/lib/mock-news';
import {
  ArrowRight,
  TrendingUp,
  LineChart,
  Calendar,
  Bell,
  ChevronRight,
  BadgeCheck,
  BookOpen,
  Building,
  DollarSign,
  GraduationCap,
  Shield,
  Users,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { useIpoService } from '@/hooks/use-ipo-service';
import { IPOCard } from '@/components/ipo/ipo-card';
import { IPO } from '@/types/ipo';
import { useWatchlist } from '@/context/watchlist-context';

interface UpcomingIPO {
  id: string;
  companyName: string;
  description: string;
  expectedDate: string;
  priceRange: string;
  exchange: string;
  sector: string;
}

const upcomingIpos: UpcomingIPO[] = [
  {
    id: '1',
    companyName: 'TechVision AI',
    description:
      'Leading artificial intelligence and machine learning solutions provider.',
    expectedDate: 'March 15, 2024',
    priceRange: '$18 - $20',
    exchange: 'NASDAQ',
    sector: 'Technology',
  },
  {
    id: '2',
    companyName: 'GreenEnergy Solutions',
    description: 'Renewable energy and sustainable technology company.',
    expectedDate: 'April 1, 2024',
    priceRange: '$22 - $25',
    exchange: 'NYSE',
    sector: 'Energy',
  },
  {
    id: '3',
    companyName: 'HealthTech Innovations',
    description: 'Digital healthcare platform and telemedicine solutions.',
    expectedDate: 'April 15, 2024',
    priceRange: '$30 - $35',
    exchange: 'NASDAQ',
    sector: 'Healthcare',
  },
];

export default function Home() {
  const { data: ipos, isLoading, error } = useIpoService();
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-background">
      {/* Breaking News Banner */}
      <div className="bg-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="default" className="uppercase">
              Breaking
            </Badge>
            <span className="font-medium">
              Reddit IPO debuts with 48% surge in first day of trading
            </span>
            <Link
              href="/news/reddit-ipo"
              className="ml-auto text-primary hover:underline flex items-center gap-1"
            >
              Read More <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* News Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Story */}
            <FeaturedStory {...featuredStory} />

            {/* News Tabs */}
            <Tabs defaultValue="trending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="latest">Latest News</TabsTrigger>
                <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="space-y-4">
                {trendingNews.map((news, index) => (
                  <NewsCard key={index} {...news} />
                ))}
              </TabsContent>

              <TabsContent value="latest" className="space-y-4">
                {latestNews.map((news, index) => (
                  <NewsCard key={index} {...news} />
                ))}
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                {marketAnalysis.map((analysis, index) => (
                  <MarketAnalysis key={index} {...analysis} />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Market Pulse */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Market Pulse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketInsights[0].highlights.map((highlight, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{highlight}</span>
                    <span className="font-medium text-green-600">↑</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming IPOs Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  This Week&apos;s IPOs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingIpos.map((ipo) => (
                    <div key={ipo.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold">
                          {new Date(ipo.expectedDate).getDate()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{ipo.companyName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {ipo.exchange}: {ipo.priceRange}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardContent>
                <Button variant="ghost" className="w-full">
                  View Full Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketInsights[1].highlights.map((trend, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm">{trend}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Informed</CardTitle>
                <CardDescription>
                  Get daily IPO insights delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Enter your email" />
                  <Button className="w-full">Subscribe to Updates</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hero section */}
        <div className="relative bg-background">
          <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block">Track the Latest</span>
                <span className="block text-primary">
                  Initial Public Offerings
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Stay informed about upcoming IPOs, track performance, and make
                informed investment decisions with our comprehensive IPO
                tracking platform.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link href="/ipos">
                    <Button size="lg" className="w-full sm:w-auto">
                      View Latest IPOs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/timeline">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      View Timeline
                      <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IPO Listings Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Latest IPO Listings
            </h2>
            <Link href="/ipos">
              <Button variant="outline">
                View All IPOs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading IPO data...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Error loading IPO data. Please try again later.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ipos?.slice(0, 6).map((ipo: IPO) => (
                <IPOCard
                  key={ipo.id}
                  ipo={ipo}
                  isWatched={isWatched(ipo.id)}
                  onToggleWatch={(watched) =>
                    watched ? addToWatchlist(ipo) : removeFromWatchlist(ipo.id)
                  }
                />
              ))}
            </div>
          )}
        </div>

        {/* Market Statistics Section */}
        <div className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">127</h3>
                  <p className="text-muted-foreground">Active IPOs</p>
                </div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">$84B</h3>
                  <p className="text-muted-foreground">Total Market Cap</p>
                </div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">+24%</h3>
                  <p className="text-muted-foreground">Average Return</p>
                </div>
              </Card>
              <Card className="text-center p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary">89%</h3>
                  <p className="text-muted-foreground">Success Rate</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Featured IPO Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card className="p-6 border-primary">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2">Featured IPO</Badge>
                      <h3 className="text-2xl font-bold">Reddit (RDDT)</h3>
                      <p className="text-muted-foreground">Expected: Q1 2024</p>
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Bell className="h-4 w-4" />
                      Set Alert
                    </Button>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estimated Valuation
                      </p>
                      <p className="text-lg font-semibold">$15B</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Share Price Range
                      </p>
                      <p className="text-lg font-semibold">$31.50 - $34.00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Shares Offered
                      </p>
                      <p className="text-lg font-semibold">22M</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Expected Raise
                      </p>
                      <p className="text-lg font-semibold">$748M</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Market Sentiment</h4>
                    <div className="flex items-center gap-4">
                      <div className="h-2 flex-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full">
                        <div className="h-3 w-3 bg-primary rounded-full relative -top-0.5 ml-[75%]" />
                      </div>
                      <span className="text-sm font-medium">Bullish</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">IPOs by Sector</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Technology</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[75%] h-full bg-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Healthcare</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[45%] h-full bg-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Finance</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[30%] h-full bg-primary" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Upcoming IPOs Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">Upcoming IPOs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Stay up to date with the most anticipated public offerings
              </p>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {upcomingIpos.map((ipo: UpcomingIPO) => (
                <Card
                  key={ipo.id}
                  className="group hover:shadow-lg transition-all"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building className="h-5 w-5 text-primary" />
                          {ipo.companyName}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {ipo.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{ipo.sector}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-between border-t pt-4">
                        <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Expected Date
                        </dt>
                        <dd className="text-sm text-foreground font-medium">
                          {ipo.expectedDate}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Price Range
                        </dt>
                        <dd className="text-sm text-foreground font-medium">
                          {ipo.priceRange}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t pt-4">
                        <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Exchange
                        </dt>
                        <dd className="text-sm text-foreground font-medium">
                          {ipo.exchange}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Section */}
        <div className="bg-muted/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">Learn About IPOs</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Understanding the IPO process and making informed investment
                decisions
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    IPO Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn the fundamentals of Initial Public Offerings,
                    including the process, terminology, and key factors to
                    consider before investing.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/learn#basics" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Understand market conditions, sector performance, and timing
                    considerations that can affect IPO success.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/learn#market-analysis" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Investment Strategy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Develop effective strategies for participating in IPOs,
                    including risk assessment and portfolio allocation.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/learn#strategy" className="w-full">
                    <Button variant="ghost" className="w-full">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Link href="/learn">
                <Button size="lg" variant="outline" className="gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Visit Learning Center
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">
                Why Choose Our Platform
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The most comprehensive IPO tracking and analysis platform
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Join a community of investors sharing insights, analysis,
                    and experiences with IPO investments. Learn from others and
                    make informed decisions.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Expert analysis and recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Discussion forums for each IPO
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Performance tracking and reviews
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Real-time Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Stay updated with real-time notifications about upcoming
                    IPOs, price changes, and important announcements.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Customizable alert system
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      Market news and analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                      IPO calendar integration
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Latest IPO News Section */}
        <div className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold">Latest IPO News</h2>
              <Button variant="outline" className="gap-2">
                View All News <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Building className="h-5 w-5" />
                    <Badge variant="secondary">Breaking News</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    Reddit Files for IPO, Aims to List on NYSE
                  </CardTitle>
                  <CardDescription>2 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Social media platform Reddit has officially filed for an
                    initial public offering, planning to list its shares on the
                    New York Stock Exchange under the ticker &quot;RDDT&quot;.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Building className="h-5 w-5" />
                    <Badge variant="secondary">Market Update</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    Shein Confidentially Files for US IPO
                  </CardTitle>
                  <CardDescription>5 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fast-fashion giant Shein has confidentially filed to go
                    public in the United States, potentially becoming one of the
                    biggest IPOs in recent years.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <Card className="group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary">
                    <Building className="h-5 w-5" />
                    <Badge variant="secondary">Analysis</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">
                    Stripe Evaluates 2024 IPO Plans
                  </CardTitle>
                  <CardDescription>1 day ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Payment processing giant Stripe is reportedly in early
                    discussions with investment banks about a potential IPO in
                    2024.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
