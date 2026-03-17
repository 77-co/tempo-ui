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
      'group rounded-[var(--radius-lg)] border border-border bg-card p-6',
      'transition-all duration-normal',
      href && 'hover:shadow-md hover:border-primary/30 cursor-pointer',
      className
    )}>
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-primary/10 text-primary">
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
  /** Optional section heading rendered above the grid */
  heading?: string;
  /** Optional section subheadline rendered below the heading */
  subheadline?: string;
  /** Accessible label for the section (defaults to heading or "Features") */
  'aria-label'?: string;
  /** Control section vertical padding size ('sm' | 'md' | 'lg'). Defaults to 'md'. */
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

const colClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

// const spacingVar = {
//   sm: 'var(--spacing-section-sm)',
//   md: 'var(--spacing-section)',
//   lg: 'var(--spacing-section-lg)',
// };

export function FeatureGrid({
  features,
  columns = 3,
  heading,
  subheadline,
  'aria-label': ariaLabel,
  spacing = 'md',
  className,
  renderLink,
}: FeatureGridProps) {
  const sectionLabel = ariaLabel ?? heading ?? 'Features';
  // const pad = spacingVar[spacing];

  return (
    <section
      aria-label={sectionLabel}
      // style={{ paddingTop: pad, paddingBottom: pad }}
    >
      <div className="mx-auto max-w-container-xl">
        {(heading || subheadline) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-heading-xl font-heading font-bold text-foreground">
                {heading}
              </h2>
            )}
            {subheadline && (
              <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        )}
        <div className={cn('grid grid-cols-1 gap-6', colClasses[columns], className)}>
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} renderLink={renderLink} />
          ))}
        </div>
      </div>
    </section>
  );
}
