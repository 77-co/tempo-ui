# Tempo UI

Production-ready, composable UI component library for building business websites powered by **PayloadCMS**. Built with **React**, **TypeScript**, and **TailwindCSS**.

Tempo UI is **not** a site builder or drag-and-drop tool — it is a curated set of professionally designed, pre-styled yet deeply customizable primitives and composite components that developers wire together to construct pages efficiently.

---

## Features

- **Centralized theming** — Single theme provider governs all design tokens
- **Dark mode** — System detection, persistent toggle, smooth transitions, FOUC-free
- **Mobile-first** — Fully responsive across all breakpoints
- **WCAG 2.2 AA** — Proper ARIA, keyboard nav, focus management, reduced-motion respect
- **PayloadCMS ready** — Data shapes align with PayloadCMS schemas
- **3 built-in presets** — Corporate, Startup, Elegant
- **Tree-shakeable** — Import only what you use
- **Base UI primitives** — Accessible headless components under the hood (no external UI library lock-in)

---

## Installation

```bash
npm install @seventy7/tempo-ui
```

### Peer Dependencies

```bash
npm install react react-dom
```

### Tailwind CSS Setup

Tempo UI uses Tailwind v4, which is configured entirely in CSS — no `tailwind.config.ts` needed.

Import the base styles in your global CSS file (e.g. `globals.css`):

```css
@import 'tailwindcss';
@import '@seventy7/tempo-ui/styles.css';
```

That's it. Tailwind v4 automatically detects your source files, and Tempo UI's styles ship with all theme configuration embedded.

---

## Quick Start

```tsx
import {
  ThemeProvider,
  Header,
  HeaderBrand,
  HeaderNav,
  HeaderNavItem,
  HeaderActions,
  Hero,
  HeroBackground,
  HeroContent,
  HeroHeadline,
  HeroSubheadline,
  HeroActions,
  Footer,
  FooterBrand,
  FooterColumn,
  FooterLink,
  FooterLegal,
  DarkModeToggle,
  Button,
} from '@seventy7/tempo-ui';

export default function HomePage() {
  return (
    <ThemeProvider config={{ preset: 'startup' }}>
      <Header sticky>
        <HeaderBrand>
          <span className="text-xl font-bold">MyBrand</span>
        </HeaderBrand>
        <HeaderNav>
          <HeaderNavItem href="/features">Features</HeaderNavItem>
          <HeaderNavItem href="/pricing">Pricing</HeaderNavItem>
          <HeaderNavItem href="/contact">Contact</HeaderNavItem>
        </HeaderNav>
        <HeaderActions>
          <DarkModeToggle size="sm" />
          <Button size="sm">Get Started</Button>
        </HeaderActions>
      </Header>

      <Hero>
        <HeroBackground overlay />
        <HeroContent textAlign="center">
          <HeroHeadline>Build amazing websites with Tempo UI</HeroHeadline>
          <HeroSubheadline>A composable component system designed for PayloadCMS</HeroSubheadline>
          <HeroActions>
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">View Demo</Button>
          </HeroActions>
        </HeroContent>
      </Hero>

      <Footer>
        <FooterBrand>
          <span className="font-bold text-lg">MyBrand</span>
          <p className="text-sm text-muted-foreground mt-2">Building better websites.</p>
        </FooterBrand>
        <FooterColumn title="Product">
          <FooterLink href="/features">Features</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
        </FooterColumn>
        <FooterColumn title="Company">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterColumn>
        <FooterLegal>© 2025 MyBrand. All rights reserved.</FooterLegal>
      </Footer>
    </ThemeProvider>
  );
}
```

---

## Theme Configuration

### Using Presets

Tempo UI ships with 3 complete presets:

| Preset | Style | Best For |
|--------|-------|----------|
| `corporate` | Clean, professional, navy + teal | B2B, finance, consulting |
| `startup` | Bold, energetic, indigo + orange | SaaS, tech, product |
| `elegant` | Refined, luxurious, emerald + gold, serif headings | Hospitality, fashion, portfolios |

