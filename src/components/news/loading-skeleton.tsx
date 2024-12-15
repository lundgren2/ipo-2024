import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function FeaturedStorySkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[2/1] w-full">
        <Skeleton className="absolute inset-0" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-2/3" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Skeleton className="absolute inset-0" />
        <Skeleton className="absolute top-4 left-4 h-6 w-24" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </Card>
  );
}

export function MarketAnalysisSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="grid md:grid-cols-2 gap-4">
        <Skeleton className="h-48 md:h-full" />
        <div className="p-6 space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </Card>
  );
}

export function NewsLoadingSkeleton() {
  return (
    <div className="space-y-8">
      <FeaturedStorySkeleton />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
