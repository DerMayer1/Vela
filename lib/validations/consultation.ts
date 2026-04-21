import { z } from 'zod'
import { specialties } from '@/lib/constants/consultations'

export const consultationStatusSchema = z.enum([
  'scheduled',
  'in-progress',
  'completed'
])

export const createConsultationSchema = z.object({
  chiefComplaint: z
    .string()
    .trim()
    .min(10, 'Please describe the reason for the consultation'),
  physicianName: z.string().trim().min(2, 'Select a physician'),
  scheduledAt: z.string().datetime('Select a valid time slot'),
  specialty: z.enum(specialties)
})

export const updateConsultationSchema = z
  .object({
    notes: z.string().trim().max(5000, 'Notes are too long').optional(),
    prescription: z.string().trim().max(5000, 'Prescription is too long').optional(),
    status: consultationStatusSchema.optional()
  })
  .refine(
    (value) =>
      value.notes !== undefined || value.prescription !== undefined || value.status !== undefined,
    {
      message: 'Provide notes, prescription, or status'
    }
  )

export const consultationNotesSchema = z.object({
  notes: z.string().trim().max(5000, 'Notes are too long')
})

export type CreateConsultationValues = z.infer<typeof createConsultationSchema>
export type UpdateConsultationValues = z.infer<typeof updateConsultationSchema>
export type ConsultationNotesValues = z.infer<typeof consultationNotesSchema>
