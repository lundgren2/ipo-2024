import { getNewsBySlug } from '@/lib/mock-news';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Highlight, themes } from 'prism-react-renderer';
import { PageProps } from '../../../../.next/types/app/page';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | IPO Tracker`,
    description: article.description,
    openGraph: {
      images: [article.imageUrl],
    },
  };
}

const components = {
  h1: ({ ...props }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: ({ ...props }) => (
    <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="text-2xl font-bold mt-6 mb-4" {...props} />
  ),
  p: ({ ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: ({ ...props }) => <ul className="mb-4 space-y-2 ml-4" {...props} />,
  ol: ({ ...props }) => <ol className="mb-4 space-y-2 ml-4" {...props} />,
  li: ({
    ordered,
    ...props
  }: { ordered?: boolean } & React.HTMLProps<HTMLLIElement>) => (
    <li
      className={`mb-1 ${ordered ? 'list-decimal' : 'list-disc'} list-outside`}
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a
      className="text-primary hover:underline"
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="border-l-4 border-primary/20 pl-4 italic my-4"
      {...props}
    />
  ),
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const code = String(children).replace(/\n$/, '');

    if (!inline && match) {
      return (
        <Highlight theme={themes.nightOwl} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="p-4 rounded-lg overflow-x-auto my-4 bg-muted"
              style={style}
            >
              <code className={className}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      );
    }

    return (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ ...props }) => (
    <div className="relative group">
      <pre
        className="bg-muted p-4 rounded-lg overflow-x-auto my-4 text-sm"
        {...props}
      />
    </div>
  ),
  img: ({ ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg my-8 max-w-full h-auto"
      {...props}
      alt={props.alt || ''}
    />
  ),
  table: ({ ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-border" {...props} />
    </div>
  ),
  th: ({ ...props }) => (
    <th
      className="px-4 py-3 text-left text-sm font-semibold bg-muted"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className="px-4 py-3 text-sm whitespace-nowrap" {...props} />
  ),
};

export default async function NewsPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 mb-8">
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {article.author && (
              <>
                <span>{article.author}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={article.date}>{article.date}</time>
          </div>
        </div>

        <Card className="overflow-hidden mb-8">
          <div className="relative aspect-video w-full">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Card>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            {article.description}
          </p>
          {article.content && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={components}
            >
              {article.content}
            </ReactMarkdown>
          )}
        </div>
      </article>
    </main>
  );
}
