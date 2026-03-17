import React, { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface ToastData {
  id: string;
  title?: string;
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number;
}

interface ToastContextValue {
  toast: (data: Omit<ToastData, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('[tempo-ui] useToast must be used within <ToastProvider>');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...data, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none" aria-live="polite">
        {toasts.map((t) => (
          <ToastItem key={t.id} data={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

const variantClasses = {
  default: 'bg-card border-border',
  success: 'bg-success/10 border-success text-success',
  error: 'bg-destructive/10 border-destructive text-destructive',
  warning: 'bg-warning/10 border-warning text-warning',
};

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, data.duration || 5000);
    return () => clearTimeout(timer);
  }, [data.duration, onDismiss]);

  return (
    <div
      role="alert"
      className={cn(
        'pointer-events-auto rounded-lg border p-4 shadow-lg animate-slide-in-from-right',
        variantClasses[data.variant || 'default']
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {data.title && <p className="font-medium text-body-sm">{data.title}</p>}
          <p className={cn('text-body-sm', !data.title && 'font-medium')}>{data.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
