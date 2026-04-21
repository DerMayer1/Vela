'use client'

import Link from 'next/link'
import {
  CalendarDays,
  ClipboardList,
  Plus,
  Sparkles,
  Stethoscope
} from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Card, EmptyState, buttonVariants } from '@/components/ui'
import { ConsultationList } from '@/components/consultations/ConsultationList'
import { useConsultations } from '@/hooks/useConsultations'

export function ConsultationsOverview() {
  const consultationsQuery = useConsultations()

  if (consultationsQuery.isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 animate-pulse">
        <div className="panel-quiet h-48 w-full rounded-[36px]" />
        <div className="space-y-4">
          <div className="panel-quiet h-40 rounded-[30px]" />
          <div className="panel-quiet h-40 rounded-[30px]" />
        </div>
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

  const consultations = consultationsQuery.data ?? []
  const scheduledCount = consultations.filter((item) => item.status === 'scheduled').length
  const completedCount = consultations.filter((item) => item.status === 'completed').length

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <SectionHeading
        action={
          <Link
            className={buttonVariants({ size: 'md', variant: 'primary' })}
            href="/consultations/new"
          >
            <Plus className="h-4 w-4" />
            New consultation
          </Link>
        }
        description="Manage upcoming appointments, reopen previous visits and move into active care rooms from one operational workspace."
        eyebrow="Consultations"
        title="Consultation workspace"
      />

      <Card className="dark-aurora border-white/10 text-white">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Flow overview
            </p>
            <h2 className="font-display text-h1 text-white">
              Every scheduled visit stays visible, actionable and easy to reopen.
            </h2>
            <p className="max-w-2xl text-body-lg text-white/72">
              Patients can confirm timing, track progress and jump into the right appointment
              without bouncing across fragmented screens.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <CalendarDays className="h-5 w-5 text-accent" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Scheduled
              </p>
              <p className="mt-2 font-display text-h2 text-white">{scheduledCount}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <ClipboardList className="h-5 w-5 text-accent" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Completed
              </p>
              <p className="mt-2 font-display text-h2 text-white">{completedCount}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                Total
              </p>
              <p className="mt-2 font-display text-h2 text-white">{consultations.length}</p>
            </div>
          </div>
        </div>
      </Card>

      {consultations.length === 0 ? (
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: 'md', variant: 'secondary' })}
              href="/consultations/new"
            >
              Start scheduling
            </Link>
          }
          description="No consultation records exist yet. Schedule the first visit to activate the patient journey."
          icon={CalendarDays}
          title="No consultations yet"
        />
      ) : (
        <ConsultationList consultations={consultations} />
      )}
    </div>
  )
}
