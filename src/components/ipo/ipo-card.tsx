'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import type { IPO } from './ipo-list';

interface IPOCardProps {
  ipo: IPO;
  isWatched: boolean;
  onToggleWatch: (watched: boolean) => void;
}

export function IPOCard({ ipo, isWatched, onToggleWatch }: IPOCardProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
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
          <Button
            variant={isWatched ? 'default' : 'outline'}
            size="sm"
            className="gap-1"
            onClick={() => onToggleWatch(!isWatched)}
          >
            <Star
              className={`h-4 w-4 ${
                isWatched ? 'fill-primary-foreground' : ''
              }`}
            />
            {isWatched ? 'Watching' : 'Watch'}
          </Button>
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
  );
}
