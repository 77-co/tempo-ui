"use client";
import React, { type ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import { cn } from '../lib/utils';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null, eventDetails?: unknown) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 text-xs px-2.5',
  md: 'h-9 text-sm px-3',
  lg: 'h-11 text-base px-4',
};

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 opacity-50"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function renderOptions(options: SelectOption[]) {
  return options.map((option) => (
    <BaseSelect.Item
      key={option.value}
      value={option.value}
      disabled={option.disabled}
      className={cn(
        'flex items-center justify-between gap-2 px-2 py-1.5 text-sm rounded-sm cursor-default select-none',
        'text-foreground',
        'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      )}
    >
      <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator>
        <CheckIcon />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  ));
}

export function Select({
  options = [],
  groups = [],
  placeholder = 'Select an option…',
  error,
  size = 'md',
  className,
  ...props
}: SelectProps) {
  return (
    <BaseSelect.Root {...props}>
      <BaseSelect.Trigger
        className={cn(
          'flex w-full items-center justify-between rounded-md border border-input bg-background text-foreground shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors',
          sizeClasses[size],
          error && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
      >
        <BaseSelect.Value>
          {(value: string | null) =>
            value ? value : <span className="text-muted-foreground">{placeholder}</span>
          }
        </BaseSelect.Value>
        <BaseSelect.Icon>
          <ChevronIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4}>
          <BaseSelect.Popup
            className={cn(
              'z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md',
              'origin-[var(--transform-origin)] transition-[transform,scale,opacity]',
              'data-[open]:animate-scale-in data-[closed]:opacity-0 data-[closed]:scale-95',
            )}
          >
            <BaseSelect.List className="p-1 max-h-60 overflow-y-auto">
              {groups.length > 0
                ? groups.map((group) => (
                    <BaseSelect.Group key={group.label}>
                      <BaseSelect.GroupLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {group.label}
                      </BaseSelect.GroupLabel>
                      {renderOptions(group.options)}
                    </BaseSelect.Group>
                  ))
                : renderOptions(options)}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}
