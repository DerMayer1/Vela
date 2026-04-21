import { cn } from '@/lib/utils/cn'

interface StepperItem {
  description?: string
  label: string
}

interface StepperProps {
  className?: string
  currentStep: number
  items: StepperItem[]
}

export function Stepper({ className, currentStep, items }: StepperProps) {
  return (
    <ol className={cn('flex flex-col gap-4 sm:flex-row sm:items-center', className)}>
      {items.map((item, index) => {
        const stepNumber = index + 1
        const complete = stepNumber < currentStep
        const active = stepNumber === currentStep

        return (
          <li
            key={item.label}
            className="flex min-w-0 flex-1 items-center gap-3 sm:last:flex-none"
          >
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                complete || active
                  ? 'border-primary bg-primary text-text-inverse'
                  : 'border-border bg-surface text-text-secondary'
              )}
            >
              {stepNumber}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  'block truncate text-sm font-medium',
                  active ? 'text-text-primary' : 'text-text-secondary'
                )}
              >
                {item.label}
              </span>
              {item.description ? (
                <span className="block truncate text-xs text-text-tertiary">
                  {item.description}
                </span>
              ) : null}
            </span>
            {index < items.length - 1 ? (
              <span className="hidden h-px flex-1 bg-border sm:block" />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
