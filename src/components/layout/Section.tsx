import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** HTML tag to render */
  as?: 'section' | 'div' | 'article' | 'aside';
  /** Vertical padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Background variant */
  background?: 'default' | 'muted' | 'primary' | 'dark';
  /** Whether to contain children in a max-width container */
  contained?: boolean;
  /** Container size when contained is true */
  containerSize?: 'sm' | 'default' | 'lg' | 'xl';
  /** Background image URL */
  backgroundImage?: string;
  /** Overlay opacity when backgroundImage is set (0-100) */
  overlayOpacity?: number;
  children: ReactNode;
}

const paddingClasses = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section',
  lg: 'py-section-lg',
};

const backgroundClasses = {
  default: 'bg-background text-foreground',
  muted: 'bg-muted text-foreground',
  primary: 'bg-primary text-primary-foreground',
  dark: 'bg-foreground text-background',
};

const containerSizeClasses = {
  sm: 'max-w-container-sm',
  default: 'max-w-container',
  lg: 'max-w-container-lg',
  xl: 'max-w-container-xl',
};

/**
 * A page section wrapper with background, padding, and optional container.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      as: Tag = 'section',
      padding = 'md',
      background = 'default',
      contained = true,
      containerSize = 'lg',
      backgroundImage,
      overlayOpacity = 60,
      children,
      ...props
    },
    ref
  ) => {
    const content = contained ? (
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', containerSizeClasses[containerSize])}>
        {children}
      </div>
    ) : (
      children
    );

    return (
      <Tag
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          'relative',
          paddingClasses[padding],
          !backgroundImage && backgroundClasses[background],
          className
        )}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {backgroundImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-foreground"
              style={{ opacity: overlayOpacity / 100 }}
              aria-hidden="true"
            />
          </>
        )}
        <div className={backgroundImage ? 'relative z-10' : undefined}>
          {content}
        </div>
      </Tag>
    );
  }
);

Section.displayName = 'Section';
