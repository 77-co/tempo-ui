import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  /** Center content horizontally */
  center?: boolean;
  /** Horizontal padding */
  padding?: boolean;
  children: ReactNode;
}

const sizeClasses = {
  sm: 'max-w-container-sm',
  default: 'max-w-container',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
  full: 'max-w-full',
};

/**
 * A responsive container with constrained max-width.
 * Centers content and applies consistent horizontal padding.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', center = true, padding = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          sizeClasses[size],
          center && 'mx-auto',
          padding && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
