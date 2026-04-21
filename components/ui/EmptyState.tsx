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
    <Card className="flex flex-col items-center justify-center gap-4 border-dashed text-center" padding="default">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="space-y-2">
        <h2 className="text-h3 text-text-primary">{title}</h2>
        <p className="mx-auto max-w-md text-body text-text-secondary">
          {description}
        </p>
      </div>
      {action ? <div>{action}</div> : null}
    </Card>
  )
}
