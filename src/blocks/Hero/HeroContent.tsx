import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeroContentProps {
  children: ReactNode;
  /** Vertical alignment within the hero */
  align?: 'top' | 'center' | 'bottom';
  /** Text and content alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Max-width of the content area */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const alignClasses = {
  top: 'items-start',
  center: 'items-center',
  bottom: 'items-end',
};

const textAlignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full',
};

export function HeroContent({
  children,
  align = 'center',
  textAlign = 'center',
  maxWidth = 'lg',
  className,
}: HeroContentProps) {
  return (
    <div
      className={cn(
        'relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-6',
        alignClasses[align],
        textAlignClasses[textAlign],
        maxWidthClasses[maxWidth],
        className,
      )}
    >
      {children}
    </div>
  );
}
