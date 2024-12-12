'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IPOCard } from './ipo-card';
import { Skeleton } from '@/components/ui/skeleton';

export type IPO = {
  id: number;
  name: string;
  date: string;
  status: string;
  valuation: string;
  sector: string;
  exchange: string;
  trend: string;
  interest: string;
  highlights: string[];
};

const mockIpos: IPO[] = [
  {
    id: 1,
    name: 'Reddit (RDDT)',
    date: 'Mar 21, 2024',
    status: 'Next Week',
    valuation: '$15B',
    sector: 'Technology',
    exchange: 'NYSE',
    trend: '+12%',
    interest: 'High',
    highlights: ['Social Media Giant', '500M+ Monthly Users', 'AI Integration'],
  },
  {
    id: 2,
    name: 'Shein',
    date: 'Apr 5, 2024',
    status: 'Coming Soon',
    valuation: '$60B',
    sector: 'Retail',
    exchange: 'NYSE',
    trend: '+8%',
    interest: 'Very High',
    highlights: [
      'Fast Fashion Leader',
      'Global Presence',
      'Supply Chain Innovation',
    ],
  },
  {
    id: 3,
    name: 'Stripe',
    date: 'Q2 2024',
    status: 'Coming Soon',
    valuation: '$95B',
    sector: 'Finance',
    exchange: 'NASDAQ',
    trend: '+15%',
    interest: 'Extreme',
    highlights: [
      'Payment Processing Leader',
      'Tech Infrastructure',
      'Global Scale',
    ],
  },
];

export function IPOList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);

  // Filter and sort IPOs
  const filteredIpos = mockIpos
    .filter((ipo) => {
      const matchesSearch = ipo.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesSector =
        selectedSector === 'all' || ipo.sector === selectedSector;
      const matchesExchange =
        selectedExchange === 'all' || ipo.exchange === selectedExchange;
      return matchesSearch && matchesSector && matchesExchange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'valuation':
          return (
            parseInt(b.valuation.replace(/[^0-9]/g, '')) -
            parseInt(a.valuation.replace(/[^0-9]/g, ''))
          );
        case 'date':
        default:
          return new Date(a.date) > new Date(b.date) ? 1 : -1;
      }
    });

  return (
    <div className="space-y-8">
      {/* Filters */}
      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search IPOs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              <SelectItem value="NYSE">NYSE</SelectItem>
              <SelectItem value="NASDAQ">NASDAQ</SelectItem>
            </SelectContent>
          </Select>
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
        </div>
      </Card>

      {/* IPO List */}
      <div className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-24 w-full" />
              </Card>
            ))
          : filteredIpos.map((ipo) => <IPOCard key={ipo.id} ipo={ipo} />)}
      </div>
    </div>
  );
}
