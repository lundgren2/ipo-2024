'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const timelineSteps = [
  {
    id: 1,
    title: 'Pre-IPO Planning',
    duration: '3-6 months',
    status: 'Planning',
    items: [
      'Select investment banks',
      'Assemble IPO team',
      'Initial documentation',
    ],
  },
  {
    id: 2,
    title: 'Due Diligence',
    duration: '2-3 months',
    status: 'Documentation',
    items: ['Financial audits', 'Legal review', 'Business analysis'],
  },
  {
    id: 3,
    title: 'SEC Filing',
    duration: '2-4 months',
    status: 'Review',
    items: [
      'Submit S-1 filing',
      'Respond to SEC comments',
      'Update prospectus',
    ],
  },
  {
    id: 4,
    title: 'Marketing',
    duration: '3-4 weeks',
    status: 'Active',
    items: [
      'Roadshow presentations',
      'Investor meetings',
      'Price range setting',
    ],
  },
  {
    id: 5,
    title: 'Pricing & Trading',
    duration: '1-2 weeks',
    status: 'Final',
    items: ['Final pricing', 'Share allocation', 'First day trading'],
  },
];

const statusColors = {
  Planning: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
  Documentation:
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  Review:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  Final: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
};

export function IPOTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 h-full w-0.5 bg-muted -translate-x-1/2" />
      <div className="space-y-12 relative">
        {timelineSteps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'flex gap-8',
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            )}
          >
            <div className="w-1/2 flex items-center justify-end">
              <Card
                className={cn(
                  'w-full max-w-md transition-all hover:shadow-lg',
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                )}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {step.duration}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        'ml-2',
                        statusColors[step.status as keyof typeof statusColors]
                      )}
                    >
                      {step.status}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {step.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                {step.id}
              </div>
            </div>
            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
