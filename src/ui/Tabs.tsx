"use client";
import React, { type ReactNode } from 'react';
import { Tabs as BaseTabs } from '@base-ui-components/react/tabs';
import { cn } from '../lib/utils';

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string | null) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Tabs({
  items,
  orientation = 'horizontal',
  className,
  ...props
}: TabsProps) {
  const defaultVal = props.defaultValue ?? props.value ?? items[0]?.value;

  return (
    <BaseTabs.Root
      defaultValue={defaultVal}
      orientation={orientation}
      className={cn(
        orientation === 'vertical' ? 'flex gap-4' : 'flex flex-col gap-2',
        className,
      )}
      {...props}
    >
      <BaseTabs.List
        className={cn(
          'relative flex rounded-md bg-muted p-1',
          orientation === 'vertical' ? 'flex-col w-40 shrink-0' : 'flex-row',
        )}
        aria-label="Tabs"
      >
        {items.map((item) => (
          <BaseTabs.Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5',
              'text-sm font-medium text-muted-foreground ring-offset-background transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              'data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm',
            )}
          >
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel
          key={item.value}
          value={item.value}
          className={cn(
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'data-[hidden]:hidden',
          )}
        >
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
