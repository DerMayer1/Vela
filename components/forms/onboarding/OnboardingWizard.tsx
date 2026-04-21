'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button, Card, Stepper } from '@/components/ui'
import {
  onboardingDefaultValues,
  onboardingFormSchema,
  toOnboardingFormValues,
  type OnboardingFormValues
} from '@/lib/validations/onboarding'
import { useSaveOnboarding, useOnboarding } from '@/hooks/useOnboarding'
import { OnboardingStepMedicalHistory } from '@/components/forms/onboarding/OnboardingStepMedicalHistory'
import { OnboardingStepPersonalInfo } from '@/components/forms/onboarding/OnboardingStepPersonalInfo'
import { OnboardingStepSymptoms } from '@/components/forms/onboarding/OnboardingStepSymptoms'

const stepFieldMap: Array<Array<keyof OnboardingFormValues>> = [
  ['firstName', 'lastName', 'dateOfBirth', 'gender', 'phone'],
  ['chiefComplaint', 'duration', 'severity'],
  ['conditions', 'medications', 'allergies', 'hasRecentSurgery']
]

function pickStepValues(
  values: OnboardingFormValues,
  fields: Array<keyof OnboardingFormValues>
) {
  return Object.fromEntries(fields.map((field) => [field, values[field]])) as Partial<OnboardingFormValues>
}

export function OnboardingWizard() {
  const router = useRouter()
  const { data: session, update } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const { data, isLoading } = useOnboarding()
  const saveOnboardingMutation = useSaveOnboarding()
  const methods = useForm<OnboardingFormValues>({
    defaultValues: onboardingDefaultValues,
    resolver: zodResolver(onboardingFormSchema)
  })

  useEffect(() => {
    if (data) {
      methods.reset(toOnboardingFormValues(data))
    }
  }, [data, methods])

  const stepItems = useMemo(
    () => [
      { description: 'Identity and contact', label: 'Personal details' },
      { description: 'Current reason for care', label: 'Symptoms' },
      { description: 'History and risk factors', label: 'Medical history' }
    ],
    []
  )

  async function handleNext() {
    const stepFields = stepFieldMap[currentStep - 1]

    if (!stepFields) {
      return
    }

    const isValid = await methods.trigger(stepFields)

    if (!isValid) {
      return
    }

    const values = methods.getValues()

    await saveOnboardingMutation.mutateAsync({
      data: pickStepValues(values, stepFields)
    })

    setCurrentStep((previousStep) => Math.min(previousStep + 1, stepItems.length))
  }

  async function handleComplete() {
    const isValid = await methods.trigger()

    if (!isValid) {
      return
    }

    const values = methods.getValues()

    await saveOnboardingMutation.mutateAsync({
      complete: true,
      data: values
    })

    await update({
      user: {
        ...session?.user,
        onboardingCompleted: true
      }
    })

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      <SectionHeading
        description="Complete identity, symptom and medical history details so care teams receive the right context before the first visit."
        eyebrow="Onboarding"
        title="Complete your patient profile"
      />

      <Card className="space-y-8">
        <Stepper currentStep={currentStep} items={stepItems} />

        {isLoading ? (
          <div className="panel-quiet rounded-[24px] p-6 text-body text-text-secondary">
            Loading your onboarding progress...
          </div>
        ) : (
          <FormProvider {...methods}>
            <form className="space-y-8" onSubmit={methods.handleSubmit(handleComplete)}>
              {currentStep === 1 ? <OnboardingStepPersonalInfo /> : null}
              {currentStep === 2 ? <OnboardingStepSymptoms /> : null}
              {currentStep === 3 ? <OnboardingStepMedicalHistory /> : null}

              {saveOnboardingMutation.error ? (
                <p className="text-sm text-danger" role="alert">
                  {saveOnboardingMutation.error.message}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                <Button
                  disabled={currentStep === 1 || saveOnboardingMutation.isPending}
                  onClick={() => setCurrentStep((previousStep) => Math.max(previousStep - 1, 1))}
                  type="button"
                  variant="ghost"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>

                {currentStep < stepItems.length ? (
                  <Button
                    disabled={saveOnboardingMutation.isPending}
                    onClick={() => void handleNext()}
                    type="button"
                  >
                    {saveOnboardingMutation.isPending ? 'Saving...' : 'Continue'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button disabled={saveOnboardingMutation.isPending} type="submit">
                    {saveOnboardingMutation.isPending
                      ? 'Completing setup...'
                      : 'Complete setup'}
                    <Check className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        )}
      </Card>
    </div>
  )
}
