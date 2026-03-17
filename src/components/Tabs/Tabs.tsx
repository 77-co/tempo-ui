import React, { useState, useRef, useCallback, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'bordered';
  className?: string;
}

export function Tabs({ items, defaultTab, onChange, variant = 'underline', className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTab || items[0]?.id || '');
  const tabListRef = useRef<HTMLDivElement>(null);

  const activate = useCallback(
    (id: string) => {
      setActiveId(id);
      onChange?.(id);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((i) => !i.disabled);
      const currentIndex = enabledItems.findIndex((i) => i.id === activeId);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % enabledItems.length;
      } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = enabledItems.length - 1;
      } else {
        return;
      }

      e.preventDefault();
      const nextItem = enabledItems[nextIndex];
      if (nextItem) {
        activate(nextItem.id);
        const btn = tabListRef.current?.querySelector(`[data-tab-id="${nextItem.id}"]`) as HTMLElement;
        btn?.focus();
      }
    },
    [items, activeId, activate]
  );

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className={className}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          'flex',
          variant === 'underline' && 'border-b border-border gap-0',
          variant === 'pills' && 'gap-1 bg-muted p-1 rounded-lg',
          variant === 'bordered' && 'gap-0 border border-border rounded-lg overflow-hidden'
        )}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-tab-id={item.id}
            id={`tab-${item.id}`}
            aria-selected={activeId === item.id}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={activeId === item.id ? 0 : -1}
            disabled={item.disabled}
            onClick={() => activate(item.id)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2.5 text-body-sm font-medium',
              'transition-colors duration-fast whitespace-nowrap',
              'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variant === 'underline' && [
                '-mb-px border-b-2',
                activeId === item.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border',
              ],
              variant === 'pills' && [
                'rounded-md',
                activeId === item.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              ],
              variant === 'bordered' && [
                'flex-1 border-r border-border last:border-r-0',
                activeId === item.id
                  ? 'bg-background text-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted',
              ]
            )}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      {activeItem && (
        <div
          role="tabpanel"
          id={`tabpanel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="pt-4"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
}
