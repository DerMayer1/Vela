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
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        'surface-inset': 'rgb(var(--color-surface-inset) / <alpha-value>)',
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
        display: ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        h1: ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '1.6' }],
        body: ['14px', { lineHeight: '1.5' }],
        sm: ['13px', { lineHeight: '1.4' }],
        xs: ['12px', { lineHeight: '1.3' }],
        label: ['12px', { lineHeight: '1.3', fontWeight: '500' }]
      },
      borderRadius: {
        lg: '8px',
        xl: '12px'
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 12px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
}

export default config
