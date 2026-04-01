import React, { type ReactNode } from 'react';
import { cn } from '../lib/utils';

export interface FormFieldProps {
  htmlFor?: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export function FormField({
  htmlFor,
  label,
  helperText,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground leading-none"
        >
          {label}
          {required && <span className="ml-1 text-destructive" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  );
}
