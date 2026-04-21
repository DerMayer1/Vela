import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ShieldCheck
} from 'lucide-react'
import { BrandMark } from '@/components/layout/BrandMark'
import { Badge, buttonVariants } from '@/components/ui'
import { PageTransition } from '@/components/motion/PageTransition'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="page-shell relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(28,92,255,0.18),_transparent_30%),radial-gradient(circle_at_80%_0%,_rgba(18,196,162,0.16),_transparent_22%),linear-gradient(180deg,_#f4f8ff_0%,_#fbfdff_100%)]">
      <div className="absolute inset-0 app-grid opacity-30" />
      <div className="absolute left-[-8%] top-[10%] h-72 w-72 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute right-[-5%] top-[8%] h-72 w-72 rounded-full bg-accent/10 blur-[140px]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8">
        <section className="hidden flex-col justify-center gap-8 lg:flex">
          <BrandMark href="/" />

          <div className="space-y-4">
            <Badge variant="info">Secure access for virtual care</Badge>
            <h1 className="max-w-2xl font-display text-display text-text-primary">
              Every patient touchpoint should feel calm, immediate and trustworthy.
            </h1>
            <p className="max-w-xl text-body-lg text-text-secondary">
              Vela keeps identity, intake, scheduling and follow-up inside one premium flow so
              patients move forward without second-guessing the product.
            </p>
          </div>

          <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="panel-quiet rounded-[28px] p-5">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-h3 text-text-primary">Protected access</h2>
              <p className="mt-2 text-body text-text-secondary">
                Reassurance is visible before the patient even reaches the first field.
              </p>
            </div>
            <div className="panel-quiet rounded-[28px] p-5">
              <Activity className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-h3 text-text-primary">Fast orientation</h2>
              <p className="mt-2 text-body text-text-secondary">
                Clear next steps reduce hesitation during sign in and onboarding.
              </p>
            </div>
            <div className="panel-quiet rounded-[28px] p-5">
              <CalendarClock className="h-5 w-5 text-primary" />
              <h2 className="mt-4 text-h3 text-text-primary">Guided continuation</h2>
              <p className="mt-4 text-body text-text-secondary">
                Patients land in the next right action instead of a generic account page.
              </p>
            </div>
          </div>

          <div className="panel-soft max-w-2xl rounded-[30px] p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                  Care promise
                </p>
                <p className="max-w-lg text-body-lg text-text-primary">
                  Patients should feel like they entered a care platform, not a form funnel.
                </p>
              </div>
              <BadgeCheck className="h-6 w-6 shrink-0 text-accent" />
            </div>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-md flex-col gap-6">
          <Link
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary lg:hidden"
            href="/"
          >
            <ArrowRight className="h-4 w-4 rotate-180 text-primary" />
            Back to Vela Health
          </Link>
          <div className="floating-glass rounded-[32px] p-3">
            <div className="rounded-[28px] border border-white/72 bg-[linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(246,250,255,0.94))] p-6 sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
                    Patient entry
                  </p>
                  <p className="pt-1 font-display text-h3 text-text-primary">Secure portal</p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
              </div>
              <PageTransition>{children}</PageTransition>

              <div className="mt-6 rounded-[24px] border border-primary/10 bg-primary-soft/80 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Need help?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Patients continue directly to onboarding, consultation booking or their care
                  dashboard after access is confirmed.
                </p>
              </div>
            </div>
          </div>

          <Link
            className={buttonVariants({
              className: 'w-full lg:hidden',
              size: 'lg',
              variant: 'secondary'
            })}
            href="/signup"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
