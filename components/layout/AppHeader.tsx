import Link from 'next/link'
import { Bell, Menu, Stethoscope } from 'lucide-react'
import { AuthenticatedUserPanel } from '@/components/auth/AuthenticatedUserPanel'
import { buttonVariants } from '@/components/ui'
import { Badge } from '@/components/ui'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            className="flex items-center gap-2 text-text-primary lg:hidden"
            href="/dashboard"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-inverse shadow-sm">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-h3 leading-none">
                Vela
              </span>
              <span className="block truncate pt-1 text-xs text-text-secondary">
                Patient workspace
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 lg:block">
            <p className="text-sm text-text-tertiary">Patient Workspace</p>
            <h1 className="truncate font-display text-h3 text-text-primary">
              Vela Health
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Badge className="hidden sm:inline-flex" variant="info">
            UI Foundation
          </Badge>
          <button
            aria-label="Notifications"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised text-text-secondary transition hover:border-border-strong hover:text-text-primary"
            type="button"
          >
            <Bell className="h-4 w-4" />
          </button>
          <Link
            className={buttonVariants({
              className: 'hidden sm:inline-flex',
              size: 'sm',
              variant: 'secondary'
            })}
            href="/consultations"
          >
            View Consultations
          </Link>
          <AuthenticatedUserPanel />
          <button
            aria-label="Open navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-raised text-text-secondary transition hover:border-border-strong hover:text-text-primary lg:hidden"
            type="button"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
