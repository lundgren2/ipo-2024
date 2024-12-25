import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function BreakingNews() {
  return (
    <div className="bg-primary/5 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="default" className="uppercase">
            Breaking
          </Badge>
          <span className="font-medium">
            Reddit IPO debuts with 48% surge in first day of trading
          </span>
          <Link
            href="/news/reddit-ipo"
            className="ml-auto text-primary hover:underline flex items-center gap-1"
          >
            Read More <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
