import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['var(--text-display-xl)', { lineHeight: 'var(--leading-display-xl)' }],
        'display-lg': ['var(--text-display-lg)', { lineHeight: 'var(--leading-display-lg)' }],
        'display': ['var(--text-display)', { lineHeight: 'var(--leading-display)' }],
        'heading-xl': ['var(--text-heading-xl)', { lineHeight: 'var(--leading-heading-xl)' }],
        'heading-lg': ['var(--text-heading-lg)', { lineHeight: 'var(--leading-heading-lg)' }],
        'heading': ['var(--text-heading)', { lineHeight: 'var(--leading-heading)' }],
        'heading-sm': ['var(--text-heading-sm)', { lineHeight: 'var(--leading-heading-sm)' }],
        'body-lg': ['var(--text-body-lg)', { lineHeight: 'var(--leading-body-lg)' }],
        'body': ['var(--text-body)', { lineHeight: 'var(--leading-body)' }],
        'body-sm': ['var(--text-body-sm)', { lineHeight: 'var(--leading-body-sm)' }],
        'caption': ['var(--text-caption)', { lineHeight: 'var(--leading-caption)' }],
      },
      spacing: {
        'section-sm': 'var(--spacing-section-sm)',
        'section': 'var(--spacing-section)',
        'section-lg': 'var(--spacing-section-lg)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      maxWidth: {
        'container-sm': 'var(--container-sm)',
        'container': 'var(--container)',
        'container-lg': 'var(--container-lg)',
        'container-xl': 'var(--container-xl)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-bottom': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'count-up': {
          '0%': { '--count-progress': '0' },
          '100%': { '--count-progress': '1' },
        },
        'accordion-down': {
          '0%': { height: '0' },
          '100%': { height: 'var(--accordion-content-height)' },
        },
        'accordion-up': {
          '0%': { height: 'var(--accordion-content-height)' },
          '100%': { height: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in var(--duration-normal) ease-out',
        'fade-out': 'fade-out var(--duration-normal) ease-out',
        'slide-in-from-top': 'slide-in-from-top var(--duration-normal) ease-out',
        'slide-in-from-bottom': 'slide-in-from-bottom var(--duration-normal) ease-out',
        'slide-in-from-left': 'slide-in-from-left var(--duration-normal) ease-out',
        'slide-in-from-right': 'slide-in-from-right var(--duration-normal) ease-out',
        'scale-in': 'scale-in var(--duration-normal) ease-out',
        'accordion-down': 'accordion-down var(--duration-normal) ease-out',
        'accordion-up': 'accordion-up var(--duration-normal) ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
