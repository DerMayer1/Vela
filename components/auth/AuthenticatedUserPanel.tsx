'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Avatar, Button } from '@/components/ui'

export function AuthenticatedUserPanel() {
  const { data: session } = useSession()
  const userName = session?.user?.name ?? 'Patient'
  const userEmail = session?.user?.email ?? ''

  return (
    <div className="hidden items-center gap-3 sm:flex">
      <div className="text-right">
        <p className="max-w-[180px] truncate text-sm font-medium text-text-primary">
          {userName}
        </p>
        <p className="max-w-[180px] truncate text-xs text-text-tertiary">
          {userEmail}
        </p>
      </div>
      <Avatar name={userName} size="sm" />
      <Button
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
