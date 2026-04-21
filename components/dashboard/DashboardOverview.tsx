'use client'

import Link from 'next/link'
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  Plus,
  ShieldCheck
} from 'lucide-react'
import { motion } from 'framer-motion'
import { ConsultationList } from '@/components/consultations/ConsultationList'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Badge, Card, EmptyState, buttonVariants } from '@/components/ui'
import { useConsultations } from '@/hooks/useConsultations'
import { usePatient } from '@/hooks/usePatient'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: 'easeOut' } }
}

export function DashboardOverview() {
  const patientQuery = usePatient()
  const consultationsQuery = useConsultations()

  if (patientQuery.isLoading || consultationsQuery.isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="panel-quiet h-44 w-full animate-pulse rounded-[32px]" />
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="panel-quiet h-36 animate-pulse rounded-[28px]" />
          <div className="panel-quiet h-36 animate-pulse rounded-[28px]" />
          <div className="panel-quiet h-36 animate-pulse rounded-[28px]" />
        </div>
        <div className="panel-quiet h-72 animate-pulse rounded-[32px]" />
      </div>
    )
  }

  if (patientQuery.error || consultationsQuery.error || !patientQuery.data) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <SectionHeading
          description="We could not load the patient workspace right now."
          eyebrow="Dashboard"
          title="Workspace unavailable"
        />
        <EmptyState
          action={
            <Link
              className={buttonVariants({ size: 'md', variant: 'secondary' })}
              href="/consultations/new"
            >
              Create consultation
            </Link>
          }
          description="Try reloading the data or continue by creating a new consultation."
          icon={ShieldCheck}
          title="Data could not be loaded"
        />
      </div>
    )
  }

  const consultations = consultationsQuery.data ?? []
  const upcomingConsultation = consultations.find((consultation) => consultation.status === 'scheduled')
  const completedCount = consultations.filter((consultation) => consultation.status === 'completed').length
  const scheduledCount = consultations.filter((consultation) => consultation.status === 'scheduled').length

  return (
    <motion.div
      animate="show"
      className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8"
      initial="hidden"
      variants={container}
    >
      <motion.div variants={item}>
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
          description="Your next appointment, onboarding status and recent care activity stay visible in one place."
          eyebrow="Dashboard"
          title={`Welcome back, ${patientQuery.data.firstName}`}
        />
      </motion.div>

      <motion.section variants={item}>
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="dark-aurora flex flex-col justify-between gap-6 p-7 text-white">
              <div className="space-y-4">
                <Badge className="bg-white/10 text-white" variant="default">
                  Today&apos;s care workspace
                </Badge>
                <div className="space-y-3">
                  <h2 className="max-w-xl font-display text-h1 text-white">
                    {upcomingConsultation
                      ? `${upcomingConsultation.specialty} consultation is your next priority.`
                      : 'Your workspace is ready for the next consultation.'}
                  </h2>
                  <p className="max-w-xl text-body-lg text-white/72">
                    {upcomingConsultation
                      ? 'Join the upcoming visit, review the complaint and keep the next action obvious for the patient.'
                      : 'No upcoming visit is scheduled yet. Create one and keep the patient journey moving.'}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <CalendarClock className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Scheduled
                  </p>
                  <p className="mt-2 font-display text-h2 text-white">{scheduledCount}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Completed
                  </p>
                  <p className="mt-2 font-display text-h2 text-white">{completedCount}</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Profile
                  </p>
                  <p className="mt-2 font-display text-h2 text-white">
                    {patientQuery.data.onboardingCompleted ? 'Ready' : 'Pending'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 bg-[linear-gradient(180deg,_rgba(245,249,255,0.88),_rgba(255,255,255,0.96))] p-7">
              <div className="panel-quiet rounded-[24px] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Next best action
                </p>
                <p className="mt-3 text-h3 text-text-primary">
                  {upcomingConsultation
                    ? 'Enter the upcoming consultation room.'
                    : 'Schedule the first consultation.'}
                </p>
                <p className="mt-2 text-body text-text-secondary">
                  {upcomingConsultation
                    ? 'The upcoming visit is placed first so the patient does not need to search for it.'
                    : 'Move the workspace from setup mode into live care with one clear action.'}
                </p>
                <Link
                  className={buttonVariants({
                    className: 'mt-5 w-full justify-between rounded-[18px]',
                    size: 'lg',
                    variant: 'primary'
                  })}
                  href={
                    upcomingConsultation
                      ? `/consultations/${upcomingConsultation.id}`
                      : '/consultations/new'
                  }
                >
                  {upcomingConsultation ? 'Open consultation room' : 'Schedule consultation'}
                  <Plus className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="panel-quiet rounded-[24px] p-5">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Next appointment
                  </p>
                  <p className="mt-2 text-body-lg text-text-primary">
                    {upcomingConsultation
                      ? new Date(upcomingConsultation.scheduledAt).toLocaleString()
                      : 'No appointment scheduled'}
                  </p>
                </div>
                <div className="panel-quiet rounded-[24px] p-5">
                  <FileText className="h-5 w-5 text-primary" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Medical profile
                  </p>
                  <p className="mt-2 text-body-lg text-text-primary">
                    {patientQuery.data.conditions.length > 0
                      ? `${patientQuery.data.conditions.length} known condition(s)`
                      : 'No conditions added'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.section>

      {consultations.length > 0 ? (
        <motion.section className="space-y-5" variants={item}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-h2 text-text-primary">Recent consultations</h2>
              <p className="text-body text-text-secondary">
                Upcoming and previous visits, with direct access back into the care flow.
              </p>
            </div>
            <Link className={buttonVariants({ size: 'sm', variant: 'ghost' })} href="/consultations">
              View all
            </Link>
          </div>
          <ConsultationList consultations={consultations.slice(0, 3)} />
        </motion.section>
      ) : (
        <motion.div variants={item}>
          <EmptyState
            action={
              <Link
                className={buttonVariants({ size: 'md', variant: 'primary' })}
                href="/consultations/new"
              >
                Schedule first consultation
              </Link>
            }
            description="No appointments are scheduled yet. Create the first consultation to turn this workspace into a live care flow."
            icon={CalendarClock}
            title="No consultations yet"
          />
        </motion.div>
      )}
    </motion.div>
  )
}
