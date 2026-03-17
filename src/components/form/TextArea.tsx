import React, { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, resize = 'vertical', ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-md border bg-background px-3 py-2 text-body text-foreground',
        'placeholder:text-muted-foreground',
        'transition-colors duration-fast',
        'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error ? 'border-destructive' : 'border-input hover:border-foreground/30',
        resizeClasses[resize],
        className
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';
