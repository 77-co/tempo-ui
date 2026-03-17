import React, { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple items open at once */
  multiple?: boolean;
  /** Default open item ids */
  defaultOpen?: string[];
  className?: string;
  /** Render with FAQ schema markup */
  faqSchema?: boolean;
}

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
  faqSchema = false,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!multiple) next.clear();
          next.add(id);
        }
        return next;
      });
    },
    [multiple]
  );

  const faqJsonLd = faqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: typeof item.content === 'string' ? item.content : '',
          },
        })),
      }
    : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className={cn('divide-y divide-border rounded-lg border border-border', className)}>
        {items.map((item) => (
          <AccordionPanel
            key={item.id}
            item={item}
            isOpen={openIds.has(item.id)}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </>
  );
}

function AccordionPanel({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, item.content]);

  const panelId = `accordion-panel-${item.id}`;
  const triggerId = `accordion-trigger-${item.id}`;

  return (
    <div>
      <h3>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          disabled={item.disabled}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
          className={cn(
            'flex w-full items-center justify-between px-4 py-3 text-left',
            'text-body font-medium text-foreground',
            'transition-colors duration-fast',
            'hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <span>{item.title}</span>
          <ChevronIcon
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-normal',
              isOpen && 'rotate-180'
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden transition-all duration-normal"
        style={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-4 pb-4 text-body text-muted-foreground">
          {item.content}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
