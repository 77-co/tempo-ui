# Tempo UI

Production-ready, composable UI component library for building business websites powered by **PayloadCMS**. Built with **React**, **TypeScript**, and **TailwindCSS**.

Tempo UI is **not** a site builder or drag-and-drop tool — it is a curated set of professionally designed, pre-styled yet deeply customizable primitives and composite components that developers wire together to construct pages efficiently.

---

## Features

- 🎨 **Centralized theming** — Single theme provider governs all design tokens
- 🌗 **Dark mode** — System detection, persistent toggle, smooth transitions
- 📱 **Mobile-first** — Fully responsive across all breakpoints
- ♿ **WCAG 2.2 AA** — Proper ARIA, keyboard nav, focus management, reduced-motion respect
- 🧩 **PayloadCMS ready** — Data shapes align with PayloadCMS schemas
- 🎯 **3 built-in presets** — Corporate, Startup, Elegant
- 📦 **Tree-shakeable** — Import only what you use

---

## Installation

```bash
npm install tempo-ui
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
@import 'tempo-ui/styles.css';
```

That's it. Tailwind v4 automatically detects your source files, and Tempo UI's styles ship with all theme configuration embedded.

---

## Quick Start

```tsx
import {
  ThemeProvider,
  SiteHeader,
  HeroSection,
  FeatureGrid,
  CallToAction,
  SiteFooter,
  DarkModeToggle,
  Button,
} from 'tempo-ui';

export default function HomePage() {
  return (
    <ThemeProvider config={{ preset: 'startup' }}>
      <SiteHeader
        logo={<span className="text-xl font-bold">MyBrand</span>}
        navigation={
          <>
            <a href="/features" className="px-3 py-2 text-sm hover:text-primary">Features</a>
            <a href="/pricing" className="px-3 py-2 text-sm hover:text-primary">Pricing</a>
            <a href="/contact" className="px-3 py-2 text-sm hover:text-primary">Contact</a>
          </>
        }
        actions={
          <>
            <DarkModeToggle size="sm" />
            <Button size="sm">Get Started</Button>
          </>
        }
      />

      <HeroSection
        headline="Build amazing websites with Tempo UI"
        subheadline="A composable component system designed for PayloadCMS"
        primaryAction={{ label: 'Get Started', href: '/docs' }}
        secondaryAction={{ label: 'View Demo', href: '/demo' }}
      />

      <FeatureGrid
        features={[
          { heading: 'Theme System', description: 'Centralized tokens power every component.', icon: '🎨' },
          { heading: 'Dark Mode', description: 'System detection with persistent toggle.', icon: '🌗' },
          { heading: 'Accessible', description: 'WCAG 2.2 AA compliant out of the box.', icon: '♿' },
        ]}
      />

      <CallToAction
        heading="Ready to get started?"
        body="Install Tempo UI and build your next website in hours, not weeks."
        action={{ label: 'Install Now', href: '/docs' }}
      />

      <SiteFooter
        copyright="© 2025 MyBrand. All rights reserved."
        columns={[
          { title: 'Product', links: [{ label: 'Features', href: '/features' }, { label: 'Pricing', href: '/pricing' }] },
          { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
        ]}
      />
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
import { DarkModeToggle, useTheme } from 'tempo-ui';

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

### Data Entry

| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button with icons, loading, disabled states |
| `TextInput` | Text input with icons, error state, sizes |
| `TextArea` | Auto-resizable textarea |
| `Select` | Native select with options |
| `Checkbox` | Labeled checkbox |
| `RadioGroup` | Radio button group |
| `Toggle` | Switch/toggle component |
| `DatePicker` | Native date input |
| `FormField` | Label + helper text + error wrapper |

### Navigation

| Component | Description |
|-----------|-------------|
| `Accordion` | Collapsible panels with FAQ schema support |
| `Tabs` | Tab panel with underline/pills/bordered variants |
| `Breadcrumbs` | Breadcrumb trail with custom link renderer |
| `Pagination` | Page navigation with ellipsis |

### Feedback & Overlay

| Component | Description |
|-----------|-------------|
| `Modal` | Dialog with focus trap, keyboard dismiss |
| `ToastProvider` / `useToast` | Toast notification system |

### Media & Content

| Component | Description |
|-----------|-------------|
| `Image` | Lazy loading, aspect ratio, blur-up, PayloadCMS support |
| `RichText` | Renders PayloadCMS rich text to styled typography |

### Page Sections

| Component | Description |
|-----------|-------------|
| `SiteHeader` | Sticky/transparent header with mobile drawer |
| `SiteFooter` | Multi-column footer with newsletter, social, back-to-top |
| `HeroSection` | Full-bleed hero with image/video, CTAs, overlay |
| `FeatureGrid` / `FeatureCard` | Service/capability showcase |
| `Testimonial` / `TestimonialCarousel` | Quote carousel with autoplay |
| `PricingTable` | Tiered pricing with feature comparison |
| `CallToAction` | Banner with heading, body, CTA buttons |
| `StatsBar` | Animated counting statistics |
| `LogoCloud` | Partner/client logos with grayscale hover |
| `TeamGrid` | Team member cards with social links |
| `BlogPostCard` / `BlogGrid` | Blog post listing |

---

## PayloadCMS Integration

### Media Fields

All image components accept PayloadCMS media objects:

```tsx
import { Image } from 'tempo-ui';

// From PayloadCMS media field
<Image src={page.heroImage} aspectRatio="16/9" />

// The PayloadMedia type:
// { url: string; alt?: string; width?: number; height?: number; sizes?: Record<string, ...> }
```

### Rich Text

```tsx
import { RichText } from 'tempo-ui';

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
        return <HeroSection key={i} {...block} />;
      case 'features':
        return <Section key={i} padding="lg"><FeatureGrid features={block.features} /></Section>;
      case 'testimonials':
        return <Section key={i} background="muted"><TestimonialCarousel testimonials={block.items} /></Section>;
      case 'cta':
        return <Section key={i}><CallToAction {...block} /></Section>;
      case 'pricing':
        return <Section key={i}><PricingTable tiers={block.tiers} /></Section>;
      case 'richText':
        return <Section key={i}><RichText content={block.content} /></Section>;
      default:
        return null;
    }
  });
}
```

### Custom Link Renderer (Next.js)

Many components accept a `renderLink` prop for framework-specific routing:

```tsx
import Link from 'next/link';

<SiteFooter
  renderLink={({ href, className, children }) => (
    <Link href={href} className={className}>{children}</Link>
  )}
  // ...
/>
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
