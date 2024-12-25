'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const caseStudies = [
  {
    id: 'facebook',
    company: 'Facebook (Meta)',
    year: 2012,
    initialPrice: '$38',
    firstDayClose: '$38.23',
    performance: 'Neutral',
    raisedAmount: '$16B',
    keyPoints: [
      'One of the largest tech IPOs in history',
      'Initial technical glitches on NASDAQ',
      'Concerns about mobile monetization',
      'Long-term success despite initial challenges',
    ],
    lessons: [
      'Market size and growth potential matter',
      'Technical infrastructure is crucial',
      'Clear monetization strategy is important',
      'Long-term vision can overcome short-term issues',
    ],
  },
  {
    id: 'airbnb',
    company: 'Airbnb',
    year: 2020,
    initialPrice: '$68',
    firstDayClose: '$144.71',
    performance: 'Strong',
    raisedAmount: '$3.5B',
    keyPoints: [
      'IPO during COVID-19 pandemic',
      'Strong brand recognition',
      'Innovative business model',
      'Significant first-day pop',
    ],
    lessons: [
      'Timing can work even in uncertain markets',
      'Unique value proposition is valuable',
      'Brand strength influences demand',
      'Market conditions affect pricing strategy',
    ],
  },
  {
    id: 'uber',
    company: 'Uber',
    year: 2019,
    initialPrice: '$45',
    firstDayClose: '$41.57',
    performance: 'Weak',
    raisedAmount: '$8.1B',
    keyPoints: [
      'High profile tech IPO',
      'Concerns about profitability',
      'Regulatory challenges',
      'Competition in ride-sharing market',
    ],
    lessons: [
      'Profitability matters to investors',
      'Regulatory environment impacts valuation',
      "Market leadership doesn't guarantee success",
      'Competitive landscape affects pricing',
    ],
  },
];

const performanceIcons = {
  Strong: TrendingUp,
  Weak: TrendingDown,
  Neutral: Minus,
};

const performanceColors = {
  Strong: 'text-green-500',
  Weak: 'text-red-500',
  Neutral: 'text-yellow-500',
};

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(caseStudies[0].id);

  return (
    <div className="space-y-6">
      <Tabs value={selectedCase} onValueChange={setSelectedCase}>
        <TabsList className="grid w-full grid-cols-3">
          {caseStudies.map((study) => (
            <TabsTrigger key={study.id} value={study.id}>
              {study.company}
            </TabsTrigger>
          ))}
        </TabsList>

        {caseStudies.map((study) => (
          <TabsContent key={study.id} value={study.id}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{study.company}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      IPO Year: {study.year}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {study.performance}
                    {(() => {
                      const Icon =
                        performanceIcons[
                          study.performance as keyof typeof performanceIcons
                        ];
                      return (
                        <Icon
                          className={cn(
                            'h-4 w-4',
                            performanceColors[
                              study.performance as keyof typeof performanceColors
                            ]
                          )}
                        />
                      );
                    })()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Initial Price
                      </p>
                      <p className="text-lg font-semibold">
                        {study.initialPrice}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        First Day Close
                      </p>
                      <p className="text-lg font-semibold">
                        {study.firstDayClose}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Amount Raised
                      </p>
                      <p className="text-lg font-semibold">
                        {study.raisedAmount}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Points</h4>
                    <ul className="space-y-2">
                      {study.keyPoints.map((point, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Key Lessons</h4>
                    <ul className="space-y-2">
                      {study.lessons.map((lesson, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
