/**
 * Integration tests for tenant isolation on the consultations API.
 *
 * Requires a reachable Postgres (DATABASE_URL) with migrations applied —
 * `docker compose up -d` + `pnpm db:migrate`. When the database is not
 * reachable, the whole suite is skipped instead of failing.
 */
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

const sessionState = vi.hoisted(() => ({
  user: null as null | {
    email: string
    id: string
    name: string
    onboardingCompleted: boolean
    tenantId: string
    tenantSlug: string
  }
}))

vi.mock('@/lib/auth/session', () => ({
  requireSessionUser: async () => sessionState.user
}))

async function isDatabaseReachable() {
  if (!process.env.DATABASE_URL) {
    return false
  }

  const { Pool } = await import('pg')
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 2000
  })

  try {
    await pool.query('select 1')
    return true
  } catch {
    return false
  } finally {
    await pool.end().catch(() => {})
  }
}

const dbAvailable = await isDatabaseReachable()

if (!dbAvailable) {
  // eslint-disable-next-line no-console
  console.warn('[tenant-isolation] DATABASE_URL is not reachable — skipping integration tests')
}

describe.skipIf(!dbAvailable)('tenant isolation — consultations API', () => {
  const runId = randomUUID().slice(0, 8)

  let tenantAId: string
  let tenantBId: string
  let userAId: string
  let userBId: string
  let userA2Id: string
  let profileAId: string
  let consultationAId: string

  function actAs(userId: string, tenantId: string, tenantSlug: string) {
    sessionState.user = {
      email: `${userId}@test.local`,
      id: userId,
      name: 'Test User',
      onboardingCompleted: true,
      tenantId,
      tenantSlug
    }
  }

  beforeAll(async () => {
    const { db } = await import('@/lib/db')
    const { consultations, patientProfiles, tenants, users } = await import('@/lib/db/schema')

    const [tenantA] = await db
      .insert(tenants)
      .values({ name: `Test Tenant A ${runId}`, slug: `test-a-${runId}` })
      .returning({ id: tenants.id })
    const [tenantB] = await db
      .insert(tenants)
      .values({ name: `Test Tenant B ${runId}`, slug: `test-b-${runId}` })
      .returning({ id: tenants.id })

    tenantAId = tenantA!.id
    tenantBId = tenantB!.id

    const insertedUsers = await db
      .insert(users)
      .values([
        {
          email: `user-a-${runId}@test.local`,
          firstName: 'Alice',
          lastName: 'TenantA',
          passwordHash: 'test:hash',
          tenantId: tenantAId
        },
        {
          email: `user-b-${runId}@test.local`,
          firstName: 'Bob',
          lastName: 'TenantB',
          passwordHash: 'test:hash',
          tenantId: tenantBId
        },
        {
          email: `user-a2-${runId}@test.local`,
          firstName: 'Carol',
          lastName: 'TenantA',
          passwordHash: 'test:hash',
          tenantId: tenantAId
        }
      ])
      .returning({ id: users.id })

    userAId = insertedUsers[0]!.id
    userBId = insertedUsers[1]!.id
    userA2Id = insertedUsers[2]!.id

    const insertedProfiles = await db
      .insert(patientProfiles)
      .values([
        { onboardingCompleted: true, tenantId: tenantAId, userId: userAId },
        { onboardingCompleted: true, tenantId: tenantBId, userId: userBId },
        { onboardingCompleted: true, tenantId: tenantAId, userId: userA2Id }
      ])
      .returning({ id: patientProfiles.id, userId: patientProfiles.userId })

    profileAId = insertedProfiles.find((profile) => profile.userId === userAId)!.id

    const [consultationA] = await db
      .insert(consultations)
      .values({
        chiefComplaint: 'Recurring migraines with aura',
        patientProfileId: profileAId,
        physicianName: 'Dr. Maya Patel',
        scheduledAt: new Date('2026-08-01T14:00:00.000Z'),
        specialty: 'General Practice',
        tenantId: tenantAId
      })
      .returning({ id: consultations.id })

    consultationAId = consultationA!.id
  })

  afterAll(async () => {
    const { inArray } = await import('drizzle-orm')
    const { db } = await import('@/lib/db')
    const { consultations, patientProfiles, tenants, users } = await import('@/lib/db/schema')

    if (tenantAId && tenantBId) {
      const tenantIds = [tenantAId, tenantBId]
      await db.delete(consultations).where(inArray(consultations.tenantId, tenantIds))
      await db.delete(patientProfiles).where(inArray(patientProfiles.tenantId, tenantIds))
      await db.delete(users).where(inArray(users.tenantId, tenantIds))
      await db.delete(tenants).where(inArray(tenants.id, tenantIds))
    }

    const pool = (db as unknown as { $client?: { end?: () => Promise<void> } }).$client
    await pool?.end?.()
  })

  it('lists the consultation for its owner', async () => {
    const { GET } = await import('@/app/api/consultations/route')

    actAs(userAId, tenantAId, `test-a-${runId}`)
    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.data).toHaveLength(1)
    expect(body.data[0].id).toBe(consultationAId)
  })

  it('does not list consultations from another tenant', async () => {
    const { GET } = await import('@/app/api/consultations/route')

    actAs(userBId, tenantBId, `test-b-${runId}`)
    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.data).toEqual([])
  })

  it('returns 404 when a user from another tenant fetches the consultation by id', async () => {
    const { GET } = await import('@/app/api/consultations/[id]/route')

    actAs(userBId, tenantBId, `test-b-${runId}`)
    const response = await GET(new Request('http://test.local/api/consultations'), {
      params: { id: consultationAId }
    })

    expect(response.status).toBe(404)
  })

  it('returns 404 when a different user in the same tenant fetches the consultation', async () => {
    const { GET } = await import('@/app/api/consultations/[id]/route')

    actAs(userA2Id, tenantAId, `test-a-${runId}`)
    const response = await GET(new Request('http://test.local/api/consultations'), {
      params: { id: consultationAId }
    })

    expect(response.status).toBe(404)
  })

  it('rejects a cross-tenant update and leaves the record untouched', async () => {
    const { PATCH } = await import('@/app/api/consultations/[id]/route')
    const { eq } = await import('drizzle-orm')
    const { db } = await import('@/lib/db')
    const { consultations } = await import('@/lib/db/schema')

    actAs(userBId, tenantBId, `test-b-${runId}`)
    const response = await PATCH(
      new Request('http://test.local/api/consultations', {
        body: JSON.stringify({ notes: 'cross-tenant tampering attempt' }),
        headers: { 'content-type': 'application/json' },
        method: 'PATCH'
      }),
      { params: { id: consultationAId } }
    )

    expect(response.status).toBe(404)

    const [record] = await db
      .select({ notes: consultations.notes })
      .from(consultations)
      .where(eq(consultations.id, consultationAId))
      .limit(1)

    expect(record!.notes).toBeNull()
  })

  it('rejects a forged session that mixes a user with another tenant id', async () => {
    const { GET } = await import('@/app/api/consultations/[id]/route')

    // User B pretending to belong to tenant A must still fail: the profile
    // join is keyed on the session user id, not just the tenant.
    actAs(userBId, tenantAId, `test-a-${runId}`)
    const response = await GET(new Request('http://test.local/api/consultations'), {
      params: { id: consultationAId }
    })

    expect(response.status).toBe(404)
  })

  it('allows the owner to update their own consultation', async () => {
    const { PATCH } = await import('@/app/api/consultations/[id]/route')

    actAs(userAId, tenantAId, `test-a-${runId}`)
    const response = await PATCH(
      new Request('http://test.local/api/consultations', {
        body: JSON.stringify({ notes: 'Follow-up scheduled', status: 'completed' }),
        headers: { 'content-type': 'application/json' },
        method: 'PATCH'
      }),
      { params: { id: consultationAId } }
    )
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body.data.notes).toBe('Follow-up scheduled')
    expect(body.data.status).toBe('completed')
  })
})
