import { and, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { requireSessionUser } from '@/lib/auth/session'
import { auditSecurityEvent } from '@/lib/security/audit'
import { secureJson } from '@/lib/security/headers'

export async function GET() {
  const sessionUser = await requireSessionUser()

  if (!sessionUser) {
    return secureJson({ error: 'Unauthorized' }, { status: 401 })
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

  if (!patient) {
    return secureJson({ error: 'Patient profile not found' }, { status: 404 })
  }

  auditSecurityEvent({
    action: 'patient.profile.view',
    sessionUserId: sessionUser.id,
    tenantId: sessionUser.tenantId
  })

  return secureJson({
    data: {
      ...patient,
      allergies: patient.allergies ?? [],
      conditions: patient.conditions ?? [],
      medications: patient.medications ?? []
    }
  })
}
