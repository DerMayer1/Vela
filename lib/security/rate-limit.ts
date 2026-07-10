import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

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

let redisClient: Redis | null = null
const redisLimiters = new Map<string, Ratelimit>()

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }

  if (!redisClient) {
    redisClient = Redis.fromEnv()
  }

  return redisClient
}

function getRedisLimiter(redis: Redis, limit: number, windowMs: number) {
  const limiterKey = `${limit}:${windowMs}`
  let limiter = redisLimiters.get(limiterKey)

  if (!limiter) {
    limiter = new Ratelimit({
      limiter: Ratelimit.fixedWindow(limit, `${windowMs} ms`),
      prefix: 'vela:rate-limit',
      redis
    })
    redisLimiters.set(limiterKey, limiter)
  }

  return limiter
}

function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key)
    }
  }
}

function consumeMemoryRateLimit({ key, limit, windowMs }: RateLimitOptions): RateLimitResult {
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

async function consumeRedisRateLimit(
  redis: Redis,
  { key, limit, windowMs }: RateLimitOptions
): Promise<RateLimitResult> {
  const result = await getRedisLimiter(redis, limit, windowMs).limit(key)

  return {
    limit: result.limit,
    remaining: result.remaining,
    resetAt: result.reset,
    retryAfterSeconds: Math.max(Math.ceil((result.reset - Date.now()) / 1000), 1),
    success: result.success
  }
}

export async function consumeRateLimit(options: RateLimitOptions): Promise<RateLimitResult> {
  const redis = getRedis()

  if (!redis) {
    return consumeMemoryRateLimit(options)
  }

  try {
    return await consumeRedisRateLimit(redis, options)
  } catch {
    // Redis outages must not take sensitive flows down entirely; per-instance
    // limiting is a weaker but still meaningful floor while Redis recovers.
    return consumeMemoryRateLimit(options)
  }
}
