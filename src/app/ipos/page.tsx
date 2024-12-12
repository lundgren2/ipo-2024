'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Filter,
  ArrowUpDown,
  ArrowRight,
  Search,
  CalendarDays,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

// Mock data for IPOs
const mockIpos = [
  {
    id: 1,
    name: 'Reddit (RDDT)',
    date: 'Mar 21, 2024',
    status: 'Next Week',
    valuation: '$15B',
    sector: 'Technology',
    exchange: 'NYSE',
  },
  {
    id: 2,
    name: 'Shein',
    date: 'Apr 5, 2024',
    status: 'Coming Soon',
    valuation: '$60B',
    sector: 'Retail',
    exchange: 'NYSE',
  },
  {
    id: 3,
    name: 'Stripe',
    date: 'Q2 2024',
    status: 'Coming Soon',
    valuation: '$95B',
    sector: 'Finance',
    exchange: 'NASDAQ',
  },
  // Add more mock data as needed
];

export default function IPOListingsPage() {
  // State for filters and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Calendar data
  const ipoCountsByDate = {
    5: 2,
    12: 1,
    15: 3,
    22: 2,
  } as const;

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
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">IPO Listings</h1>
          <p className="text-lg text-muted-foreground">
            Track upcoming and recent Initial Public Offerings, set alerts, and
            analyze market trends.
          </p>
        </div>

        {/* Filters Section */}
        <Card className="p-6 mb-8">
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
            <Select
              value={selectedExchange}
              onValueChange={setSelectedExchange}
            >
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold">IPO Calendar</h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                  </Button>
                </div>
              </div>
              {/* Calendar grid remains the same */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => {
                  const day = i + 1;
                  const ipoCount =
                    ipoCountsByDate[day as keyof typeof ipoCountsByDate];

                  return (
                    <Button
                      key={day}
                      variant="ghost"
                      className="aspect-square relative hover:bg-primary/10"
                    >
                      {day}
                      {ipoCount && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                          {ipoCount}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </div>
            </Card>

            {/* Filtered IPO List */}
            <div className="mt-8 space-y-4">
              {filteredIpos.map((ipo) => (
                <Card
                  key={ipo.id}
                  className="p-4 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant={
                            ipo.status === 'Next Week' ? 'default' : 'secondary'
                          }
                        >
                          {ipo.status}
                        </Badge>
                        <Badge variant="outline">{ipo.exchange}</Badge>
                        <Badge variant="outline">{ipo.sector}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold">{ipo.name}</h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Expected: {ipo.date}</span>
                        <span>Valuation: {ipo.valuation}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Highlights */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-2xl font-semibold mb-6">
                Upcoming Highlights
              </h2>
              <div className="space-y-4">
                {mockIpos.slice(0, 3).map((ipo) => (
                  <Card
                    key={ipo.id}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{ipo.status}</Badge>
                        <h3 className="font-semibold">{ipo.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {ipo.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Details <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
