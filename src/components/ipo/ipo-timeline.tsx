'use client';

import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export interface TimelineStage {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
}

interface IPOTimelineProps {
  stages: TimelineStage[];
  className?: string;
}

export function IPOTimeline({ stages, className }: IPOTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Timeline Line */}
      <div className="absolute left-[21px] top-4 bottom-4 w-px bg-border" />

      {/* Timeline Stages */}
      <div className="space-y-8">
        {stages.map((stage) => (
          <div key={stage.id} className="relative flex gap-6 group">
            {/* Stage Icon */}
            <div
              className={cn(
                'relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 bg-background transition-colors',
                stage.status === 'completed'
                  ? 'border-primary'
                  : stage.status === 'current'
                  ? 'border-brand animate-pulse'
                  : 'border-muted-foreground/20'
              )}
            >
              {stage.status === 'completed' ? (
                <CheckCircle2 className="h-6 w-6 text-primary" />
              ) : stage.status === 'current' ? (
                <Clock className="h-6 w-6 text-brand" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground/40" />
              )}
            </div>

            {/* Stage Content */}
            <div className="flex-1 pt-1.5 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h3
                  className={cn(
                    'text-base font-medium leading-6',
                    stage.status === 'completed'
                      ? 'text-primary'
                      : stage.status === 'current'
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {stage.title}
                </h3>
                <div
                  className={cn(
                    'text-sm',
                    stage.status === 'completed'
                      ? 'text-muted-foreground'
                      : stage.status === 'current'
                      ? 'text-brand font-medium'
                      : 'text-muted-foreground/60'
                  )}
                >
                  {stage.date}
                </div>
              </div>
              {stage.description && (
                <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                  {stage.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
