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
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const upcomingIpos = mockIpos
    .filter((ipo) => ipo.status === 'Upcoming')
    .slice(0, 3);

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
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Reddit Files for IPO, Aims to List on NYSE
                </CardTitle>
                <CardDescription>2 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Social media platform Reddit has officially filed for an
                  initial public offering, planning to list its shares on the
                  New York Stock Exchange under the ticker 'RDDT'.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-2">
                  Read More <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  Shein Confidentially Files for US IPO
                </CardTitle>
                <CardDescription>5 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fast-fashion giant Shein has confidentially filed to go public
                  in the United States, potentially becoming one of the biggest
                  IPOs in recent years.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="gap-2">
                  Read More <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
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
