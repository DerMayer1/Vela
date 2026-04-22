'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  AlertCircle,
  CalendarDays,
  ClipboardList,
  Clock3,
  FileText,
  Pill,
  ShieldAlert,
  Stethoscope
} from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Avatar, Badge, Button, Card, EmptyState, Textarea } from '@/components/ui'
import { ConsultationStatusBadge } from '@/components/consultations/ConsultationStatusBadge'
import { useConsultation, useUpdateConsultation } from '@/hooks/useConsultations'
import {
  consultationNotesSchema,
  type ConsultationNotesValues
} from '@/lib/validations/consultation'
import type { PastConsultationCompact } from '@/types/consultation'

interface ConsultationRoomProps {
  consultationId: string
}

const STATUS_TIMELINE_STEPS = [
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' }
] as const

const statusOrder: Record<string, number> = {
  cancelled: -1,
  completed: 2,
  'in-progress': 1,
  scheduled: 0
}

const prescriptionSchema = z.object({
  prescription: z.string().trim().max(5000, 'Prescription is too long')
})

type PrescriptionValues = z.infer<typeof prescriptionSchema>

export function ConsultationRoom({ consultationId }: ConsultationRoomProps) {
  const consultationQuery = useConsultation(consultationId)
  const updateConsultationMutation = useUpdateConsultation()
  const notesForm = useForm<ConsultationNotesValues>({
    defaultValues: {
      notes: ''
    },
    resolver: zodResolver(consultationNotesSchema)
  })

  const consultation = consultationQuery.data

  useEffect(() => {
    if (consultation) {
      notesForm.reset({
        notes: consultation.notes ?? ''
      })
    }
  }, [consultation, notesForm])

  if (consultationQuery.isLoading) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col gap-6 animate-pulse">
        <div className="panel-quiet h-24 rounded-[28px]" />
        <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
          <div className="grid gap-4">
            <div className="panel-quiet h-64 rounded-[28px]" />
            <div className="panel-quiet h-56 rounded-[28px]" />
          </div>
          <div className="grid gap-4">
            <div className="panel-quiet h-56 rounded-[28px]" />
            <div className="grid gap-4 xl:grid-cols-2">
              <div className="panel-quiet h-80 rounded-[28px]" />
              <div className="panel-quiet h-80 rounded-[28px]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (consultationQuery.error || !consultation) {
    return (
      <div className="mx-auto max-w-6xl">
        <EmptyState
          description="We couldn't load this consultation. It may have been deleted."
          icon={AlertCircle}
          title="Consultation not found"
        />
      </div>
    )
  }

  const statusOptions = ['scheduled', 'in-progress', 'completed'] as const
  const currentStatusIndex = statusOrder[consultation.status] ?? -1

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <SectionHeading
        description="Review patient context, move the visit through status changes and document the clinical record."
        eyebrow="Consultation"
        title={`${consultation.specialty} consultation`}
      />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <div className="grid gap-4">
          <Card className="border-[#dbe4ef]" padding="compact">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <Avatar
                  name={`${consultation.patient.firstName} ${consultation.patient.lastName}`}
                  size="lg"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Patient summary
                  </p>
                  <h2 className="truncate text-h3 text-text-primary">
                    {consultation.patient.firstName} {consultation.patient.lastName}
                  </h2>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-6 text-text-secondary">
                <p>
                  <span className="font-medium text-text-primary">Date of birth:</span>{' '}
                  {consultation.patient.dateOfBirth || 'Not provided'}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Phone:</span>{' '}
                  {consultation.patient.phone || 'Not provided'}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Gender:</span>{' '}
                  {consultation.patient.gender || 'Not provided'}
                </p>
                <p>
                  <span className="font-medium text-text-primary">Chief complaint:</span>{' '}
                  {consultation.patient.chiefComplaint || 'Not provided'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-[#dbe4ef]" padding="compact">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Medical history
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-text-secondary">Conditions</p>
                  {consultation.patient.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {consultation.patient.conditions.map((condition) => (
                        <span
                          key={condition}
                          className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-text-secondary"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-tertiary">None reported</p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-text-secondary">Medications</p>
                  {consultation.patient.medications.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {consultation.patient.medications.map((medication) => (
                        <span
                          key={medication}
                          className="rounded-full border border-info/20 bg-info-light px-2.5 py-1 text-xs text-info"
                        >
                          <Pill className="mr-1 inline h-3 w-3" />
                          {medication}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-tertiary">None reported</p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-text-secondary">Allergies</p>
                  {consultation.patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {consultation.patient.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="rounded-full border border-danger/20 bg-danger-light px-2.5 py-1 text-xs text-danger"
                        >
                          <AlertCircle className="mr-1 inline h-3 w-3" />
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-tertiary">None reported</p>
                  )}
                </div>

                {consultation.patient.hasRecentSurgery ? (
                  <div className="flex items-center gap-2 rounded-[18px] border border-warning/20 bg-warning-light px-3 py-3">
                    <ShieldAlert className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium text-warning">Recent surgery reported</span>
                  </div>
                ) : null}
              </div>
            </div>
          </Card>

          <Card className="border-[#dbe4ef]" padding="compact">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Past consultations
                </h3>
              </div>

              {consultation.pastConsultations.length > 0 ? (
                <div className="space-y-2">
                  {consultation.pastConsultations.map((pc: PastConsultationCompact) => (
                    <Link
                      key={pc.id}
                      className="flex items-center justify-between rounded-[18px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] px-3 py-3 transition-all duration-300 hover:border-border-strong"
                      href={`/consultations/${pc.id}`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {pc.specialty}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {new Date(pc.scheduledAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ConsultationStatusBadge status={pc.status} />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-text-tertiary">No other consultations on record.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card className="border-[#dbe4ef]" padding="compact">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <ConsultationStatusBadge status={consultation.status} />
                  <span className="rounded-full border border-border bg-surface-raised px-2.5 py-1 text-xs font-medium text-text-secondary">
                    {consultation.physicianName}
                  </span>
                </div>
                <div>
                  <h2 className="text-h2 tracking-tight text-text-primary">{consultation.specialty}</h2>
                  <p className="mt-2 flex items-center gap-2 text-[1rem] leading-7 text-text-secondary">
                    <Clock3 className="h-4 w-4 text-primary" />
                    {new Date(consultation.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <p className="max-w-3xl text-[1rem] leading-7 text-text-secondary">
                  {consultation.chiefComplaint}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {statusOptions.map((statusOption) => (
                  <Button
                    key={statusOption}
                    className={
                      consultation.status === statusOption
                        ? 'rounded-[16px] text-white hover:text-white'
                        : 'rounded-[16px]'
                    }
                    disabled={
                      consultation.status === statusOption || updateConsultationMutation.isPending
                    }
                    onClick={() =>
                      void updateConsultationMutation.mutateAsync({
                        id: consultation.id,
                        values: { status: statusOption }
                      })
                    }
                    size="sm"
                    type="button"
                    variant={consultation.status === statusOption ? 'primary' : 'secondary'}
                  >
                    {statusOption === 'in-progress'
                      ? 'Start'
                      : statusOption === 'completed'
                        ? 'Complete'
                        : 'Set scheduled'}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="border-[#dbe4ef]" padding="compact">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Status timeline
                </h3>
              </div>

              <div className="flex items-center gap-0">
                {STATUS_TIMELINE_STEPS.map((step, index) => {
                  const stepIndex = statusOrder[step.key] ?? 0
                  const isReached = currentStatusIndex >= stepIndex
                  const isCurrent = currentStatusIndex === stepIndex

                  return (
                    <div key={step.key} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition ${
                            isCurrent
                              ? 'border-primary bg-primary text-text-inverse'
                              : isReached
                                ? 'border-primary/30 bg-primary-light text-primary'
                                : 'border-border bg-surface-raised text-text-tertiary'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`text-center text-xs ${
                            isCurrent
                              ? 'font-medium text-primary'
                              : isReached
                                ? 'text-text-secondary'
                                : 'text-text-tertiary'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < STATUS_TIMELINE_STEPS.length - 1 ? (
                        <div
                          className={`mx-2 h-0.5 flex-1 rounded ${
                            currentStatusIndex > stepIndex ? 'bg-primary/30' : 'bg-border'
                          }`}
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>

              {consultation.status === 'cancelled' ? (
                <div>
                  <Badge variant="cancelled">This consultation has been cancelled</Badge>
                </div>
              ) : null}
            </div>
          </Card>

          <div className="grid gap-4 xl:grid-cols-2">
            <NotesSection
              consultationId={consultation.id}
              errorMessage={updateConsultationMutation.error?.message}
              form={notesForm}
              isPending={updateConsultationMutation.isPending}
              onSubmit={async (values) => {
                await updateConsultationMutation.mutateAsync({
                  id: consultation.id,
                  values: {
                    notes: values.notes ?? ''
                  }
                })
              }}
            />

            <PrescriptionSection
              consultationId={consultation.id}
              errorMessage={updateConsultationMutation.error?.message}
              initialPrescription={consultation.prescription ?? ''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface NotesSectionProps {
  consultationId: string
  errorMessage?: string | undefined
  form: ReturnType<typeof useForm<ConsultationNotesValues>>
  isPending: boolean
  onSubmit: (values: ConsultationNotesValues) => Promise<void>
}

function NotesSection({ errorMessage, form, isPending, onSubmit }: NotesSectionProps) {
  return (
    <Card className="border-[#dbe4ef]" padding="compact">
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (values) => {
          await onSubmit(values)
        })}
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Consultation notes
          </h3>
        </div>

        <Textarea
          className="min-h-[220px]"
          description="Clinical notes are persisted for this consultation only."
          error={form.formState.errors.notes?.message}
          label="Notes"
          placeholder="Document consultation notes and next steps."
          {...form.register('notes')}
        />

        {errorMessage ? (
          <p className="text-sm text-danger" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button
          className="rounded-[18px] text-white hover:text-white"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Saving notes...' : 'Save notes'}
        </Button>
      </form>
    </Card>
  )
}

interface PrescriptionSectionProps {
  consultationId: string
  errorMessage?: string | undefined
  initialPrescription: string
}

function PrescriptionSection({
  consultationId,
  errorMessage,
  initialPrescription
}: PrescriptionSectionProps) {
  const updateConsultationMutation = useUpdateConsultation()

  const prescriptionForm = useForm<PrescriptionValues>({
    defaultValues: {
      prescription: initialPrescription
    },
    resolver: zodResolver(prescriptionSchema)
  })

  useEffect(() => {
    prescriptionForm.reset({ prescription: initialPrescription })
  }, [initialPrescription, prescriptionForm])

  return (
    <Card className="border-[#dbe4ef]" padding="compact">
      <form
        className="space-y-4"
        onSubmit={prescriptionForm.handleSubmit(async (values) => {
          await updateConsultationMutation.mutateAsync({
            id: consultationId,
            values: {
              prescription: values.prescription ?? ''
            }
          })
        })}
      >
        <div className="flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Prescription
          </h3>
        </div>

        <Textarea
          className="min-h-[220px]"
          description="Free-text prescription content for this consultation."
          error={prescriptionForm.formState.errors.prescription?.message}
          label="Prescription"
          placeholder="Enter prescription details, dosages, and instructions."
          {...prescriptionForm.register('prescription')}
        />

        {errorMessage || updateConsultationMutation.error ? (
          <p className="text-sm text-danger" role="alert">
            {updateConsultationMutation.error?.message ?? errorMessage}
          </p>
        ) : null}

        <Button
          className="rounded-[18px] text-white hover:text-white"
          disabled={updateConsultationMutation.isPending}
          type="submit"
        >
          {updateConsultationMutation.isPending
            ? 'Saving prescription...'
            : 'Save prescription'}
        </Button>
      </form>
    </Card>
  )
}
