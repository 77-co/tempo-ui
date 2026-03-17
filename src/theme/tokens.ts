/**
 * Design tokens type definitions for the Tempo UI theme system.
 * All values are CSS custom property values (HSL for colors, rem/px for sizes).
 */

/** Color tokens defined as HSL values (without the hsl() wrapper) */
export interface ColorTokens {
  background: string;
  foreground: string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  success: string;
  'success-foreground': string;
  warning: string;
  'warning-foreground': string;
  muted: string;
  'muted-foreground': string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  border: string;
  input: string;
  ring: string;
}

/** Typography tokens */
export interface TypographyTokens {
  'font-sans': string;
  'font-heading': string;
  'font-mono': string;
  'text-display-xl': string;
  'leading-display-xl': string;
  'text-display-lg': string;
  'leading-display-lg': string;
  'text-display': string;
  'leading-display': string;
  'text-heading-xl': string;
  'leading-heading-xl': string;
  'text-heading-lg': string;
  'leading-heading-lg': string;
  'text-heading': string;
  'leading-heading': string;
  'text-heading-sm': string;
  'leading-heading-sm': string;
  'text-body-lg': string;
  'leading-body-lg': string;
  'text-body': string;
  'leading-body': string;
  'text-body-sm': string;
  'leading-body-sm': string;
  'text-caption': string;
  'leading-caption': string;
}

/** Spacing tokens */
export interface SpacingTokens {
  'spacing-section-sm': string;
  'spacing-section': string;
  'spacing-section-lg': string;
}

/** Border radius tokens */
export interface RadiusTokens {
  'radius-sm': string;
  'radius-md': string;
  'radius-lg': string;
}

/** Shadow tokens */
export interface ShadowTokens {
  'shadow-sm': string;
  'shadow': string;
  'shadow-md': string;
  'shadow-lg': string;
  'shadow-xl': string;
}

/** Transition duration tokens */
export interface DurationTokens {
  'duration-fast': string;
  'duration-normal': string;
  'duration-slow': string;
}

/** Container width tokens */
export interface ContainerTokens {
  'container-sm': string;
  'container': string;
  'container-lg': string;
  'container-xl': string;
}

/** Complete set of theme tokens */
export interface ThemeTokens {
  colors: {
    light: ColorTokens;
    dark: ColorTokens;
  };
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  durations: DurationTokens;
  containers: ContainerTokens;
}

/** Theme preset with metadata */
export interface ThemePreset {
  name: string;
  description: string;
  tokens: ThemeTokens;
}

/** Theme configuration passed to ThemeProvider */
export interface ThemeConfig {
  /** Named preset to use as base ('corporate' | 'startup' | 'elegant') or custom ThemeTokens */
  preset?: string | ThemeTokens;
  /** Partial overrides applied on top of the preset */
  overrides?: DeepPartial<ThemeTokens>;
}

/** Deep partial utility type */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
