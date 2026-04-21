interface SectionHeadingProps {
  action?: React.ReactNode
  description: string
  eyebrow?: string
  title: string
}

export function SectionHeading({
  action,
  description,
  eyebrow,
  title
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-4">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-primary/16 bg-primary-light/88 px-3.5 py-1.5 text-label uppercase tracking-[0.18em] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-display text-h1 tracking-tight text-text-primary">{title}</h1>
          <p className="max-w-2xl text-body-lg leading-relaxed text-text-secondary">
            {description}
          </p>
        </div>
      </div>
      {action ? <div className="shrink-0 lg:pb-1">{action}</div> : null}
    </div>
  )
}
