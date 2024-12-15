import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedStoryProps {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  author: string;
  slug: string;
}

export function FeaturedStory({
  title,
  description,
  date,
  imageUrl,
  category,
  author,
  slug,
}: FeaturedStoryProps) {
  return (
    <Link href={`/news/${slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-all">
        <div className="relative aspect-[2/1] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground">
                {category}
              </Badge>
              <h2 className="text-3xl font-bold group-hover:text-primary/90 transition-colors">
                {title}
              </h2>
              <p className="text-lg text-gray-200 max-w-2xl">{description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <span>{author}</span>
                <span>•</span>
                <time>{date}</time>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
