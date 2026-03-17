import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FormFieldProps {
  /** Unique id linking label to input */
  htmlFor?: string;
  /** Label text */
  label?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error message (replaces helperText when present) */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Additional class names */
  className?: string;
  children: ReactNode;
}

/**
 * Form field wrapper providing label, helper text, and error messages.
 * Connects label to input via htmlFor/id for accessibility.
 */
export function FormField({
  htmlFor,
  label,
  helperText,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const descriptionId = htmlFor ? `${htmlFor}-description` : undefined;
  const errorId = htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            'block text-body-sm font-medium text-foreground',
            error && 'text-destructive'
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-caption text-destructive"
        >
          {error}
        </p>
      ) : helperText ? (
        <p id={descriptionId} className="text-caption text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
