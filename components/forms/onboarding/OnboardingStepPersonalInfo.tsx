'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui'
import type { OnboardingFormValues } from '@/lib/validations/onboarding'

export function OnboardingStepPersonalInfo() {
  const {
    formState: { errors },
    register
  } = useFormContext<OnboardingFormValues>()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          error={errors.firstName?.message}
          id="first-name"
          label="First name"
          placeholder="Alex"
          {...register('firstName')}
        />
        <Input
          error={errors.lastName?.message}
          id="last-name"
          label="Last name"
          placeholder="Johnson"
          {...register('lastName')}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          error={errors.dateOfBirth?.message}
          id="date-of-birth"
          label="Date of birth"
          placeholder="1991-05-12"
          {...register('dateOfBirth')}
        />

        <label className="flex w-full flex-col gap-2" htmlFor="gender">
          <span className="text-label text-text-secondary">Gender</span>
          <select
            className="h-10 rounded-lg border border-border bg-surface-inset px-3 text-body text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20"
            id="gender"
            {...register('gender')}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender?.message ? (
            <span className="text-xs text-danger">{errors.gender.message}</span>
          ) : null}
        </label>
      </div>

      <Input
        error={errors.phone?.message}
        id="phone"
        label="Phone"
        placeholder="+1 (555) 018-2049"
        {...register('phone')}
      />
    </div>
  )
}
