'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { Logo } from './ui/logo';

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl mr-6"
        >
          <Logo />
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/ipos"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            IPO Listings
          </Link>
          <Link
            href="/timeline"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Timeline
          </Link>
          <Link
            href="/learn"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Learn
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="outline">Sign In</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </div>
  );
}
