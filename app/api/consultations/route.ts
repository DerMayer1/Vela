import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { consultations, patientProfiles } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'
import { createConsultationSchema } from '@/lib/validations/consultation'

export async function GET() {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [patient] = await db
    .select({ id: patientProfiles.id })
    .from(patientProfiles)
    .where(eq(patientProfiles.userId, sessionUser.id))
    .limit(1)

  if (!patient) {
    return NextResponse.json({ data: [] })
  }

  const records = await db
    .select({
      chiefComplaint: consultations.chiefComplaint,
      id: consultations.id,
      notes: consultations.notes,
      physicianName: consultations.physicianName,
      scheduledAt: consultations.scheduledAt,
      specialty: consultations.specialty,
      status: consultations.status
    })
    .from(consultations)
    .where(eq(consultations.patientProfileId, patient.id))
    .orderBy(consultations.scheduledAt)

  return NextResponse.json({
    data: records.map((record) => ({
      ...record,
      notes: record.notes ?? null,
      scheduledAt: record.scheduledAt.toISOString()
    }))
  })
}

export async function POST(request: Request) {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedBody = createConsultationSchema.parse(body)

    const [patient] = await db
      .select({ id: patientProfiles.id })
      .from(patientProfiles)
      .where(eq(patientProfiles.userId, sessionUser.id))
      .limit(1)

    if (!patient) {
      return NextResponse.json({ error: 'Patient profile not found' }, { status: 404 })
    }

    const [consultation] = await db
      .insert(consultations)
      .values({
        chiefComplaint: validatedBody.chiefComplaint,
        patientProfileId: patient.id,
        physicianName: validatedBody.physicianName,
        scheduledAt: new Date(validatedBody.scheduledAt),
        specialty: validatedBody.specialty
      })
      .returning({
        chiefComplaint: consultations.chiefComplaint,
        id: consultations.id,
        notes: consultations.notes,
        physicianName: consultations.physicianName,
        scheduledAt: consultations.scheduledAt,
        specialty: consultations.specialty,
        status: consultations.status
      })

    if (!consultation) {
      return NextResponse.json({ error: 'Failed to create consultation' }, { status: 500 })
    }

    return NextResponse.json(
      {
        data: {
          ...consultation,
          notes: consultation.notes ?? null,
          scheduledAt: consultation.scheduledAt.toISOString()
        }
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid consultation payload' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
