import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

type RateLimitModule = typeof import('@/lib/security/rate-limit')

async function loadFreshModule(): Promise<RateLimitModule> {
  vi.resetModules()
  return import('@/lib/security/rate-limit')
}

describe('consumeRateLimit (in-memory fallback)', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '')
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('allows requests up to the limit and blocks the next one', async () => {
    const { consumeRateLimit } = await loadFreshModule()
    const options = { key: 'test:limit', limit: 3, windowMs: 60_000 }

    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const result = await consumeRateLimit(options)
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(3 - attempt)
    }

    const blocked = await consumeRateLimit(options)
    expect(blocked.success).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it('tracks each key independently', async () => {
    const { consumeRateLimit } = await loadFreshModule()

    await consumeRateLimit({ key: 'test:a', limit: 1, windowMs: 60_000 })
    const blockedA = await consumeRateLimit({ key: 'test:a', limit: 1, windowMs: 60_000 })
    const freshB = await consumeRateLimit({ key: 'test:b', limit: 1, windowMs: 60_000 })

    expect(blockedA.success).toBe(false)
    expect(freshB.success).toBe(true)
  })

  it('resets the allowance after the window expires', async () => {
    const { consumeRateLimit } = await loadFreshModule()
    const options = { key: 'test:reset', limit: 1, windowMs: 60_000 }

    await consumeRateLimit(options)
    expect((await consumeRateLimit(options)).success).toBe(false)

    vi.advanceTimersByTime(60_001)

    const afterWindow = await consumeRateLimit(options)
    expect(afterWindow.success).toBe(true)
    expect(afterWindow.remaining).toBe(0)
  })

  it('reports a retry window that shrinks as time passes', async () => {
    const { consumeRateLimit } = await loadFreshModule()
    const options = { key: 'test:retry', limit: 1, windowMs: 60_000 }

    const first = await consumeRateLimit(options)
    expect(first.retryAfterSeconds).toBe(60)
    expect(first.resetAt).toBe(Date.now() + 60_000)

    vi.advanceTimersByTime(45_000)

    const blocked = await consumeRateLimit(options)
    expect(blocked.success).toBe(false)
    expect(blocked.retryAfterSeconds).toBe(15)
  })
})
