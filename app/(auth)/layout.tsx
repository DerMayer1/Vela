import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { BrandMark } from '@/components/layout/BrandMark'
import { Badge, buttonVariants } from '@/components/ui'
import { PageTransition } from '@/components/motion/PageTransition'

interface AuthLayoutProps {
  children: React.ReactNode
}

const trustPoints = [
  'Secure access to visits, records and next care actions',
  'Clear continuation into dashboard or onboarding',
  'One patient workspace across the care journey'
]

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="page-shell min-h-screen bg-[linear-gradient(180deg,_#f3f6fb_0%,_#f8fafc_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(28,92,255,0.08),_transparent_22%),radial-gradient(circle_at_100%_0%,_rgba(18,196,162,0.06),_transparent_16%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-8 flex items-center justify-between rounded-[24px] border border-white/70 bg-white/72 px-5 py-4 shadow-[0_14px_34px_rgba(10,24,49,0.05)] backdrop-blur-xl sm:px-6">
          <BrandMark href="/" />
          <Link
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-text-primary"
            href="/"
          >
            <ArrowRight className="h-4 w-4 rotate-180 text-primary" />
            Back to home
          </Link>
        </header>

        <main className="grid flex-1 items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <section className="order-2 space-y-8 lg:order-1 lg:pr-8">
            <div className="space-y-5">
              <Badge className="bg-white text-text-primary shadow-none" variant="default">
                Patient access
              </Badge>

              <div className="space-y-4">
                <h1 className="max-w-[12ch] font-display text-[clamp(3rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.05em] text-text-primary">
                  Access care without friction.
                </h1>
                <p className="max-w-xl text-[1.05rem] leading-8 text-text-secondary">
                  A calmer patient entry for visits, records and follow-up, designed to feel clear
                  before it feels fast.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#dbe4ef] bg-white/78 p-6 shadow-[0_20px_44px_rgba(10,24,49,0.06)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4 border-b border-[#ebf0f6] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Access standard
                  </p>
                  <p className="mt-2 text-[1.2rem] font-semibold text-text-primary">
                    Secure portal for patients
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-5 space-y-4">
                {trustPoints.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[18px] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f4f7fb_100%)] px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-6 text-text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="order-1 lg:order-2">
            <div className="mx-auto max-w-[620px] rounded-[34px] border border-[#d8e1ee] bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(246,249,253,0.98))] p-3 shadow-[0_28px_70px_rgba(10,24,49,0.1)]">
              <div className="rounded-[28px] border border-[#e3eaf3] bg-white">
                <div className="flex items-center justify-between border-b border-[#ebf0f6] px-6 py-5 sm:px-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                      Patient entry
                    </p>
                    <p className="mt-1 text-[1.45rem] font-semibold tracking-[-0.03em] text-text-primary">
                      Secure portal
                    </p>
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="px-6 py-7 sm:px-8 sm:py-8">
                  <PageTransition>{children}</PageTransition>
                </div>
              </div>
            </div>

            <div className="mt-4 lg:hidden">
              <Link
                className={buttonVariants({
                  className: 'w-full justify-center rounded-[18px]',
                  size: 'lg',
                  variant: 'secondary'
                })}
                href="/signup"
              >
                Create account
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
