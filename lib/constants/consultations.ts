export interface PhysicianOption {
  bio: string
  id: string
  name: string
  rating: string
  specialty: string
  title: string
}

export interface ConsultationSlot {
  iso: string
  label: string
}

export const specialties = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Mental Health',
  'Pediatrics',
  'Orthopedics'
] as const

export const physicians: PhysicianOption[] = [
  {
    bio: 'Focused on preventive care, triage and follow-up consultations.',
    id: 'physician-general-1',
    name: 'Dr. Maya Patel',
    rating: '4.9',
    specialty: 'General Practice',
    title: 'Primary Care Physician'
  },
  {
    bio: 'Experienced in outpatient cardiovascular monitoring and lifestyle planning.',
    id: 'physician-cardio-1',
    name: 'Dr. Sarah Chen',
    rating: '4.8',
    specialty: 'Cardiology',
    title: 'Consultant Cardiologist'
  },
  {
    bio: 'Treats skin conditions, rashes and medication follow-ups.',
    id: 'physician-derm-1',
    name: 'Dr. Leo Martinez',
    rating: '4.8',
    specialty: 'Dermatology',
    title: 'Board-Certified Dermatologist'
  },
  {
    bio: 'Focuses on patient-centered virtual care with structured evaluations.',
    id: 'physician-mental-1',
    name: 'Dr. Nora Ellis',
    rating: '4.9',
    specialty: 'Mental Health',
    title: 'Clinical Psychiatrist'
  },
  {
    bio: 'Provides virtual pediatric intake and parent guidance.',
    id: 'physician-peds-1',
    name: 'Dr. Daniel Brooks',
    rating: '4.7',
    specialty: 'Pediatrics',
    title: 'Pediatric Specialist'
  },
  {
    bio: 'Supports musculoskeletal complaints and recovery follow-up.',
    id: 'physician-ortho-1',
    name: 'Dr. Aisha Turner',
    rating: '4.8',
    specialty: 'Orthopedics',
    title: 'Orthopedic Consultant'
  }
]

const slotHours = [9, 11, 14, 16] as const

export function getPhysiciansBySpecialty(specialty: string) {
  return physicians.filter((physician) => physician.specialty === specialty)
}

export function generateConsultationSlots(physicianId: string) {
  const physicianOffset = physicians.findIndex((physician) => physician.id === physicianId)
  const now = new Date()
  const startDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0, 0)
  )

  const slots: ConsultationSlot[] = []

  for (let dayOffset = 0; dayOffset < 5; dayOffset += 1) {
    for (const hour of slotHours) {
      const date = new Date(startDate)
      date.setUTCDate(startDate.getUTCDate() + dayOffset)
      date.setUTCHours(hour + Math.max(physicianOffset, 0) % 2, 0, 0, 0)

      slots.push({
        iso: date.toISOString(),
        label: date.toLocaleString('en-US', {
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          month: 'short',
          weekday: 'short'
        })
      })
    }
  }

  return slots
}
