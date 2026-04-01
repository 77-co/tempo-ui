import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeroHeadlineProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  /** Use white text (for use on dark/image backgrounds) */
  dark?: boolean;
  className?: string;
}

export function HeroHeadline({ children, as: Tag = 'h1', dark, className }: HeroHeadlineProps) {
  return (
    <Tag
      className={cn(
        'text-display font-heading font-bold tracking-tight',
        dark ? 'text-white' : 'text-foreground',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
