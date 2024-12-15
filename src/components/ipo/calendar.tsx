'use client';

import { useEffect, useState } from 'react';
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
import { IPO } from './ipo-list';
import { IPODetails } from './ipo-details';

interface CalendarEvent {
  date: number;
  ipos: Array<{
    ipo: IPO;
    type: 'pricing' | 'trading' | 'filing';
  }>;
}

const eventTypeColors = {
  pricing: 'bg-green-500',
  trading: 'bg-blue-500',
  filing: 'bg-orange-500',
} as const;

interface IPOCalendarProps {
  selectedDate?: number | null;
  onDateSelect?: (date: number) => void;
  ipos?: IPO[];
}

export function IPOCalendar({
  selectedDate,
  onDateSelect,
  ipos = [],
}: IPOCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<
    Record<number, CalendarEvent>
  >({});
  const [selectedIPO, setSelectedIPO] = useState<IPO | null>(null);
  const [showIPODetails, setShowIPODetails] = useState(false);

  useEffect(() => {
    const events: Record<number, CalendarEvent> = {};

    ipos.forEach((ipo) => {
      const ipoDate = new Date(ipo.date);
      const day = ipoDate.getDate();

      if (!events[day]) {
        events[day] = {
          date: day,
          ipos: [],
        };
      }

      let type: 'pricing' | 'trading' | 'filing' = 'filing';
      if (ipo.status === 'Next Week') {
        type = 'pricing';
      } else if (ipo.status === 'Completed') {
        type = 'trading';
      }

      events[day].ipos.push({ ipo, type });
    });

    setCalendarEvents(events);
  }, [ipos]);

  const handleIPOClick = (ipo: IPO) => {
    setSelectedIPO(ipo);
    setShowIPODetails(true);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">IPO Calendar</h2>
        </div>
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
                    {event.ipos.map(({ ipo, type }, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 cursor-pointer hover:text-primary"
                        onClick={() => handleIPOClick(ipo)}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${eventTypeColors[type]}`}
                        />
                        <span>
                          {ipo.name} -{' '}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
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
            {calendarEvents[selectedDate].ipos.map(({ ipo, type }, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer"
                onClick={() => handleIPOClick(ipo)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${eventTypeColors[type]}`}
                  />
                  <span>{ipo.name}</span>
                </div>
                <Badge variant="secondary">{type}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedIPO && (
        <IPODetails
          ipo={selectedIPO}
          open={showIPODetails}
          onOpenChange={setShowIPODetails}
        />
      )}
    </Card>
  );
}
