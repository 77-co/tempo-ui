# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tempo UI** is a production-ready React component library for building business websites, optimized for PayloadCMS integration. It's published as an NPM package (@seventy7/tempo-ui) with dual CommonJS and ESM builds, TypeScript support, and zero-config Tailwind CSS v4 integration.

## Key Technology Stack

- **Language**: TypeScript
- **UI Framework**: React 19
- **Styling**: Tailwind CSS v4 (CSS-first configuration, no config file needed)
- **Build Tool**: tsup (with splitting and tree-shaking enabled)
- **Package Manager**: pnpm (inferred from node_modules structure)

## Common Development Commands

```bash
# Build for production (tsup + Tailwind CLI)
npm run build

# Watch mode during development
npm run build:watch

# Type checking
npm run typecheck

# Linting (eslint on .ts/.tsx files)
npm run lint

# Clean build artifacts
npm run clean
```

## Architecture & Structure

### Theme System (src/theme/)

The entire design system is built on a **centralized theme provider** that injects CSS custom properties. Key concepts:

- **ThemeProvider**: React context that manages theme configuration, color mode (light/dark/system), and CSS variable injection
- **Presets**: Three built-in theme configurations (corporate, startup, elegant) stored in `src/theme/presets/`
- **Tokens**: Design tokens defined in `src/theme/tokens.ts` (colors, typography, spacing, radius, shadows, durations, containers)
- **Deep Merge**: Custom theme overrides can be layered on top of presets via the `overrides` config property

**Important**: The theme injects CSS custom properties (--background, --primary, etc.) into `document.documentElement` in both light and dark modes. Dark mode is controlled by adding the `dark` class to the HTML element (Tailwind convention).

### Component Organization

Components are organized into functional categories:

- **Layout Primitives** (`src/components/layout/`): Container, Grid, Stack, Section, Divider
- **Form Components** (`src/components/form/`): TextInput, Select, Checkbox, RadioGroup, Toggle, DatePicker, FormField, TextArea
- **Navigation** (`src/components/*/`): Accordion, Tabs, Breadcrumbs, Pagination
- **Overlays**: Modal, Toast (with provider pattern)
- **Media/Content**: Image (with PayloadCMS support), RichText
- **Page Sections** (`src/components/sections/`): SiteHeader, SiteFooter, HeroSection, FeatureGrid, Testimonial, PricingTable, CallToAction, StatsBar, LogoCloud, TeamGrid, BlogGrid
- **Dark Mode**: DarkModeToggle component + useTheme hook

### Build & Export Strategy

- **Single entry point**: src/index.ts exports all public APIs (components, hooks, types, presets)
- **Dual format**: tsup builds CommonJS (.cjs.js) and ES modules (.esm.js)
- **Type declarations**: Generated via tsup with dts flag
- **External dependencies**: React and React-DOM are external (peer dependencies)
- **Tree-shakeable**: tsup's splitting and treeshake flags enabled
- **Styles**: Tailwind CSS output as separate dist/styles.css (compiled with --minify)

### PayloadCMS Integration

PayloadCMS-specific types and helpers:

- **PayloadMedia type** in `src/types/payload.ts`: Represents media field shapes from PayloadCMS
- **Image component**: Accepts PayloadMedia objects directly
- **RichText component**: Renders PayloadCMS Lexical output with customizable overrides
- **Layout blocks pattern**: Components are designed to map directly to PayloadCMS block schemas

## TypeScript Configuration

- **Target**: ES2020
- **Module**: ESNext
- **JSX**: react-jsx (automatic JSX transform)
- **Path alias**: `@/*` points to `src/*`
- **Strict mode**: Enabled
- **Module resolution**: bundler (Typescript 5+)

## CSS & Styling

- **Tailwind v4**: Uses the new CSS-first approach (@import 'tailwindcss' in globals.css)
- **No config file needed**: Tailwind v4 automatically detects source files and applies defaults
- **Theme tokens as CSS variables**: All design tokens (colors, typography, spacing, etc.) are injected as custom properties
- **Dark mode**: Controlled by `dark` class on html element
- **Utility-first**: Components use Tailwind classes with clsx + tailwind-merge for conditional styles

## Important Patterns & Conventions

1. **Theme Provider Requirement**: All components must be rendered within a `<ThemeProvider>` to access theme tokens and dark mode functionality
2. **CSS Custom Properties**: Access theme values via CSS variables (--primary, --background, etc.), not Tailwind tokens directly (in some cases)
3. **Responsive Design**: Mobile-first Tailwind approach; components use Tailwind's breakpoints (sm, md, lg, xl)
4. **Accessibility**: Components include proper ARIA attributes, keyboard navigation, and focus management (WCAG 2.2 AA compliant)
5. **Component Props**: Standardized prop interfaces for consistency; most components accept className for style customization
6. **Link Rendering**: Page section components (SiteHeader, SiteFooter, etc.) accept `renderLink` prop for framework-specific routing (Next.js Link, etc.)

## Notable Implementation Details

- **Dark mode detection**: Uses `window.matchMedia('(prefers-color-scheme: dark)')` for system preference
- **Persistence**: Color mode preference stored in localStorage under `tempo-ui-color-mode` key
- **Error boundaries**: Components throw clear errors if used outside required context (e.g., useTheme outside ThemeProvider)
- **No external UI libraries**: All components are custom-built with HTML + Tailwind, no dependency on shadcn, Headless UI, etc.
- **Toast system**: Uses a provider + hook pattern with singleton toaster instance

## File Structure Reference

```
src/
├── index.ts              # Single export entry point
├── theme/
│   ├── ThemeProvider.tsx # Theme context + hooks
│   ├── tokens.ts         # Token type definitions
│   └── presets/          # corporate.ts, startup.ts, elegant.ts
├── components/
│   ├── layout/           # Primitives (Container, Grid, Stack, etc.)
│   ├── form/             # Form inputs
│   ├── Accordion/
│   ├── Tabs/
│   ├── Modal/
│   ├── Toast/
│   ├── Image/
│   ├── RichText/
│   ├── DarkModeToggle/
│   └── sections/         # Page-level components (Hero, Header, Footer, etc.)
├── types/
│   └── payload.ts        # PayloadCMS type definitions
├── lib/
│   └── utils.ts          # Helper functions (cn for className merging)
└── styles/
    └── globals.css       # Tailwind imports + base styles
```

## Linting & Code Style

No ESLint config file found; if needed, configure `.eslintrc.json` or `eslint.config.js` for TypeScript linting rules.

## Release & Publishing

- Package name: @seventy7/tempo-ui
- Current version: 0.1.1
- Published to npm via the dist directory
- License: GPL-3.0-only
