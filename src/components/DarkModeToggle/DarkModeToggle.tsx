import React from 'react';
import { useTheme, type ColorMode } from '../../theme/ThemeProvider';
import { cn } from '../../lib/utils';

export interface DarkModeToggleProps {
  /** Additional CSS classes */
  className?: string;
  /** Size of the toggle button */
  size?: 'sm' | 'md' | 'lg';
  /** Show system option in addition to light/dark */
  showSystem?: boolean;
  /** Custom aria-label */
  'aria-label'?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

/**
 * A persistent dark mode toggle component with smooth transitions.
 * Supports light, dark, and system-preference modes.
 */
export function DarkModeToggle({
  className,
  size = 'md',
  showSystem = false,
  'aria-label': ariaLabel,
}: DarkModeToggleProps) {
  const { mode, resolvedMode, setMode, toggleMode } = useTheme();

  if (showSystem) {
    const modes: ColorMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length]!;

    return (
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-md',
          'border border-border bg-background text-foreground',
          'transition-colors duration-normal',
          'hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          sizeClasses[size],
          className
        )}
        onClick={() => setMode(nextMode)}
        aria-label={
          ariaLabel ??
          `Current: ${mode} mode. Switch to ${nextMode} mode.`
        }
        title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`}
      >
        {mode === 'light' && <SunIcon className={iconSizes[size]} />}
        {mode === 'dark' && <MoonIcon className={iconSizes[size]} />}
        {mode === 'system' && <MonitorIcon className={iconSizes[size]} />}
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        'border border-border bg-background text-foreground',
        'transition-colors duration-normal',
        'hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        sizeClasses[size],
        className
      )}
      onClick={toggleMode}
      aria-label={
        ariaLabel ??
        `Switch to ${resolvedMode === 'dark' ? 'light' : 'dark'} mode`
      }
    >
      <SunIcon
        className={cn(
          iconSizes[size],
          'rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
        )}
      />
      <MoonIcon
        className={cn(
          iconSizes[size],
          'absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
        )}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Inline SVG icons (no external dependency)
// ---------------------------------------------------------------------------

function SunIcon({ className }: { className?: string }) {
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
      <circle cx={12} cy={12} r={5} />
      <line x1={12} y1={1} x2={12} y2={3} />
      <line x1={12} y1={21} x2={12} y2={23} />
      <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
      <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
      <line x1={1} y1={12} x2={3} y2={12} />
      <line x1={21} y1={12} x2={23} y2={12} />
      <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
      <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
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
      <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
      <line x1={8} y1={21} x2={16} y2={21} />
      <line x1={12} y1={17} x2={12} y2={21} />
    </svg>
  );
}
