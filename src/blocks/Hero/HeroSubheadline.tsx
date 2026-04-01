import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeroSubheadlineProps {
  children: ReactNode;
  /** Use light text (for use on dark/image backgrounds) */
  dark?: boolean;
  className?: string;
}

export function HeroSubheadline({ children, dark, className }: HeroSubheadlineProps) {
  return (
    <p
      className={cn(
        'text-body-lg max-w-prose',
        dark ? 'text-white/80' : 'text-muted-foreground',
        className,
      )}
    >
      {children}
    </p>
  );
}
