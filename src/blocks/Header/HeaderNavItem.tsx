import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface HeaderNavItemProps {
  children: ReactNode;
  /** Pass <Link href="/page" /> to use Next.js Link */
  render?: React.ReactElement;
  active?: boolean;
  className?: string;
}

const itemClasses =
  'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function HeaderNavItem({ children, render, active, className }: HeaderNavItemProps) {
  const cls = cn(
    itemClasses,
    active
      ? 'bg-muted text-foreground'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
    className,
  );

  if (render && React.isValidElement(render)) {
    return React.cloneElement(render as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: cn(cls, (render.props as React.HTMLAttributes<HTMLElement>).className),
      'aria-current': active ? 'page' : undefined,
      children,
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <span className={cls} aria-current={active ? 'page' : undefined}>
      {children}
    </span>
  );
}
