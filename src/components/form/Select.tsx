import React, { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  options: SelectOption[];
  placeholder?: string;
  inputSize?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-8 px-2.5 text-body-sm',
  md: 'h-10 px-3 text-body',
  lg: 'h-12 px-4 text-body-lg',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, placeholder, inputSize = 'md', ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'w-full rounded-md border bg-background text-foreground appearance-none',
        'transition-colors duration-fast',
        'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive' : 'border-input hover:border-foreground/30',
        sizeClasses[inputSize],
        className
      )}
      aria-invalid={error || undefined}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  )
);

Select.displayName = 'Select';
