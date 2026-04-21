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
          type="date"
          {...register('dateOfBirth')}
        />

        <label className="flex w-full flex-col gap-2" htmlFor="gender">
          <span className="text-label uppercase tracking-[0.16em] text-text-secondary">
            Gender
          </span>
          <select
            className="h-[52px] rounded-[20px] border border-border/78 bg-[linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(244,248,255,0.92))] px-4 text-body text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_10px_24px_rgba(10,24,49,0.05)] backdrop-blur-[10px] focus:border-primary/28 focus:outline-none focus:ring-4 focus:ring-primary/12"
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
        type="tel"
        {...register('phone')}
      />
    </div>
  )
}
