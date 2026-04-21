'use client'

import { FileStack, HeartPulse, Phone, UserRound } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Avatar, Badge, Card, EmptyState, Tabs } from '@/components/ui'
import { usePatient } from '@/hooks/usePatient'

export function ProfileOverview() {
  const patientQuery = usePatient()

  if (patientQuery.isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <Card>Loading your profile...</Card>
      </div>
    )
  }

  if (patientQuery.error || !patientQuery.data) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          description="We could not load your patient profile."
          icon={FileStack}
          title="Profile unavailable"
        />
      </div>
    )
  }

  const patient = patientQuery.data
  const displayName = `${patient.firstName} ${patient.lastName}`

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        description="Your profile now reflects persisted patient data from onboarding."
        eyebrow="Profile"
        title="Patient profile"
      />

      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={displayName} size="lg" />
            <div className="space-y-2">
              <div>
                <h2 className="text-h2 text-text-primary">{displayName}</h2>
                <p className="text-body text-text-secondary">
                  Patient record for Vela Health
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant={patient.onboardingCompleted ? 'success' : 'info'}>
                  {patient.onboardingCompleted ? 'Onboarding completed' : 'Onboarding pending'}
                </Badge>
                <Badge variant="default">{patient.email}</Badge>
              </div>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-text-secondary">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              {patient.phone || 'No phone added'}
            </p>
            <p className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" />
              {patient.gender || 'No gender set'}
            </p>
          </div>
        </div>
      </Card>

      <Tabs
        activeValue="overview"
        items={[
          { label: 'Overview', value: 'overview' },
          { label: 'Medical history', value: 'history' },
          { label: 'Documents', value: 'documents' }
        ]}
      />

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <HeartPulse className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-h3 text-text-primary">Personal information</h2>
              <p className="text-sm text-text-secondary">
                Persisted from onboarding
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-surface-raised p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                Date of birth
              </p>
              <p className="mt-3 font-medium text-text-primary">
                {patient.dateOfBirth || 'Not provided'}
              </p>
            </div>
            <div className="rounded-xl bg-surface-raised p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
                Chief complaint
              </p>
              <p className="mt-3 font-medium text-text-primary">
                {patient.chiefComplaint || 'Not provided'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex items-center gap-3">
            <FileStack className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-h3 text-text-primary">Medical summary</h2>
              <p className="text-sm text-text-secondary">
                Persisted from onboarding
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            <div className="rounded-xl border border-border bg-surface-raised p-4">
              <p className="font-medium text-text-primary">Current conditions</p>
              <p className="mt-2 text-sm text-text-secondary">
                {patient.conditions.length > 0
                  ? patient.conditions.join(', ')
                  : 'No conditions added'}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface-raised p-4">
              <p className="font-medium text-text-primary">Allergies</p>
              <p className="mt-2 text-sm text-text-secondary">
                {patient.allergies.length > 0
                  ? patient.allergies.join(', ')
                  : 'No allergies added'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