```tsx
<ThemeProvider config={{ preset: 'elegant' }}>
  {/* Every component now uses the elegant theme */}
</ThemeProvider>
```

### Custom Overrides

Apply partial overrides on top of any preset:

```tsx
<ThemeProvider
  config={{
    preset: 'corporate',
    overrides: {
      colors: {
        light: {
          primary: '250 80% 55%',    // Custom purple primary
          accent: '340 80% 55%',      // Custom pink accent
        },
        dark: {
          primary: '250 80% 65%',
          accent: '340 80% 65%',
        },
      },
      radius: {
        'radius-md': '0.75rem',       // Rounder corners
        'radius-lg': '1rem',
      },
    },
  }}
>
```

### Dark Mode

```tsx
import { DarkModeToggle, useTheme } from '@seventy7/tempo-ui';

// Simple toggle button
<DarkModeToggle />

// With system preference option
<DarkModeToggle showSystem />

// Programmatic control
function MyComponent() {
  const { mode, setMode, toggleMode, resolvedMode } = useTheme();
  // mode: 'light' | 'dark' | 'system'
  // resolvedMode: 'light' | 'dark' (never 'system')
}
```

### FOUC Prevention (SSR / Next.js)

Use `ThemeScript` in your document `<head>` and `StaticThemeProvider` on the server to prevent flash of unstyled content:

```tsx
// app/layout.tsx (Next.js App Router)
import { ThemeScript, StaticThemeProvider } from '@seventy7/tempo-ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeScript config={{ preset: 'startup' }} />
      </head>
      <body>
        <StaticThemeProvider config={{ preset: 'startup' }}>
          {children}
        </StaticThemeProvider>
      </body>
    </html>
  );
}
```

---

## Component Inventory

### Layout Primitives

| Component | Description |
|-----------|-------------|
| `Container` | Responsive max-width container with padding |
| `Grid` | CSS Grid with responsive column configuration |
| `Stack` | Flexbox stack (vertical/horizontal) with gap control |
| `Section` | Page section with background, padding, optional container |
| `Divider` | Visual separator with orientation and label support |

### UI Components

