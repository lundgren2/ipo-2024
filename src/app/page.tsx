'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockIpos } from '@/lib/mock-data';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  DollarSign,
  LineChart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

      {/* Featured IPOs Section */}
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
              <Card key={ipo.id}>
                <CardHeader>
                  <CardTitle>{ipo.companyName}</CardTitle>
                  <CardDescription>{ipo.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between border-t pt-4">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Expected Date
                      </dt>
                      <dd className="text-sm text-foreground">
                        {ipo.expectedDate}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Price Range
                      </dt>
                      <dd className="text-sm text-foreground">
                        {ipo.priceRange}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-t pt-4">
                      <dt className="text-sm font-medium text-muted-foreground">
                        Exchange
                      </dt>
                      <dd className="text-sm text-foreground">
                        {ipo.exchange}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
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
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Understand market conditions, sector performance, and timing
                  considerations that can affect IPO success.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Investment Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Develop effective strategies for participating in IPOs,
                  including risk assessment and portfolio allocation.
                </p>
              </CardContent>
            </Card>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join a community of investors sharing insights, analysis, and
                  experiences with IPO investments. Learn from others and make
                  informed decisions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Real-time Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay updated with real-time notifications about upcoming IPOs,
                  price changes, and important announcements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
