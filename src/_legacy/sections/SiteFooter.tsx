"use client";
import React, { type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface SiteFooterProps {
  logo?: ReactNode;
  description?: string;
  columns?: FooterColumn[];
  /** Newsletter signup slot */
  newsletter?: ReactNode;
  /** Social links */
  socialLinks?: { label: string; href: string; icon: ReactNode }[];
  /** Legal links (bottom row) */
  legalLinks?: { label: string; href: string }[];
  /** Copyright text */
  copyright?: string;
  /** Show back-to-top button */
  showBackToTop?: boolean;
  className?: string;
  renderLink?: (props: { href: string; className?: string; children: ReactNode }) => ReactNode;
}

export function SiteFooter({
  logo, description, columns = [], newsletter, socialLinks, legalLinks, copyright,
  showBackToTop = true, className, renderLink,
}: SiteFooterProps) {
  const Link = ({ href, className: cls, children }: { href: string; className?: string; children: ReactNode }) => {
    if (renderLink) return renderLink({ href, className: cls, children }) as React.ReactElement;
    return <a href={href} className={cls}>{children}</a>;
  };

  return (
    <footer className={cn('border-t border-border bg-background', className)}>
      <div className="mx-auto max-w-container-xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            {logo && <div className="mb-4">{logo}</div>}
            {description && <p className="text-body-sm text-muted-foreground max-w-xs">{description}</p>}
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.icon}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i} className="lg:col-span-2">
              <h3 className="text-body-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <Link href={link.href} className="text-body-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {newsletter && <div className="lg:col-span-4">{newsletter}</div>}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <div className="flex flex-wrap items-center gap-4">
            {copyright && <p className="text-caption text-muted-foreground">{copyright}</p>}
            {legalLinks && legalLinks.map((link, i) => (
              <Link key={i} href={link.href} className="text-caption text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          {showBackToTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            >
              ↑
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
