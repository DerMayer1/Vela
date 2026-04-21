'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  OnboardingDraftValues,
  OnboardingFormValues
} from '@/lib/validations/onboarding'

interface SaveOnboardingPayload {
  complete?: boolean
  data: Partial<OnboardingFormValues>
}

async function fetchOnboarding() {
  const response = await fetch('/api/onboarding')

  if (!response.ok) {
    throw new Error('Failed to load onboarding data')
  }

  const payload = (await response.json()) as { data: OnboardingFormValues }

  return payload.data
}

async function saveOnboarding(payload: SaveOnboardingPayload) {
  const response = await fetch('/api/onboarding', {
    body: JSON.stringify({
      ...payload.data,
      complete: payload.complete
    } satisfies OnboardingDraftValues),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })

  if (!response.ok) {
    const errorPayload = (await response.json()) as { error?: string }

    throw new Error(errorPayload.error ?? 'Failed to save onboarding')
  }

  return response.json()
}

export function useOnboarding() {
  return useQuery({
    queryFn: fetchOnboarding,
    queryKey: ['onboarding']
  })
}

export function useSaveOnboarding() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveOnboarding,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['onboarding'] }),
        queryClient.invalidateQueries({ queryKey: ['patient'] })
      ])
    }
  })
}
