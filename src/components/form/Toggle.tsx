import React from 'react';
import { cn } from '../../lib/utils';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
  name?: string;
}

const sizes = {
  sm: { track: 'h-5 w-9', thumb: 'h-3.5 w-3.5', translate: 'translate-x-4' },
  md: { track: 'h-6 w-11', thumb: 'h-4 w-4', translate: 'translate-x-5' },
  lg: { track: 'h-7 w-[3.25rem]', thumb: 'h-5 w-5', translate: 'translate-x-6' },
};

export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  className,
  id,
  name,
}: ToggleProps) {
  const toggleId = id || `toggle-${Math.random().toString(36).slice(2, 9)}`;
  const s = sizes[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        id={toggleId}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex shrink-0 rounded-full border-2 border-transparent',
          'transition-colors duration-normal',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          'disabled:cursor-not-allowed disabled:opacity-50',
          s.track,
          checked ? 'bg-primary' : 'bg-muted'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none inline-block rounded-full bg-background shadow-sm ring-0',
            'transition-transform duration-normal',
            s.thumb,
            checked ? s.translate : 'translate-x-0.5'
          )}
        />
      </button>
      {label && (
        <label
          htmlFor={toggleId}
          className={cn(
            'text-body-sm text-foreground cursor-pointer select-none',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}
      {name && (
        <input type="hidden" name={name} value={checked ? 'true' : 'false'} />
      )}
    </div>
  );
}
