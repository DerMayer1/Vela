import Link from 'next/link'
import {
  CalendarClock,
  ChevronRight,
  ClipboardPlus,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from 'lucide-react'
import { Badge, Card, buttonVariants } from '@/components/ui'

export function LandingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:gap-12 lg:px-8 lg:py-16">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="info">Phase 1 UI Shell</Badge>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-display text-[40px] leading-[1.05] text-text-primary sm:text-display">
              Expert care, wherever you are.
            </h1>
            <p className="max-w-2xl text-body-lg text-text-secondary">
              Connect with licensed physicians through a clean, credible and
              mobile-first experience designed for speed, privacy and clarity.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className={buttonVariants({ size: 'lg', variant: 'primary' })}
              href="/signup"
            >
              Get started free
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              className={buttonVariants({ size: 'lg', variant: 'secondary' })}
              href="/signin"
            >
              Sign in
            </Link>
          </div>
        </div>

        <Card className="overflow-hidden bg-[linear-gradient(180deg,_rgba(235,244,255,0.9),_#ffffff)]" interactive>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-label uppercase tracking-[0.16em] text-text-tertiary">
                  Consultation Preview
                </p>
                <h2 className="mt-2 text-h2 text-text-primary">
                  Calm, clinical and immediate
                </h2>
              </div>
              <span className="rounded-full bg-surface px-3 py-1 text-xs text-text-secondary shadow-sm">
                Mobile-first
              </span>
            </div>

            <div className="grid gap-3">
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                    <CalendarClock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text-tertiary">Upcoming visit</p>
                    <p className="font-medium text-text-primary">
                      Cardiology consultation
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success-light text-success">
                    <ClipboardPlus className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text-tertiary">Patient intake</p>
                    <p className="font-medium text-text-primary">
                      Clear forms, fewer steps
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-info-light text-info">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text-tertiary">Design principle</p>
                    <p className="font-medium text-text-primary">
                      Trust at first impression
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card padding="compact">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
            Patients
          </p>
          <p className="mt-3 font-display text-h2 text-text-primary">10,000+</p>
          <p className="mt-2 text-body text-text-secondary">
            Mock proof points reserved for the marketing surface.
          </p>
        </Card>
        <Card padding="compact">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
            Physicians
          </p>
          <p className="mt-3 font-display text-h2 text-text-primary">500+</p>
          <p className="mt-2 text-body text-text-secondary">
            Interface foundation prepared for multi-tenant care teams.
          </p>
        </Card>
        <Card padding="compact">
          <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">
            Wait time
          </p>
          <p className="mt-3 font-display text-h2 text-text-primary">&lt; 2 min</p>
          <p className="mt-2 text-body text-text-secondary">
            Layouts emphasize clarity and speed before feature depth.
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <Badge variant="default">How it works</Badge>
          <h2 className="font-display text-h2 text-text-primary">
            One flow, one interface, zero friction
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <Card interactive>
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-h3 text-text-primary">Create your account</h3>
            <p className="mt-3 text-body text-text-secondary">
              Patient onboarding starts with a simple, trustworthy first step.
            </p>
          </Card>
          <Card interactive>
            <Stethoscope className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-h3 text-text-primary">
              Request the right consultation
            </h3>
            <p className="mt-3 text-body text-text-secondary">
              Specialty, physician and time-slot flows are staged for Phase 2.
            </p>
          </Card>
          <Card interactive>
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-h3 text-text-primary">Review care clearly</h3>
            <p className="mt-3 text-body text-text-secondary">
              Dashboard and consultation views already share a consistent shell.
            </p>
          </Card>
        </div>
      </section>

      <section>
        <Card className="bg-primary text-text-inverse">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-label uppercase tracking-[0.16em] text-white/70">
                Start your consultation
              </p>
              <h2 className="font-display text-h2 text-text-inverse">
                Phase 1 is ready for real flows in Phase 2.
              </h2>
            </div>
            <Link
              className={buttonVariants({
                className:
                  'bg-surface text-primary hover:bg-surface-raised focus-visible:ring-white/30',
                size: 'lg'
              })}
              href="/signup"
            >
              Explore the auth shell
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
