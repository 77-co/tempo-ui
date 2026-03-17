import React from 'react';
import { cn } from '../../lib/utils';
import type { PayloadMedia } from '../../types/payload';

export interface LogoItem {
  name: string;
  src: string | PayloadMedia;
  href?: string;
}

export interface LogoCloudProps {
  logos: LogoItem[];
  title?: string;
  columns?: 3 | 4 | 5 | 6;
  grayscale?: boolean;
  className?: string;
}

const colClasses = { 3: 'grid-cols-3', 4: 'grid-cols-4', 5: 'grid-cols-5', 6: 'grid-cols-6' };

export function LogoCloud({ logos, title, columns = 5, grayscale = true, className }: LogoCloudProps) {
  return (
    <div className={cn('text-center', className)}>
      {title && <p className="text-body-sm text-muted-foreground mb-8">{title}</p>}
      <div className={cn('grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3', `lg:${colClasses[columns]}`)}>
        {logos.map((logo, i) => {
          const url = typeof logo.src === 'string' ? logo.src : logo.src.url;
          const img = (
            <img
              src={url}
              alt={logo.name}
              className={cn('h-8 w-auto max-w-[120px] object-contain', grayscale && 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-normal')}
              loading="lazy"
            />
          );
          return logo.href ? <a key={i} href={logo.href} className="block">{img}</a> : <div key={i}>{img}</div>;
        })}
      </div>
    </div>
  );
}
