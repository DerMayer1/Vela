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
  cancelled: 'border-danger/20 bg-danger-light text-danger',
  completed: 'border-border bg-surface-inset text-text-secondary',
  danger: 'border-danger/20 bg-danger-light text-danger',
  default: 'border-border bg-surface-raised text-text-secondary',
  info: 'border-info/20 bg-info-light text-info',
  'in-progress': 'border-success/20 bg-success-light text-success',
  scheduled: 'border-info/20 bg-info-light text-info',
  success: 'border-success/20 bg-success-light text-success',
  warning: 'border-warning/20 bg-warning-light text-warning'
}

export function Badge({
  children,
  className,
  variant = 'default'
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
