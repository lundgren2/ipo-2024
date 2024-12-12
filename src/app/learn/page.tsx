'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, LineChart, Shield } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">IPO Learning Center</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive guides and resources to help you understand the IPO
            process
          </p>
        </div>

        <div className="mt-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ipo-basics" id="basics">
              <AccordionTrigger className="text-xl font-semibold">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  IPO Basics
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 p-4">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      01
                    </Badge>
                    <div>
                      <h4 className="font-semibold">What is an IPO?</h4>
                      <p className="text-muted-foreground">
                        An Initial Public Offering (IPO) is the process of
                        offering shares of a private company to the public
                        through a new stock issuance. This process allows
                        companies to raise capital from public investors while
                        providing an opportunity for early investors to realize
                        returns on their investments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      02
                    </Badge>
                    <div>
                      <h4 className="font-semibold">IPO Process</h4>
                      <p className="text-muted-foreground">
                        Companies must meet SEC requirements and financial
                        thresholds for transparency and regulatory compliance
                        before going public. The process typically involves:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>Selecting investment banks as underwriters</li>
                        <li>Due diligence and financial audits</li>
                        <li>Filing registration statements with SEC</li>
                        <li>Marketing through roadshows</li>
                        <li>Setting initial price range</li>
                        <li>Final pricing and allocation</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      03
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Key Terms</h4>
                      <p className="text-muted-foreground">
                        Essential IPO terminology includes:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>
                          <span className="font-medium">Offer Price:</span> The
                          price at which shares are offered to the public
                        </li>
                        <li>
                          <span className="font-medium">Lot Size:</span> Minimum
                          number of shares that can be applied for
                        </li>
                        <li>
                          <span className="font-medium">
                            Green Shoe Option:
                          </span>{' '}
                          Over-allotment option for stability
                        </li>
                        <li>
                          <span className="font-medium">Lock-up Period:</span>{' '}
                          Time insiders must wait before selling shares
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="market-analysis" id="market-analysis">
              <AccordionTrigger className="text-xl font-semibold">
                <span className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-primary" />
                  Market Analysis
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 p-4">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      01
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Market Conditions</h4>
                      <p className="text-muted-foreground">
                        Understanding market conditions is crucial for IPO
                        success. Key factors include:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>Overall market sentiment and volatility</li>
                        <li>Industry sector performance and trends</li>
                        <li>Economic indicators and interest rates</li>
                        <li>Comparable company valuations</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      02
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Valuation Metrics</h4>
                      <p className="text-muted-foreground">
                        Key metrics to evaluate IPOs:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>
                          <span className="font-medium">P/E Ratio:</span> Price
                          to Earnings comparison
                        </li>
                        <li>
                          <span className="font-medium">Revenue Growth:</span>{' '}
                          Historical and projected
                        </li>
                        <li>
                          <span className="font-medium">Market Share:</span>{' '}
                          Company's position in the industry
                        </li>
                        <li>
                          <span className="font-medium">
                            Competitive Analysis:
                          </span>{' '}
                          Market positioning
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="investment-strategy" id="strategy">
              <AccordionTrigger className="text-xl font-semibold">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Investment Strategy
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 p-4">
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      01
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Risk Assessment</h4>
                      <p className="text-muted-foreground">
                        Key factors to evaluate before investing:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>Company fundamentals and financial health</li>
                        <li>Management team experience and track record</li>
                        <li>Business model sustainability</li>
                        <li>Market potential and growth prospects</li>
                        <li>Competitive advantages and moats</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      02
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Investment Timeline</h4>
                      <p className="text-muted-foreground">
                        Different approaches to IPO investing:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>
                          <span className="font-medium">Short-term:</span> Focus
                          on listing gains
                        </li>
                        <li>
                          <span className="font-medium">Medium-term:</span> 6-12
                          month holding period
                        </li>
                        <li>
                          <span className="font-medium">Long-term:</span>{' '}
                          Multi-year investment thesis
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Badge variant="outline" className="mt-1">
                      03
                    </Badge>
                    <div>
                      <h4 className="font-semibold">Portfolio Allocation</h4>
                      <p className="text-muted-foreground">
                        Best practices for IPO investments:
                      </p>
                      <ul className="mt-2 ml-4 list-disc text-muted-foreground">
                        <li>Diversification across sectors</li>
                        <li>Position sizing based on risk tolerance</li>
                        <li>
                          Balancing IPO investments with existing portfolio
                        </li>
                        <li>Setting clear entry and exit strategies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
