"use client";
import React, { type ReactNode } from 'react';
import { RadioGroup as BaseRadioGroup } from '@base-ui-components/react/radio-group';
import { Radio as BaseRadio } from '@base-ui-components/react/radio';
import { cn } from '../lib/utils';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: unknown, eventDetails?: unknown) => void;
  options: RadioOption[];
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  options,
  orientation = 'vertical',
  className,
  ...props
}: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={cn(
        'flex gap-3',
        orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            'flex items-center gap-2 cursor-pointer',
            option.disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          <BaseRadio.Root
            value={option.value}
            disabled={option.disabled}
            className={cn(
              'h-4 w-4 shrink-0 rounded-full border border-input bg-background shadow-sm',
              'transition-colors',
              'data-[checked]:border-primary data-[checked]:bg-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
          >
            <BaseRadio.Indicator
              className={cn(
                'flex items-center justify-center w-full h-full',
                'after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-primary-foreground',
              )}
            />
          </BaseRadio.Root>
          <span className="text-sm text-foreground select-none">{option.label}</span>
        </label>
      ))}
    </BaseRadioGroup>
  );
}
