import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'

export async function GET() {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const [patient] = await db
    .select({
      allergies: patientProfiles.allergies,
      chiefComplaint: patientProfiles.chiefComplaint,
      conditions: patientProfiles.conditions,
      dateOfBirth: patientProfiles.dateOfBirth,
      email: users.email,
      firstName: users.firstName,
      gender: patientProfiles.gender,
      hasRecentSurgery: patientProfiles.hasRecentSurgery,
      id: patientProfiles.id,
      lastName: users.lastName,
      medications: patientProfiles.medications,
      onboardingCompleted: patientProfiles.onboardingCompleted,
      phone: patientProfiles.phone,
      symptomDuration: patientProfiles.symptomDuration,
      symptomSeverity: patientProfiles.symptomSeverity
    })
    .from(patientProfiles)
    .innerJoin(users, eq(users.id, patientProfiles.userId))
    .where(eq(patientProfiles.userId, sessionUser.id))
    .limit(1)

  if (!patient) {
    return NextResponse.json({ error: 'Patient profile not found' }, { status: 404 })
  }

  return NextResponse.json({
    data: {
      ...patient,
      allergies: patient.allergies ?? [],
      conditions: patient.conditions ?? [],
      medications: patient.medications ?? []
    }
  })
}
