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

// Button
export { Button } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button';

// Form Components
export { FormField } from './components/form/FormField';
export type { FormFieldProps } from './components/form/FormField';
export { TextInput } from './components/form/TextInput';
export type { TextInputProps } from './components/form/TextInput';
export { TextArea } from './components/form/TextArea';
export type { TextAreaProps } from './components/form/TextArea';
export { Select } from './components/form/Select';
export type { SelectProps, SelectOption } from './components/form/Select';
export { Checkbox } from './components/form/Checkbox';
export type { CheckboxProps } from './components/form/Checkbox';
export { RadioGroup } from './components/form/RadioGroup';
export type { RadioGroupProps, RadioOption } from './components/form/RadioGroup';
export { Toggle } from './components/form/Toggle';
export type { ToggleProps } from './components/form/Toggle';
export { DatePicker } from './components/form/DatePicker';
export type { DatePickerProps } from './components/form/DatePicker';

// Navigation Components
export { Accordion } from './components/Accordion/Accordion';
export type { AccordionProps, AccordionItem } from './components/Accordion/Accordion';
export { Tabs } from './components/Tabs/Tabs';
export type { TabsProps, TabItem } from './components/Tabs/Tabs';
export { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs/Breadcrumbs';
export { Pagination } from './components/Pagination/Pagination';
export type { PaginationProps } from './components/Pagination/Pagination';

// Overlay Components
export { Modal } from './components/Modal/Modal';
export type { ModalProps } from './components/Modal/Modal';
export { ToastProvider, useToast } from './components/Toast/Toast';
export type { ToastData } from './components/Toast/Toast';

// Media & Content
export { Image } from './components/Image/Image';
export type { ImageProps } from './components/Image/Image';
export { RichText } from './components/RichText/RichText';
export type { RichTextProps } from './components/RichText/RichText';

// Page Sections
export { SiteHeader } from './components/sections/SiteHeader';
export type { SiteHeaderProps } from './components/sections/SiteHeader';
export { SiteFooter } from './components/sections/SiteFooter';
export type { SiteFooterProps, FooterColumn } from './components/sections/SiteFooter';
export { HeroSection } from './components/sections/HeroSection';
export type { HeroSectionProps } from './components/sections/HeroSection';
export { FeatureGrid, FeatureCard } from './components/sections/FeatureGrid';
export type { FeatureGridProps, FeatureCardProps } from './components/sections/FeatureGrid';
export { Testimonial, TestimonialCarousel } from './components/sections/Testimonial';
export type { TestimonialProps, TestimonialCarouselProps } from './components/sections/Testimonial';
export { PricingTable } from './components/sections/PricingTable';
export type { PricingTableProps, PricingTier, PricingFeature } from './components/sections/PricingTable';
export { CallToAction } from './components/sections/CallToAction';
export type { CallToActionProps } from './components/sections/CallToAction';
export { StatsBar } from './components/sections/StatsBar';
export type { StatsBarProps, Stat } from './components/sections/StatsBar';
export { LogoCloud } from './components/sections/LogoCloud';
export type { LogoCloudProps, LogoItem } from './components/sections/LogoCloud';
export { TeamGrid } from './components/sections/TeamGrid';
export type { TeamGridProps, TeamMember } from './components/sections/TeamGrid';
export { BlogPostCard, BlogGrid } from './components/sections/BlogGrid';
export type { BlogPostCardProps, BlogGridProps, BlogPost } from './components/sections/BlogGrid';
