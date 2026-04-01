import React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const sizeClasses = {
  sm: 'h-8 text-xs px-2.5',
  md: 'h-9 text-sm px-3',
  lg: 'h-11 text-base px-4',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, size = 'md', iconLeft, iconRight, className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-2.5 flex items-center text-muted-foreground pointer-events-none">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-md border border-input bg-background text-foreground shadow-sm',
            'placeholder:text-muted-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors',
            sizeClasses[size],
            iconLeft && 'pl-8',
            iconRight && 'pr-8',
            error && 'border-destructive focus-visible:ring-destructive',
            className,
          )}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-2.5 flex items-center text-muted-foreground pointer-events-none">
            {iconRight}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
