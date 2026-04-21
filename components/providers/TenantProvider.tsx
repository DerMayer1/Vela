'use client'

import { createContext, useContext } from 'react'
import type { TenantSummary } from '@/types/tenant'

interface TenantContextValue {
  tenant: TenantSummary
}

const TenantContext = createContext<TenantContextValue | null>(null)

interface TenantProviderProps {
  children: React.ReactNode
  tenant: TenantSummary
}

export function TenantProvider({ children, tenant }: TenantProviderProps) {
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  )
}

export function useTenantContext(): TenantContextValue | null {
  return useContext(TenantContext)
}
