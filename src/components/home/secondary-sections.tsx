'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BadgeCheck, Calendar } from 'lucide-react';
import dynamic from 'next/dynamic';

const MarketStatistics = dynamic(
  () => import('@/components/home/market-statistics'),
  {
    ssr: true,
  }
);

const EducationalSection = dynamic(
  () => import('@/components/home/educational-section'),
  {
    ssr: true,
  }
);

// This can be a server component now
export function SecondarySections() {
  return (
    <>
      <div className="py-12 bg-muted/30">
        <MarketStatistics />
      </div>
      <div className="bg-muted/50 py-16">
        <EducationalSection />
      </div>
      <WhyChooseUsSection />
    </>
  );
}

// Static content can be rendered on the server
function WhyChooseUsSection() {
  return (
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
                experiences with IPO investments.
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
  );
}
