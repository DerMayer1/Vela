'use client'

import { FileStack, HeartPulse, Phone, UserRound } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Avatar, Badge, Card, EmptyState } from '@/components/ui'
import { usePatient } from '@/hooks/usePatient'

export function ProfileOverview() {
  const patientQuery = usePatient()

  if (patientQuery.isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="panel-quiet h-32 animate-pulse rounded-[30px]" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel-quiet h-64 animate-pulse rounded-[30px]" />
          <div className="panel-quiet h-64 animate-pulse rounded-[30px]" />
        </div>
      </div>
    )
  }

  if (patientQuery.error || !patientQuery.data) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          description="We could not load the patient profile."
          icon={FileStack}
          title="Profile unavailable"
        />
      </div>
    )
  }

  const patient = patientQuery.data
  const conditions = Array.isArray(patient.conditions) ? patient.conditions : []
  const medications = Array.isArray(patient.medications) ? patient.medications : []
  const allergies = Array.isArray(patient.allergies) ? patient.allergies : []
  const displayName = `${patient.firstName} ${patient.lastName}`.trim()

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <SectionHeading
        description="Personal information, intake details and medical history in one patient record."
        eyebrow="Profile"
        title="Patient profile"
      />

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="dark-aurora flex flex-col justify-between gap-8 p-8 text-white">
            <div className="space-y-5">
              <Badge className="bg-white/10 text-white" variant="default">
                Patient identity
              </Badge>
              <div className="flex items-center gap-4">
                <Avatar className="bg-white/92 text-primary ring-0" name={displayName} size="lg" />
                <div>
                  <h2 className="font-display text-h1 text-white">{displayName}</h2>
                  <p className="text-body-lg text-white/68">Patient record for Vela Health</p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                  Contact
                </p>
                <p className="mt-3 text-body-lg text-white">{patient.phone || 'No phone added'}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                  Status
                </p>
                <p className="mt-3 text-body-lg text-white">
                  {patient.onboardingCompleted ? 'Onboarding completed' : 'Onboarding pending'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-[linear-gradient(180deg,_rgba(245,249,255,0.9),_rgba(255,255,255,0.98))] p-8">
            <div className="flex flex-wrap gap-2">
              <Badge variant={patient.onboardingCompleted ? 'success' : 'info'}>
                {patient.onboardingCompleted ? 'Ready for care' : 'Profile pending'}
              </Badge>
              <Badge variant="default">{patient.email}</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel-quiet rounded-[26px] p-5">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Phone
                    </p>
                    <p className="mt-2 text-body-lg text-text-primary">
                      {patient.phone || 'No phone added'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel-quiet rounded-[26px] p-5">
                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Gender
                    </p>
                    <p className="mt-2 text-body-lg text-text-primary">
                      {patient.gender || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="panel-quiet rounded-[26px] p-5">
                <div className="flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-h3 text-text-primary">Personal details</h3>
                    <p className="text-body text-text-secondary">Captured during onboarding</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      Date of birth
                    </p>
                    <p className="mt-2 text-body-lg text-text-primary">
                      {patient.dateOfBirth || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      Chief complaint
                    </p>
                    <p className="mt-2 text-body-lg text-text-primary">
                      {patient.chiefComplaint || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="panel-quiet rounded-[26px] p-5">
                <div className="flex items-center gap-3">
                  <FileStack className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-h3 text-text-primary">Medical summary</h3>
                    <p className="text-body text-text-secondary">Core health context at a glance</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      Conditions
                    </p>
                    <p className="mt-2 text-body text-text-primary">
                      {conditions.length > 0 ? conditions.join(', ') : 'No conditions added'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      Medications
                    </p>
                    <p className="mt-2 text-body text-text-primary">
                      {medications.length > 0 ? medications.join(', ') : 'No medications added'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                      Allergies
                    </p>
                    <p className="mt-2 text-body text-text-primary">
                      {allergies.length > 0 ? allergies.join(', ') : 'No allergies added'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
