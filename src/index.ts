// ============================================================================
// Tempo UI — Composable UI Component Library for PayloadCMS
// ============================================================================

// Theme System
export { ThemeProvider } from './theme/ThemeProvider';
export type { ThemeProviderProps } from './theme/ThemeProvider';
export { useTheme } from './theme/ThemeContext';
export type { ThemeContextValue, ColorMode } from './theme/ThemeContext';
export { ThemeScript } from './theme/ThemeScript';
export type { ThemeScriptProps } from './theme/ThemeScript';
export { StaticThemeProvider } from './theme/StaticThemeProvider';
export type { StaticThemeProviderProps } from './theme/StaticThemeProvider';
export type { ThemeTokens, ThemeConfig, ThemePreset, ColorTokens, TypographyTokens, DeepPartial } from './theme/tokens';
export { corporatePreset, startupPreset, elegantPreset, presetRegistry } from './theme/presets';

// Utilities
export { cn } from './lib/utils';

// Types
export type {
  PayloadMedia,
  PayloadMediaSize,
  PayloadLink,
  PayloadRichTextNode,
  PayloadRichTextParagraph,
  PayloadRichTextHeading,
  PayloadRichTextList,
  PayloadRichTextListItem,
  PayloadRichTextQuote,
  PayloadRichTextUpload,
  PayloadRichTextLink,
  PayloadRichTextTextNode,
} from './types/payload';

// Dark Mode
export { DarkModeToggle } from './components/DarkModeToggle/DarkModeToggle';
export type { DarkModeToggleProps } from './components/DarkModeToggle/DarkModeToggle';

// Layout Primitives
export { Container } from './components/layout/Container';
export type { ContainerProps } from './components/layout/Container';
export { Grid } from './components/layout/Grid';
export type { GridProps } from './components/layout/Grid';
export { Stack } from './components/layout/Stack';
export type { StackProps } from './components/layout/Stack';
export { Divider } from './components/layout/Divider';
export type { DividerProps } from './components/layout/Divider';
export { Section } from './components/layout/Section';
export type { SectionProps } from './components/layout/Section';

// UI Components (built on Base UI)
export { Button } from './ui/Button';
export type { ButtonProps } from './ui/Button';
export { Input } from './ui/Input';
export type { InputProps } from './ui/Input';
export { FormField } from './ui/FormField';
export type { FormFieldProps } from './ui/FormField';
export { Select } from './ui/Select';
export type { SelectProps, SelectOption, SelectGroup } from './ui/Select';
export { Checkbox } from './ui/Checkbox';
export type { CheckboxProps } from './ui/Checkbox';
export { RadioGroup } from './ui/RadioGroup';
export type { RadioGroupProps, RadioOption } from './ui/RadioGroup';
export { Switch } from './ui/Switch';
export type { SwitchProps } from './ui/Switch';
export { Accordion } from './ui/Accordion';
export type { AccordionProps, AccordionItem } from './ui/Accordion';
export { Tabs } from './ui/Tabs';
export type { TabsProps, TabItem } from './ui/Tabs';
export { Dialog } from './ui/Dialog';
export type { DialogProps } from './ui/Dialog';

// Kept components
export { DatePicker } from './components/form/DatePicker';
export type { DatePickerProps } from './components/form/DatePicker';
export { TextArea } from './components/form/TextArea';
export type { TextAreaProps } from './components/form/TextArea';
export { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs/Breadcrumbs';
export { Pagination } from './components/Pagination/Pagination';
export type { PaginationProps } from './components/Pagination/Pagination';
export { ToastProvider, useToast } from './components/Toast/Toast';
export type { ToastData } from './components/Toast/Toast';
export { Image } from './components/Image/Image';
export type { ImageProps } from './components/Image/Image';
export { RichText } from './components/RichText/RichText';
export type { RichTextProps } from './components/RichText/RichText';

// Blocks — Hero
export * from './blocks/Hero';

// Blocks — Header
export * from './blocks/Header';

// Blocks — Footer
export * from './blocks/Footer';

// Legacy Section Components (moved to src/_legacy/ — kept for backwards compatibility)
// @deprecated Use the new compositional blocks instead
export { SiteHeader } from './_legacy/sections/SiteHeader';
export type { SiteHeaderProps } from './_legacy/sections/SiteHeader';
export { SiteFooter } from './_legacy/sections/SiteFooter';
export type { SiteFooterProps } from './_legacy/sections/SiteFooter';
export type { FooterColumn as LegacyFooterColumn } from './_legacy/sections/SiteFooter';
export { HeroSection } from './_legacy/sections/HeroSection';
export type { HeroSectionProps } from './_legacy/sections/HeroSection';
export { FeatureGrid, FeatureCard } from './_legacy/sections/FeatureGrid';
export type { FeatureGridProps, FeatureCardProps } from './_legacy/sections/FeatureGrid';
export { Testimonial, TestimonialCarousel } from './_legacy/sections/Testimonial';
export type { TestimonialProps, TestimonialCarouselProps } from './_legacy/sections/Testimonial';
export { PricingTable } from './_legacy/sections/PricingTable';
export type { PricingTableProps, PricingTier, PricingFeature } from './_legacy/sections/PricingTable';
export { CallToAction } from './_legacy/sections/CallToAction';
export type { CallToActionProps } from './_legacy/sections/CallToAction';
export { StatsBar } from './_legacy/sections/StatsBar';
export type { StatsBarProps, Stat } from './_legacy/sections/StatsBar';
export { LogoCloud } from './_legacy/sections/LogoCloud';
export type { LogoCloudProps, LogoItem } from './_legacy/sections/LogoCloud';
export { TeamGrid } from './_legacy/sections/TeamGrid';
export type { TeamGridProps, TeamMember } from './_legacy/sections/TeamGrid';
export { BlogPostCard, BlogGrid } from './_legacy/sections/BlogGrid';
export type { BlogPostCardProps, BlogGridProps, BlogPost } from './_legacy/sections/BlogGrid';
