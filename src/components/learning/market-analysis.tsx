'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Building2,
  TrendingUp,
  Users2,
  DollarSign,
  LineChart,
  PieChart,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const analysisFramework = [
  {
    id: 'market',
    icon: BarChart3,
    title: 'Market Analysis',
    description: 'Overall market conditions and trends',
    metrics: [
      'Market Volatility Index (VIX)',
      'Sector Performance',
      'Interest Rates',
      'Economic Indicators',
    ],
  },
  {
    id: 'company',
    icon: Building2,
    title: 'Company Analysis',
    description: 'Company fundamentals and performance',
    metrics: [
      'Revenue Growth',
      'Profit Margins',
      'Market Share',
      'Competitive Position',
    ],
  },
  {
    id: 'valuation',
    icon: TrendingUp,
    title: 'Valuation Metrics',
    description: 'Key valuation indicators and ratios',
    metrics: ['P/E Ratio', 'EV/EBITDA', 'Price/Sales', 'Growth Rate'],
  },
  {
    id: 'management',
    icon: Users2,
    title: 'Management & Governance',
    description: 'Leadership and corporate structure',
    metrics: [
      'Experience',
      'Track Record',
      'Corporate Governance',
      'Strategic Vision',
    ],
  },
];

const chartTypes = [
  { icon: LineChart, label: 'Trend Analysis' },
  { icon: BarChart3, label: 'Comparison' },
  { icon: PieChart, label: 'Distribution' },
];

export function MarketAnalysis() {
  const [selectedSection, setSelectedSection] = useState(
    analysisFramework[0].id
  );
  const [activeChart, setActiveChart] = useState(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {analysisFramework.map((section) => (
          <Card
            key={section.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-lg',
              selectedSection === section.id && 'ring-2 ring-primary'
            )}
            onClick={() => setSelectedSection(section.id)}
          >
            <CardContent className="p-4">
              <section.icon className="h-6 w-6 text-primary mb-2" />
              <h4 className="font-semibold">{section.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {section.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-semibold">
                {analysisFramework.find((s) => s.id === selectedSection)?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {
                  analysisFramework.find((s) => s.id === selectedSection)
                    ?.description
                }
              </p>
            </div>
            <div className="flex gap-2">
              {chartTypes.map((chart, index) => (
                <Button
                  key={index}
                  variant={activeChart === index ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveChart(index)}
                >
                  <chart.icon className="h-4 w-4 mr-1" />
                  {chart.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm text-muted-foreground">
                Key Metrics
              </h4>
              <ul className="space-y-3">
                {analysisFramework
                  .find((s) => s.id === selectedSection)
                  ?.metrics.map((metric, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                      <span>{metric}</span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center">
                Interactive chart visualization coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
