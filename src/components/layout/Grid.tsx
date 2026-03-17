import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns at each breakpoint */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columns on sm breakpoint */
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columns on md breakpoint */
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Columns on lg breakpoint */
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

const colClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
};

const colSmClasses: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
};

const colMdClasses: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
};

const colLgClasses: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
};

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-3',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

/**
 * CSS Grid layout component with responsive column configuration.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, colsSm, colsMd, colsLg, gap = 'md', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          colClasses[cols],
          colsSm && colSmClasses[colsSm],
          colsMd && colMdClasses[colsMd],
          colsLg && colLgClasses[colsLg],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
