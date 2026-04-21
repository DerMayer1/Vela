'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Avatar, Button } from '@/components/ui'

export function AuthenticatedUserPanel() {
  const { data: session } = useSession()
  const userName = session?.user?.name ?? 'Patient'
  const userEmail = session?.user?.email ?? ''
  const workspaceLabel = session?.user?.tenantSlug
    ? `${session.user.tenantSlug.toUpperCase()} workspace`
    : 'Patient workspace'

  return (
    <div className="floating-glass hidden items-center gap-3 rounded-[22px] px-3 py-2 sm:flex lg:hidden">
      <div className="text-right">
        <p className="max-w-[180px] truncate text-sm font-semibold text-text-primary">
          {userName}
        </p>
        <p className="max-w-[180px] truncate text-xs text-text-tertiary">
          {userEmail}
        </p>
        <p className="max-w-[180px] truncate text-xs uppercase tracking-[0.14em] text-text-tertiary">
          {workspaceLabel}
        </p>
      </div>
      <Avatar name={userName} size="sm" />
      <Button
        className="border-white/70 bg-white/78"
        onClick={() => void signOut({ callbackUrl: '/signin' })}
        size="sm"
        variant="ghost"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  )
}
