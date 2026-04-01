"use client";
import React, { type ReactNode } from 'react';
import { Accordion as BaseAccordion } from '@base-ui-components/react/accordion';
import { cn } from '../lib/utils';

export interface AccordionItem {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple panels open at once */
  multiple?: boolean;
  defaultValue?: (string | null)[];
  value?: (string | null)[];
  onValueChange?: (value: (string | null)[]) => void;
  className?: string;
}

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-normal group-data-[panel-open]:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function Accordion({ items, multiple = false, className, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root
      hiddenUntilFound
      className={cn('divide-y divide-border', className)}
      {...(multiple ? { openMultiple: true } : {})}
      {...props}
    >
      {items.map((item) => (
        <BaseAccordion.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className="group"
        >
          <BaseAccordion.Header className="flex">
            <BaseAccordion.Trigger
              className={cn(
                'flex flex-1 items-center justify-between py-4 text-sm font-medium text-foreground',
                'transition-all hover:underline',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
              )}
            >
              {item.trigger}
              <ChevronIcon />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel
            className={cn(
              'overflow-hidden text-sm text-muted-foreground',
              'data-[open]:animate-accordion-down data-[closed]:animate-accordion-up',
            )}
          >
            <div className="pb-4">{item.content}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
