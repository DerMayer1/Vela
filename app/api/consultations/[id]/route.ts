import { type InferInsertModel, and, eq, ne } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { consultations, patientProfiles, users } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'
import { updateConsultationSchema } from '@/lib/validations/consultation'

interface RouteContext {
  params: {
    id: string
  }
}

export async function GET(_request: Request, context: RouteContext) {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [consultation] = await db
    .select({
      allergies: patientProfiles.allergies,
      chiefComplaint: consultations.chiefComplaint,
      conditions: patientProfiles.conditions,
      dateOfBirth: patientProfiles.dateOfBirth,
      firstName: users.firstName,
      gender: patientProfiles.gender,
      hasRecentSurgery: patientProfiles.hasRecentSurgery,
      id: consultations.id,
      lastName: users.lastName,
      medications: patientProfiles.medications,
      notes: consultations.notes,
      patientChiefComplaint: patientProfiles.chiefComplaint,
      patientProfileId: consultations.patientProfileId,
      phone: patientProfiles.phone,
      physicianName: consultations.physicianName,
      prescription: consultations.prescription,
      scheduledAt: consultations.scheduledAt,
      specialty: consultations.specialty,
      status: consultations.status
    })
    .from(consultations)
    .innerJoin(
      patientProfiles,
      and(
        eq(patientProfiles.id, consultations.patientProfileId),
        eq(patientProfiles.tenantId, consultations.tenantId)
      )
    )
    .innerJoin(
      users,
      and(eq(users.id, patientProfiles.userId), eq(users.tenantId, patientProfiles.tenantId))
    )
    .where(
      and(
        eq(consultations.id, context.params.id),
        eq(consultations.tenantId, sessionUser.tenantId),
        eq(patientProfiles.userId, sessionUser.id)
      )
    )
    .limit(1)

  if (!consultation) {
    return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
  }

  const pastConsultations = await db
    .select({
      id: consultations.id,
      scheduledAt: consultations.scheduledAt,
      specialty: consultations.specialty,
      status: consultations.status
    })
    .from(consultations)
    .where(
      and(
        eq(consultations.patientProfileId, consultation.patientProfileId),
        eq(consultations.tenantId, sessionUser.tenantId),
        ne(consultations.id, context.params.id)
      )
    )
    .orderBy(consultations.scheduledAt)

  return NextResponse.json({
    data: {
      chiefComplaint: consultation.chiefComplaint,
      id: consultation.id,
      notes: consultation.notes ?? null,
      pastConsultations: pastConsultations.map((pc) => ({
        id: pc.id,
        scheduledAt: pc.scheduledAt.toISOString(),
        specialty: pc.specialty,
        status: pc.status
      })),
      patient: {
        allergies: consultation.allergies ?? [],
        chiefComplaint: consultation.patientChiefComplaint,
        conditions: consultation.conditions ?? [],
        dateOfBirth: consultation.dateOfBirth,
        firstName: consultation.firstName,
        gender: consultation.gender,
        hasRecentSurgery: consultation.hasRecentSurgery ?? false,
        lastName: consultation.lastName,
        medications: consultation.medications ?? [],
        phone: consultation.phone
      },
      physicianName: consultation.physicianName,
      prescription: consultation.prescription ?? null,
      scheduledAt: consultation.scheduledAt.toISOString(),
      specialty: consultation.specialty,
      status: consultation.status
    }
  })
}

export async function PATCH(request: Request, context: RouteContext) {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedBody = updateConsultationSchema.parse(body)

    const [ownedConsultation] = await db
      .select({ id: consultations.id })
      .from(consultations)
      .innerJoin(
        patientProfiles,
        and(
          eq(patientProfiles.id, consultations.patientProfileId),
          eq(patientProfiles.tenantId, consultations.tenantId)
        )
      )
      .where(
        and(
          eq(consultations.id, context.params.id),
          eq(consultations.tenantId, sessionUser.tenantId),
          eq(patientProfiles.userId, sessionUser.id)
        )
      )
      .limit(1)

    if (!ownedConsultation) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
    }

    const updatePayload: Partial<InferInsertModel<typeof consultations>> = {
      updatedAt: new Date()
    }

    if (validatedBody.notes !== undefined) {
      updatePayload.notes = validatedBody.notes
    }

    if (validatedBody.prescription !== undefined) {
      updatePayload.prescription = validatedBody.prescription
    }

    if (validatedBody.status !== undefined) {
      updatePayload.status = validatedBody.status
    }

    const [updatedConsultation] = await db
      .update(consultations)
      .set(updatePayload)
      .where(
        and(
          eq(consultations.id, context.params.id),
          eq(consultations.tenantId, sessionUser.tenantId)
        )
      )
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

    if (!updatedConsultation) {
      return NextResponse.json({ error: 'Failed to update consultation' }, { status: 500 })
    }

    return NextResponse.json({
      data: {
        ...updatedConsultation,
        notes: updatedConsultation.notes ?? null,
        prescription: updatedConsultation.prescription ?? null,
        scheduledAt: updatedConsultation.scheduledAt.toISOString()
      }
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid consultation update payload' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
