"use client";
import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterLegalProps {
  children?: ReactNode;
  copyright?: string;
  showBackToTop?: boolean;
  className?: string;
}

export function FooterLegal({
  children,
  copyright,
  showBackToTop = false,
  className,
}: FooterLegalProps) {
  return (
    <div
      className={cn(
        'mt-8 border-t border-border pt-8',
        'mx-auto max-w-container px-4 sm:px-6 lg:px-8',
        'flex flex-col sm:flex-row items-center justify-between gap-4',
        className,
      )}
    >
      {copyright && (
        <p className="text-sm text-muted-foreground">{copyright}</p>
      )}
      {children && (
        <nav className="flex flex-wrap items-center gap-4" aria-label="Legal links">
          {children}
        </nav>
      )}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={cn(
            'text-sm text-muted-foreground hover:text-foreground transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
          )}
        >
          Back to top ↑
        </button>
      )}
    </div>
  );
}
