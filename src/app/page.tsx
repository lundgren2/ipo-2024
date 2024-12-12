'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { mockIpos } from '@/lib/mock-data';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  DollarSign,
  LineChart,
  Users,
  Building,
  TrendingUp,
  Shield,
  BadgeCheck,
  ChevronRight,
  GraduationCap,
  Bell,
  Percent,
  TrendingDown,
  Award,
  Download,
  Share,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function Home() {
  const upcomingIpos = mockIpos
    .filter((ipo) => ipo.status === 'Upcoming')
    .slice(0, 3);

  // Add a constant map for IPO counts
  const ipoCountsByDate = {
    5: 2,
    12: 1,
    15: 3,
    22: 2,
  } as const;

  return (
    <div className="relative">
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
              informed investment decisions with our comprehensive IPO tracking
              platform.
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

      {/* Newsletter & Quick Actions Section */}
      <div className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-lg border shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest IPO news and alerts directly in your inbox.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="max-w-md" />
                <Button>Subscribe</Button>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
              <div className="flex gap-4 flex-wrap">
                <Button variant="outline" className="gap-2">
                  <Bell className="h-4 w-4" />
                  Set IPO Alerts
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share className="h-4 w-4" />
                  Share Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* IPO Comparison Tool */}
      <div className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Compare IPOs</h2>
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select First IPO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reddit">Reddit (RDDT)</SelectItem>
                    <SelectItem value="shein">Shein</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valuation</span>
                      <span className="font-medium">$15B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Share Price</span>
                      <span className="font-medium">$31.50 - $34.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">$748M</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Second IPO" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reddit">Reddit (RDDT)</SelectItem>
                    <SelectItem value="shein">Shein</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                  </SelectContent>
                </Select>
                <Card className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valuation</span>
                      <span className="font-medium">$60B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Share Price</span>
                      <span className="font-medium">$45.00 - $50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">$2.1B</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button className="gap-2">
                Compare Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
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
            <Card className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0">
                <Image
                  src="/images/reddit-ipo.jpg"
                  alt="Reddit IPO"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl text-white">
                  Reddit Files for IPO, Aims to List on NYSE
                </CardTitle>
                <CardDescription className="text-gray-200">
                  2 hours ago
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-100">
                  Social media platform Reddit has officially filed for an
                  initial public offering, planning to list its shares on the
                  New York Stock Exchange under the ticker &quot;RDDT&quot;.
                </p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button
                  variant="secondary"
                  className="gap-2 bg-white/10 hover:bg-white/20 text-white"
                >
                  Read More <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0">
                <Image
                  src="/images/shein-ipo.jpg"
                  alt="Shein IPO"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl text-white">
                  Shein Confidentially Files for US IPO
                </CardTitle>
                <CardDescription className="text-gray-200">
                  5 hours ago
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-100">
                  Fast-fashion giant Shein has confidentially filed to go public
                  in the United States, potentially becoming one of the biggest
                  IPOs in recent years.
                </p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button
                  variant="secondary"
                  className="gap-2 bg-white/10 hover:bg-white/20 text-white"
                >
                  Read More <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="group relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0">
                <Image
                  src="/images/stripe-ipo.jpg"
                  alt="Stripe IPO"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-xl text-white">
                  Stripe Evaluates 2024 IPO Plans
                </CardTitle>
                <CardDescription className="text-gray-200">
                  1 day ago
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-100">
                  Payment processing giant Stripe is reportedly in early
                  discussions with investment banks about a potential IPO in
                  2024.
                </p>
              </CardContent>
              <CardFooter className="relative z-10">
                <Button
                  variant="secondary"
                  className="gap-2 bg-white/10 hover:bg-white/20 text-white"
                >
                  Read More <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
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
            {upcomingIpos.map((ipo) => (
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
                  Learn the fundamentals of Initial Public Offerings, including
                  the process, terminology, and key factors to consider before
                  investing.
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
            <h2 className="text-3xl font-extrabold">Why Choose Our Platform</h2>
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
                  Join a community of investors sharing insights, analysis, and
                  experiences with IPO investments. Learn from others and make
                  informed decisions.
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
                  Stay updated with real-time notifications about upcoming IPOs,
                  price changes, and important announcements.
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
    </div>
  );
}
