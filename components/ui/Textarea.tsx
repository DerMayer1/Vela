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
          <span className="text-label uppercase tracking-[0.16em] text-text-secondary">{label}</span>
        ) : null}
        <textarea
          ref={ref}
          className={cn(
            'min-h-[160px] w-full rounded-[24px] border border-border/78 bg-[linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(244,248,255,0.92))] px-4 py-3.5 text-body text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_10px_24px_rgba(10,24,49,0.05)] backdrop-blur-[10px] placeholder:text-text-tertiary transition-all duration-300 hover:border-border-strong',
            error
              ? 'border-danger/35 ring-2 ring-danger/15 focus:border-danger focus:outline-none focus:ring-4 focus:ring-danger/15'
              : 'focus:-translate-y-0.5 focus:border-primary/28 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/12',
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
