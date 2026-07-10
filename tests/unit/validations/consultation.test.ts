import { describe, expect, it } from 'vitest'
import {
  createConsultationSchema,
  updateConsultationSchema
} from '@/lib/validations/consultation'

const validCreate = {
  chiefComplaint: 'Persistent headaches for the past week',
  physicianName: 'Dr. Maya Patel',
  scheduledAt: '2026-08-01T14:00:00.000Z',
  specialty: 'General Practice'
}

describe('createConsultationSchema', () => {
  it('accepts a valid payload', () => {
    expect(createConsultationSchema.safeParse(validCreate).success).toBe(true)
  })

  it('rejects a chief complaint shorter than 10 characters', () => {
    expect(
      createConsultationSchema.safeParse({ ...validCreate, chiefComplaint: 'headache' }).success
    ).toBe(false)
  })

  it('rejects an invalid datetime', () => {
    expect(
      createConsultationSchema.safeParse({ ...validCreate, scheduledAt: 'tomorrow at 2pm' })
        .success
    ).toBe(false)
  })

  it('rejects an unknown specialty', () => {
    expect(
      createConsultationSchema.safeParse({ ...validCreate, specialty: 'Astrology' }).success
    ).toBe(false)
  })
})

describe('updateConsultationSchema', () => {
  it('rejects an empty update', () => {
    expect(updateConsultationSchema.safeParse({}).success).toBe(false)
  })

  it('accepts a notes-only update', () => {
    expect(updateConsultationSchema.safeParse({ notes: 'Patient improving' }).success).toBe(true)
  })

  it('accepts a status transition to completed', () => {
    expect(updateConsultationSchema.safeParse({ status: 'completed' }).success).toBe(true)
  })

  it('rejects a transition to cancelled through this schema', () => {
    expect(updateConsultationSchema.safeParse({ status: 'cancelled' }).success).toBe(false)
  })

  it('rejects notes above the size limit', () => {
    expect(updateConsultationSchema.safeParse({ notes: 'x'.repeat(5001) }).success).toBe(false)
  })
})
