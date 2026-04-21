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
    <ol className={cn('grid gap-4 lg:grid-cols-3', className)}>
      {items.map((item, index) => {
        const stepNumber = index + 1
        const complete = stepNumber < currentStep
        const active = stepNumber === currentStep

        return (
          <li
            key={item.label}
            className={cn(
              'flex min-w-0 items-center gap-4 rounded-[24px] border px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_12px_24px_rgba(10,24,49,0.05)] backdrop-blur-[14px]',
              active
                ? 'border-primary/24 bg-[linear-gradient(180deg,_rgba(242,247,255,0.96),_rgba(228,237,255,0.92))]'
                : 'border-border/70 bg-[linear-gradient(180deg,_rgba(255,255,255,0.88),_rgba(243,248,255,0.84))]'
            )}
          >
            <span
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
                complete || active
                  ? 'border-primary/70 bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-text-inverse shadow-[0_14px_24px_rgba(28,92,255,0.24)]'
                  : 'border-border bg-white text-text-secondary'
              )}
            >
              {stepNumber}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  'block truncate text-sm font-semibold',
                  active || complete ? 'text-text-primary' : 'text-text-secondary'
                )}
              >
                {item.label}
              </span>
              {item.description ? (
                <span className="block truncate pt-1 text-xs uppercase tracking-[0.12em] text-text-tertiary">
                  {item.description}
                </span>
              ) : null}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
