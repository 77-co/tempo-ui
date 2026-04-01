import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterBrandProps {
  children: ReactNode;
  className?: string;
}

export function FooterBrand({ children, className }: FooterBrandProps) {
  return (
    <div className={cn('col-span-1 sm:col-span-2 xl:col-span-2 flex flex-col gap-4', className)}>
      {children}
    </div>
  );
}
