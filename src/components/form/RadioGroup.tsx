import React from 'react';
import { cn } from '../../lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4',
        className
      )}
    >
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        return (
          <div key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={opt.disabled}
              onChange={() => onChange?.(opt.value)}
              className={cn(
                'h-4 w-4 border border-input bg-background text-primary accent-primary',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error && 'border-destructive'
              )}
              aria-invalid={error || undefined}
            />
            <label
              htmlFor={id}
              className={cn(
                'text-body-sm text-foreground cursor-pointer select-none',
                opt.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {opt.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
