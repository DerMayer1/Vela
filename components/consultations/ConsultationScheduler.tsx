'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ShieldCheck,
  Stethoscope
} from 'lucide-react'
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
  const scheduledAt = methods.watch('scheduledAt')

  const availablePhysicians = useMemo(
    () => getPhysiciansBySpecialty(specialty),
    [specialty]
  )
  const activePhysician = availablePhysicians.find(
    (physician) => physician.name === physicianName
  )
  const slots = activePhysician ? generateConsultationSlots(activePhysician.id) : []

  async function handleCreate() {
    const isValid = await methods.trigger()

    if (!isValid) {
      return
    }

    const consultation = await createConsultationMutation.mutateAsync(methods.getValues())

    router.push(`/consultations/${consultation.id}`)
    router.refresh()
  }

  const footerError =
    methods.formState.errors.physicianName?.message ||
    methods.formState.errors.scheduledAt?.message ||
    createConsultationMutation.error?.message

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
      <SectionHeading
        description="Complete the scheduling flow to create a real consultation record."
        eyebrow="Consultations"
        title="New consultation"
      />

      <Card className="border-[#dbe4ef]">
        <div className="space-y-8">
          <Stepper currentStep={step} items={stepItems} />

          <FormProvider {...methods}>
            <div className="grid gap-5 xl:grid-cols-[1.28fr_0.72fr]">
              <div className="space-y-6">
                {step === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                        Select specialty
                      </p>
                      <p className="mt-2 text-[1rem] leading-7 text-text-secondary">
                        Choose the care area before selecting the clinician and available slot.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {specialties.map((specialtyOption) => {
                        const active = specialty === specialtyOption

                        return (
                          <button
                            key={specialtyOption}
                            className={`rounded-[22px] border p-5 text-left transition-all duration-300 ${
                              active
                                ? 'border-primary/40 bg-[linear-gradient(180deg,_rgba(242,247,255,0.96),_rgba(228,237,255,0.92))] shadow-[0_18px_30px_rgba(28,92,255,0.08)]'
                                : 'border-[#dbe4ef] bg-white hover:-translate-y-0.5 hover:border-border-strong'
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
                            <p className={`text-h3 ${active ? 'text-primary' : 'text-text-primary'}`}>
                              {specialtyOption}
                            </p>
                            <p className="mt-3 text-sm leading-6 text-text-secondary">
                              Structured telehealth intake for {specialtyOption.toLowerCase()}.
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                        Select clinician
                      </p>
                      <p className="mt-2 text-[1rem] leading-7 text-text-secondary">
                        Choose the physician who will conduct the visit.
                      </p>
                    </div>

                    <div className="grid gap-4 xl:grid-cols-2">
                      {availablePhysicians.map((physician) => {
                        const active = physician.name === physicianName

                        return (
                          <button
                            key={physician.id}
                            className={`rounded-[24px] border p-5 text-left transition-all duration-300 ${
                              active
                                ? 'border-primary/40 bg-[linear-gradient(180deg,_rgba(242,247,255,0.96),_rgba(228,237,255,0.92))] shadow-[0_18px_30px_rgba(28,92,255,0.08)]'
                                : 'border-[#dbe4ef] bg-white hover:-translate-y-0.5 hover:border-border-strong'
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
                            <div className="space-y-3">
                              <div>
                                <p className="text-h3 text-text-primary">{physician.name}</p>
                                <p className="mt-1 text-sm text-text-secondary">{physician.title}</p>
                              </div>
                              <p className="text-[1rem] leading-7 text-text-secondary">{physician.bio}</p>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-text-tertiary">Rating {physician.rating}</span>
                                {active ? (
                                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                                    Selected
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-primary" />
                      <p className="text-[1rem] leading-7 text-text-secondary">
                        Available slots for {activePhysician?.name}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      {slots.map((slot) => {
                        const active = scheduledAt === slot.iso

                        return (
                          <button
                            key={slot.iso}
                            className={`rounded-[20px] border px-4 py-4 text-left transition-all duration-300 ${
                              active
                                ? 'border-primary/40 bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-white shadow-[0_20px_34px_rgba(28,92,255,0.18)]'
                                : 'border-[#dbe4ef] bg-white hover:-translate-y-0.5 hover:border-border-strong'
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
                            <span className={`block text-[1rem] font-medium ${active ? 'text-white' : 'text-text-primary'}`}>
                              {slot.label}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
                    <Card className="border-[#dbe4ef] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)]" padding="compact">
                      <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                          Confirmation
                        </p>
                        <div className="space-y-3 text-[1rem] leading-7 text-text-secondary">
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
                            {scheduledAt ? new Date(scheduledAt).toLocaleString() : 'Not selected'}
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Textarea
                      description="This will be saved as the consultation chief complaint."
                      error={methods.formState.errors.chiefComplaint?.message}
                      label="Chief complaint"
                      placeholder="Describe the reason for this consultation."
                      {...methods.register('chiefComplaint')}
                    />
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <Card className="bg-[linear-gradient(160deg,_#163257_0%,_#11284a_100%)] text-white shadow-[0_28px_60px_rgba(10,24,49,0.18)]">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <Stethoscope className="h-5 w-5 text-accent" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                          Consultation summary
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">Current selection</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                          Specialty
                        </p>
                        <p className="mt-2 text-base text-white">{specialty}</p>
                      </div>
                      <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                          Physician
                        </p>
                        <p className="mt-2 text-base text-white">{physicianName || 'Not selected yet'}</p>
                      </div>
                      <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                          Slot
                        </p>
                        <p className="mt-2 text-base text-white">
                          {scheduledAt ? new Date(scheduledAt).toLocaleString() : 'Not selected yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="border-[#dbe4ef]" padding="compact">
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Progress
                    </p>
                    <p className="text-[1rem] leading-7 text-text-secondary">
                      Finish the scheduling path to create a consultation record with clinician,
                      slot and chief complaint already attached.
                    </p>
                    <div className="flex items-center gap-2 rounded-[18px] bg-primary-soft px-4 py-3 text-sm text-text-primary">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      Review each step before confirming.
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {footerError ? (
              <p className="text-sm text-danger" role="alert">
                {footerError}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <Button
                className="rounded-[18px]"
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
                  className="rounded-[18px] text-white hover:text-white"
                  onClick={() => {
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
                  className="rounded-[18px] text-white hover:text-white"
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
          </FormProvider>
        </div>
      </Card>
    </div>
  )
}
