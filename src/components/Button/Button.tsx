import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  /** Icon placed before text */
  iconLeft?: ReactNode;
  /** Icon placed after text */
  iconRight?: ReactNode;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  /** Stretch to full container width */
  fullWidth?: boolean;
  /** Render as a different element (e.g. anchor) */
  asChild?: boolean;
  children?: ReactNode;
}

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-colors duration-normal ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variantClasses = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80',
  ghost:
    'bg-transparent text-foreground hover:bg-muted active:bg-muted/80',
  destructive:
    'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
  link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
};

const sizeClasses = {
  sm: 'h-8 px-3 text-body-sm rounded-sm gap-1.5',
  md: 'h-10 px-4 text-body rounded-md gap-2',
  lg: 'h-12 px-6 text-body-lg rounded-md gap-2.5',
  xl: 'h-14 px-8 text-body-lg rounded-lg gap-3',
  icon: 'h-10 w-10 rounded-md',
};

/**
 * A versatile button component with multiple variants, sizes, and states.
 * Supports icons, loading state, and full keyboard accessibility.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      loading = false,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && (
          <LoadingSpinner className="h-4 w-4 animate-spin" />
        )}
        {!loading && iconLeft && (
          <span className="shrink-0" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {children}
        {!loading && iconRight && (
          <span className="shrink-0" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
