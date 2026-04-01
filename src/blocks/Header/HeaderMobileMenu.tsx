"use client";
import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useHeaderContext } from './HeaderContext';

export interface HeaderMobileMenuProps {
  children: ReactNode;
  className?: string;
}

function MenuIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function HeaderMobileMenu({ children, className }: HeaderMobileMenuProps) {
  const { mobileOpen, setMobileOpen } = useHeaderContext();

  return (
    <>
      <button
        type="button"
        className={cn(
          'md:hidden inline-flex items-center justify-center rounded-md p-2',
          'text-muted-foreground hover:text-foreground hover:bg-muted/50',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        )}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {mobileOpen && (
        <div
          className={cn(
            'fixed inset-0 top-16 z-50 bg-background md:hidden',
            'animate-slide-in-from-left',
            className,
          )}
          role="dialog"
          aria-label="Mobile navigation"
        >
          <nav
            className="flex flex-col gap-1 px-4 py-6"
            aria-label="Mobile navigation links"
          >
            {children}
          </nav>
        </div>
      )}
    </>
  );
}
