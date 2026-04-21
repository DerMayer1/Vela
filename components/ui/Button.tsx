import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonVariantOptions {
  className?: string | undefined
  size?: 'sm' | 'md' | 'lg'
  variant?: 'danger' | 'ghost' | 'primary' | 'secondary'
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantOptions {}

const variantClasses = {
  danger:
    'border border-danger/80 bg-danger text-text-inverse shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_28px_rgba(226,68,92,0.24)] hover:-translate-y-0.5 hover:bg-danger/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_20px_34px_rgba(226,68,92,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  ghost:
    'border border-white/70 bg-white/70 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_10px_24px_rgba(10,24,49,0.05)] hover:-translate-y-0.5 hover:border-border-strong hover:bg-white hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/24 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  primary:
    'border border-primary-hover/80 bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_32px_rgba(28,92,255,0.28)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_24px_40px_rgba(28,92,255,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/32 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  secondary:
    'border border-border/80 bg-white/88 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_12px_26px_rgba(10,24,49,0.06)] hover:-translate-y-0.5 hover:border-primary/18 hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_16px_32px_rgba(10,24,49,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/24 focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
}

const sizeClasses = {
  sm: 'h-10 rounded-full px-4 text-sm',
  md: 'h-12 rounded-full px-5 text-body',
  lg: 'h-14 rounded-full px-6 text-body-lg'
}

export function buttonVariants({
  className,
  size = 'md',
  variant = 'primary'
}: ButtonVariantOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.01em] transition-all duration-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    sizeClasses[size],
    className
  )
}

export function Button({
  children,
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ className, size, variant })}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
