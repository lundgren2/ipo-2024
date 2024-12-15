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

// Memoize the watch button to prevent unnecessary re-renders
const WatchButton = memo(
  ({
    isWatched,
    onClick,
  }: {
    isWatched: boolean;
    onClick: (e: React.MouseEvent) => void;
  }) => (
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
  )
);
WatchButton.displayName = 'WatchButton';

export function IPOCard({ ipo, isWatched, onToggleWatch }: IPOCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setShowDetails(open);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    setShowDetails(true);
  }, []);

  const handleWatchClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onToggleWatch(!isWatched);
    },
    [isWatched, onToggleWatch]
  );

  const statusColor = {
    'Next Week': 'destructive',
    'Coming Soon': 'warning',
    Scheduled: 'default',
    Completed: 'secondary',
  } as const;

  return (
    <div className="relative group">
      <Card
        role="button"
        tabIndex={0}
        className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50"
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!e.target.closest('button')) {
              setShowDetails(true);
            }
          }
        }}
      >
        {/* Top Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {ipo.logo ? (
                <Image
                  src={ipo.logo}
                  alt={ipo.name}
                  width={64}
                  height={64}
                  className="object-contain"
                />
              ) : (
                <Building2 className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold leading-tight mb-1">
                {ipo.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{ipo.exchange}</Badge>
                <Badge variant="secondary">{ipo.sector}</Badge>
                <Badge
                  variant={statusColor[ipo.status as keyof typeof statusColor]}
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
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Expected Date</p>
              <p className="font-medium">{ipo.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Valuation</p>
              <p className="font-medium">{ipo.valuation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Interest</p>
              <p className="font-medium">{ipo.interest}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
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
            <Badge key={index} variant="secondary" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>

        {/* View Details Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="group/button"
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
