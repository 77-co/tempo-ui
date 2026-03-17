import React, { useState, useEffect, useCallback, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string | PayloadMedia;
  className?: string;
}

export function Testimonial({ quote, author, role, company, avatar, className }: TestimonialProps) {
  const avatarUrl = typeof avatar === 'string' ? avatar : avatar?.url;

  return (
    <figure className={cn('rounded-lg border border-border bg-card p-6', className)}>
      <blockquote>
        <p className="text-body-lg text-card-foreground italic leading-relaxed">"{quote}"</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={author}
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
        )}
        <div>
          <p className="text-body-sm font-medium text-card-foreground">{author}</p>
          {(role || company) && (
            <p className="text-caption text-muted-foreground">
              {role}{role && company && ', '}{company}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

export interface TestimonialCarouselProps {
  testimonials: TestimonialProps[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  autoplay = true,
  interval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!autoplay) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, next]);

  return (
    <div className={cn('relative', className)} aria-roledescription="carousel" aria-label="Testimonials">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-slow ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 px-2"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
            >
              <Testimonial {...t} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-4">
        <button type="button" onClick={prev} aria-label="Previous testimonial" className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-ring">
          ‹
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-normal',
                i === current ? 'w-6 bg-primary' : 'w-2 bg-border hover:bg-muted-foreground'
              )}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next testimonial" className="h-8 w-8 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-ring">
          ›
        </button>
      </div>
    </div>
  );
}
