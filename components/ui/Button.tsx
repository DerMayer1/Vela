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
    'border border-transparent bg-danger text-text-inverse hover:bg-[#b91c1c] focus-visible:ring-2 focus-visible:ring-danger/20',
  ghost:
    'border border-transparent bg-transparent text-text-secondary hover:bg-surface-inset hover:text-text-primary focus-visible:ring-2 focus-visible:ring-primary/20',
  primary:
    'border border-transparent bg-primary text-text-inverse hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary/20',
  secondary:
    'border border-border bg-surface text-text-primary hover:bg-surface-raised focus-visible:ring-2 focus-visible:ring-primary/20'
}

const sizeClasses = {
  sm: 'h-8 rounded-md px-3 text-sm',
  md: 'h-10 rounded-lg px-4 text-body',
  lg: 'h-12 rounded-lg px-6 text-body-lg'
}

export function buttonVariants({
  className,
  size = 'md',
  variant = 'primary'
}: ButtonVariantOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
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
