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
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <span className="inline-flex rounded-full border border-primary/14 bg-primary-light/84 px-3.5 py-1.5 text-label uppercase tracking-[0.16em] text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
            {eyebrow}
          </span>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-display text-[clamp(2.6rem,4.8vw,4.2rem)] leading-[0.94] tracking-[-0.05em] text-text-primary">
            {title}
          </h1>
          <p className="max-w-2xl text-[1.02rem] leading-8 text-text-secondary">
            {description}
          </p>
        </div>
      </div>
      {action ? <div className="shrink-0 lg:pb-1">{action}</div> : null}
    </div>
  )
}
