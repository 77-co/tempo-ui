import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterColumnProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {children}
      </ul>
    </div>
  );
}
