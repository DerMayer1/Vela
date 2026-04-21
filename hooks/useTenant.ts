'use client'

import { useTenantContext } from '@/components/providers/TenantProvider'
import type { TenantSummary } from '@/types/tenant'

const FALLBACK_TENANT: TenantSummary = {
  id: '',
  name: 'Bask Health',
  primaryColor: '#0E2922', // Premium Deep Teal/Forest
  slug: 'bask'
}

export function useTenant(): TenantSummary {
  const context = useTenantContext()

  return context?.tenant ?? FALLBACK_TENANT
}
