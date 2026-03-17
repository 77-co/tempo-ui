import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CallToActionProps {
  heading: string;
  body?: string;
  action: { label: string; href?: string; onClick?: () => void };
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
  variant?: 'default' | 'primary' | 'muted';
  align?: 'left' | 'center';
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

const variantClasses = {
  default: 'bg-card border border-border',
  primary: 'bg-primary text-primary-foreground',
  muted: 'bg-muted',
};

export function CallToAction({
  heading, body, action, secondaryAction, variant = 'primary', align = 'center', className, renderLink,
}: CallToActionProps) {
  const ActionBtn = ({ a, primary }: { a: typeof action; primary: boolean }) => {
    const cls = cn(
      'inline-flex items-center justify-center h-11 px-6 rounded-md font-medium transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      primary
        ? variant === 'primary'
          ? 'bg-background text-foreground hover:bg-background/90'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
        : 'border border-current/30 hover:bg-white/10'
    );
    if (a.href && renderLink) return renderLink({ href: a.href, className: cls, children: <>{a.label}</> }) as React.ReactElement;
    if (a.href) return <a href={a.href} className={cls}>{a.label}</a>;
    return <button type="button" onClick={a.onClick} className={cls}>{a.label}</button>;
  };

  return (
    <div className={cn('rounded-lg px-6 py-12 sm:px-12', variantClasses[variant], className)}>
      <div className={cn('mx-auto max-w-2xl', align === 'center' ? 'text-center' : 'text-left')}>
        <h2 className="text-heading-lg font-heading font-bold">{heading}</h2>
        {body && <p className="mt-3 text-body-lg opacity-90">{body}</p>}
        <div className={cn('mt-6 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>
          <ActionBtn a={action} primary />
          {secondaryAction && <ActionBtn a={secondaryAction} primary={false} />}
        </div>
      </div>
    </div>
  );
}
