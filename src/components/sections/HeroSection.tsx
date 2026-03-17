import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  /** Primary CTA */
  primaryAction?: { label: string; href?: string; onClick?: () => void };
  /** Secondary CTA */
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
  /** Background image (PayloadCMS media or URL) */
  backgroundImage?: string | PayloadMedia;
  /** Background video URL */
  backgroundVideo?: string;
  /** Overlay opacity (0-100) */
  overlayOpacity?: number;
  /** Vertical alignment */
  align?: 'top' | 'center' | 'bottom';
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Minimum height */
  minHeight?: string;
  /** Additional content below CTAs */
  children?: ReactNode;
  className?: string;
  /** Custom link renderer */
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

const alignClasses = {
  top: 'items-start pt-32',
  center: 'items-center',
  bottom: 'items-end pb-32',
};

const textAlignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export function HeroSection({
  headline,
  subheadline,
  primaryAction,
  secondaryAction,
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 50,
  align = 'center',
  textAlign = 'center',
  minHeight = '80vh',
  children,
  className,
  renderLink,
}: HeroSectionProps) {
  const bgUrl = typeof backgroundImage === 'string'
    ? backgroundImage
    : backgroundImage?.url;

  const ActionButton = ({ action, variant }: { action: { label: string; href?: string; onClick?: () => void }; variant: 'primary' | 'secondary' }) => {
    const cls = variant === 'primary'
      ? 'inline-flex items-center justify-center h-12 px-8 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
      : 'inline-flex items-center justify-center h-12 px-8 rounded-md font-medium border border-white/30 text-white hover:bg-white/10 transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

    if (action.href && renderLink) {
      return renderLink({ href: action.href, className: cls, children: <>{action.label}</> });
    }
    if (action.href) {
      return <a href={action.href} className={cls}>{action.label}</a>;
    }
    return <button type="button" onClick={action.onClick} className={cls}>{action.label}</button>;
  };

  return (
    <section
      className={cn('relative flex flex-col justify-center overflow-hidden', alignClasses[align], className)}
      style={{ minHeight }}
    >
      {/* Background Image */}
      {bgUrl && !backgroundVideo && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgUrl})` }}
          aria-hidden="true"
        />
      )}

      {/* Background Video */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/* Overlay */}
      {(bgUrl || backgroundVideo) && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className={cn('relative z-10 mx-auto w-full max-w-container-lg px-4 sm:px-6 lg:px-8 py-16')}>
        <div className={cn('flex flex-col gap-6 max-w-3xl', textAlignClasses[textAlign], textAlign === 'center' && 'mx-auto')}>
          <h1 className={cn(
            'font-heading font-bold',
            'text-display-lg sm:text-display-xl',
            (bgUrl || backgroundVideo) ? 'text-white' : 'text-foreground'
          )}>
            {headline}
          </h1>
          {subheadline && (
            <p className={cn(
              'text-body-lg sm:text-heading-sm',
              (bgUrl || backgroundVideo) ? 'text-white/80' : 'text-muted-foreground'
            )}>
              {subheadline}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className={cn(
              'flex flex-wrap gap-4 pt-2',
              textAlign === 'center' && 'justify-center',
              textAlign === 'right' && 'justify-end'
            )}>
              {primaryAction && <ActionButton action={primaryAction} variant="primary" />}
              {secondaryAction && <ActionButton action={secondaryAction} variant="secondary" />}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
