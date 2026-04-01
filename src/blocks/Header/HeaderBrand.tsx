import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeaderBrandProps {
  children: ReactNode;
  /** Pass <Link href="/" /> to make the brand a Next.js link */
  render?: React.ReactElement;
  className?: string;
}

const brandClasses = 'flex items-center gap-2 shrink-0 font-semibold text-foreground';

export function HeaderBrand({ children, render, className }: HeaderBrandProps) {
  const cls = cn(brandClasses, className);

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: cn(cls, (render.props as React.HTMLAttributes<HTMLElement>).className),
      children,
    });
  }

  return <div className={cls}>{children}</div>;
}
