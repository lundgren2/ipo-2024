'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, CheckCircle2, Loader2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <Bell className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">Stay Updated on IPO Markets</h2>
        </div>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Get exclusive insights on upcoming IPOs, market analysis, and breaking
          news delivered straight to your inbox. Join thousands of investors who
          trust our newsletter.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center text-green-600 dark:text-green-400 space-x-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>
              Thank you for subscribing! Please check your email to confirm.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={status === 'loading'}
            />
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe Now'
              )}
            </Button>
          </form>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
          You can unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
