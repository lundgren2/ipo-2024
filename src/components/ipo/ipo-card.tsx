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
  LucideIcon,
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

const statusColor: Record<
  string,
  'destructive' | 'default' | 'secondary' | 'outline'
> = {
  'Next Week': 'destructive',
  'Coming Soon': 'default',
  Scheduled: 'default',
  Completed: 'secondary',
  Filing: 'outline',
  Upcoming: 'outline',
  'Upcoming Next Week': 'outline',
  'Upcoming Soon': 'outline',
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

const formatValue = (value: string | number | undefined) => {
  if (value === undefined) return 'N/A';
  return value;
};

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
                {ipo.exchange && (
                  <Badge variant="outline">{ipo.exchange}</Badge>
                )}
                {ipo.sector && <Badge variant="secondary">{ipo.sector}</Badge>}
                {ipo.status && (
                  <Badge
                    variant={
                      statusColor[ipo.status as keyof typeof statusColor] ??
                      'outline'
                    }
                  >
                    {ipo.status}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <WatchButton isWatched={isWatched} onClick={handleWatchClick} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <MetricItem
            icon={Calendar}
            label="Expected Date"
            value={formatValue(ipo.date)}
          />
          <MetricItem
            icon={DollarSign}
            label="Valuation"
            value={formatValue(ipo.valuation)}
          />
          <MetricItem
            icon={Users}
            label="Interest"
            value={formatValue(ipo.interest)}
          />
          <MetricItem
            icon={TrendingUp}
            label="Change"
            value={formatValue(ipo.change)}
            isPositive={ipo.isPositive}
          />
        </div>
        {/* 
        <div className="flex flex-wrap gap-2 mb-4">
          {ipo?.highlights?.map((highlight: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs group-hover:bg-primary/10 transition-colors"
            >
              {highlight}
            </Badge>
          ))}
        </div> */}

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

// Helper component for metrics
function MetricItem({
  icon: Icon,
  label,
  value,
  isPositive,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  isPositive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 group/metric">
      <Icon className="h-5 w-5 text-muted-foreground group-hover/metric:text-primary transition-colors" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p
          className={`font-medium ${
            isPositive !== undefined
              ? isPositive
                ? 'text-green-500'
                : 'text-red-500'
              : ''
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
