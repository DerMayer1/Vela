import { describe, expect, it } from 'vitest'
import {
  onboardingDraftSchema,
  onboardingFormSchema,
  stepPersonalInfoSchema,
  toOnboardingFormValues
} from '@/lib/validations/onboarding'

const validPersonalInfo = {
  dateOfBirth: '1990-05-20',
  firstName: 'Jane',
  gender: 'female',
  lastName: 'Doe',
  phone: '+1 (555) 123-4567'
}

describe('stepPersonalInfoSchema', () => {
  it('accepts a valid payload', () => {
    expect(stepPersonalInfoSchema.safeParse(validPersonalInfo).success).toBe(true)
  })

  it('rejects a date of birth in the wrong format', () => {
    expect(
      stepPersonalInfoSchema.safeParse({ ...validPersonalInfo, dateOfBirth: '20/05/1990' })
        .success
    ).toBe(false)
  })

  it('rejects a date of birth in the future', () => {
    const nextYear = new Date().getUTCFullYear() + 1
    expect(
      stepPersonalInfoSchema.safeParse({
        ...validPersonalInfo,
        dateOfBirth: `${nextYear}-01-01`
      }).success
    ).toBe(false)
  })

  it('rejects a date of birth older than 120 years', () => {
    expect(
      stepPersonalInfoSchema.safeParse({ ...validPersonalInfo, dateOfBirth: '1850-01-01' })
        .success
    ).toBe(false)
  })

  it('accepts an empty phone but rejects letters', () => {
    expect(
      stepPersonalInfoSchema.safeParse({ ...validPersonalInfo, phone: '' }).success
    ).toBe(true)
    expect(
      stepPersonalInfoSchema.safeParse({ ...validPersonalInfo, phone: 'call me' }).success
    ).toBe(false)
  })
})

describe('onboardingFormSchema', () => {
  const validForm = {
    ...validPersonalInfo,
    allergies: ['penicillin'],
    chiefComplaint: 'Persistent migraines and light sensitivity',
    conditions: [],
    duration: '1 week',
    hasRecentSurgery: false,
    medications: ['ibuprofen'],
    severity: 'moderate'
  }

  it('accepts a complete valid form', () => {
    expect(onboardingFormSchema.safeParse(validForm).success).toBe(true)
  })

  it('rejects more than 25 medical history entries', () => {
    expect(
      onboardingFormSchema.safeParse({
        ...validForm,
        conditions: Array.from({ length: 26 }, (_, i) => `condition-${i}`)
      }).success
    ).toBe(false)
  })

  it('rejects an unknown severity', () => {
    expect(onboardingFormSchema.safeParse({ ...validForm, severity: 'critical' }).success).toBe(
      false
    )
  })
})

describe('onboardingDraftSchema', () => {
  it('accepts a partial draft', () => {
    expect(onboardingDraftSchema.safeParse({ firstName: 'Jane' }).success).toBe(true)
  })

  it('accepts the complete flag', () => {
    expect(onboardingDraftSchema.safeParse({ complete: true }).success).toBe(true)
  })

  it('still validates provided fields', () => {
    expect(onboardingDraftSchema.safeParse({ dateOfBirth: 'invalid' }).success).toBe(false)
  })
})

describe('toOnboardingFormValues', () => {
  it('returns defaults for null input', () => {
    const values = toOnboardingFormValues(null)
    expect(values.duration).toBe('today')
    expect(values.gender).toBe('prefer-not-to-say')
    expect(values.severity).toBe('mild')
    expect(values.conditions).toEqual([])
  })

  it('falls back to safe defaults for unknown enum values', () => {
    const values = toOnboardingFormValues({
      duration: '3 months',
      gender: 'unknown',
      severity: 'catastrophic'
    })
    expect(values.duration).toBe('today')
    expect(values.gender).toBe('prefer-not-to-say')
    expect(values.severity).toBe('mild')
  })

  it('preserves valid stored values', () => {
    const values = toOnboardingFormValues({
      chiefComplaint: 'Back pain after lifting',
      duration: '2+ weeks',
      gender: 'male',
      severity: 'severe'
    })
    expect(values.duration).toBe('2+ weeks')
    expect(values.gender).toBe('male')
    expect(values.severity).toBe('severe')
    expect(values.chiefComplaint).toBe('Back pain after lifting')
  })
})
