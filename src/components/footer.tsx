'use client';

import Link from 'next/link';
import {
  SiX as X,
  SiLinkedin as Linkedin,
  SiFacebook as Facebook,
  SiYoutube as Youtube,
  SiInstagram as Instagram,
} from '@icons-pack/react-simple-icons';

interface FooterLink {
  name: string;
  href: string;
  badge?: string;
}

interface FooterLinks {
  [category: string]: FooterLink[];
}

const footerLinks: FooterLinks = {
  PRODUCT: [
    { name: 'IPO Calendar', href: '/calendar' },
    { name: 'Market Analysis', href: '/analysis' },
    { name: 'Watchlist', href: '/watchlist' },
    { name: 'Price Alerts', href: '/alerts' },
    { name: 'Company Research', href: '/research' },
    { name: 'Performance Tracking', href: '/tracking', badge: 'NEW' },
    { name: 'Portfolio Integration', href: '/portfolio' },
    { name: 'Market Sentiment', href: '/sentiment', badge: 'BETA' },
    { name: 'API Access', href: '/api' },
  ],
  SOLUTIONS: [
    { name: 'For Investors', href: '/investors' },
    { name: 'For Institutions', href: '/institutions' },
    { name: 'For Companies', href: '/companies' },
    { name: 'For Brokers', href: '/brokers' },
    { name: 'Financial Advisors', href: '/advisors' },
  ],
  RESOURCES: [
    { name: 'Learning Hub', href: '/learn' },
    { name: 'Blog', href: '/blog' },
    { name: 'Market Reports', href: '/reports' },
    { name: 'IPO Guidelines', href: '/guidelines' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Research Papers', href: '/papers' },
    { name: 'Case Studies', href: '/cases' },
    { name: 'Documentation', href: '/docs' },
  ],
  COMPANY: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers', badge: "WE'RE HIRING" },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
  LEGAL: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Security', href: '/security' },
  ],
};

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-transparent via-brand/[0.02] to-brand/[0.04] text-muted-foreground">
      <div className="max-w-[1280px] mx-auto px-4 py-16">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-medium mb-4 tracking-wide">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link: FooterLink) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors text-[13px] inline-flex items-center gap-2"
                    >
                      {link.name}
                      {link.badge ? (
                        <span className="text-[10px] font-medium bg-brand/10 text-brand px-1.5 py-0.5 rounded">
                          {link.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted-foreground/10">
          <div className="text-sm mb-4 md:mb-0">
            © 2017 - {new Date().getFullYear()} IPO.se - All rights reserved
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://twitter.com"
              className="hover:text-white transition-colors"
            >
              <X size={18} />
            </Link>
            <Link
              href="https://youtube.com"
              className="hover:text-white transition-colors"
            >
              <Youtube size={18} />
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-white transition-colors"
            >
              <Linkedin size={18} />
            </Link>
            <Link
              href="https://facebook.com"
              className="hover:text-white transition-colors"
            >
              <Facebook size={18} />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-white transition-colors"
            >
              <Instagram size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
