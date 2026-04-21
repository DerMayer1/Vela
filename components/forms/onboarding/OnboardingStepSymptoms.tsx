'use client'

import { useFormContext } from 'react-hook-form'
import { Button, Textarea } from '@/components/ui'
import type { OnboardingFormValues } from '@/lib/validations/onboarding'

const severityOptions: Array<OnboardingFormValues['severity']> = [
  'mild',
  'moderate',
  'severe'
]

export function OnboardingStepSymptoms() {
  const {
    formState: { errors },
    register,
    setValue,
    watch
  } = useFormContext<OnboardingFormValues>()

  const severity = watch('severity')

  return (
    <div className="space-y-6">
      <Textarea
        description="Describe the reason for this consultation clearly and directly."
        error={errors.chiefComplaint?.message}
        id="chief-complaint"
        label="Chief complaint"
        placeholder="Describe your symptoms and the reason for this consultation."
        {...register('chiefComplaint')}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex w-full flex-col gap-2" htmlFor="duration">
          <span className="text-label uppercase tracking-[0.16em] text-text-secondary">
            How long have you had these symptoms?
          </span>
          <select
            className="h-[52px] rounded-[20px] border border-border/78 bg-[linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(244,248,255,0.92))] px-4 text-body text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_10px_24px_rgba(10,24,49,0.05)] backdrop-blur-[10px] focus:border-primary/28 focus:outline-none focus:ring-4 focus:ring-primary/12"
            id="duration"
            {...register('duration')}
          >
            <option value="today">Today</option>
            <option value="2-3 days">2-3 days</option>
            <option value="1 week">1 week</option>
            <option value="2+ weeks">2+ weeks</option>
          </select>
          {errors.duration?.message ? (
            <span className="text-xs text-danger">{errors.duration.message}</span>
          ) : null}
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-label uppercase tracking-[0.16em] text-text-secondary">
            Severity
          </span>
          <div className="grid grid-cols-3 gap-2">
            {severityOptions.map((option) => (
              <Button
                key={option}
                className="w-full"
                onClick={() =>
                  setValue('severity', option, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true
                  })
                }
                type="button"
                size="sm"
                variant={severity === option ? 'primary' : 'secondary'}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Button>
            ))}
          </div>
          {errors.severity?.message ? (
            <span className="text-xs text-danger">{errors.severity.message}</span>
          ) : null}
        </div>
      </div>
    </div>
  )
}
