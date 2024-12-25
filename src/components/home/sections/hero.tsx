import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <div className="relative bg-background">
      <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Track the Latest</span>
            <span className="block text-primary">Initial Public Offerings</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Stay informed about upcoming IPOs, track performance, and make
            informed investment decisions with our comprehensive IPO tracking
            platform.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/ipos">
                <Button size="lg" className="w-full sm:w-auto">
                  View Latest IPOs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/timeline">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  View Timeline
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
