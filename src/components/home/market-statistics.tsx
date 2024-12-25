'use client';

import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Building, DollarSign, TrendingUp, Award } from 'lucide-react';

const statistics = [
  {
    icon: Building,
    value: '127',
    label: 'Active IPOs',
    color: 'text-primary',
  },
  {
    icon: DollarSign,
    value: '$84B',
    label: 'Total Market Cap',
    color: 'text-primary',
  },
  {
    icon: TrendingUp,
    value: '+24%',
    label: 'Average Return',
    color: 'text-primary',
  },
  {
    icon: Award,
    value: '89%',
    label: 'Success Rate',
    color: 'text-primary',
  },
] as const;

// Memoize the StatCard component
const StatCard = memo(function StatCard({
  icon: Icon,
  value,
  label,
}: (typeof statistics)[number]) {
  return (
    <Card className="text-center p-6 hover:shadow-lg transition-all">
      <div className="flex flex-col items-center gap-2">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-primary">{value}</h3>
        <p className="text-muted-foreground">{label}</p>
      </div>
    </Card>
  );
});

StatCard.displayName = 'StatCard';

// Memoize the entire MarketStatistics component
const MarketStatistics = memo(function MarketStatistics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statistics.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
});

MarketStatistics.displayName = 'MarketStatistics';
export default MarketStatistics;
