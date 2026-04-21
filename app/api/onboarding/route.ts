import { type InferInsertModel, and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'
import {
  onboardingDraftSchema,
  onboardingFormSchema,
  toOnboardingFormValues
} from '@/lib/validations/onboarding'

export async function GET() {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [record] = await db
    .select({
      allergies: patientProfiles.allergies,
      chiefComplaint: patientProfiles.chiefComplaint,
      conditions: patientProfiles.conditions,
      dateOfBirth: patientProfiles.dateOfBirth,
      duration: patientProfiles.symptomDuration,
      firstName: users.firstName,
      gender: patientProfiles.gender,
      hasRecentSurgery: patientProfiles.hasRecentSurgery,
      lastName: users.lastName,
      medications: patientProfiles.medications,
      phone: patientProfiles.phone,
      severity: patientProfiles.symptomSeverity
    })
    .from(patientProfiles)
    .innerJoin(
      users,
      and(eq(users.id, patientProfiles.userId), eq(users.tenantId, patientProfiles.tenantId))
    )
    .where(
      and(
        eq(patientProfiles.userId, sessionUser.id),
        eq(patientProfiles.tenantId, sessionUser.tenantId)
      )
    )
    .limit(1)

  return NextResponse.json({
    data: toOnboardingFormValues(record)
  })
}

export async function PATCH(request: Request) {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validatedBody = onboardingDraftSchema.parse(body)

    const [currentRecord] = await db
      .select({
        allergies: patientProfiles.allergies,
        chiefComplaint: patientProfiles.chiefComplaint,
        conditions: patientProfiles.conditions,
        dateOfBirth: patientProfiles.dateOfBirth,
        duration: patientProfiles.symptomDuration,
        firstName: users.firstName,
        gender: patientProfiles.gender,
        hasRecentSurgery: patientProfiles.hasRecentSurgery,
        lastName: users.lastName,
        medications: patientProfiles.medications,
        phone: patientProfiles.phone,
        severity: patientProfiles.symptomSeverity
      })
      .from(patientProfiles)
      .innerJoin(
        users,
        and(eq(users.id, patientProfiles.userId), eq(users.tenantId, patientProfiles.tenantId))
      )
      .where(
        and(
          eq(patientProfiles.userId, sessionUser.id),
          eq(patientProfiles.tenantId, sessionUser.tenantId)
        )
      )
      .limit(1)

    if (!currentRecord) {
      return NextResponse.json({ error: 'Patient profile not found' }, { status: 404 })
    }

    const mergedRecord = {
      ...toOnboardingFormValues(currentRecord),
      ...validatedBody
    }

    if (validatedBody.complete) {
      onboardingFormSchema.parse(mergedRecord)
    }

    const userUpdatePayload: Partial<InferInsertModel<typeof users>> = {}
    const profileUpdatePayload: Partial<InferInsertModel<typeof patientProfiles>> = {
      updatedAt: new Date()
    }

    if (validatedBody.firstName) {
      userUpdatePayload.firstName = validatedBody.firstName
    }

    if (validatedBody.lastName) {
      userUpdatePayload.lastName = validatedBody.lastName
    }

    if (validatedBody.firstName || validatedBody.lastName) {
      userUpdatePayload.updatedAt = new Date()
    }

    if (validatedBody.dateOfBirth !== undefined) {
      profileUpdatePayload.dateOfBirth = validatedBody.dateOfBirth
    }

    if (validatedBody.gender !== undefined) {
      profileUpdatePayload.gender = validatedBody.gender
    }

    if (validatedBody.phone !== undefined) {
      profileUpdatePayload.phone = validatedBody.phone || null
    }

    if (validatedBody.chiefComplaint !== undefined) {
      profileUpdatePayload.chiefComplaint = validatedBody.chiefComplaint
    }

    if (validatedBody.duration !== undefined) {
      profileUpdatePayload.symptomDuration = validatedBody.duration
    }

    if (validatedBody.severity !== undefined) {
      profileUpdatePayload.symptomSeverity = validatedBody.severity
    }

    if (validatedBody.conditions !== undefined) {
      profileUpdatePayload.conditions = validatedBody.conditions
    }

    if (validatedBody.medications !== undefined) {
      profileUpdatePayload.medications = validatedBody.medications
    }

    if (validatedBody.allergies !== undefined) {
      profileUpdatePayload.allergies = validatedBody.allergies
    }

    if (validatedBody.hasRecentSurgery !== undefined) {
      profileUpdatePayload.hasRecentSurgery = validatedBody.hasRecentSurgery
    }

    if (validatedBody.complete) {
      profileUpdatePayload.onboardingCompleted = true
    }

    await db.transaction(async (tx) => {
      if (Object.keys(userUpdatePayload).length > 0) {
        await tx
          .update(users)
          .set(userUpdatePayload)
          .where(and(eq(users.id, sessionUser.id), eq(users.tenantId, sessionUser.tenantId)))
      }

      await tx
        .update(patientProfiles)
        .set(profileUpdatePayload)
        .where(
          and(
            eq(patientProfiles.userId, sessionUser.id),
            eq(patientProfiles.tenantId, sessionUser.tenantId)
          )
        )
    })

    return NextResponse.json({
      data: {
        onboardingCompleted: Boolean(validatedBody.complete)
      }
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid onboarding payload' }, { status: 400 })
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
