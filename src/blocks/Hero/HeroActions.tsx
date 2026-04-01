import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeroActionsProps {
  children: ReactNode;
  className?: string;
}

export function HeroActions({ children, className }: HeroActionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {children}
    </div>
  );
}
