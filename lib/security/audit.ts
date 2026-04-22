import { getClientIp, getRequestPathname } from '@/lib/security/request'

interface AuditPayload {
  action: string
  metadata?: Record<string, unknown>
  request?: Request
  sessionUserId?: string
  tenantId?: string
}

function maskEmail(value: string) {
  const [localPart, domain] = value.split('@')

  if (!localPart || !domain) {
    return value
  }

  if (localPart.length <= 2) {
    return `${localPart[0] ?? '*'}***@${domain}`
  }

  return `${localPart.slice(0, 2)}***@${domain}`
}

function sanitizeMetadata(metadata?: Record<string, unknown>) {
  if (!metadata) {
    return undefined
  }

  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => {
      if (key.toLowerCase().includes('email') && typeof value === 'string') {
        return [key, maskEmail(value)]
      }

      if (key === 'notes' || key === 'prescription' || key === 'chiefComplaint') {
        return [key, '[redacted]']
      }

      return [key, value]
    })
  )
}

export function auditSecurityEvent({
  action,
  metadata,
  request,
  sessionUserId,
  tenantId
}: AuditPayload) {
  const payload = {
    action,
    ip: request ? getClientIp(request) : undefined,
    metadata: sanitizeMetadata(metadata),
    pathname: request ? getRequestPathname(request) : undefined,
    sessionUserId,
    tenantId,
    timestamp: new Date().toISOString()
  }

  // Security events need a server-side log sink until a dedicated audit pipeline is added.
  // eslint-disable-next-line no-console
  console.info('[security-audit]', JSON.stringify(payload))
}
