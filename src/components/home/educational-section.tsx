'use client';

import { memo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  LineChart,
  Shield,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';

const educationalContent = [
  {
    icon: BookOpen,
    title: 'IPO Basics',
    description:
      'Learn the fundamentals of Initial Public Offerings, including the process, terminology, and key factors to consider before investing.',
    link: '/learn#basics',
  },
  {
    icon: LineChart,
    title: 'Market Analysis',
    description:
      'Understand market conditions, sector performance, and timing considerations that can affect IPO success.',
    link: '/learn#market-analysis',
  },
  {
    icon: Shield,
    title: 'Investment Strategy',
    description:
      'Develop effective strategies for participating in IPOs, including risk assessment and portfolio allocation.',
    link: '/learn#strategy',
  },
] as const;

// Memoize the EducationalCard component
const EducationalCard = memo(function EducationalCard({
  icon: Icon,
  title,
  description,
  link,
}: (typeof educationalContent)[number]) {
  return (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button variant="ghost" className="w-full">
            Learn More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

EducationalCard.displayName = 'EducationalCard';

// Memoize the entire EducationalSection component
const EducationalSection = memo(function EducationalSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">Learn About IPOs</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Understanding the IPO process and making informed investment decisions
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {educationalContent.map((content) => (
          <EducationalCard key={content.title} {...content} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/learn">
          <Button size="lg" variant="outline" className="gap-2">
            <GraduationCap className="h-5 w-5" />
            Visit Learning Center
          </Button>
        </Link>
      </div>
    </div>
  );
});

EducationalSection.displayName = 'EducationalSection';
export default EducationalSection;
