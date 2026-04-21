'use client'

interface AuthenticatedAreaErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AuthenticatedAreaError({
  error,
  reset
}: AuthenticatedAreaErrorProps) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full rounded-[32px] border border-border/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(245,249,255,0.92))] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_18px_40px_rgba(10,24,49,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
          Workspace error
        </p>
        <h1 className="mt-3 font-display text-h1 text-text-primary">
          The patient workspace could not be loaded.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-body-lg text-text-secondary">
          Try the page again. If the problem continues, one of the authenticated-area components is
          still throwing during render.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            className="inline-flex h-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,_rgb(28,92,255),_rgb(15,66,214))] px-6 text-body-lg font-semibold text-white shadow-[0_18px_32px_rgba(28,92,255,0.28)]"
            onClick={() => reset()}
            type="button"
          >
            Try again
          </button>
          <a
            className="inline-flex h-14 items-center justify-center rounded-full border border-border/80 bg-white/88 px-6 text-body-lg font-semibold text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_12px_26px_rgba(10,24,49,0.06)]"
            href="/"
          >
            Back home
          </a>
        </div>

        {error?.digest ? (
          <p className="mt-5 text-xs text-text-tertiary">Error digest: {error.digest}</p>
        ) : null}
      </div>
    </div>
  )
}
