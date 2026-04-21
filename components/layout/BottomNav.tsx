'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarRange, LayoutDashboard, Plus, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/consultations', icon: CalendarRange, label: 'Consultations' },
  { href: '/consultations/new', icon: Plus, label: 'New' },
  { href: '/profile', icon: UserRound, label: 'Profile' }
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 lg:hidden">
      <div className="floating-glass mx-auto flex max-w-lg items-center justify-between gap-2 rounded-[28px] p-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              className={cn(
                'flex min-h-12 min-w-[74px] flex-1 flex-col items-center justify-center gap-1 rounded-[22px] px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300',
                active
                  ? 'bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-text-inverse shadow-[0_16px_24px_rgba(28,92,255,0.24)]'
                  : 'text-text-secondary hover:bg-white hover:text-text-primary'
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
