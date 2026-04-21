import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  description?: string | undefined
  error?: string | undefined
  label?: string | undefined
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, description, error, id, label, ...props }, ref) {
    return (
      <label className="flex w-full flex-col gap-2" htmlFor={id}>
        {label ? (
          <span className="text-label text-text-secondary">{label}</span>
        ) : null}
        <textarea
          ref={ref}
          className={cn(
            'min-h-28 w-full rounded-lg border bg-surface-inset px-3 py-3 text-body text-text-primary placeholder:text-text-tertiary',
            error
              ? 'border-danger ring-2 ring-danger/20'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20',
            className
          )}
          id={id}
          {...props}
        />
        {error ? (
          <span className="text-xs text-danger">{error}</span>
        ) : description ? (
          <span className="text-xs text-text-tertiary">{description}</span>
        ) : null}
      </label>
    )
  }
)
