import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterLinkProps {
  children: ReactNode;
  /** Base UI-style render prop — pass <Link href="..." /> to use Next.js Link */
  render?: React.ReactElement;
  className?: string;
}

const linkClasses = 'text-sm text-muted-foreground hover:text-foreground transition-colors';

export function FooterLink({ children, render, className }: FooterLinkProps) {
  const cls = cn(linkClasses, className);

  if (render && React.isValidElement(render)) {
    return (
      <li>
        {React.cloneElement(render as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
          className: cn(cls, (render.props as React.HTMLAttributes<HTMLElement>).className),
          children,
        })}
      </li>
    );
  }

  return <li><span className={cls}>{children}</span></li>;
}
