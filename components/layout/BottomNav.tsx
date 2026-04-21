'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarRange, LayoutDashboard, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/consultations', icon: CalendarRange, label: 'Consultations' },
  { href: '/profile', icon: UserRound, label: 'Profile' }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-2 py-2 backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around gap-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              className={cn(
                'flex min-h-11 min-w-[92px] flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition',
                active
                  ? 'bg-primary-light text-primary'
                  : 'text-text-secondary hover:bg-surface-raised hover:text-text-primary'
              )}
              href={item.href}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
