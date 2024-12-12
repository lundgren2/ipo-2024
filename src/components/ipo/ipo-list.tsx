'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IPOCard } from '@/components/ipo/ipo-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useWatchlist, WatchedIPO } from '@/context/watchlist-context';
import { fetchUpcomingIPOs } from '@/services/ipo-service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export type IPO = Omit<WatchedIPO, 'isFavorite'> & {
  highlights: string[];
  interest: string;
  status: string;
};

type SortOption = 'date' | 'name' | 'valuation';

function parseDate(dateStr: string): number {
  try {
    return new Date(dateStr).getTime();
  } catch (error) {
    return 0;
  }
}

function parseValuation(val: string): number {
  try {
    const numStr = val.replace(/[^0-9.]/g, '');
    const multiplier = val.includes('T')
      ? 1e12
      : val.includes('B')
      ? 1e9
      : val.includes('M')
      ? 1e6
      : 1;
    return parseFloat(numStr) * multiplier;
  } catch {
    return 0;
  }
}

export function IPOList() {
  const { isWatched, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [loading, setLoading] = useState(true);
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [exchanges, setExchanges] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(25);
  const { toast } = useToast();

  const loadIPOs = useCallback(async () => {
    try {
      const data = await fetchUpcomingIPOs(limit);
      setIpos(data);

      const uniqueSectors = [
        ...new Set(data.map((ipo) => ipo.sector).filter(Boolean)),
      ];
      const uniqueExchanges = [
        ...new Set(data.map((ipo) => ipo.exchange).filter(Boolean)),
      ];

      setSectors(uniqueSectors);
      setExchanges(uniqueExchanges);
      setLoading(false);
    } catch (error) {
      toast({
        title: 'Error loading IPOs',
        description: 'Please try again later.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }, [limit, toast]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!mounted) return;
      setLoading(true);
      await loadIPOs();
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [loadIPOs]);

  const handleLimitChange = useCallback((value: number[]) => {
    setLimit(value[0]);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredIpos = ipos
    .filter((ipo) => {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      const ipoText =
        `${ipo.name} ${ipo.sector} ${ipo.exchange} ${ipo.status}`.toLowerCase();

      const matchesSearch = searchTerms.every((term) => ipoText.includes(term));
      const matchesSector =
        selectedSector === 'all' || ipo.sector === selectedSector;
      const matchesExchange =
        selectedExchange === 'all' || ipo.exchange === selectedExchange;

      return matchesSearch && matchesSector && matchesExchange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'valuation':
          return parseValuation(b.valuation) - parseValuation(a.valuation);
        case 'date':
        default:
          return parseDate(a.date) - parseDate(b.date);
      }
    });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, sector, exchange..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              {exchanges.map((exchange) => (
                <SelectItem key={exchange} value={exchange}>
                  {exchange}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Company Name</SelectItem>
                <SelectItem value="valuation">Valuation</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Display Limit</h4>
                    <p className="text-sm text-muted-foreground">
                      Show up to {limit} IPOs at once
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="limit">Limit</Label>
                      <Slider
                        id="limit"
                        max={100}
                        min={5}
                        step={5}
                        value={[limit]}
                        onValueChange={handleLimitChange}
                        className="col-span-2"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <p>Showing {filteredIpos.length} results</p>
          <p>Display limit: {limit} IPOs</p>
        </div>
      </Card>

      {/* IPO List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: Math.min(3, limit) }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-24 w-full" />
            </Card>
          ))
        ) : filteredIpos.length > 0 ? (
          filteredIpos.map((ipo) => (
            <IPOCard
              key={ipo.id}
              ipo={ipo}
              isWatched={isWatched(ipo.id)}
              onToggleWatch={(watched) =>
                watched ? addToWatchlist(ipo) : removeFromWatchlist(ipo.id)
              }
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">
              No IPOs found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
