'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  AlertCircle,
  CalendarDays,
  ClipboardList,
  FileText,
  Pill,
  ShieldAlert,
  Stethoscope
} from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Card, Avatar, Badge, Button, Textarea, EmptyState } from '@/components/ui'
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
      <div className="mx-auto flex max-w-6xl flex-col gap-8 animate-pulse">
        <div className="h-24 w-full rounded-xl bg-surface" />
        <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
          <div className="h-96 rounded-xl bg-surface" />
          <div className="h-[600px] rounded-xl bg-surface" />
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
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        description="Review the patient context, manage consultation state, and persist notes."
        eyebrow="Consultation"
        title={`${consultation.specialty} consultation`}
      />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        {/* ── Left Panel: Patient Summary ── */}
        <div className="flex flex-col gap-4">
          <Card className="space-y-5 bg-surface-raised">
            <div className="flex items-center gap-3">
              <Avatar
                name={`${consultation.patient.firstName} ${consultation.patient.lastName}`}
                size="lg"
              />
              <div className="min-w-0">
                <p className="text-label uppercase tracking-widest text-text-tertiary">
                  Patient summary
                </p>
                <h2 className="truncate text-h3 tracking-tight text-text-primary">
                  {consultation.patient.firstName} {consultation.patient.lastName}
                </h2>
              </div>
            </div>

            <div className="space-y-3 text-sm text-text-secondary">
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
          </Card>

          {/* ── Medical History ── */}
          <Card className="space-y-4 bg-surface-raised">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-primary" />
              <h3 className="text-label uppercase tracking-widest text-text-tertiary">
                Medical History
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-text-secondary">Conditions</p>
                {consultation.patient.conditions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {consultation.patient.conditions.map((condition) => (
                      <span
                        key={condition}
                        className="rounded-full border border-border bg-surface px-2 py-0.5 text-xs text-text-secondary"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-tertiary">None reported</p>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-medium text-text-secondary">Medications</p>
                {consultation.patient.medications.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {consultation.patient.medications.map((medication) => (
                      <span
                        key={medication}
                        className="rounded-full border border-info/20 bg-info-light px-2 py-0.5 text-xs text-info"
                      >
                        <Pill className="mr-1 inline h-3 w-3" />
                        {medication}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-tertiary">None reported</p>
                )}
              </div>

              <div>
                <p className="mb-1.5 text-xs font-medium text-text-secondary">Allergies</p>
                {consultation.patient.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {consultation.patient.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="rounded-full border border-danger/20 bg-danger-light px-2 py-0.5 text-xs text-danger"
                      >
                        <AlertCircle className="mr-1 inline h-3 w-3" />
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-tertiary">None reported</p>
                )}
              </div>

              {consultation.patient.hasRecentSurgery ? (
                <div className="flex items-center gap-2 rounded-lg border border-warning/20 bg-warning-light px-3 py-2">
                  <ShieldAlert className="h-4 w-4 text-warning" />
                  <span className="text-xs font-medium text-warning">Recent surgery reported</span>
                </div>
              ) : null}
            </div>
          </Card>

          {/* ── Past Consultations ── */}
          <Card className="space-y-4 bg-surface-raised">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <h3 className="text-label uppercase tracking-widest text-text-tertiary">
                Past Consultations
              </h3>
            </div>

            {consultation.pastConsultations.length > 0 ? (
              <div className="space-y-2">
                {consultation.pastConsultations.map((pc: PastConsultationCompact) => (
                  <Link
                    key={pc.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 transition hover:border-border-strong hover:shadow-sm"
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
              <p className="text-xs text-text-tertiary">No other consultations on record.</p>
            )}
          </Card>
        </div>

        {/* ── Right Panel: Consultation Detail ── */}
        <div className="flex flex-col gap-4">
          <Card className="space-y-6">
            <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <ConsultationStatusBadge status={consultation.status} />
                  <span className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                    {consultation.physicianName}
                  </span>
                </div>
                <div>
                  <h2 className="text-h2 tracking-tight text-text-primary">{consultation.specialty}</h2>
                  <p className="mt-1 text-body text-text-secondary">
                    {new Date(consultation.scheduledAt).toLocaleString()}
                  </p>
                </div>
                <p className="max-w-2xl text-body text-text-secondary">
                  {consultation.chiefComplaint}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {statusOptions.map((statusOption) => (
                  <Button
                    key={statusOption}
                    disabled={
                      consultation.status === statusOption ||
                      updateConsultationMutation.isPending
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
                        : 'Set Scheduled'}
                  </Button>
                ))}
              </div>
            </div>

            {/* ── Consultation Timeline ── */}
            <div className="border-b border-border pb-6">
              <div className="flex items-center gap-2 pb-4">
                <Stethoscope className="h-4 w-4 text-primary" />
                <h3 className="text-label uppercase tracking-widest text-text-tertiary">
                  Status Timeline
                </h3>
              </div>
              <div className="flex items-center gap-0">
                {STATUS_TIMELINE_STEPS.map((step, index) => {
                  const stepIndex = statusOrder[step.key] ?? 0
                  const isReached = currentStatusIndex >= stepIndex
                  const isCurrent = currentStatusIndex === stepIndex

                  return (
                    <div key={step.key} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium transition ${
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
                          className={`mx-1 h-0.5 flex-1 rounded ${
                            currentStatusIndex > stepIndex
                              ? 'bg-primary/30'
                              : 'bg-border'
                          }`}
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
              {consultation.status === 'cancelled' ? (
                <div className="mt-3">
                  <Badge variant="cancelled">This consultation has been cancelled</Badge>
                </div>
              ) : null}
            </div>

            {/* ── Consultation Notes ── */}
            <form
              className="space-y-4 border-b border-border pb-6"
              onSubmit={notesForm.handleSubmit(async (values) => {
                await updateConsultationMutation.mutateAsync({
                  id: consultation.id,
                  values: {
                    notes: values.notes ?? ''
                  }
                })
              })}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="text-label uppercase tracking-widest text-text-tertiary">
                  Consultation Notes
                </h3>
              </div>

              <Textarea
                description="Clinical notes are persisted for this consultation only."
                error={notesForm.formState.errors.notes?.message}
                label="Notes"
                placeholder="Document consultation notes and next steps."
                {...notesForm.register('notes')}
              />

              {updateConsultationMutation.error ? (
                <p className="text-sm text-danger" role="alert">
                  {updateConsultationMutation.error.message}
                </p>
              ) : null}

              <Button disabled={updateConsultationMutation.isPending} type="submit">
                {updateConsultationMutation.isPending ? 'Saving notes...' : 'Save notes'}
              </Button>
            </form>

            {/* ── Prescription Section ── */}
            <PrescriptionSection
              consultationId={consultation.id}
              initialPrescription={consultation.prescription ?? ''}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Prescription Section ─────────────────────────── */

import { z } from 'zod'

const prescriptionSchema = z.object({
  prescription: z.string().trim().max(5000, 'Prescription is too long')
})

type PrescriptionValues = z.infer<typeof prescriptionSchema>

interface PrescriptionSectionProps {
  consultationId: string
  initialPrescription: string
}

function PrescriptionSection({ consultationId, initialPrescription }: PrescriptionSectionProps) {
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
        <h3 className="text-label uppercase tracking-widest text-text-tertiary">
          Prescription
        </h3>
      </div>

      <Textarea
        description="Free-text prescription content for this consultation."
        error={prescriptionForm.formState.errors.prescription?.message}
        label="Prescription"
        placeholder="Enter prescription details, dosages, and instructions."
        {...prescriptionForm.register('prescription')}
      />

      {updateConsultationMutation.error ? (
        <p className="text-sm text-danger" role="alert">
          {updateConsultationMutation.error.message}
        </p>
      ) : null}

      <Button disabled={updateConsultationMutation.isPending} type="submit">
        {updateConsultationMutation.isPending ? 'Saving prescription...' : 'Save prescription'}
      </Button>
    </form>
  )
}
