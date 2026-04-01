"use client";
import React, { type ReactNode } from 'react';
import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { cn } from '../lib/utils';

export interface DialogProps {
  /** Controlled open state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger element that opens the dialog */
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  /** Footer content (actions) */
  footer?: ReactNode;
  /** Max width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

function CloseIcon() {
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
}: DialogProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <BaseDialog.Trigger
          render={
            React.isValidElement(trigger)
              ? (trigger as React.ReactElement<Record<string, unknown>>)
              : undefined
          }
        >
          {React.isValidElement(trigger) ? null : trigger}
        </BaseDialog.Trigger>
      )}
      <BaseDialog.Portal>
        <BaseDialog.Backdrop
          className={cn(
            'fixed inset-0 z-50 bg-black/50',
            'data-[open]:animate-fade-in data-[closed]:animate-fade-out',
          )}
        />
        <BaseDialog.Popup
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-full rounded-lg border border-border bg-background p-6 shadow-lg',
            'data-[open]:animate-scale-in data-[closed]:opacity-0',
            'focus-visible:outline-none',
            sizeClasses[size],
            className,
          )}
        >
          <div className="flex flex-col gap-4">
            {(title || description) && (
              <div className="flex flex-col gap-1.5">
                {title && (
                  <BaseDialog.Title className="text-heading-sm font-semibold text-foreground">
                    {title}
                  </BaseDialog.Title>
                )}
                {description && (
                  <BaseDialog.Description className="text-sm text-muted-foreground">
                    {description}
                  </BaseDialog.Description>
                )}
              </div>
            )}
            <div>{children}</div>
            {footer && <div className="flex items-center justify-end gap-2">{footer}</div>}
          </div>
          <BaseDialog.Close
            className={cn(
              'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
              'hover:opacity-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none',
            )}
            aria-label="Close dialog"
          >
            <CloseIcon />
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
