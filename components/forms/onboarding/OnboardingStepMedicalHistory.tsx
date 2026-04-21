'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { TagInput } from '@/components/ui'
import type { OnboardingFormValues } from '@/lib/validations/onboarding'

export function OnboardingStepMedicalHistory() {
  const { control, register, watch } = useFormContext<OnboardingFormValues>()
  const hasRecentSurgery = watch('hasRecentSurgery')

  return (
    <div className="space-y-6">
      <Controller
        control={control}
        name="conditions"
        render={({ field }) => (
          <TagInput
            description="Type a condition and press Enter to add it."
            label="Current conditions"
            onChange={field.onChange}
            placeholder="Add a condition"
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="medications"
        render={({ field }) => (
          <TagInput
            description="Type a medication and press Enter to add it."
            label="Current medications"
            onChange={field.onChange}
            placeholder="Add a medication"
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="allergies"
        render={({ field }) => (
          <TagInput
            description="Type an allergy and press Enter to add it."
            label="Known allergies"
            onChange={field.onChange}
            placeholder="Add an allergy"
            value={field.value}
          />
        )}
      />

      <label className="panel-quiet flex items-center justify-between gap-4 rounded-[24px] px-4 py-4">
        <span>
          <span className="block font-medium text-text-primary">
            Recent surgery in the last 6 months
          </span>
          <span className="mt-1 block text-sm text-text-secondary">
            This helps clinicians review current risk factors quickly.
          </span>
        </span>
        <input
          checked={hasRecentSurgery}
          className="h-4 w-4 accent-primary"
          type="checkbox"
          {...register('hasRecentSurgery')}
        />
      </label>
    </div>
  )
}
