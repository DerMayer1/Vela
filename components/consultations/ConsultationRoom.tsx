'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Card, Button, Textarea } from '@/components/ui'
import { ConsultationStatusBadge } from '@/components/consultations/ConsultationStatusBadge'
import { useConsultation, useUpdateConsultation } from '@/hooks/useConsultations'
import {
  consultationNotesSchema,
  type ConsultationNotesValues
} from '@/lib/validations/consultation'

interface ConsultationRoomProps {
  consultationId: string
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
      <div className="mx-auto max-w-6xl">
        <Card>Loading consultation...</Card>
      </div>
    )
  }

  if (consultationQuery.error || !consultation) {
    return (
      <div className="mx-auto max-w-6xl">
        <Card>Unable to load consultation.</Card>
      </div>
    )
  }

  const statusOptions = ['scheduled', 'in-progress', 'completed'] as const

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        description="Review the patient context, manage consultation state, and persist notes."
        eyebrow="Consultation"
        title={`${consultation.specialty} consultation`}
      />

      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <Card className="space-y-5 bg-surface-raised">
          <div className="space-y-2">
            <p className="text-label uppercase tracking-[0.16em] text-text-tertiary">
              Patient summary
            </p>
            <h2 className="text-h3 text-text-primary">
              {consultation.patient.firstName} {consultation.patient.lastName}
            </h2>
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
              <span className="font-medium text-text-primary">Profile complaint:</span>{' '}
              {consultation.patient.chiefComplaint || 'Not provided'}
            </p>
          </div>
        </Card>

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
                <h2 className="text-h2 text-text-primary">{consultation.specialty}</h2>
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

          <form
            className="space-y-4"
            onSubmit={notesForm.handleSubmit(async (values) => {
              await updateConsultationMutation.mutateAsync({
                id: consultation.id,
                values: {
                  notes: values.notes ?? ''
                }
              })
            })}
          >
            <Textarea
              description="Clinical notes are persisted for this consultation only."
              error={notesForm.formState.errors.notes?.message}
              label="Consultation notes"
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
        </Card>
      </div>
    </div>
  )
}
