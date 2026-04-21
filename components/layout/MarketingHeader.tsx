import Link from 'next/link'
import { Activity, ChevronRight } from 'lucide-react'
import { BrandMark } from '@/components/layout/BrandMark'
import { buttonVariants } from '@/components/ui'

const NAV_ITEMS = [
  { href: '#platform', label: 'Platform' },
  { href: '#experience', label: 'Experience' },
  { href: '#outcomes', label: 'Outcomes' }
]

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="floating-glass mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[28px] px-4 py-3 sm:px-6">
        <BrandMark compact href="/" />

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-text-secondary transition-all duration-300 hover:bg-primary-soft hover:text-text-primary"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-primary/12 bg-primary-light/88 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:inline-flex">
            <Activity className="h-3.5 w-3.5" />
            Care-grade experience
          </span>
          <Link
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
            href="/signin"
          >
            Sign in
          </Link>
          <Link
            className={buttonVariants({ className: 'pr-3', size: 'sm', variant: 'primary' })}
            href="/signup"
          >
            Start patient flow
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
