'use client';

import { useState, useCallback, memo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Building } from 'lucide-react';
import type { IPO } from './ipo-list';
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
    // Check if the click is on or inside a button
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

  return (
    <div className="relative">
      <Card
        role="button"
        tabIndex={0}
        className="p-6 hover:shadow-lg transition-all cursor-pointer"
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
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                {ipo.logo ? (
                  <Image
                    src={ipo.logo}
                    alt={ipo.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                ) : (
                  <Building className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{ipo.name}</h3>
                  <Badge variant="outline">{ipo.exchange}</Badge>
                  <Badge variant="secondary">{ipo.sector}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Expected: {ipo.date}
                </p>
              </div>
            </div>
            <WatchButton isWatched={isWatched} onClick={handleWatchClick} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Valuation</p>
              <p className="text-lg font-semibold">{ipo.valuation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-semibold">{ipo.status}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest</p>
              <p className="text-lg font-semibold">{ipo.interest}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Change</p>
              <p
                className={`text-lg font-semibold ${
                  ipo.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {ipo.change}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {ipo.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary">
                {highlight}
              </Badge>
            ))}
          </div>
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
