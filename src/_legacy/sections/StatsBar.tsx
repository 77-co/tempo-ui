"use client";
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface StatsBarProps {
  stats: Stat[];
  animated?: boolean;
  className?: string;
}

export function StatsBar({ stats, animated = true, className }: StatsBarProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-8 md:grid-cols-4', className)}>
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} animated={animated} />
      ))}
    </div>
  );
}

function StatItem({ stat, animated }: { stat: Stat; animated: boolean }) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : stat.value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || hasAnimated) return;
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayValue(stat.value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplayValue(Math.round(eased * stat.value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, hasAnimated, stat.value]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-display font-heading font-bold text-foreground">
        {stat.prefix}{displayValue.toLocaleString()}{stat.suffix}
      </p>
      <p className="mt-1 text-body-sm text-muted-foreground">{stat.label}</p>
    </div>
  );
}
