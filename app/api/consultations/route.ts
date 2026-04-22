import { and, eq } from 'drizzle-orm'
import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { consultations, patientProfiles } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'
import { auditSecurityEvent } from '@/lib/security/audit'
import { secureJson } from '@/lib/security/headers'
import { consumeRateLimit } from '@/lib/security/rate-limit'
import { getClientIp } from '@/lib/security/request'
import { createConsultationSchema } from '@/lib/validations/consultation'

export async function GET() {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return secureJson({ error: 'Unauthorized' }, { status: 401 })
  }

  const [patient] = await db
    .select({ id: patientProfiles.id })
    .from(patientProfiles)
    .where(
      and(
        eq(patientProfiles.userId, sessionUser.id),
        eq(patientProfiles.tenantId, sessionUser.tenantId)
      )
    )
    .limit(1)

  if (!patient) {
    return secureJson({ data: [] })
  }

  const records = await db
    .select({
      chiefComplaint: consultations.chiefComplaint,
      id: consultations.id,
      notes: consultations.notes,
      physicianName: consultations.physicianName,
      prescription: consultations.prescription,
      scheduledAt: consultations.scheduledAt,
      specialty: consultations.specialty,
      status: consultations.status
    })
    .from(consultations)
    .where(
      and(
        eq(consultations.patientProfileId, patient.id),
        eq(consultations.tenantId, sessionUser.tenantId)
      )
    )
    .orderBy(consultations.scheduledAt)

  auditSecurityEvent({
    action: 'consultation.list.view',
    metadata: {
      count: records.length
    },
    sessionUserId: sessionUser.id,
    tenantId: sessionUser.tenantId
  })

  return secureJson({
    data: records.map((record) => ({
      ...record,
      notes: record.notes ?? null,
      prescription: record.prescription ?? null,
      scheduledAt: record.scheduledAt.toISOString()
    }))
  })
}

export async function POST(request: Request) {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return secureJson({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const clientIp = getClientIp(request)
    const rateLimitResult = consumeRateLimit({
      key: `consultations:create:${clientIp}:${sessionUser.id}`,
      limit: 15,
      windowMs: 10 * 60 * 1000
    })

    if (!rateLimitResult.success) {
      auditSecurityEvent({
        action: 'consultation.create.rate_limited',
        request,
        sessionUserId: sessionUser.id,
        tenantId: sessionUser.tenantId
      })
      return secureJson(
        { error: 'Too many requests. Try again later.' },
        {
          headers: {
            'Retry-After': String(rateLimitResult.retryAfterSeconds)
          },
          status: 429
        }
      )
    }

    const body = await request.json()
    const validatedBody = createConsultationSchema.parse(body)

    const [patient] = await db
      .select({ id: patientProfiles.id })
      .from(patientProfiles)
      .where(
        and(
          eq(patientProfiles.userId, sessionUser.id),
          eq(patientProfiles.tenantId, sessionUser.tenantId)
        )
      )
      .limit(1)

    if (!patient) {
      return secureJson({ error: 'Patient profile not found' }, { status: 404 })
    }

    const [consultation] = await db
      .insert(consultations)
      .values({
        chiefComplaint: validatedBody.chiefComplaint,
        patientProfileId: patient.id,
        physicianName: validatedBody.physicianName,
        scheduledAt: new Date(validatedBody.scheduledAt),
        specialty: validatedBody.specialty,
        tenantId: sessionUser.tenantId
      })
      .returning({
        chiefComplaint: consultations.chiefComplaint,
        id: consultations.id,
        notes: consultations.notes,
        physicianName: consultations.physicianName,
        prescription: consultations.prescription,
        scheduledAt: consultations.scheduledAt,
        specialty: consultations.specialty,
        status: consultations.status
      })

    if (!consultation) {
      return secureJson({ error: 'Failed to create consultation' }, { status: 500 })
    }

    auditSecurityEvent({
      action: 'consultation.create.success',
      metadata: {
        consultationId: consultation.id,
        specialty: consultation.specialty
      },
      request,
      sessionUserId: sessionUser.id,
      tenantId: sessionUser.tenantId
    })

    return secureJson(
      {
        data: {
          ...consultation,
          notes: consultation.notes ?? null,
          prescription: consultation.prescription ?? null,
          scheduledAt: consultation.scheduledAt.toISOString()
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return secureJson({ error: 'Invalid consultation payload' }, { status: 400 })
    }

    return secureJson({ error: 'Internal server error' }, { status: 500 })
  }
}
