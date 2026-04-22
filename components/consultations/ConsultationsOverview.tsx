'use client'

import Link from 'next/link'
import {
  CalendarDays,
  ClipboardList,
  Clock3,
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
  const nextConsultation = consultations.find((item) => item.status === 'scheduled')

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <SectionHeading
        action={
          <Link
            className={buttonVariants({
              className: 'rounded-[18px] text-white hover:text-white',
              size: 'md',
              variant: 'primary'
            })}
            href="/consultations/new"
          >
            <Plus className="h-4 w-4" />
            New consultation
          </Link>
        }
        description="Manage upcoming appointments, reopen previous visits and move into active care rooms from one cleaner operational workspace."
        eyebrow="Consultations"
        title="Consultation workspace"
      />

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-[#dbe4ef]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Flow overview
            </p>
            <h2 className="max-w-[13ch] font-display text-h2 text-text-primary">
              Every scheduled visit stays visible and easy to reopen.
            </h2>
            <p className="max-w-2xl text-[1.02rem] leading-8 text-text-secondary">
              Patients can confirm timing, track progress and jump into the right appointment
              without bouncing across fragmented screens.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[22px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Scheduled
                </p>
                <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">
                  {scheduledCount}
                </p>
              </div>
              <div className="rounded-[22px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <ClipboardList className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Completed
                </p>
                <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">
                  {completedCount}
                </p>
              </div>
              <div className="rounded-[22px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Total
                </p>
                <p className="mt-2 text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">
                  {consultations.length}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[linear-gradient(160deg,_#163257_0%,_#11284a_100%)] text-white shadow-[0_28px_60px_rgba(10,24,49,0.18)]">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/56">
                Next action
              </p>
              <h2 className="max-w-[12ch] font-display text-h2 text-white">
                {nextConsultation
                  ? 'Open the next scheduled visit without digging through the list.'
                  : 'Create the next visit and keep care moving.'}
              </h2>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-white/8 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Clock3 className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/56">
                    {nextConsultation ? 'Upcoming consultation' : 'Consultation status'}
                  </p>
                  <p className="mt-2 text-base leading-7 text-white">
                    {nextConsultation
                      ? new Date(nextConsultation.scheduledAt).toLocaleString()
                      : 'No future consultation is scheduled yet.'}
                  </p>
                </div>
              </div>
            </div>

            <Link
              className="inline-flex h-14 w-full items-center justify-between rounded-[18px] bg-white px-5 text-[1.02rem] font-semibold tracking-[-0.01em] text-[#10294d] shadow-[0_14px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:bg-[#f7f9fc]"
              href={nextConsultation ? `/consultations/${nextConsultation.id}` : '/consultations/new'}
            >
              {nextConsultation ? 'Open visit details' : 'Start scheduling'}
              <Plus className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

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
        <div className="space-y-4">
          <div>
            <h2 className="text-[2.1rem] font-semibold leading-[1] tracking-[-0.05em] text-text-primary">
              All consultations
            </h2>
            <p className="mt-2 text-[1rem] leading-7 text-text-secondary">
              Review upcoming and completed visits from one cleaner workspace.
            </p>
          </div>
          <ConsultationList consultations={consultations} />
        </div>
      )}
    </div>
  )
}
