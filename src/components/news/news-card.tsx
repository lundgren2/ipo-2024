import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  slug: string;
}

export function NewsCard({
  title,
  description,
  date,
  imageUrl,
  category,
  slug,
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4 z-10">{category}</Badge>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          <time className="text-sm text-muted-foreground">{date}</time>
        </CardContent>
      </Card>
    </Link>
  );
}
