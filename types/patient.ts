export interface PatientSummary {
  allergies: string[]
  chiefComplaint: string | null
  conditions: string[]
  dateOfBirth: string | null
  email: string
  firstName: string
  gender: 'female' | 'male' | 'other' | 'prefer-not-to-say' | null
  hasRecentSurgery: boolean
  id: string
  lastName: string
  medications: string[]
  onboardingCompleted: boolean
  phone: string | null
  symptomDuration: string | null
  symptomSeverity: 'mild' | 'moderate' | 'severe' | null
}
