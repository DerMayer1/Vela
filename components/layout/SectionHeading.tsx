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
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? (
          <span className="inline-flex text-label uppercase tracking-[0.16em] text-text-tertiary">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-display text-h1 text-text-primary">{title}</h1>
          <p className="text-body-lg text-text-secondary">{description}</p>
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
