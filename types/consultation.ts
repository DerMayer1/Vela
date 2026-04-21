export type ConsultationStatus = 'cancelled' | 'completed' | 'in-progress' | 'scheduled'

export interface ConsultationSummary {
  chiefComplaint: string
  id: string
  notes: string | null
  physicianName: string
  prescription: string | null
  scheduledAt: string
  specialty: string
  status: ConsultationStatus
}

export interface PastConsultationCompact {
  id: string
  scheduledAt: string
  specialty: string
  status: ConsultationStatus
}

export interface ConsultationDetail extends ConsultationSummary {
  pastConsultations: PastConsultationCompact[]
  patient: {
    allergies: string[]
    chiefComplaint: string | null
    conditions: string[]
    dateOfBirth: string | null
    firstName: string
    gender: string | null
    hasRecentSurgery: boolean
    lastName: string
    medications: string[]
    phone: string | null
  }
}
