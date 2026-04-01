import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  cta: { label: string; href?: string; onClick?: () => void };
  highlighted?: boolean;
  badge?: string;
}

export interface PricingTableProps {
  tiers: PricingTier[];
  className?: string;
  renderLink?: (props: { href: string; className: string; children: ReactNode }) => ReactNode;
}

export function PricingTable({ tiers, className, renderLink }: PricingTableProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3', className)}>
      {tiers.map((tier, i) => (
        <div
          key={i}
          className={cn(
            'relative flex flex-col rounded-lg border p-6',
            tier.highlighted
              ? 'border-primary bg-card shadow-lg scale-[1.02]'
              : 'border-border bg-card'
          )}
        >
          {tier.badge && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-caption font-medium text-primary-foreground">
              {tier.badge}
            </span>
          )}
          <div className="mb-6">
            <h3 className="text-heading-sm font-heading font-semibold text-card-foreground">{tier.name}</h3>
            {tier.description && (
              <p className="mt-1 text-body-sm text-muted-foreground">{tier.description}</p>
            )}
          </div>
          <div className="mb-6">
            <span className="text-display font-heading font-bold text-card-foreground">{tier.price}</span>
            {tier.period && <span className="text-body text-muted-foreground">/{tier.period}</span>}
          </div>
          <ul className="mb-8 flex-1 space-y-3">
            {tier.features.map((f, fi) => (
              <li key={fi} className="flex items-start gap-2 text-body-sm">
                <span className={cn('mt-0.5 shrink-0', f.included ? 'text-success' : 'text-muted-foreground')}>
                  {f.included ? '✓' : '✗'}
                </span>
                <span className={cn(f.included ? 'text-card-foreground' : 'text-muted-foreground line-through')}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <PricingCTA tier={tier} renderLink={renderLink} />
        </div>
      ))}
    </div>
  );
}

function PricingCTA({ tier, renderLink }: { tier: PricingTier; renderLink?: PricingTableProps['renderLink'] }) {
  const cls = cn(
    'inline-flex w-full items-center justify-center rounded-md h-11 px-6 font-medium',
    'transition-colors duration-normal',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    tier.highlighted
      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
      : 'border border-border bg-background text-foreground hover:bg-muted'
  );

  if (tier.cta.href && renderLink) {
    return renderLink({ href: tier.cta.href, className: cls, children: <>{tier.cta.label}</> }) as React.ReactElement;
  }
  if (tier.cta.href) {
    return <a href={tier.cta.href} className={cls}>{tier.cta.label}</a>;
  }
  return <button type="button" onClick={tier.cta.onClick} className={cls}>{tier.cta.label}</button>;
}
