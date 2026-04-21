import { z } from 'zod'

export const genderSchema = z.enum([
  'male',
  'female',
  'other',
  'prefer-not-to-say'
])

export const symptomDurationSchema = z.enum([
  'today',
  '2-3 days',
  '1 week',
  '2+ weeks'
])

export const symptomSeveritySchema = z.enum(['mild', 'moderate', 'severe'])

export const stepPersonalInfoSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use the format YYYY-MM-DD'),
  gender: genderSchema,
  phone: z.string().trim().max(30, 'Phone number is too long').or(z.literal(''))
})

export const stepSymptomsSchema = z.object({
  chiefComplaint: z
    .string()
    .trim()
    .min(10, 'Please describe your symptoms in at least 10 characters'),
  duration: symptomDurationSchema,
  severity: symptomSeveritySchema
})

export const stepMedicalHistorySchema = z.object({
  conditions: z.array(z.string().trim().min(1)).default([]),
  medications: z.array(z.string().trim().min(1)).default([]),
  allergies: z.array(z.string().trim().min(1)).default([]),
  hasRecentSurgery: z.boolean()
})

export const onboardingFormSchema = stepPersonalInfoSchema
  .merge(stepSymptomsSchema)
  .merge(stepMedicalHistorySchema)

export const onboardingDraftSchema = onboardingFormSchema
  .partial()
  .extend({ complete: z.boolean().optional() })

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>
export type OnboardingDraftValues = z.infer<typeof onboardingDraftSchema>

interface OnboardingSourceValues {
  allergies?: string[] | null
  chiefComplaint?: string | null
  conditions?: string[] | null
  dateOfBirth?: string | null
  duration?: string | null
  firstName?: string | null
  gender?: string | null
  hasRecentSurgery?: boolean | null
  lastName?: string | null
  medications?: string[] | null
  phone?: string | null
  severity?: string | null
}

export const onboardingDefaultValues: OnboardingFormValues = {
  allergies: [],
  chiefComplaint: '',
  conditions: [],
  dateOfBirth: '',
  duration: 'today',
  firstName: '',
  gender: 'prefer-not-to-say',
  hasRecentSurgery: false,
  lastName: '',
  medications: [],
  phone: '',
  severity: 'mild'
}

export function toOnboardingFormValues(
  value?: OnboardingSourceValues | null
): OnboardingFormValues {
  return {
    allergies: value?.allergies ?? [],
    chiefComplaint: value?.chiefComplaint ?? '',
    conditions: value?.conditions ?? [],
    dateOfBirth: value?.dateOfBirth ?? '',
    duration:
      value?.duration === 'today' ||
      value?.duration === '2-3 days' ||
      value?.duration === '1 week' ||
      value?.duration === '2+ weeks'
        ? value.duration
        : 'today',
    firstName: value?.firstName ?? '',
    gender:
      value?.gender === 'male' ||
      value?.gender === 'female' ||
      value?.gender === 'other' ||
      value?.gender === 'prefer-not-to-say'
        ? value.gender
        : 'prefer-not-to-say',
    hasRecentSurgery: value?.hasRecentSurgery ?? false,
    lastName: value?.lastName ?? '',
    medications: value?.medications ?? [],
    phone: value?.phone ?? '',
    severity:
      value?.severity === 'mild' ||
      value?.severity === 'moderate' ||
      value?.severity === 'severe'
        ? value.severity
        : 'mild'
  }
}
