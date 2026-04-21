import Link from 'next/link'
import { HeartPulse } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface BrandMarkProps {
  className?: string
  compact?: boolean
  href?: string
}

export function BrandMark({
  className,
  compact = false,
  href = '/'
}: BrandMarkProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-inverse shadow-sm">
        <HeartPulse className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-h3 leading-none text-text-primary">
          Vela Health
        </span>
        {!compact ? (
          <span className="block truncate pt-1 text-sm text-text-secondary">
            Telehealth platform foundation
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
