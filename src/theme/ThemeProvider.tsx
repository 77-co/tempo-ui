'use client';

import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type {
  ThemeTokens,
  ThemeConfig,
  ColorTokens,
} from './tokens';
import { resolveTokens, generateCSSVariables } from './themeUtils';
import { ThemeContext } from './ThemeContext';
import type { ColorMode, ThemeContextValue } from './ThemeContext';
export type { ColorMode, ThemeContextValue } from './ThemeContext';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'tempo-ui-color-mode';

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getStoredMode(): ColorMode | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system')
      return stored;
  } catch {
    // localStorage not available
  }
  return null;
}

function storeMode(mode: ColorMode) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // localStorage not available
  }
}

function injectCSSVariables(tokens: ThemeTokens, mode: 'light' | 'dark') {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Colors
  const colors: ColorTokens =
    mode === 'dark' ? tokens.colors.dark : tokens.colors.light;
  for (const [key, value] of Object.entries(colors)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Typography
  for (const [key, value] of Object.entries(tokens.typography)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Spacing
  for (const [key, value] of Object.entries(tokens.spacing)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Radius
  for (const [key, value] of Object.entries(tokens.radius)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Shadows
  for (const [key, value] of Object.entries(tokens.shadows)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Durations
  for (const [key, value] of Object.entries(tokens.durations)) {
    root.style.setProperty(`--${key}`, value);
  }

  // Containers
  for (const [key, value] of Object.entries(tokens.containers)) {
    root.style.setProperty(`--${key}`, value);
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ThemeProviderProps {
  children: ReactNode;
  /** Theme configuration — preset name or custom tokens + optional overrides */
  config?: ThemeConfig;
  /** Default color mode. Defaults to 'system'. */
  defaultMode?: ColorMode;
  /** Disable persistence to localStorage */
  disablePersistence?: boolean;
  /** Force a specific mode (overrides user preference) */
  forcedMode?: 'light' | 'dark';
}

export function ThemeProvider({
  children,
  config = {},
  defaultMode = 'system',
  disablePersistence = false,
  forcedMode,
}: ThemeProviderProps) {
  const tokens = useMemo(() => resolveTokens(config), [config]);
  const css = useMemo(() => generateCSSVariables(tokens), [tokens]);

  const [mode, setModeState] = useState<ColorMode>(() => {
    if (forcedMode) return forcedMode;
    if (!disablePersistence) {
      const stored = getStoredMode();
      if (stored) return stored;
    }
    return defaultMode;
  });

  const resolvedMode: 'light' | 'dark' = useMemo(() => {
    if (forcedMode) return forcedMode;
    if (mode === 'system') return getSystemPreference();
    return mode;
  }, [mode, forcedMode]);

  // Listen for system preference changes when mode === 'system'
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (mode !== 'system' || typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => forceUpdate((c) => c + 1);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode]);

  // Apply dark class and CSS variables
  useEffect(() => {
    const root = document.documentElement;

    if (resolvedMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.setProperty('color-scheme', resolvedMode);
    injectCSSVariables(tokens, resolvedMode);
  }, [resolvedMode, tokens]);

  const setMode = useCallback(
    (newMode: ColorMode) => {
      if (forcedMode) return;
      setModeState(newMode);
      if (!disablePersistence) {
        storeMode(newMode);
      }
    },
    [forcedMode, disablePersistence]
  );

  const toggleMode = useCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark');
  }, [resolvedMode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedMode,
      mode,
      setMode,
      toggleMode,
      tokens,
    }),
    [resolvedMode, mode, setMode, toggleMode, tokens]
  );

  return (
    <ThemeContext.Provider value={value}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {children}
    </ThemeContext.Provider>
  );
}
