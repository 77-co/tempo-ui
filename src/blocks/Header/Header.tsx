"use client";
import React, { type ReactNode, useState, useEffect, Children, isValidElement } from 'react';
import { cn } from '../../lib/utils';
import { HeaderContext } from './HeaderContext';

export interface HeaderProps {
  children: ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export function Header({ children, sticky = false, transparent = false, className }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [transparent]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isSolid = !transparent || scrolled;

  return (
    <HeaderContext.Provider value={{ sticky, transparent, scrolled, mobileOpen, setMobileOpen }}>
      <header
        className={cn(
          'z-40 w-full transition-all duration-normal',
          sticky ? 'sticky top-0' : 'relative',
          isSolid
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm'
            : 'bg-transparent',
          className,
        )}
      >
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {children}
          </div>
        </div>
      </header>
    </HeaderContext.Provider>
  );
}
