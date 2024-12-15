import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface MarketAnalysisProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
}

export function MarketAnalysis({
  title,
  description,
  date,
  imageUrl,
  category,
}: MarketAnalysisProps) {
  return (
    <Card className="overflow-hidden group">
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
          <CardTitle className="mb-4">{title}</CardTitle>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <time className="text-sm text-muted-foreground">{date}</time>
        </div>
      </div>
    </Card>
  );
}
