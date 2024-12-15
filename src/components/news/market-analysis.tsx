import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface MarketAnalysisProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  slug: string;
}

export function MarketAnalysis({
  title,
  description,
  date,
  imageUrl,
  category,
  slug,
}: MarketAnalysisProps) {
  return (
    <Link href={`/news/${slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative h-48 md:h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="p-6">
            <Badge className="mb-4">{category}</Badge>
            <CardTitle className="mb-4 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <time className="text-sm text-muted-foreground">{date}</time>
          </div>
        </div>
      </Card>
    </Link>
  );
}
