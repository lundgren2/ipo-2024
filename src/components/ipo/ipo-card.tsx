'use client';

import { useState, useCallback, memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Star,
  Building2,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  ArrowRight,
} from 'lucide-react';
import { IPO } from '@/types/ipo';
import { IPODetails } from './ipo-details';
import Image from 'next/image';

interface IPOCardProps {
  ipo: IPO;
  isWatched: boolean;
  onToggleWatch: (watched: boolean) => void;
}

interface WatchButtonProps {
  isWatched: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const statusColor = {
  'Next Week': 'destructive',
  'Coming Soon': 'warning',
  Scheduled: 'default',
  Completed: 'secondary',
} as const;

// Memoize the watch button to prevent unnecessary re-renders
const WatchButton = memo(function WatchButton({
  isWatched,
  onClick,
}: WatchButtonProps) {
  return (
    <Button
      variant={isWatched ? 'default' : 'outline'}
      size="sm"
      className="gap-1"
      onClick={onClick}
    >
      <Star
        className={`h-4 w-4 ${isWatched ? 'fill-primary-foreground' : ''}`}
      />
      {isWatched ? 'Watching' : 'Watch'}
    </Button>
  );
});

export function IPOCard({ ipo, isWatched, onToggleWatch }: IPOCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setShowDetails(open);
  }, []);

  const handleWatchClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onToggleWatch(!isWatched);
    },
    [isWatched, onToggleWatch]
  );

  return (
    <div className="group">
      <Card className="p-6 transition-all duration-200 hover:shadow-md hover:border-primary/20 group-hover:bg-gradient-to-r group-hover:from-background group-hover:to-muted/30">
        {/* Top Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center group-hover:shadow-sm transition-shadow">
              {ipo.logo ? (
                <Image
                  src={ipo.logo}
                  alt={ipo.name}
                  width={64}
                  height={64}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                {ipo.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="group-hover:border-primary/30"
                >
                  {ipo.exchange}
                </Badge>
                <Badge variant="secondary">{ipo.sector}</Badge>
                <Badge
                  variant={statusColor[ipo.status as keyof typeof statusColor]}
                  className="transition-all"
                >
                  {ipo.status}
                </Badge>
              </div>
            </div>
          </div>
          <WatchButton isWatched={isWatched} onClick={handleWatchClick} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="flex items-center gap-3 group/metric">
            <Calendar className="h-5 w-5 text-muted-foreground group-hover/metric:text-primary transition-colors" />
            <div>
              <p className="text-sm text-muted-foreground">Expected Date</p>
              <p className="font-medium group-hover/metric:text-primary transition-colors">
                {ipo.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 group/metric">
            <DollarSign className="h-5 w-5 text-muted-foreground group-hover/metric:text-primary transition-colors" />
            <div>
              <p className="text-sm text-muted-foreground">Valuation</p>
              <p className="font-medium group-hover/metric:text-primary transition-colors">
                {ipo.valuation}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 group/metric">
            <Users className="h-5 w-5 text-muted-foreground group-hover/metric:text-primary transition-colors" />
            <div>
              <p className="text-sm text-muted-foreground">Interest</p>
              <p className="font-medium group-hover/metric:text-primary transition-colors">
                {ipo.interest}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 group/metric">
            <TrendingUp className="h-5 w-5 text-muted-foreground group-hover/metric:text-primary transition-colors" />
            <div>
              <p className="text-sm text-muted-foreground">Trend</p>
              <p
                className={`font-medium ${
                  ipo.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {ipo.change}
              </p>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ipo.highlights.map((highlight, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs group-hover:bg-primary/10 transition-colors"
            >
              {highlight}
            </Badge>
          ))}
        </div>

        {/* View Details Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="group/button opacity-0 group-hover:opacity-100 transition-all duration-200"
            onClick={() => setShowDetails(true)}
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </div>
      </Card>

      <IPODetails
        key={`${ipo.id}-details`}
        ipo={ipo}
        open={showDetails}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
}
