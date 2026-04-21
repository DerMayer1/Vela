export type ConsultationStatus = 'cancelled' | 'completed' | 'in-progress' | 'scheduled'

export interface ConsultationSummary {
  chiefComplaint: string
  id: string
  notes: string | null
  physicianName: string
  scheduledAt: string
  specialty: string
  status: ConsultationStatus
}

export interface ConsultationDetail extends ConsultationSummary {
  patient: {
    chiefComplaint: string | null
    dateOfBirth: string | null
    firstName: string
    gender: string | null
    lastName: string
    phone: string | null
  }
}
