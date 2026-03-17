import React, { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  inputSize?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 px-2.5 text-body-sm',
  md: 'h-10 px-3 text-body',
  lg: 'h-12 px-4 text-body-lg',
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, inputSize = 'md', ...props }, ref) => (
    <input
      ref={ref}
      type="date"
      className={cn(
        'w-full rounded-md border bg-background text-foreground',
        'transition-colors duration-fast',
        'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive' : 'border-input hover:border-foreground/30',
        sizeClasses[inputSize],
        className
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  )
);

DatePicker.displayName = 'DatePicker';
