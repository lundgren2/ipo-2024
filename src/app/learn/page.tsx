'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  LineChart,
  Shield,
  Search,
  PieChart,
  TrendingUp,
  Users,
  Lightbulb,
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { IPOTimeline } from '@/components/learning/ipo-timeline';
import { MarketAnalysis } from '@/components/learning/market-analysis';
import { IPOQuiz } from '@/components/learning/ipo-quiz';
import { CaseStudies } from '@/components/learning/case-studies';

const learningContent = [
  {
    id: 'ipo-basics',
    icon: BookOpen,
    title: 'IPO Basics',
    sections: [
      {
        title: 'What is an IPO?',
        content:
          'An Initial Public Offering (IPO) is the process of offering shares of a private company to the public through a new stock issuance. This process allows companies to raise capital from public investors while providing an opportunity for early investors to realize returns on their investments.',
      },
      {
        title: 'IPO Process',
        content:
          'Companies must meet SEC requirements and financial thresholds for transparency and regulatory compliance before going public.',
        list: [
          'Selecting investment banks as underwriters',
          'Due diligence and financial audits',
          'Filing registration statements with SEC',
          'Marketing through roadshows',
          'Setting initial price range',
          'Final pricing and allocation',
        ],
      },
      {
        title: 'Key Terms',
        list: [
          {
            term: 'Offer Price',
            description: 'The price at which shares are offered to the public',
          },
          {
            term: 'Lot Size',
            description: 'Minimum number of shares that can be applied for',
          },
          {
            term: 'Green Shoe Option',
            description: 'Over-allotment option for stability',
          },
          {
            term: 'Lock-up Period',
            description: 'Time insiders must wait before selling shares',
          },
        ],
      },
    ],
  },
  {
    id: 'market-analysis',
    icon: LineChart,
    title: 'Market Analysis',
    sections: [
      {
        title: 'Market Conditions',
        content: 'Understanding market conditions is crucial for IPO success.',
        list: [
          'Overall market sentiment and volatility',
          'Industry sector performance and trends',
          'Economic indicators and interest rates',
          'Comparable company valuations',
        ],
      },
      {
        title: 'Valuation Metrics',
        content: 'Key metrics to evaluate IPOs:',
        list: [
          {
            term: 'P/E Ratio',
            description: 'Price to Earnings comparison',
          },
          {
            term: 'Revenue Growth',
            description: 'Historical and projected growth rates',
          },
          {
            term: 'Market Share',
            description: "Company's position in the industry",
          },
          {
            term: 'Competitive Analysis',
            description: 'Market positioning and advantages',
          },
        ],
      },
    ],
  },
  {
    id: 'investment-strategy',
    icon: Shield,
    title: 'Investment Strategy',
    sections: [
      {
        title: 'Risk Assessment',
        content: 'Key factors to evaluate before investing:',
        list: [
          'Company fundamentals and financial health',
          'Management team experience and track record',
          'Business model sustainability',
          'Market potential and growth prospects',
          'Competitive advantages and moats',
        ],
      },
      {
        title: 'Investment Timeline',
        content: 'Different approaches to IPO investing:',
        list: [
          {
            term: 'Short-term',
            description: 'Focus on listing gains',
          },
          {
            term: 'Medium-term',
            description: '6-12 month holding period',
          },
          {
            term: 'Long-term',
            description: 'Multi-year investment thesis',
          },
        ],
      },
      {
        title: 'Portfolio Allocation',
        content: 'Best practices for IPO investments:',
        list: [
          'Diversification across sectors',
          'Position sizing based on risk tolerance',
          'Balancing IPO investments with existing portfolio',
          'Setting clear entry and exit strategies',
        ],
      },
    ],
  },
];

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(30);

  // Filter content based on search query
  const filteredContent = learningContent.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.sections.some(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.list?.some((item) =>
            typeof item === 'string'
              ? item.toLowerCase().includes(searchQuery.toLowerCase())
              : item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
          )
      )
  );

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">IPO Learning Center</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive guides and resources to help you understand the IPO
            process
          </p>
        </div>

        {/* Search and Progress Section */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search topics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Learning Progress:</span>
            <Progress value={progress} className="w-[100px]" />
            <span>{progress}%</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="visual">Visual Learning</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredContent.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    id={section.id}
                  >
                    <AccordionTrigger className="text-xl font-semibold">
                      <span className="flex items-center gap-2">
                        <section.icon className="h-5 w-5 text-primary" />
                        {section.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 p-4">
                        {section.sections.map((s, idx) => (
                          <div key={idx} className="flex items-start gap-4">
                            <Badge variant="outline" className="mt-1">
                              {String(idx + 1).padStart(2, '0')}
                            </Badge>
                            <div>
                              <h4 className="font-semibold">{s.title}</h4>
                              {s.content && (
                                <p className="text-muted-foreground">
                                  {s.content}
                                </p>
                              )}
                              {s.list && (
                                <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                                  {s.list.map((item, itemIdx) => (
                                    <li key={itemIdx}>
                                      {typeof item === 'string' ? (
                                        item
                                      ) : (
                                        <>
                                          <span className="font-medium">
                                            {item.term}:
                                          </span>{' '}
                                          {item.description}
                                        </>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="visual" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    IPO Process Timeline
                  </h3>
                  <IPOTimeline />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Market Analysis Framework
                  </h3>
                  <MarketAnalysis />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactive" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      IPO Knowledge Quiz
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Test your understanding of IPO concepts and processes.
                    </p>
                    <IPOQuiz onProgress={(value) => setProgress(value)} />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">
                      IPO Case Studies
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn from real-world IPO examples and outcomes.
                    </p>
                    <CaseStudies />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Additional Resources
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>SEC IPO Guidelines</li>
                    <li>Market Research Reports</li>
                    <li>Industry Analysis Tools</li>
                    <li>Expert Interviews</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Resources
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Discussion Forums</li>
                    <li>Expert Q&A Sessions</li>
                    <li>Case Studies</li>
                    <li>Webinars</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
