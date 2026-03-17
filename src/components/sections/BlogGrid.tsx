import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface BlogPost {
  title: string;
  excerpt?: string;
  href: string;
  image?: string | PayloadMedia;
  category?: string;
  date?: string;
  author?: { name: string; avatar?: string | PayloadMedia };
}

export interface BlogPostCardProps extends BlogPost {
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

export function BlogPostCard({ title, excerpt, href, image, category, date, author, className, renderLink }: BlogPostCardProps) {
  const imgUrl = typeof image === 'string' ? image : image?.url;
  const avatarUrl = typeof author?.avatar === 'string' ? author.avatar : (author?.avatar as PayloadMedia)?.url;

  const card = (
    <article className={cn('group rounded-lg border border-border bg-card overflow-hidden transition-shadow duration-normal hover:shadow-md', className)}>
      {imgUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={imgUrl} alt={title} className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="p-5">
        {category && <span className="text-caption font-medium text-primary">{category}</span>}
        <h3 className="mt-1 text-heading-sm font-heading font-semibold text-card-foreground line-clamp-2">{title}</h3>
        {excerpt && <p className="mt-2 text-body-sm text-muted-foreground line-clamp-3">{excerpt}</p>}
        <div className="mt-4 flex items-center gap-2 text-caption text-muted-foreground">
          {avatarUrl && <img src={avatarUrl} alt={author?.name || ''} className="h-6 w-6 rounded-full object-cover" />}
          {author?.name && <span>{author.name}</span>}
          {date && <span>· {date}</span>}
        </div>
      </div>
    </article>
  );

  if (renderLink) return renderLink({ href, className: 'block', children: card }) as React.ReactElement;
  return <a href={href} className="block">{card}</a>;
}

export interface BlogGridProps {
  posts: BlogPost[];
  columns?: 2 | 3 | 4;
  className?: string;
  renderLink?: BlogPostCardProps['renderLink'];
}

const colClasses = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };

export function BlogGrid({ posts, columns = 3, className, renderLink }: BlogGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6', colClasses[columns], className)}>
      {posts.map((post, i) => (
        <BlogPostCard key={i} {...post} renderLink={renderLink} />
      ))}
    </div>
  );
}
