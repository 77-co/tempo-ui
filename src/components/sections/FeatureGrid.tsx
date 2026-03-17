import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FeatureCardProps {
  icon?: ReactNode;
  heading: string;
  description: string;
  href?: string;
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

export function FeatureCard({ icon, heading, description, href, className, renderLink }: FeatureCardProps) {
  const content = (
    <div className={cn(
      'group rounded-lg border border-border bg-card p-6',
      'transition-all duration-normal',
      href && 'hover:shadow-md hover:border-primary/30 cursor-pointer',
      className
    )}>
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-heading-sm font-heading font-semibold text-card-foreground">{heading}</h3>
      <p className="mt-2 text-body text-muted-foreground">{description}</p>
      {href && (
        <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-primary group-hover:gap-2 transition-all">
          Learn more →
        </span>
      )}
    </div>
  );

  if (href && renderLink) {
    return renderLink({ href, className: 'block', children: content });
  }
  if (href) {
    return <a href={href} className="block">{content}</a>;
  }
  return content;
}

export interface FeatureGridProps {
  features: FeatureCardProps[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const colClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function FeatureGrid({ features, columns = 3, className }: FeatureGridProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6', colClasses[columns], className)}>
      {features.map((feature, i) => (
        <FeatureCard key={i} {...feature} />
      ))}
    </div>
  );
}
