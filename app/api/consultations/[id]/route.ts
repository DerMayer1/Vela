import { type InferInsertModel, and, eq } from 'drizzle-orm'
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
      chiefComplaint: consultations.chiefComplaint,
      dateOfBirth: patientProfiles.dateOfBirth,
      firstName: users.firstName,
      gender: patientProfiles.gender,
      id: consultations.id,
      lastName: users.lastName,
      notes: consultations.notes,
      patientChiefComplaint: patientProfiles.chiefComplaint,
      phone: patientProfiles.phone,
      physicianName: consultations.physicianName,
      scheduledAt: consultations.scheduledAt,
      specialty: consultations.specialty,
      status: consultations.status
    })
    .from(consultations)
    .innerJoin(patientProfiles, eq(patientProfiles.id, consultations.patientProfileId))
    .innerJoin(users, eq(users.id, patientProfiles.userId))
    .where(
      and(eq(consultations.id, context.params.id), eq(patientProfiles.userId, sessionUser.id))
    )
    .limit(1)

  if (!consultation) {
    return NextResponse.json({ error: 'Consultation not found' }, { status: 404 })
  }

  return NextResponse.json({
    data: {
      chiefComplaint: consultation.chiefComplaint,
      id: consultation.id,
      notes: consultation.notes ?? null,
      patient: {
        chiefComplaint: consultation.patientChiefComplaint,
        dateOfBirth: consultation.dateOfBirth,
        firstName: consultation.firstName,
        gender: consultation.gender,
        lastName: consultation.lastName,
        phone: consultation.phone
      },
      physicianName: consultation.physicianName,
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
      .innerJoin(patientProfiles, eq(patientProfiles.id, consultations.patientProfileId))
      .where(
        and(eq(consultations.id, context.params.id), eq(patientProfiles.userId, sessionUser.id))
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

    if (validatedBody.status !== undefined) {
      updatePayload.status = validatedBody.status
    }

    const [updatedConsultation] = await db
      .update(consultations)
      .set(updatePayload)
      .where(eq(consultations.id, context.params.id))
      .returning({
        chiefComplaint: consultations.chiefComplaint,
        id: consultations.id,
        notes: consultations.notes,
        physicianName: consultations.physicianName,
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
