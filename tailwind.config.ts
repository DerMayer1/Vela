import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-hover': 'rgb(var(--color-primary-hover) / <alpha-value>)',
        'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
        'primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-light': 'rgb(var(--color-accent-light) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        'surface-inset': 'rgb(var(--color-surface-inset) / <alpha-value>)',
        'surface-dark': 'rgb(var(--color-surface-dark) / <alpha-value>)',
        'surface-dark-soft': 'rgb(var(--color-surface-dark-soft) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)'
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        'success-light': 'rgb(var(--color-success-light) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        'warning-light': 'rgb(var(--color-warning-light) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        'danger-light': 'rgb(var(--color-danger-light) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        'info-light': 'rgb(var(--color-info-light) / <alpha-value>)',
        status: {
          scheduled: 'rgb(var(--color-status-scheduled) / <alpha-value>)',
          'in-progress':
            'rgb(var(--color-status-in-progress) / <alpha-value>)',
          completed: 'rgb(var(--color-status-completed) / <alpha-value>)',
          cancelled: 'rgb(var(--color-status-cancelled) / <alpha-value>)'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)']
      },
      fontSize: {
        display: ['clamp(3.35rem, 7vw, 6rem)', { lineHeight: '0.94', fontWeight: '650' }],
        h1: ['clamp(2.3rem, 4vw, 3.7rem)', { lineHeight: '1', fontWeight: '650' }],
        h2: ['clamp(1.65rem, 2.5vw, 2.5rem)', { lineHeight: '1.06', fontWeight: '600' }],
        h3: ['clamp(1.05rem, 1.5vw, 1.35rem)', { lineHeight: '1.28', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
        body: ['15px', { lineHeight: '1.55' }],
        sm: ['13px', { lineHeight: '1.4' }],
        xs: ['12px', { lineHeight: '1.3' }],
        label: ['12px', { lineHeight: '1.3', fontWeight: '500' }]
      },
      borderRadius: {
        lg: '16px',
        xl: '24px',
        '2xl': '32px'
      },
      boxShadow: {
        sm: '0 10px 28px rgba(10, 24, 49, 0.06)',
        md: '0 22px 54px rgba(10, 24, 49, 0.12)',
        lg: '0 40px 96px rgba(10, 24, 49, 0.18)'
      }
    }
  },
  plugins: []
}

export default config
