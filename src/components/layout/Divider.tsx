import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Orientation of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Visual style */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** Spacing around the divider */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /** Label to show in the middle */
  label?: string;
}

const spacingClasses = {
  none: '',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-8',
};

const spacingVerticalClasses = {
  none: '',
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-8',
};

const variantClasses = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

/**
 * A visual divider (horizontal rule) with label support.
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', spacing = 'md', label, ...props }, ref) => {
    if (label && orientation === 'horizontal') {
      return (
        <div
          className={cn('flex items-center', spacingClasses[spacing], className)}
          role="separator"
          aria-orientation="horizontal"
        >
          <hr
            ref={ref}
            className={cn('flex-1 border-t border-border', variantClasses[variant])}
            {...props}
          />
          <span className="px-3 text-body-sm text-muted-foreground">{label}</span>
          <hr className={cn('flex-1 border-t border-border', variantClasses[variant])} />
        </div>
      );
    }

    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            'inline-block self-stretch border-l border-border min-h-[1em]',
            variantClasses[variant],
            spacingVerticalClasses[spacing],
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        />
      );
    }

    return (
      <hr
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'border-t border-border',
          variantClasses[variant],
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
