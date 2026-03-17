import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface ImageProps {
  /** PayloadCMS media object or simple src string */
  src: string | PayloadMedia;
  alt?: string;
  width?: number;
  height?: number;
  /** Aspect ratio constraint (e.g. '16/9', '4/3', '1/1') */
  aspectRatio?: string;
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
  /** Object fit */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Blur-up placeholder color or data URI */
  placeholder?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  className?: string;
  /** Class for the wrapper div */
  wrapperClassName?: string;
  /** On load callback */
  onLoad?: () => void;
}

export function Image({
  src,
  alt,
  width,
  height,
  aspectRatio,
  loading = 'lazy',
  objectFit = 'cover',
  placeholder,
  sizes,
  className,
  wrapperClassName,
  onLoad,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(loading === 'eager');
  const imgRef = useRef<HTMLDivElement>(null);

  // Resolve PayloadCMS media
  const resolvedSrc = typeof src === 'string' ? src : src.url;
  const resolvedAlt = alt || (typeof src === 'object' ? src.alt : '') || '';
  const resolvedWidth = width || (typeof src === 'object' ? src.width : undefined);
  const resolvedHeight = height || (typeof src === 'object' ? src.height : undefined);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'eager' || inView) return;
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading, inView]);

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatio && `aspect-[${aspectRatio}]`,
        wrapperClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder */}
      {placeholder && !loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundColor: placeholder.startsWith('data:') ? undefined : placeholder,
            backgroundImage: placeholder.startsWith('data:') ? `url(${placeholder})` : undefined,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
          aria-hidden="true"
        />
      )}
      {inView && (
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          width={resolvedWidth}
          height={resolvedHeight}
          sizes={sizes}
          loading={loading}
          onLoad={() => {
            setLoaded(true);
            onLoad?.();
          }}
          className={cn(
            'w-full h-full transition-opacity duration-slow',
            objectFitClasses[objectFit],
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
}
