import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Error state */
  error?: boolean;
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg';
  /** Icon on the left */
  iconLeft?: React.ReactNode;
  /** Icon on the right */
  iconRight?: React.ReactNode;
}

const sizeClasses = {
  sm: 'h-8 px-2.5 text-body-sm',
  md: 'h-10 px-3 text-body',
  lg: 'h-12 px-4 text-body-lg',
};

/**
 * Accessible text input component with error, icon, and size variants.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, error, inputSize = 'md', iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft || iconRight) {
      return (
        <div className="relative">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-md border bg-background text-foreground',
              'placeholder:text-muted-foreground',
              'transition-colors duration-fast',
              'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-destructive focus-visible:outline-destructive'
                : 'border-input hover:border-foreground/30',
              sizeClasses[inputSize],
              iconLeft && 'pl-10',
              iconRight && 'pr-10',
              className
            )}
            aria-invalid={error || undefined}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border bg-background text-foreground',
          'placeholder:text-muted-foreground',
          'transition-colors duration-fast',
          'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-destructive focus-visible:outline-destructive'
            : 'border-input hover:border-foreground/30',
          sizeClasses[inputSize],
          className
        )}
        aria-invalid={error || undefined}
        {...props}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
