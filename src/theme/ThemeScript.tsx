import type { ThemeConfig } from './tokens';
import type { ColorMode } from './ThemeContext';
import { resolveTokens, generateCSSVariables } from './themeUtils';

// ---------------------------------------------------------------------------
// Anti-FOUC script
// ---------------------------------------------------------------------------

function generateScript(defaultMode: ColorMode, storageKey: string): string {
  // Runs synchronously before first paint to apply the correct dark/light class.
  // Minified to reduce blocking HTML size.
  return `(function(){try{var s=localStorage.getItem(${JSON.stringify(storageKey)});var m=s||${JSON.stringify(defaultMode)};var dark=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList[dark?'add':'remove']('dark');r.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ThemeScriptProps {
  /** Same config passed to ThemeProvider */
  config?: ThemeConfig;
  /** Same defaultMode passed to ThemeProvider. Defaults to 'system'. */
  defaultMode?: ColorMode;
  /** Force a specific mode — skips localStorage and system preference */
  forcedMode?: 'light' | 'dark';
  /** CSP nonce for the inline script tag */
  nonce?: string;
}

/**
 * Server-renderable component that eliminates flash of unstyled content (FOUC).
 *
 * Renders two tags into `<head>`:
 * 1. `<style>` — all CSS custom properties baked into the HTML response
 * 2. `<script>` — synchronous blocking script that applies the `dark` class
 *    before first paint (reads localStorage + system preference)
 *
 * Usage in Next.js App Router `layout.tsx`:
 * ```tsx
 * import { ThemeScript, ThemeProvider } from '@seventy7/tempo-ui'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html lang="en" suppressHydrationWarning>
 *       <head>
 *         <ThemeScript config={{ preset: 'corporate' }} defaultMode="system" />
 *       </head>
 *       <body>
 *         <ThemeProvider config={{ preset: 'corporate' }} defaultMode="system">
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * Note: Add `suppressHydrationWarning` to `<html>` to silence React's warning
 * about the `dark` class being added by the script before hydration.
 */
export function ThemeScript({
  config = {},
  defaultMode = 'system',
  forcedMode,
  nonce,
}: ThemeScriptProps) {
  const tokens = resolveTokens(config);
  const css = generateCSSVariables(tokens);

  const scriptContent = forcedMode
    ? `(function(){var r=document.documentElement;r.classList[${JSON.stringify(forcedMode === 'dark' ? 'add' : 'remove')}]('dark');r.style.colorScheme=${JSON.stringify(forcedMode)};})();`
    : generateScript(defaultMode, 'tempo-ui-color-mode');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <script
        dangerouslySetInnerHTML={{ __html: scriptContent }}
        nonce={nonce}
      />
    </>
  );
}
