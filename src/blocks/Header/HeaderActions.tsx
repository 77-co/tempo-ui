import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeaderActionsProps {
  children: ReactNode;
  className?: string;
}

export function HeaderActions({ children, className }: HeaderActionsProps) {
  return (
    <div className={cn('hidden md:flex items-center gap-2 shrink-0', className)}>
      {children}
    </div>
  );
}
