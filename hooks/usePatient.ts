'use client'

import { useQuery } from '@tanstack/react-query'
import type { PatientSummary } from '@/types/patient'

async function fetchPatient() {
  const response = await fetch('/api/patient')

  if (!response.ok) {
    throw new Error('Failed to load patient profile')
  }

  const payload = (await response.json()) as { data: PatientSummary }

  return payload.data
}

export function usePatient() {
  return useQuery({
    queryFn: fetchPatient,
    queryKey: ['patient']
  })
}
