import Link from 'next/link'
import { ShieldCheck, Stethoscope } from 'lucide-react'
import { Badge } from '@/components/ui'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(10,110,189,0.14),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(10,110,189,0.08),transparent)]" />
      <div className="relative mx-auto grid min-h-screen max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <section className="hidden flex-col justify-center gap-8 lg:flex">
          <Link
            className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-surface/80 px-4 py-2 shadow-sm backdrop-blur"
            href="/"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-text-inverse">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-display text-h3 text-text-primary">
                Vela Health
              </span>
              <span className="block text-sm text-text-secondary">
                Clinical refinement for digital care
              </span>
            </span>
          </Link>

          <div className="space-y-4">
            <Badge variant="info">Patient experience foundation</Badge>
            <h1 className="max-w-xl font-display text-display text-text-primary">
              Trustworthy care starts with an interface that feels calm and exact.
            </h1>
            <p className="max-w-lg text-body-lg text-text-secondary">
              This auth surface is intentionally visual-first in Phase 1. Flows,
              validation and session handling arrive in Phase 2.
            </p>
          </div>

          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-h3 text-text-primary">Private by design</h2>
              <p className="mt-2 text-body text-text-secondary">
                Clean separation between shell, form primitives and future auth
                actions.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
              <Badge variant="success">Phase 1</Badge>
              <p className="mt-4 text-body text-text-secondary">
                The UI is ready for authentication wiring without reworking the
                structure.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <Link
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary lg:hidden"
            href="/"
          >
            <Stethoscope className="h-4 w-4 text-primary" />
            Back to Vela Health
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
