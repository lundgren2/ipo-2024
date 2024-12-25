'use client';

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
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  type Filters,
  type FilterKey,
  type SortOption,
  EXCHANGES,
} from './types';

interface IPOFiltersProps {
  filters: Filters;
  onFilterChange: <K extends FilterKey>(key: K, value: Filters[K]) => void;
  resultCount: number;
}

export function IPOFilters({
  filters,
  onFilterChange,
  resultCount,
}: IPOFiltersProps) {
  return (
    <Card className="p-6 border-none shadow-sm bg-gradient-to-b from-background to-muted/20">
      <div className="space-y-6">
        {/* Search and Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search IPOs by name, sector, or exchange..."
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value: SortOption) =>
                onFilterChange('sortBy', value)
              }
            >
              <SelectTrigger className="w-[140px]">
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
                <Button variant="outline" size="icon" className="shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filters</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize your IPO view
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Sector</Label>
                      <Select
                        value={filters.sector}
                        onValueChange={(value) =>
                          onFilterChange('sector', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Sectors" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sectors</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Exchange</Label>
                      <Select
                        value={filters.exchange}
                        onValueChange={(value) =>
                          onFilterChange('exchange', value)
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Exchange" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Exchanges</SelectItem>
                          {EXCHANGES.map((exchange) => (
                            <SelectItem key={exchange} value={exchange}>
                              {exchange}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Display Limit</Label>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Show up to {filters.limit} IPOs
                          </span>
                          <span className="text-sm font-medium">
                            {filters.limit}
                          </span>
                        </div>
                        <Slider
                          id="limit"
                          max={100}
                          min={5}
                          step={5}
                          value={[filters.limit]}
                          onValueChange={(value) =>
                            onFilterChange('limit', value[0])
                          }
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.sector !== 'all' && (
            <Badge
              variant="secondary"
              className="gap-1"
              onClick={() => onFilterChange('sector', 'all')}
            >
              {filters.sector}
              <button className="ml-1 hover:text-foreground">×</button>
            </Badge>
          )}
          {filters.exchange !== 'all' && (
            <Badge
              variant="secondary"
              className="gap-1"
              onClick={() => onFilterChange('exchange', 'all')}
            >
              {filters.exchange}
              <button className="ml-1 hover:text-foreground">×</button>
            </Badge>
          )}
          {filters.searchQuery && (
            <Badge
              variant="secondary"
              className="gap-1"
              onClick={() => onFilterChange('searchQuery', '')}
            >
              Search: {filters.searchQuery}
              <button className="ml-1 hover:text-foreground">×</button>
            </Badge>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
          <p>
            Showing{' '}
            <span className="font-medium text-foreground">{resultCount}</span>{' '}
            {resultCount === 1 ? 'result' : 'results'}
          </p>
          <p className="flex items-center gap-2">
            <span>Sort by:</span>
            <span className="font-medium text-foreground capitalize">
              {filters.sortBy}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
}
