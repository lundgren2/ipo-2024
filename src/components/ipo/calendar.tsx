'use client';

import { CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type CalendarEvent = {
  date: number;
  ipos: Array<{
    name: string;
    type: 'pricing' | 'trading' | 'filing';
  }>;
};

const calendarEvents: Record<number, CalendarEvent> = {
  5: {
    date: 5,
    ipos: [
      { name: 'TechCorp', type: 'pricing' },
      { name: 'BioMed', type: 'trading' },
    ],
  },
  12: {
    date: 12,
    ipos: [{ name: 'GreenEnergy', type: 'filing' }],
  },
  15: {
    date: 15,
    ipos: [
      { name: 'Reddit', type: 'pricing' },
      { name: 'CloudTech', type: 'trading' },
      { name: 'FinStart', type: 'filing' },
    ],
  },
  22: {
    date: 22,
    ipos: [
      { name: 'DataAI', type: 'pricing' },
      { name: 'SpaceTech', type: 'filing' },
    ],
  },
};

const eventTypeColors = {
  pricing: 'bg-green-500',
  trading: 'bg-blue-500',
  filing: 'bg-orange-500',
} as const;

interface IPOCalendarProps {
  selectedDate?: number | null;
  onDateSelect?: (date: number) => void;
}

export function IPOCalendar({ selectedDate, onDateSelect }: IPOCalendarProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">IPO Calendar</h2>
        </div>
        <div className="flex gap-2">
          <Select value="march" onValueChange={() => {}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="March 2024" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="march">March 2024</SelectItem>
              <SelectItem value="april">April 2024</SelectItem>
              <SelectItem value="may">May 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }, (_, i) => {
          const day = i + 1;
          const event = calendarEvents[day];

          return (
            <Tooltip key={day}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`aspect-square relative hover:bg-primary/10 ${
                    selectedDate === day ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => onDateSelect?.(day)}
                >
                  {day}
                  {event && (
                    <div className="absolute -top-2 -right-2 flex gap-0.5">
                      {event.ipos.map((ipo, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full ${
                            eventTypeColors[ipo.type]
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </Button>
              </TooltipTrigger>
              {event && (
                <TooltipContent>
                  <div className="space-y-2">
                    {event.ipos.map((ipo, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            eventTypeColors[ipo.type]
                          }`}
                        />
                        <span>
                          {ipo.name} -{' '}
                          {ipo.type.charAt(0).toUpperCase() + ipo.type.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>

      {selectedDate && calendarEvents[selectedDate] && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Events for March {selectedDate}</h3>
          <div className="space-y-2">
            {calendarEvents[selectedDate].ipos.map((ipo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      eventTypeColors[ipo.type]
                    }`}
                  />
                  <span>{ipo.name}</span>
                </div>
                <Badge variant="secondary">{ipo.type}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
