'use client';

import { createContext, useContext } from 'react';
import type { ThemeTokens } from './tokens';

// ---------------------------------------------------------------------------
// Types (defined here to avoid circular imports with ThemeProvider)
// ---------------------------------------------------------------------------

export type ColorMode = 'light' | 'dark' | 'system';

export interface ThemeContextValue {
  /** Resolved color mode ('light' | 'dark') — never 'system' */
  resolvedMode: 'light' | 'dark';
  /** User-selected mode preference ('light' | 'dark' | 'system') */
  mode: ColorMode;
  /** Set the color mode */
  setMode: (mode: ColorMode) => void;
  /** Toggle between light and dark */
  toggleMode: () => void;
  /** Active theme tokens */
  tokens: ThemeTokens;
}

// ---------------------------------------------------------------------------
// Context + hook
// ---------------------------------------------------------------------------

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      '[tempo-ui] useTheme must be used within a <ThemeProvider> or <StaticThemeProvider>.'
    );
  }
  return ctx;
}
