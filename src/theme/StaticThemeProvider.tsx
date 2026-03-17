import React, { type ReactNode } from 'react';
import type { ThemeConfig } from './tokens';
import type { ThemeContextValue } from './ThemeContext';
import { resolveTokens, generateCSSVariables } from './themeUtils';
import { StaticThemeContextBridge } from './StaticThemeContextBridge';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface StaticThemeProviderProps {
  children: ReactNode;
  /** Theme configuration — preset name or custom tokens + optional overrides */
  config?: ThemeConfig;
  /**
   * The resolved mode to expose via the useTheme() context.
   * This does NOT affect which CSS variables are injected — both light and dark
   * color vars are always present in the stylesheet (controlled by the `dark`
   * class on <html>, which ThemeScript sets before first paint).
   * Defaults to 'light'.
   */
  mode?: 'light' | 'dark';
}

/**
 * A fully server-renderable theme provider with zero client JavaScript.
 *
 * Injects all CSS custom properties directly into the SSR'd HTML via a
 * `<style>` tag — no flash of unstyled content, no hydration mismatch.
 *
 * Dark mode is supported via CSS only: both `:root` (light) and `.dark` (dark)
 * variable sets are included in the stylesheet. Pair with `<ThemeScript>` in
 * `<head>` to apply the correct `dark` class before first paint.
 *
 * `setMode` and `toggleMode` from `useTheme()` are no-ops — use the full
 * `<ThemeProvider>` if you need runtime dark mode switching.
 *
 * Usage in Next.js App Router `layout.tsx`:
 * ```tsx
 * import { StaticThemeProvider, ThemeScript } from '@seventy7/tempo-ui'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <head>
 *         <ThemeScript config={{ preset: 'corporate' }} defaultMode="system" />
 *       </head>
 *       <body>
 *         <StaticThemeProvider config={{ preset: 'corporate' }}>
 *           {children}
 *         </StaticThemeProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function StaticThemeProvider({
  children,
  config = {},
  mode = 'light',
}: StaticThemeProviderProps) {
  const tokens = resolveTokens(config);
  const css = generateCSSVariables(tokens);

  const noop = () => {};

  const contextValue: ThemeContextValue = {
    resolvedMode: mode,
    mode,
    setMode: noop,
    toggleMode: noop,
    tokens,
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <StaticThemeContextBridge value={contextValue}>
        {children}
      </StaticThemeContextBridge>
    </>
  );
}
