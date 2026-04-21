import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  padding?: 'compact' | 'default' | 'none'
}

const paddingClasses = {
  compact: 'p-4',
  default: 'p-6',
  none: 'p-0'
}

export function Card({
  children,
  className,
  interactive = false,
  padding = 'default'
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface shadow-sm',
        paddingClasses[padding],
        interactive &&
          'transition hover:border-border-strong hover:shadow-md motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </div>
  )
}
