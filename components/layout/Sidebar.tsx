'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Sparkles,
  UserRound
} from 'lucide-react'
import { BrandMark } from '@/components/layout/BrandMark'
import { Avatar, Button } from '@/components/ui'
import { useTenant } from '@/hooks/useTenant'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  {
    description: 'Snapshot, activity and priority actions',
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard'
  },
  {
    description: 'Scheduling, records and visit details',
    href: '/consultations',
    icon: CalendarDays,
    label: 'Consultations'
  },
  {
    description: 'Identity, intake and medical record',
    href: '/profile',
    icon: UserRound,
    label: 'Profile'
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const tenant = useTenant()

  const userName = session?.user?.name ?? 'Patient'
  const userEmail = session?.user?.email ?? ''

  return (
    <aside className="hidden px-5 py-5 lg:flex lg:flex-col">
      <div className="dark-aurora relative flex h-full w-[304px] flex-col overflow-hidden rounded-[34px] border border-white/10 p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_28%)]" />

        <div className="relative z-10">
          <BrandMark
            compact
            href="/dashboard"
            inverse
            tenantName={tenant.name}
          />
        </div>

        <div className="relative z-10 mt-8 rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0.04))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Workspace status
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/14 ring-1 ring-white/12">
              <Sparkles className="h-5 w-5 text-accent" />
            </span>
            <div>
              <p className="font-display text-[1.45rem] leading-none text-white">Care command</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                Appointments, records and identity in one patient workspace
              </p>
            </div>
          </div>
        </div>

        <nav className="relative z-10 mt-7 flex flex-1 flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                className={cn(
                  'group rounded-[24px] border px-4 py-4 transition-all duration-300',
                  active
                    ? 'border-white/18 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_28px_rgba(0,0,0,0.16)]'
                    : 'border-transparent text-white/72 hover:border-white/10 hover:bg-white/6 hover:text-white'
                )}
                href={item.href}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-300',
                      active
                        ? 'bg-white/14 text-white'
                        : 'bg-white/8 text-white/72 group-hover:bg-white/12'
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{item.label}</span>
                      {active ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/58">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="relative z-10 mt-6 rounded-[28px] border border-white/10 bg-white/6 p-4">
          <div className="flex items-center gap-3">
            <Avatar
              className="bg-white/90 text-primary ring-0"
              name={userName}
              size="md"
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{userName}</p>
              <p className="truncate text-sm text-white/60">{userEmail}</p>
            </div>
          </div>
          <div className="mt-4 rounded-[20px] border border-white/10 bg-white/8 px-3 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/54">
              Care principle
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/72">
              Prioritize clarity first. The most important patient action should always be visible.
            </p>
          </div>
          <Button
            className="mt-4 w-full border-white/10 bg-white/8 text-white hover:bg-white/14 hover:text-white"
            onClick={() => void signOut({ callbackUrl: '/signin' })}
            type="button"
            variant="ghost"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </aside>
  )
}
