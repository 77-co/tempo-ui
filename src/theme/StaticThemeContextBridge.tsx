'use client';

import React, { type ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextValue } from './ThemeContext';

/**
 * Internal client component that bridges server-computed context values
 * into the React context tree. No state, no effects — purely a provider wrapper.
 */
export function StaticThemeContextBridge({
  value,
  children,
}: {
  value: ThemeContextValue;
  children: ReactNode;
}) {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
