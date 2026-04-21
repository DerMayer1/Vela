import { AppShell } from '@/components/layout/AppShell'
import { TenantProvider } from '@/components/providers/TenantProvider'
import { requireSessionUser } from '@/lib/auth/session'
import { getTenantBySlug } from '@/lib/tenant/server'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default async function AuthenticatedLayout({
  children
}: AuthenticatedLayoutProps) {
  const sessionUser = await requireSessionUser()
  const tenant = sessionUser ? await getTenantBySlug(sessionUser.tenantSlug) : null

  const baseTenant = tenant ?? {
    id: '',
    name: 'Vela Health',
    primaryColor: '#1C5CFF',
    slug: 'vela'
  }

  const tenantData = {
    ...baseTenant,
    name: 'Vela Health',
    primaryColor: '#1C5CFF'
  }

  return (
    <TenantProvider tenant={tenantData}>
      <AppShell>{children}</AppShell>
    </TenantProvider>
  )
}
