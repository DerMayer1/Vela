import Link from 'next/link'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface BrandMarkProps {
  className?: string
  compact?: boolean
  href?: string
  inverse?: boolean
  tenantName?: string
}

export function BrandMark({
  className,
  compact = false,
  href = '/',
  inverse = false,
  tenantName
}: BrandMarkProps) {
  const displayName = tenantName ?? 'Vela Health'

  const content = (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-text-inverse shadow-[0_18px_28px_rgba(28,92,255,0.28)] ring-1 ring-white/30">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.42),_transparent_52%)]" />
        <HeartPulse className="relative h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block truncate font-display text-h3 leading-none tracking-tight',
            inverse ? 'text-white' : 'text-text-primary'
          )}
        >
          {displayName}
        </span>
        {!compact ? (
          <span
            className={cn(
              'block truncate pt-1 text-sm tracking-[0.08em]',
              inverse ? 'text-white/68' : 'text-text-secondary'
            )}
          >
            Patient care orchestration platform
          </span>
        ) : null}
      </span>
    </span>
  )

  return (
    <Link className="inline-flex w-fit" href={href}>
      {content}
    </Link>
  )
}
