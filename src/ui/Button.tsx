import React, { type ReactNode } from 'react';
import { Button as BaseButton } from '@base-ui-components/react/button';
import { cn } from '../lib/utils';

export interface ButtonProps {
  children?: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'link' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  /** Base UI render prop — pass a ReactElement (e.g. <Link href="..." />) to change the rendered element */
  render?: React.ReactElement;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:
    'bg-primary text-primary-foreground shadow hover:bg-primary/90 focus-visible:ring-ring',
  secondary:
    'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
  outline:
    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  destructive:
    'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
  link: 'text-primary underline-offset-4 hover:underline',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-9 px-4 py-2 text-sm rounded-md',
  lg: 'h-10 px-6 text-base rounded-md',
  xl: 'h-12 px-8 text-base rounded-lg',
  icon: 'h-9 w-9 rounded-md',
};

export function Button({
  children,
  variant = 'default',
  size = 'md',
  render,
  loading = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      render={render as React.ReactElement<Record<string, unknown>>}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : iconLeft}
      {children}
      {!loading && iconRight}
    </BaseButton>
  );
}
