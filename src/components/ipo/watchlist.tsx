'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Star,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Users,
  ChevronDown,
  StarOff,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWatchlist } from '@/context/watchlist-context';

type SortOption = 'name' | 'date' | 'change' | 'favorite';

const marketStats = [
  {
    label: 'Average Return',
    value: '+24.5%',
    trend: '+2.3%',
    isPositive: true,
  },
  {
    label: 'Success Rate',
    value: '92%',
    trend: '+5%',
    isPositive: true,
  },
  {
    label: 'Investor Interest',
    value: 'High',
    trend: '↑',
    isPositive: true,
  },
];

const marketInsights = [
  'Tech IPOs showing strong momentum in Q1',
  'Retail sector IPOs outperforming expectations',
  'Healthcare IPOs gaining investor interest',
];

export function Watchlist() {
  const { watchedIpos, toggleFavorite, removeFromWatchlist } = useWatchlist();
  const [sortBy, setSortBy] = useState<SortOption>('favorite');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const sortedIpos = [...watchedIpos]
    .filter((ipo) => !showOnlyFavorites || ipo.isFavorite)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'change':
          return parseFloat(b.change) - parseFloat(a.change);
        case 'favorite':
          return Number(b.isFavorite) - Number(a.isFavorite);
        default:
          return 0;
      }
    });

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {/* Market Statistics */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Market Stats</h2>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 h-8">
              <ArrowUpRight className="h-3 w-3" />
              Details
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {marketStats.map((stat, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-muted/50 text-center space-y-0.5"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-semibold">{stat.value}</p>
                <p
                  className={`text-xs ${
                    stat.isPositive ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Watchlist</h2>
              <Badge variant="secondary" className="text-xs">
                {watchedIpos.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              >
                {showOnlyFavorites ? (
                  <StarOff className="h-3 w-3 mr-1" />
                ) : (
                  <Star className="h-3 w-3 mr-1" />
                )}
                {showOnlyFavorites ? 'Show All' : 'Favorites'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
                    Sort
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy('favorite')}>
                    By Favorite
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('name')}>
                    By Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('date')}>
                    By Date
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('change')}>
                    By Change
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="space-y-1">
            {sortedIpos.map((ipo) => (
              <div
                key={ipo.id}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(ipo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                  >
                    <Star
                      className={`h-3 w-3 ${
                        ipo.isFavorite
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                  <div>
                    <h3 className="text-sm font-medium leading-none mb-1">
                      {ipo.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-none">
                      {ipo.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={ipo.isPositive ? 'default' : 'destructive'}
                    className="text-xs px-1.5 py-0.5"
                  >
                    {ipo.change}
                  </Badge>
                  <button
                    onClick={() => removeFromWatchlist(ipo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {sortedIpos.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                {showOnlyFavorites
                  ? 'No favorite IPOs yet'
                  : 'No IPOs in watchlist'}
              </div>
            )}
          </div>
        </div>

        {/* Market Insights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Market Insights</h2>
          </div>
          <div className="space-y-2">
            {marketInsights.map((insight, index) => (
              <div
                key={index}
                className="flex items-start gap-2 py-1 px-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <p className="text-xs text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Community</h2>
            </div>
            <Button variant="ghost" size="sm" className="h-8">
              View All
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-bold leading-none mb-1">1.2k</p>
              <p className="text-xs text-muted-foreground">Active Traders</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-bold leading-none mb-1">85%</p>
              <p className="text-xs text-muted-foreground">Bullish Sentiment</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
