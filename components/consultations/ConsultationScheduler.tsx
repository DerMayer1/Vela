'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, CalendarDays, Check } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button, Card, Stepper, Textarea } from '@/components/ui'
import {
  generateConsultationSlots,
  getPhysiciansBySpecialty,
  specialties
} from '@/lib/constants/consultations'
import {
  createConsultationSchema,
  type CreateConsultationValues
} from '@/lib/validations/consultation'
import { useCreateConsultation } from '@/hooks/useConsultations'

const stepItems = [
  { description: 'Choose care area', label: 'Specialty' },
  { description: 'Choose clinician', label: 'Physician' },
  { description: 'Choose time', label: 'Slot' },
  { description: 'Review and confirm', label: 'Confirm' }
]

export function ConsultationScheduler() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const createConsultationMutation = useCreateConsultation()
  const methods = useForm<CreateConsultationValues>({
    defaultValues: {
      chiefComplaint: '',
      physicianName: '',
      scheduledAt: '',
      specialty: specialties[0]
    },
    resolver: zodResolver(createConsultationSchema)
  })

  const specialty = methods.watch('specialty')
  const physicianName = methods.watch('physicianName')
  const availablePhysicians = useMemo(
    () => getPhysiciansBySpecialty(specialty),
    [specialty]
  )
  const activePhysician = availablePhysicians.find(
    (physician) => physician.name === physicianName
  )
  const slots = activePhysician
    ? generateConsultationSlots(activePhysician.id)
    : []

  async function handleCreate() {
    const isValid = await methods.trigger()

    if (!isValid) {
      return
    }

    const consultation = await createConsultationMutation.mutateAsync(methods.getValues())

    router.push(`/consultations/${consultation.id}`)
    router.refresh()
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <SectionHeading
        description="Complete the scheduling flow to create a real consultation record."
        eyebrow="Consultations"
        title="New consultation"
      />

      <Card className="space-y-8">
        <Stepper currentStep={step} items={stepItems} />

        <FormProvider {...methods}>
          <div className="space-y-8">
            {step === 1 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {specialties.map((specialtyOption) => {
                  const active = specialty === specialtyOption

                  return (
                    <button
                      key={specialtyOption}
                      className={`rounded-xl border p-5 text-left transition ${
                        active
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-border bg-surface hover:border-border-strong'
                      }`}
                      onClick={() => {
                        methods.setValue('specialty', specialtyOption, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true
                        })
                        methods.setValue('physicianName', '')
                        methods.setValue('scheduledAt', '')
                      }}
                      type="button"
                    >
                      <p className="font-medium">{specialtyOption}</p>
                      <p className="mt-2 text-sm text-text-secondary">
                        Structured telehealth intake for {specialtyOption.toLowerCase()}.
                      </p>
                    </button>
                  )
                })}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {availablePhysicians.map((physician) => {
                  const active = physician.name === physicianName

                  return (
                    <button
                      key={physician.id}
                      className={`rounded-xl border p-5 text-left transition ${
                        active
                          ? 'border-primary bg-primary-light'
                          : 'border-border bg-surface hover:border-border-strong'
                      }`}
                      onClick={() => {
                        methods.setValue('physicianName', physician.name, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true
                        })
                        methods.setValue('scheduledAt', '')
                      }}
                      type="button"
                    >
                      <p className="text-h3 text-text-primary">{physician.name}</p>
                      <p className="mt-1 text-sm text-text-secondary">{physician.title}</p>
                      <p className="mt-3 text-body text-text-secondary">{physician.bio}</p>
                      <p className="mt-4 text-sm text-text-tertiary">
                        Rating {physician.rating}
                      </p>
                    </button>
                  )
                })}
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <p className="text-body text-text-secondary">
                    Available slots for {activePhysician?.name}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {slots.map((slot) => {
                    const active = methods.watch('scheduledAt') === slot.iso

                    return (
                      <button
                        key={slot.iso}
                        className={`rounded-xl border px-4 py-4 text-left transition ${
                          active
                            ? 'border-primary bg-primary text-text-inverse'
                            : 'border-border bg-surface hover:border-border-strong'
                        }`}
                        onClick={() =>
                          methods.setValue('scheduledAt', slot.iso, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: true
                          })
                        }
                        type="button"
                      >
                        <span className="block font-medium">{slot.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-xl border border-border bg-surface-raised p-5">
                  <p className="text-label uppercase tracking-[0.16em] text-text-tertiary">
                    Confirmation
                  </p>
                  <div className="mt-4 space-y-3 text-body text-text-secondary">
                    <p>
                      <span className="font-medium text-text-primary">Specialty:</span>{' '}
                      {specialty}
                    </p>
                    <p>
                      <span className="font-medium text-text-primary">Physician:</span>{' '}
                      {physicianName}
                    </p>
                    <p>
                      <span className="font-medium text-text-primary">Time:</span>{' '}
                      {methods.watch('scheduledAt')
                        ? new Date(methods.watch('scheduledAt')).toLocaleString()
                        : 'Not selected'}
                    </p>
                  </div>
                </div>

                <Textarea
                  description="This will be saved as the consultation chief complaint."
                  error={methods.formState.errors.chiefComplaint?.message}
                  label="Chief complaint"
                  placeholder="Describe the reason for this consultation."
                  {...methods.register('chiefComplaint')}
                />
              </div>
            ) : null}

            {createConsultationMutation.error ? (
              <p className="text-sm text-danger" role="alert">
                {createConsultationMutation.error.message}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <Button
                disabled={step === 1 || createConsultationMutation.isPending}
                onClick={() => setStep((current) => Math.max(current - 1, 1))}
                type="button"
                variant="ghost"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {step < 4 ? (
                <Button
                  onClick={async () => {
                    if (step === 2 && !physicianName) {
                      methods.setError('physicianName', {
                        message: 'Select a physician',
                        type: 'manual'
                      })
                      return
                    }

                    if (step === 3 && !methods.getValues('scheduledAt')) {
                      methods.setError('scheduledAt', {
                        message: 'Select a time slot',
                        type: 'manual'
                      })
                      return
                    }

                    setStep((current) => Math.min(current + 1, 4))
                  }}
                  type="button"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  disabled={createConsultationMutation.isPending}
                  onClick={() => void handleCreate()}
                  type="button"
                >
                  {createConsultationMutation.isPending
                    ? 'Creating consultation...'
                    : 'Confirm consultation'}
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </FormProvider>
      </Card>
    </div>
  )
}
