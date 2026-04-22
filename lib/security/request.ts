export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown'
  }

  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function getRequestPathname(request: Request) {
  try {
    return new URL(request.url).pathname
  } catch {
    return 'unknown'
  }
}
