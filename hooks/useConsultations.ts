'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  ConsultationDetail,
  ConsultationSummary
} from '@/types/consultation'
import type {
  CreateConsultationValues,
  UpdateConsultationValues
} from '@/lib/validations/consultation'

async function fetchConsultations() {
  const response = await fetch('/api/consultations')

  if (!response.ok) {
    throw new Error('Failed to load consultations')
  }

  const payload = (await response.json()) as { data: ConsultationSummary[] }

  return payload.data
}

async function fetchConsultation(id: string) {
  const response = await fetch(`/api/consultations/${id}`)

  if (!response.ok) {
    throw new Error('Failed to load consultation')
  }

  const payload = (await response.json()) as { data: ConsultationDetail }

  return payload.data
}

async function createConsultation(values: CreateConsultationValues) {
  const response = await fetch('/api/consultations', {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })

  if (!response.ok) {
    const payload = (await response.json()) as { error?: string }
    throw new Error(payload.error ?? 'Failed to create consultation')
  }

  const payload = (await response.json()) as { data: ConsultationSummary }

  return payload.data
}

interface UpdateConsultationPayload {
  id: string
  values: UpdateConsultationValues
}

async function updateConsultation({ id, values }: UpdateConsultationPayload) {
  const response = await fetch(`/api/consultations/${id}`, {
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })

  if (!response.ok) {
    const payload = (await response.json()) as { error?: string }
    throw new Error(payload.error ?? 'Failed to update consultation')
  }

  const payload = (await response.json()) as { data: ConsultationSummary }

  return payload.data
}

export function useConsultations() {
  return useQuery({
    queryFn: fetchConsultations,
    queryKey: ['consultations']
  })
}

export function useConsultation(id: string) {
  return useQuery({
    enabled: Boolean(id),
    queryFn: () => fetchConsultation(id),
    queryKey: ['consultation', id]
  })
}

export function useCreateConsultation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createConsultation,
    onSuccess: async (consultation) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['consultations'] }),
        queryClient.invalidateQueries({ queryKey: ['consultation', consultation.id] })
      ])
    }
  })
}

export function useUpdateConsultation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateConsultation,
    onSuccess: async (consultation) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['consultations'] }),
        queryClient.invalidateQueries({ queryKey: ['consultation', consultation.id] })
      ])
    }
  })
}
