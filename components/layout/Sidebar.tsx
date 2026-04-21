'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, LayoutDashboard, LogOut, UserRound } from 'lucide-react'
import { BrandMark } from '@/components/layout/BrandMark'
import { Avatar } from '@/components/ui'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/consultations', icon: CalendarDays, label: 'Consultations' },
  { href: '/profile', icon: UserRound, label: 'Profile' }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border bg-surface-raised/80 lg:flex lg:flex-col">
      <div className="border-b border-border px-6 py-6">
        <BrandMark compact href="/dashboard" />
      </div>
      <div className="px-6 pt-6">
        <span className="text-label uppercase tracking-[0.16em] text-text-tertiary">
          Navigation
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-2 p-4 pt-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-body transition',
                active
                  ? 'border border-primary/10 bg-primary-light text-primary shadow-sm'
                  : 'text-text-secondary hover:bg-surface hover:text-text-primary'
              )}
              href={item.href}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border px-4 py-5">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <Avatar name="Vela Health" size="md" />
            <div className="min-w-0">
              <p className="truncate text-body font-medium text-text-primary">
                Secure workspace
              </p>
              <p className="truncate text-sm text-text-secondary">
                Protected patient area
              </p>
            </div>
          </div>
          <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-text-secondary">
            <LogOut className="h-4 w-4" />
            Authentication active
          </div>
        </div>
      </div>
    </aside>
  )
}
