'use client'

import { useMemo } from 'react'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageTransition } from '@/components/motion/PageTransition'
import { useTenant } from '@/hooks/useTenant'
import {
  hexToDarkerShade,
  hexToLightTint,
  hexToRgbValues
} from '@/lib/utils/color'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const tenant = useTenant()

  const tenantStyleOverrides = useMemo(() => {
    const primaryRgb = hexToRgbValues(tenant.primaryColor)

    if (!primaryRgb) {
      return undefined
    }

    const hoverRgb = hexToDarkerShade(tenant.primaryColor) ?? primaryRgb
    const lightRgb = hexToLightTint(tenant.primaryColor) ?? primaryRgb

    return {
      '--color-primary': primaryRgb,
      '--color-primary-hover': hoverRgb,
      '--color-primary-light': lightRgb
    } as React.CSSProperties
  }, [tenant.primaryColor])

  return (
    <div className="page-shell min-h-screen" style={tenantStyleOverrides}>
      <div className="relative mx-auto min-h-screen w-full max-w-[1620px] lg:grid lg:grid-cols-[auto_1fr] lg:gap-4 lg:px-4">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-col">
          <AppHeader />
          <main className="relative flex-1 px-3 pb-28 pt-5 sm:px-6 lg:px-4 lg:pb-10 lg:pt-5">
            <PageTransition>{children}</PageTransition>
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
