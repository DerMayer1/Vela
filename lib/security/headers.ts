import { NextResponse } from 'next/server'

const BASE_SECURITY_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Origin-Agent-Cluster': '?1',
  'Permissions-Policy': 'camera=(self), microphone=(self), geolocation=(), payment=(), usb=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-DNS-Prefetch-Control': 'off',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
} as const

const PRODUCTION_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https:",
  "connect-src 'self' https: wss:",
  'upgrade-insecure-requests'
].join('; ')

export function applySecurityHeaders(response: NextResponse) {
  for (const [header, value] of Object.entries(BASE_SECURITY_HEADERS)) {
    response.headers.set(header, value)
  }

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Content-Security-Policy', PRODUCTION_CSP)
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  return response
}

export function applyNoStoreHeaders(response: NextResponse) {
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private, max-age=0')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}

export function secureJson(
  body: unknown,
  init?: ResponseInit,
  options?: {
    noStore?: boolean
  }
) {
  const response = NextResponse.json(body, init)

  applySecurityHeaders(response)

  if (options?.noStore ?? true) {
    applyNoStoreHeaders(response)
  }

  return response
}
