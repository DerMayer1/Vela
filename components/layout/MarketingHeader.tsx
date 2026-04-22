'use client'

import Link from 'next/link'
import { Activity, ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { BrandMark } from '@/components/layout/BrandMark'
import { buttonVariants } from '@/components/ui'

const NAV_ITEMS = [
  { href: '#platform', label: 'Platform' },
  { href: '#experience', label: 'Experience' },
  { href: '#outcomes', label: 'Outcomes' }
]

export function MarketingHeader() {
  const reduceMotion = useReducedMotion()
  const motionProps = reduceMotion
    ? {}
    : {
        animate: { opacity: 1, y: 0 },
        initial: { opacity: 0, y: -12 },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] as const }
      }

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <motion.div
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[24px] border border-white/70 bg-white/86 px-4 py-3 shadow-[0_16px_34px_rgba(10,24,49,0.06)] backdrop-blur-xl sm:px-6"
        {...motionProps}
      >
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
          <span className="hidden items-center gap-2 rounded-full border border-border/80 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:inline-flex">
            <Activity className="h-3.5 w-3.5" />
            Care-grade UX
          </span>
          <Link
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
            href="/signin"
          >
            Sign in
          </Link>
          <Link
            className={buttonVariants({
              className: 'pr-3 text-white hover:text-white',
              size: 'sm',
              variant: 'primary'
            })}
            href="/signup"
          >
            Start patient flow
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </header>
  )
}