Built on [Base UI](https://base-ui.com) for accessible, headless behaviour with Tempo's design tokens applied.

| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button with icons, loading state, Base UI `render` prop for custom elements |
| `Input` | Text input with icons, error state, sizes |
| `TextArea` | Auto-resizable textarea |
| `Select` | Select with option groups |
| `Checkbox` | Labeled checkbox |
| `RadioGroup` | Radio button group |
| `Switch` | Toggle switch |
| `DatePicker` | Native date input |
| `FormField` | Label + helper text + error wrapper |
| `Accordion` | Collapsible panels with FAQ schema support |
| `Tabs` | Tab panel with underline/pills/bordered variants |
| `Dialog` | Modal dialog with focus trap, keyboard dismiss |

### Navigation

| Component | Description |
|-----------|-------------|
| `Breadcrumbs` | Breadcrumb trail with custom link renderer |
| `Pagination` | Page navigation with ellipsis |

### Feedback & Overlay

| Component | Description |
|-----------|-------------|
| `ToastProvider` / `useToast` | Toast notification system |

### Media & Content

| Component | Description |
|-----------|-------------|
| `Image` | Lazy loading, aspect ratio, blur-up, PayloadCMS support |
| `RichText` | Renders PayloadCMS rich text to styled typography |

### Blocks — Compositional Page Sections

Blocks are composable, slot-based page-level constructs. Compose them from their named sub-components rather than passing monolithic prop objects.

#### Header block

```tsx
import {
  Header, HeaderBrand, HeaderNav, HeaderNavItem,
  HeaderActions, HeaderMobileMenu,
} from '@seventy7/tempo-ui';

<Header sticky transparent>
  <HeaderBrand>
    <img src="/logo.svg" alt="MyBrand" className="h-8" />
  </HeaderBrand>
  <HeaderNav>
    <HeaderNavItem href="/features">Features</HeaderNavItem>
    <HeaderNavItem href="/pricing">Pricing</HeaderNavItem>
  </HeaderNav>
  <HeaderActions>
    <DarkModeToggle size="sm" />
    <Button size="sm">Sign In</Button>
  </HeaderActions>
  <HeaderMobileMenu>
    <HeaderNavItem href="/features">Features</HeaderNavItem>
    <HeaderNavItem href="/pricing">Pricing</HeaderNavItem>
  </HeaderMobileMenu>
</Header>
```

#### Hero block

```tsx
import {
  Hero, HeroBackground, HeroContent,
  HeroHeadline, HeroSubheadline, HeroActions,
} from '@seventy7/tempo-ui';

<Hero minHeight="80vh">
  <HeroBackground src="/hero.jpg" overlay />
  <HeroContent textAlign="center" maxWidth="lg">
    <HeroHeadline>Ship faster with Tempo UI</HeroHeadline>
    <HeroSubheadline>Production-ready components for PayloadCMS projects</HeroSubheadline>
    <HeroActions>
      <Button size="xl">Get Started</Button>
      <Button size="xl" variant="outline">Read the Docs</Button>
    </HeroActions>
  </HeroContent>
</Hero>
```

#### Footer block

```tsx
import {
  Footer, FooterBrand, FooterColumn,
  FooterLink, FooterLegal,
} from '@seventy7/tempo-ui';

<Footer>
  <FooterBrand>
    <span className="font-bold text-lg">MyBrand</span>
    <p className="text-sm text-muted-foreground mt-2">Building better websites.</p>
  </FooterBrand>
  <FooterColumn title="Product">
    <FooterLink href="/features">Features</FooterLink>
    <FooterLink href="/pricing">Pricing</FooterLink>
  </FooterColumn>
  <FooterColumn title="Company">
    <FooterLink href="/about">About</FooterLink>
    <FooterLink href="/blog">Blog</FooterLink>
  </FooterColumn>
  <FooterLegal>© 2025 MyBrand. All rights reserved.</FooterLegal>
</Footer>
```

---

## PayloadCMS Integration

### Media Fields

All image components accept PayloadCMS media objects:

```tsx
import { Image } from '@seventy7/tempo-ui';

// From PayloadCMS media field
<Image src={page.heroImage} aspectRatio="16/9" />

// The PayloadMedia type:
// { url: string; alt?: string; width?: number; height?: number; sizes?: Record<string, ...> }
```

### Rich Text

```tsx
import { RichText } from '@seventy7/tempo-ui';

// Directly pass PayloadCMS Lexical/Slate output
<RichText content={page.content} />

// With custom overrides
<RichText
  content={page.content}
  overrides={{
    upload: (node, children) => <CustomImage media={node.value} />,
  }}
/>
```

### Layout Blocks Pattern

```tsx
// PayloadCMS layout blocks → Tempo UI components
function RenderBlocks({ blocks }) {
  return blocks.map((block, i) => {
    switch (block.blockType) {
      case 'hero':
        return (
          <Hero key={i}>
            <HeroBackground src={block.image?.url} overlay />
            <HeroContent textAlign="center">
              <HeroHeadline>{block.headline}</HeroHeadline>
              <HeroSubheadline>{block.subheadline}</HeroSubheadline>
            </HeroContent>
          </Hero>
        );
      case 'richText':
        return <Section key={i}><RichText content={block.content} /></Section>;
      default:
        return null;
    }
  });
}
```

---

## Design Tokens Reference

All tokens are CSS custom properties injected by `ThemeProvider`:

### Colors (HSL values)
`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--success`, `--success-foreground`, `--warning`, `--warning-foreground`, `--muted`, `--muted-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--input`, `--ring`

### Typography
`--font-sans`, `--font-heading`, `--font-mono`, `--text-display-xl` through `--text-caption`, `--leading-display-xl` through `--leading-caption`

### Spacing
`--spacing-section-sm`, `--spacing-section`, `--spacing-section-lg`

### Radius
`--radius-sm`, `--radius-md`, `--radius-lg`

### Shadows
`--shadow-sm`, `--shadow`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

### Durations
`--duration-fast`, `--duration-normal`, `--duration-slow`

### Containers
`--container-sm`, `--container`, `--container-lg`, `--container-xl`

---

## License

MIT
