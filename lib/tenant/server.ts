import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { tenants } from '@/lib/db/schema'
import type { TenantSummary } from '@/types/tenant'
import {
  DEFAULT_TENANT_SLUG,
  normalizeTenantSlug,
  resolveTenantSlugFromHost
} from '@/lib/tenant/resolve'

export async function getTenantBySlug(slug: string | null | undefined) {
  const normalizedSlug = normalizeTenantSlug(slug) || DEFAULT_TENANT_SLUG

  const [tenant] = await db
    .select({
      id: tenants.id,
      name: tenants.name,
      primaryColor: tenants.primaryColor,
      slug: tenants.slug
    })
    .from(tenants)
    .where(eq(tenants.slug, normalizedSlug))
    .limit(1)

  return (tenant ?? null) satisfies TenantSummary | null
}

export async function resolveTenantFromRequest(request: Request) {
  const tenantSlug = resolveTenantSlugFromHost(request.headers.get('host'))
  return getTenantBySlug(tenantSlug)
}
