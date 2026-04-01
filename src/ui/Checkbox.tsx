"use client";
import React, { type ReactNode } from 'react';
import { Checkbox as BaseCheckbox } from '@base-ui-components/react/checkbox';
import { cn } from '../lib/utils';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, eventDetails?: unknown) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  label?: ReactNode;
  className?: string;
}

export function Checkbox({ label, id, className, ...props }: CheckboxProps) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <BaseCheckbox.Root
        id={id}
        className={cn(
          'h-4 w-4 shrink-0 rounded border border-input bg-background shadow-sm',
          'transition-colors',
          'data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      >
        <BaseCheckbox.Indicator className="flex items-center justify-center text-current">
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M2 6L5 9L10 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label && (
        <span className="text-sm text-foreground select-none">{label}</span>
      )}
    </label>
  );
}
