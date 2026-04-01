import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterProps {
  children: ReactNode;
  className?: string;
}

export function Footer({ children, className }: FooterProps) {
  return (
    <footer className={cn('bg-background border-t border-border', className)}>
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {children}
        </div>
      </div>
    </footer>
  );
}
