'use client';

import { Badge } from '@/components/ui/badge';
import { newsItems } from '@/data/news';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const article = newsItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="w-full py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className={`uppercase text-xs font-semibold px-2.5 py-0.5 ${getCategoryColor(
                article.category
              )}`}
            >
              {article.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <time dateTime={article.isoDate} className="text-sm">
                {article.date}
              </time>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">{article.description}</p>
        </div>

        {/* Author Info */}
        {article.author && (
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.author.avatar || ''}
                alt={article.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">IPO Analyst</div>
            </div>
          </div>
        )}

        {/* Featured Image */}
        <div className="relative aspect-video mb-12 rounded-xl overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => {
            // Check if the paragraph is a list
            if (paragraph.trim().startsWith('-')) {
              const items = paragraph
                .split('\n')
                .map((item) => item.trim().replace(/^-\s*/, ''));
              return (
                <ul key={index} className="list-disc pl-4 my-4">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              );
            }
            // Check if the paragraph is a numbered list
            else if (paragraph.match(/^\d+\./)) {
              const items = paragraph
                .split('\n')
                .map((item) => item.trim().replace(/^\d+\.\s*/, ''));
              return (
                <ol key={index} className="list-decimal pl-4 my-4">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ol>
              );
            }
            // Regular paragraph
            return <p key={index}>{paragraph}</p>;
          })}
        </div>

        {/* Tags */}
        {article.relatedTags && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-lg font-semibold mb-4">Related Topics</h2>
            <div className="flex flex-wrap gap-2">
              {article.relatedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2.5 py-0.5 text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading article...</div>}
    >
      <ArticleContent params={params} />
    </Suspense>
  );
}

function getCategoryColor(category: string): string {
  switch (category) {
    case 'IPO':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10';
    case 'Market':
      return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-inset ring-green-700/10';
    case 'Tech':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 ring-1 ring-inset ring-purple-700/10';
    case 'Finance':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 ring-1 ring-inset ring-yellow-700/10';
    case 'Regulatory':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 ring-1 ring-inset ring-orange-700/10';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400 ring-1 ring-inset ring-gray-700/10';
  }
}
