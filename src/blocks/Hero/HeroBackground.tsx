import React from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface HeroBackgroundProps {
  /** Image URL or PayloadCMS media object */
  src?: string | PayloadMedia;
  /** Video URL (autoplay, muted, loop) */
  video?: string;
  /** Overlay opacity 0–1 (default 0.5) */
  overlay?: number;
  /** Tailwind color class for overlay, e.g. "bg-black" */
  overlayColor?: string;
  className?: string;
}

function resolveImageSrc(src: string | PayloadMedia): string {
  if (typeof src === 'string') return src;
  return src.url ?? '';
}

export function HeroBackground({
  src,
  video,
  overlay = 0.5,
  overlayColor = 'bg-black',
  className,
}: HeroBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 -z-10', className)}>
      {video ? (
        <video
          className="h-full w-full object-cover"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : src ? (
        <img
          className="h-full w-full object-cover"
          src={resolveImageSrc(src)}
          alt=""
          aria-hidden="true"
        />
      ) : null}
      {overlay > 0 && (
        <div
          className={cn('absolute inset-0', overlayColor)}
          style={{ opacity: overlay }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

HeroBackground.displayName = 'HeroBackground';
