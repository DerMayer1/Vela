'use client'

import Link from 'next/link'
import { HeartPulse, LayoutGrid, Sparkles } from 'lucide-react'
import { AuthenticatedUserPanel } from '@/components/auth/AuthenticatedUserPanel'
import { Badge, buttonVariants } from '@/components/ui'
import { useTenant } from '@/hooks/useTenant'

export function AppHeader() {
  const tenant = useTenant()

  return (
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-4">
      <div className="mx-auto flex items-center justify-between gap-4 rounded-[24px] border border-white/70 bg-white/86 px-4 py-3 shadow-[0_16px_34px_rgba(10,24,49,0.06)] backdrop-blur-xl sm:px-5">
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

          <div className="hidden min-w-0 lg:flex lg:flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Patient workspace
            </span>
            <span className="pt-1 text-base font-semibold tracking-[-0.02em] text-text-primary">
              {tenant.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="hidden md:inline-flex shadow-none" variant="info">
            Care overview
          </Badge>
          <Link
            className={buttonVariants({
              className: 'hidden md:inline-flex rounded-[16px]',
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
              className: 'hidden sm:inline-flex rounded-[16px] text-white hover:text-white',
              size: 'sm',
              variant: 'primary'
            })}
            href="/consultations/new"
          >
            <Sparkles className="h-4 w-4" />
            New consultation
          </Link>
          <AuthenticatedUserPanel />
        </div>
      </div>
    </header>
  )
}
