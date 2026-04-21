const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost'])

export const DEFAULT_TENANT_SLUG = 'vela'

export function normalizeTenantSlug(value: string | null | undefined) {
  return value?.trim().toLowerCase() ?? ''
}

export function resolveTenantSlugFromHost(host: string | null | undefined) {
  if (!host) {
    return DEFAULT_TENANT_SLUG
  }

  const hostname = host.split(':')[0]?.trim().toLowerCase() ?? ''

  if (!hostname || LOCAL_HOSTS.has(hostname)) {
    return DEFAULT_TENANT_SLUG
  }

  const segments = hostname.split('.').filter(Boolean)

  if (segments.length < 3) {
    return DEFAULT_TENANT_SLUG
  }

  const candidate = segments[0]

  if (!candidate || candidate === 'www') {
    return DEFAULT_TENANT_SLUG
  }

  return normalizeTenantSlug(candidate) || DEFAULT_TENANT_SLUG
}

export function resolveCurrentTenantSlug() {
  if (typeof window === 'undefined') {
    return DEFAULT_TENANT_SLUG
  }

  return resolveTenantSlugFromHost(window.location.host)
}
