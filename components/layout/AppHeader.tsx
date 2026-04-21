'use client'

import Link from 'next/link'
import { HeartPulse, LayoutGrid, Sparkles } from 'lucide-react'
import { AuthenticatedUserPanel } from '@/components/auth/AuthenticatedUserPanel'
import { Badge, buttonVariants } from '@/components/ui'
import { useTenant } from '@/hooks/useTenant'

export function AppHeader() {
  const tenant = useTenant()

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <div className="floating-glass mx-auto flex items-center justify-between gap-4 rounded-[28px] px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            className="flex items-center gap-3 text-text-primary lg:hidden"
            href="/dashboard"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-text-inverse shadow-md">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-h3 leading-none tracking-tight">
                {tenant.name}
              </span>
              <span className="block truncate pt-1 text-xs uppercase tracking-[0.14em] text-text-secondary">
                care cloud
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
              Daily care operations
            </p>
            <h1 className="truncate pt-1 font-display text-h2 tracking-tight text-text-primary">
              {tenant.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="hidden sm:inline-flex" variant="info">
            Patient workspace
          </Badge>
          <Link
            className={buttonVariants({
              className: 'hidden md:inline-flex',
              size: 'sm',
              variant: 'secondary'
            })}
            href="/dashboard"
          >
            <LayoutGrid className="h-4 w-4" />
            Overview
          </Link>
          <Link
            className={buttonVariants({
              className: 'hidden sm:inline-flex',
              size: 'sm',
              variant: 'primary'
            })}
            href="/consultations/new"
          >
            <Sparkles className="h-4 w-4" />
            Book consultation
          </Link>
          <AuthenticatedUserPanel />
        </div>
      </div>
    </header>
  )
}
