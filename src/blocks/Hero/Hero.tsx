import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeroProps {
  children: ReactNode;
  /** Minimum height of the hero section */
  minHeight?: string;
  className?: string;
}

export function Hero({ children, minHeight = '70vh', className }: HeroProps) {
  return (
    <section
      className={cn('relative flex items-center overflow-hidden', className)}
      style={{ minHeight }}
    >
      {children}
    </section>
  );
}
