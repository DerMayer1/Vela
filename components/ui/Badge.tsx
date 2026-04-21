import { cn } from '@/lib/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?:
    | 'cancelled'
    | 'completed'
    | 'danger'
    | 'default'
    | 'info'
    | 'in-progress'
    | 'scheduled'
    | 'success'
    | 'warning'
}

const variantClasses = {
  cancelled: 'border border-danger/18 bg-danger-light text-danger shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
  completed: 'border border-border/70 bg-white/84 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.84)]',
  danger: 'border border-danger/18 bg-danger-light text-danger shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
  default: 'border border-border/70 bg-white/84 text-text-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.84)]',
  info: 'border border-primary/16 bg-primary-light/90 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]',
  'in-progress': 'border border-accent/18 bg-accent-light text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]',
  scheduled: 'border border-primary/16 bg-primary-light/90 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]',
  success: 'border border-accent/18 bg-accent-light text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]',
  warning: 'border border-warning/18 bg-warning-light text-warning shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
}

export function Badge({
  children,
  className,
  variant = 'default'
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
