"use client";
import React, { type ReactNode } from 'react';
import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import { cn } from '../lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean, eventDetails?: unknown) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  label?: ReactNode;
  className?: string;
}

export function Switch({ label, id, className, ...props }: SwitchProps) {
  return (
    <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
      <BaseSwitch.Root
        id={id}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent',
          'bg-input transition-colors duration-normal',
          'data-[checked]:bg-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        {...props}
      >
        <BaseSwitch.Thumb
          className={cn(
            'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-sm ring-0',
            'transition-transform duration-normal',
            'translate-x-0 data-[checked]:translate-x-4',
          )}
        />
      </BaseSwitch.Root>
      {label && (
        <span className="text-sm text-foreground select-none">{label}</span>
      )}
    </label>
  );
}
