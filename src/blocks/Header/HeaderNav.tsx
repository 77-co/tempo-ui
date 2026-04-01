import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeaderNavProps {
  children: ReactNode;
  'aria-label'?: string;
  className?: string;
}

export function HeaderNav({ children, 'aria-label': ariaLabel = 'Main navigation', className }: HeaderNavProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn('hidden md:flex items-center gap-1 flex-1', className)}
    >
      {children}
    </nav>
  );
}
