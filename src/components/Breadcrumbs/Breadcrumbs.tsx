import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  /** Custom link renderer for framework integration (Next.js Link, etc.) */
  renderLink?: (item: BreadcrumbItem, children: ReactNode) => ReactNode;
}

export function Breadcrumbs({ items, separator, className, renderLink }: BreadcrumbsProps) {
  const defaultSeparator = (
    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const linkContent = (
            <span className="inline-flex items-center gap-1">
              {item.icon && <span aria-hidden="true">{item.icon}</span>}
              {item.label}
            </span>
          );

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="flex-shrink-0">
                  {separator || defaultSeparator}
                </span>
              )}
              {isLast ? (
                <span className="text-body-sm text-foreground font-medium" aria-current="page">
                  {linkContent}
                </span>
              ) : item.href ? (
                renderLink ? (
                  renderLink(item, <span className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">{linkContent}</span>)
                ) : (
                  <a
                    href={item.href}
                    className="text-body-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {linkContent}
                  </a>
                )
              ) : (
                <span className="text-body-sm text-muted-foreground">{linkContent}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
