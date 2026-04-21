'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

interface AppErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="panel-soft w-full rounded-[32px] p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
          Application error
        </p>
        <h1 className="mt-3 font-display text-h1 text-text-primary">
          Something went wrong while loading this page.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-body-lg text-text-secondary">
          The page hit an unexpected error. Try again, or return to the dashboard if the problem
          persists.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()} size="lg" type="button">
            Try again
          </Button>
          <a
            className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-white/88 px-6 text-body-lg font-semibold text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_12px_26px_rgba(10,24,49,0.06)]"
            href="/dashboard"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
