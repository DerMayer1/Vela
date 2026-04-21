'use client'

import Link from 'next/link'
import { CalendarDays, Stethoscope } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Card, EmptyState, buttonVariants } from '@/components/ui'
import { ConsultationList } from '@/components/consultations/ConsultationList'
import { useConsultations } from '@/hooks/useConsultations'

export function ConsultationsOverview() {
  const consultationsQuery = useConsultations()

  if (consultationsQuery.isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <Card>Loading your consultations...</Card>
      </div>
    )
  }

  if (consultationsQuery.error) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          description="We could not load your consultations."
          icon={Stethoscope}
          title="Consultations unavailable"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        action={
          <Link
            className={buttonVariants({ size: 'md', variant: 'primary' })}
            href="/consultations/new"
          >
            New Consultation
          </Link>
        }
        description="Create and manage consultation records from a single workspace."
        eyebrow="Consultations"
        title="Consultation workspace"
      />

      {!consultationsQuery.data || consultationsQuery.data.length === 0 ? (
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: 'md', variant: 'secondary' })}
              href="/consultations/new"
            >
              Start scheduling
            </Link>
          }
          description="No consultation records exist yet. Create your first consultation to begin."
          icon={CalendarDays}
          title="No consultations yet"
        />
      ) : (
        <ConsultationList consultations={consultationsQuery.data} />
      )}
    </div>
  )
}
