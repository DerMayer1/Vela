'use client'

import Link from 'next/link'
import { CalendarClock, FileText, Plus, Sparkles } from 'lucide-react'
import { ConsultationList } from '@/components/consultations/ConsultationList'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Badge, Card, EmptyState, buttonVariants } from '@/components/ui'
import { useConsultations } from '@/hooks/useConsultations'
import { usePatient } from '@/hooks/usePatient'

export function DashboardOverview() {
  const patientQuery = usePatient()
  const consultationsQuery = useConsultations()

  if (patientQuery.isLoading || consultationsQuery.isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <Card>Loading your dashboard...</Card>
      </div>
    )
  }

  if (patientQuery.error || consultationsQuery.error || !patientQuery.data) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          description="We could not load your dashboard data."
          icon={Sparkles}
          title="Dashboard unavailable"
        />
      </div>
    )
  }

  const upcomingConsultation = consultationsQuery.data?.find(
    (consultation) => consultation.status === 'scheduled'
  )

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        action={
          <Link
            className={buttonVariants({ size: 'md', variant: 'primary' })}
            href="/consultations/new"
          >
            <Plus className="h-4 w-4" />
            New Consultation
          </Link>
        }
        description="Your dashboard is now connected to real profile and consultation data."
        eyebrow="Dashboard"
        title={`Good morning, ${patientQuery.data.firstName}`}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card padding="compact">
          <CalendarClock className="h-5 w-5 text-primary" />
          <p className="mt-4 text-sm text-text-tertiary">Upcoming visits</p>
          <p className="mt-2 font-display text-h2 text-text-primary">
            {consultationsQuery.data?.filter((consultation) => consultation.status === 'scheduled')
              .length ?? 0}
          </p>
        </Card>
        <Card padding="compact">
          <FileText className="h-5 w-5 text-primary" />
          <p className="mt-4 text-sm text-text-tertiary">Known conditions</p>
          <p className="mt-2 font-display text-h2 text-text-primary">
            {patientQuery.data.conditions.length}
          </p>
        </Card>
        <Card padding="compact">
          <Sparkles className="h-5 w-5 text-primary" />
          <p className="mt-4 text-sm text-text-tertiary">Onboarding status</p>
          <p className="mt-2 font-display text-h2 text-text-primary">
            {patientQuery.data.onboardingCompleted ? 'Ready' : 'Pending'}
          </p>
        </Card>
      </div>

      {upcomingConsultation ? (
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="scheduled">Scheduled</Badge>
            <Badge variant="default">
              {new Date(upcomingConsultation.scheduledAt).toLocaleString()}
            </Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text-tertiary">Upcoming consultation</p>
            <h2 className="font-display text-h2 text-text-primary">
              {upcomingConsultation.specialty} with {upcomingConsultation.physicianName}
            </h2>
            <p className="max-w-2xl text-body text-text-secondary">
              {upcomingConsultation.chiefComplaint}
            </p>
          </div>
        </Card>
      ) : (
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: 'md', variant: 'secondary' })}
              href="/consultations/new"
            >
              Schedule consultation
            </Link>
          }
          description="No consultations exist yet for this account."
          icon={CalendarClock}
          title="No consultations yet"
        />
      )}

      {consultationsQuery.data && consultationsQuery.data.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-h3 text-text-primary">All consultations</h2>
              <p className="text-body text-text-secondary">
                Review upcoming and historical consultations.
              </p>
            </div>
            <Link
              className={buttonVariants({ size: 'sm', variant: 'ghost' })}
              href="/consultations"
            >
              View all
            </Link>
          </div>
          <ConsultationList consultations={consultationsQuery.data} />
        </div>
      ) : null}
    </div>
  )
}
