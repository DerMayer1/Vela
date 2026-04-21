import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'

interface EmptyStateProps {
  action?: React.ReactNode
  description: string
  icon: LucideIcon
  title: string
}

export function EmptyState({
  action,
  description,
  icon: Icon,
  title
}: EmptyStateProps) {
  return (
    <Card
      className="flex flex-col items-center justify-center gap-6 border-dashed border-border/90 bg-white/72 py-12 text-center shadow-md sm:py-16"
      padding="default"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.94),_transparent_48%),linear-gradient(135deg,_rgb(var(--color-primary-light)),_rgb(var(--color-accent-soft)))] shadow-[0_14px_26px_rgba(10,24,49,0.08)] ring-1 ring-white/88">
        <Icon className="h-6 w-6 text-primary" />
      </span>
      <div className="space-y-2">
        <h2 className="text-h2 text-text-primary">{title}</h2>
        <p className="mx-auto max-w-lg text-body-lg leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </Card>
  )
}
