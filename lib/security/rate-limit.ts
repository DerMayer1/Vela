interface RateLimitOptions {
  key: string
  limit: number
  windowMs: number
}

interface RateLimitResult {
  limit: number
  remaining: number
  resetAt: number
  retryAfterSeconds: number
  success: boolean
}

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key)
    }
  }
}

export function consumeRateLimit({
  key,
  limit,
  windowMs
}: RateLimitOptions): RateLimitResult {
  const now = Date.now()

  cleanupExpiredEntries(now)

  const entry = rateLimitStore.get(key)

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + windowMs

    rateLimitStore.set(key, {
      count: 1,
      resetAt
    })

    return {
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      success: true
    }
  }

  entry.count += 1
  rateLimitStore.set(key, entry)

  const remaining = Math.max(limit - entry.count, 0)
  const retryAfterSeconds = Math.max(Math.ceil((entry.resetAt - now) / 1000), 1)

  return {
    limit,
    remaining,
    resetAt: entry.resetAt,
    retryAfterSeconds,
    success: entry.count <= limit
  }
}
