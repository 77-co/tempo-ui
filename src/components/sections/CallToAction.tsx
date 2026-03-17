import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface CallToActionProps {
  heading: string;
  body?: string;
  action: { label: string; href?: string; onClick?: () => void };
  secondaryAction?: { label: string; href?: string; onClick?: () => void };
  variant?: 'default' | 'primary' | 'muted';
  align?: 'left' | 'center';
  /** Control section vertical padding size ('sm' | 'md' | 'lg'). Defaults to 'sm'. */
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

// const spacingVar = {
//   sm: 'var(--spacing-section-sm)',
//   md: 'var(--spacing-section)',
//   lg: 'var(--spacing-section-lg)',
// };

export function CallToAction({
  heading, body, action, secondaryAction, variant = 'primary', align = 'center',
  spacing = 'sm', className, renderLink,
}: CallToActionProps) {
  const ActionBtn = ({ a, primary }: { a: typeof action; primary: boolean }) => {
    const cls = cn(
      'inline-flex items-center justify-center h-11 px-6 rounded-[var(--radius-md)] font-medium transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      primary
        ? variant === 'primary'
          ? 'bg-background text-foreground hover:bg-background/90'
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
        : variant === 'primary'
          ? 'border border-white/30 text-white hover:bg-white/10'
          : 'border border-border text-foreground hover:bg-muted'
    );
    if (a.href && renderLink) return renderLink({ href: a.href, className: cls, children: <>{a.label}</> }) as React.ReactElement;
    if (a.href) return <a href={a.href} className={cls}>{a.label}</a>;
    return <button type="button" onClick={a.onClick} className={cls}>{a.label}</button>;
  };

  // const pad = spacingVar[spacing];
  const innerAlign = align === 'center' ? 'text-center' : 'text-left';
  const btnAlign = align === 'center' ? 'justify-center' : '';

  // primary variant: full-bleed section with bg color, no card rounding
  if (variant === 'primary') {
    return (
      <section
        aria-label={heading}
        className={cn('bg-primary text-primary-foreground', className)}
        // style={{ paddingTop: pad, paddingBottom: pad }}
      >
        <div className="mx-auto max-w-container-xl px-4 sm:px-6 lg:px-8">
          <div className={cn('mx-auto max-w-2xl', innerAlign)}>
            <h2 className="text-heading-lg font-heading font-bold">{heading}</h2>
            {body && <p className="mt-3 text-body-lg opacity-90">{body}</p>}
            <div className={cn('mt-6 flex flex-wrap gap-3', btnAlign)}>
              <ActionBtn a={action} primary />
              {secondaryAction && <ActionBtn a={secondaryAction} primary={false} />}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // default / muted: card inside a padded section
  const cardBg = variant === 'muted' ? 'bg-muted' : 'bg-card border border-border';

  return (
    <section
      aria-label={heading}
      // style={{ paddingTop: pad, paddingBottom: pad }}
    >
      <div className="mx-auto max-w-container-xl">
        <div className={cn('rounded-[var(--radius-lg)] px-6 py-12 sm:px-12', cardBg, className)}>
          <div className={cn('mx-auto max-w-2xl', innerAlign)}>
            <h2 className="text-heading-lg font-heading font-bold text-foreground">{heading}</h2>
            {body && <p className="mt-3 text-body-lg text-muted-foreground">{body}</p>}
            <div className={cn('mt-6 flex flex-wrap gap-3', btnAlign)}>
              <ActionBtn a={action} primary />
              {secondaryAction && <ActionBtn a={secondaryAction} primary={false} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
