'use client'

import Link from 'next/link'
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  FileText,
  HeartPulse,
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
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="panel-quiet h-80 animate-pulse rounded-[30px]" />
          <div className="grid gap-4">
            <div className="panel-quiet h-44 animate-pulse rounded-[28px]" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel-quiet h-32 animate-pulse rounded-[24px]" />
              <div className="panel-quiet h-32 animate-pulse rounded-[24px]" />
            </div>
          </div>
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

  const patient = patientQuery.data
  const consultations = consultationsQuery.data ?? []
  const upcomingConsultation = consultations.find((consultation) => consultation.status === 'scheduled')
  const completedCount = consultations.filter((consultation) => consultation.status === 'completed').length
  const scheduledCount = consultations.filter((consultation) => consultation.status === 'scheduled').length
  const profileStatus = patient.onboardingCompleted ? 'Ready for care' : 'Needs completion'
  const nextAppointmentText = upcomingConsultation
    ? new Date(upcomingConsultation.scheduledAt).toLocaleString()
    : 'No appointment scheduled'
  const medicalSummaryText =
    patient.conditions.length > 0
      ? `${patient.conditions.length} known condition(s)`
      : 'No conditions added'

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
          description="Your next appointment, profile readiness and recent care activity stay visible in one operational workspace."
          eyebrow="Dashboard"
          title="Care overview"
        />
      </motion.div>

      <motion.section variants={item}>
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-[linear-gradient(160deg,_#163257_0%,_#11284a_100%)] text-white shadow-[0_28px_60px_rgba(10,24,49,0.18)]">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <Badge className="bg-white/10 text-white" variant="default">
                  Priority view
                </Badge>
                <div className="space-y-3">
                  <h2 className="max-w-[11ch] font-display text-[clamp(2.8rem,4.2vw,4.3rem)] leading-[0.94] tracking-[-0.05em] text-white">
                    {upcomingConsultation
                      ? `${upcomingConsultation.specialty} consultation is the next patient priority.`
                      : 'The workspace is ready for the next consultation.'}
                  </h2>
                  <p className="max-w-2xl text-[1.02rem] leading-8 text-white/72">
                    {upcomingConsultation
                      ? 'Open the upcoming visit, review the complaint and keep the next action obvious before the patient needs to search for it.'
                      : 'No visit is scheduled yet. Create one and keep the patient journey moving without friction.'}
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
                  <HeartPulse className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Profile
                  </p>
                  <p className="mt-2 text-[1.5rem] font-semibold leading-tight text-white">
                    {profileStatus}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            <Card className="border-[#dbe4ef]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Next best action
                </p>
                <p className="text-h3 text-text-primary">
                  {upcomingConsultation
                    ? 'Enter the upcoming consultation room.'
                    : 'Schedule the first consultation.'}
                </p>
                <p className="text-body text-text-secondary">
                  {upcomingConsultation
                    ? 'The upcoming visit stays first so the patient does not need to search for it.'
                    : 'Move the workspace from setup mode into live care with one clear action.'}
                </p>
                <Link
                  className={buttonVariants({
                    className: 'w-full justify-between rounded-[18px] text-white hover:text-white',
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
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-[#dbe4ef]" padding="compact">
                <Clock3 className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Next appointment
                </p>
                <p className="mt-2 text-body-lg leading-8 text-text-primary">{nextAppointmentText}</p>
              </Card>

              <Card className="border-[#dbe4ef]" padding="compact">
                <FileText className="h-5 w-5 text-primary" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Medical profile
                </p>
                <p className="mt-2 text-body-lg leading-8 text-text-primary">
                  {medicalSummaryText}
                </p>
              </Card>

              <Card className="border-[#dbe4ef] sm:col-span-2" padding="compact">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Patient readiness
                    </p>
                    <p className="mt-2 text-h3 text-text-primary">{profileStatus}</p>
                    <p className="mt-2 text-body text-text-secondary">
                      Intake, identity and consultation access stay aligned in one workspace.
                    </p>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {consultations.length > 0 ? (
        <motion.section className="space-y-5" variants={item}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-text-primary">
                Recent consultations
              </h2>
              <p className="text-[1rem] leading-7 text-text-secondary">
                Upcoming and previous visits, with direct access back into the care flow.
              </p>
            </div>
            <Link
              className={buttonVariants({
                className: 'rounded-[16px]',
                size: 'sm',
                variant: 'ghost'
              })}
              href="/consultations"
            >
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
                className={buttonVariants({
                  className: 'text-white hover:text-white',
                  size: 'md',
                  variant: 'primary'
                })}
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
