"use client";
import React, { useState, useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SiteHeaderProps {
  /** Logo slot (image or text) */
  logo: ReactNode;
  /** Navigation links slot */
  navigation?: ReactNode;
  /** Right-side action buttons */
  actions?: ReactNode;
  /** Sticky behavior */
  sticky?: boolean;
  /** Transparent over hero (becomes solid on scroll) */
  transparent?: boolean;
  className?: string;
}

export function SiteHeader({ logo, navigation, actions, sticky = true, transparent = false, className }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [transparent]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isTransparent = transparent && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        'z-40 w-full transition-all duration-normal',
        sticky && 'sticky top-0',
        isTransparent
          ? 'bg-transparent text-white'
          : 'bg-background/95 text-foreground backdrop-blur-md border-b border-border',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-container-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">{logo}</div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
          {navigation}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-2">
          {actions}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md lg:hidden hover:bg-muted/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={18} x2={21} y2={18} />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav
            className="relative h-full w-full max-w-sm bg-background p-6 shadow-xl animate-slide-in-from-left overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              {navigation}
            </div>
            {actions && (
              <div className="mt-8 flex flex-col gap-2 border-t border-border pt-6">
                {actions}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
