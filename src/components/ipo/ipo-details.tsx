'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Star,
  Bell,
  Share2,
  ExternalLink,
  Building,
  Users,
  DollarSign,
  Calendar,
  Globe,
  TrendingUp,
} from 'lucide-react';
import { fetchIPODetails } from '@/services/ipo-service';
import type { IPO } from './ipo-list';
import { useWatchlist } from '@/context/watchlist-context';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface IPODetailsProps {
  ipo: IPO;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CompanyDetails {
  weburl?: string;
  name?: string;
  logo?: string;
  finnhubIndustry?: string;
  country?: string;
  currency?: string;
  exchange?: string;
  ipo?: string;
  marketCapitalization?: number;
  shareOutstanding?: number;
  phone?: string;
  description?: string;
  [key: string]: string | number | undefined;
}

// Add API response type
interface FinnhubCompanyResponse {
  weburl: string;
  name: string;
  logo: string;
  finnhubIndustry: string;
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  shareOutstanding: number;
  phone: string;
  description: string;
}

interface PriceDataPoint {
  date: string;
  price: number;
}

// Mock data for the price chart
const mockPriceData: PriceDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(
    Date.now() - (30 - i) * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  price: 20 + Math.random() * 10,
}));

// Memoize the chart component to prevent unnecessary re-renders
const PriceChart = memo(({ data }: { data: PriceDataPoint[] }) => (
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
));
PriceChart.displayName = 'PriceChart';

export function IPODetails({ ipo, open, onOpenChange }: IPODetailsProps) {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const { toast } = useToast();
  const watched = isWatched(ipo.id);

  const loadDetails = useCallback(async () => {
    if (!open || !ipo.name) return;

    try {
      setLoading(true);
      const symbol = ipo.name.match(/\((.*?)\)/)?.[1] || '';
      const response = await fetchIPODetails(symbol);

      if (response) {
        const apiResponse = response as Partial<FinnhubCompanyResponse>;
        setCompanyDetails({
          weburl: apiResponse.weburl,
          name: apiResponse.name,
          logo: apiResponse.logo,
          finnhubIndustry: apiResponse.finnhubIndustry,
          country: apiResponse.country,
          currency: apiResponse.currency,
          exchange: apiResponse.exchange,
          ipo: apiResponse.ipo,
          marketCapitalization: apiResponse.marketCapitalization,
          shareOutstanding: apiResponse.shareOutstanding,
          phone: apiResponse.phone,
          description: apiResponse.description,
        });
      }
    } catch (error) {
      console.error('Error loading IPO details:', error);
      toast({
        title: 'Error loading details',
        description: 'Could not load company details. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [open, ipo.name, toast]);

  useEffect(() => {
    if (open) {
      loadDetails();
    }
  }, [open, loadDetails]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(
      `Check out the upcoming IPO for ${ipo.name} - Expected: ${ipo.date}`
    );
    toast({
      title: 'Link Copied',
      description: 'IPO details link has been copied to clipboard',
    });
  }, [ipo.name, ipo.date, toast]);

  const handleNotification = useCallback(() => {
    toast({
      title: 'Notification Set',
      description: `You'll be notified about important updates for ${ipo.name}`,
    });
  }, [ipo.name, toast]);

  const toggleWatchlist = useCallback(() => {
    if (watched) {
      removeFromWatchlist(ipo.id);
    } else {
      addToWatchlist(ipo);
    }
  }, [watched, ipo, addToWatchlist, removeFromWatchlist]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="select-none">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {ipo.logo || companyDetails?.logo ? (
                  <Image
                    src={ipo.logo || companyDetails?.logo || ''}
                    alt={ipo.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                ) : (
                  <Building className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl">{ipo.name}</DialogTitle>
                <DialogDescription className="mt-1.5">
                  {ipo.sector} company going public on {ipo.date}
                </DialogDescription>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{ipo.exchange}</Badge>
                  <Badge variant="secondary">{ipo.sector}</Badge>
                  <Badge variant={ipo.isPositive ? 'default' : 'destructive'}>
                    {ipo.change}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNotification}
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant={watched ? 'default' : 'outline'}
                size="icon"
                onClick={toggleWatchlist}
              >
                <Star
                  className={`h-4 w-4 ${
                    watched ? 'fill-primary-foreground' : ''
                  }`}
                />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4 p-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-[200px]" />
              <Skeleton className="h-[200px]" />
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <Tabs defaultValue="overview">
              <TabsList className="select-none">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Key Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Expected: {ipo.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>Valuation: {ipo.valuation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>Sector: {ipo.sector}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>Exchange: {ipo.exchange}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Market Interest
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Interest Level: {ipo.interest}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>Trend: {ipo.change}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">
                    Expected Price Movement
                  </h3>
                  <PriceChart data={mockPriceData} />
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Company Highlights
                    </h3>
                    <div className="grid gap-2">
                      {ipo.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="p-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Market Analysis</h3>
                    <p className="text-muted-foreground">
                      Detailed market analysis and predictions will be available
                      closer to the IPO date.
                    </p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {companyDetails?.weburl && (
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(companyDetails.weburl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Company Website
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
