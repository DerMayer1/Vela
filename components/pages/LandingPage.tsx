import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  CalendarClock,
  ChevronRight,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope
} from 'lucide-react'
import { Badge, Card, buttonVariants } from '@/components/ui'

const capabilityCards = [
  {
    description:
      'Identity, consent and intake happen in one guided flow that feels fast and reassuring.',
    icon: Sparkles,
    title: 'Guided onboarding'
  },
  {
    description:
      'Scheduling, reminders and consultation access stay connected so patients never lose context.',
    icon: CalendarClock,
    title: 'Unified appointments'
  },
  {
    description:
      'Clear hierarchy and stronger trust cues make the interface feel premium instead of generic.',
    icon: ShieldCheck,
    title: 'Trust-first interface'
  }
]

const heroStats = [
  { label: 'Patient setup', value: '4 min' },
  { label: 'Care access', value: '24/7' },
  { label: 'Journey', value: 'One workspace' }
]

const experienceCards = [
  {
    copy: 'Desktop keeps primary navigation compact and readable so attention stays on care actions.',
    title: 'Navigation'
  },
  {
    copy: 'Language reads like a care service, not internal product or admin tooling.',
    title: 'Communication'
  },
  {
    copy: 'Cobalt, deep navy and clean light surfaces create authority without feeling cold.',
    title: 'Visual system'
  }
]

export function LandingPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-20 pt-8 sm:px-6 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-10">
      <section className="hero-mesh relative overflow-hidden rounded-[40px] border border-white/70 px-6 py-8 shadow-lg sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="absolute inset-0 app-grid opacity-20" />
        <div className="absolute right-[-8%] top-[8%] h-56 w-56 rounded-full bg-accent/15 blur-[110px]" />
        <div className="absolute left-[-8%] bottom-[-10%] h-64 w-64 rounded-full bg-primary/15 blur-[120px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <Badge variant="info">Built for flagship virtual care</Badge>
              <h1 className="max-w-4xl font-display text-display text-text-primary">
                Digital care that feels worthy of a global health brand.
              </h1>
              <p className="max-w-2xl text-body-lg text-text-secondary">
                Vela unifies onboarding, scheduling, consultation access and follow-up in one calm,
                premium interface built to earn patient trust from the first touch.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className={buttonVariants({
                  className:
                    'min-w-[220px] justify-between pr-4 text-white',
                  size: 'lg',
                  variant: 'primary'
                })}
                href="/signup"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                className={buttonVariants({
                  className: 'min-w-[220px] justify-center',
                  size: 'lg',
                  variant: 'secondary'
                })}
                href="/signin"
              >
                Enter portal
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div key={item.label} className="panel-quiet rounded-[26px] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    {item.label}
                  </p>
                  <p className="pt-3 font-display text-h2 text-text-primary">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Card className="dark-aurora relative overflow-hidden border-white/10 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_34%)]" />
            <div className="relative space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                    Patient journey
                  </p>
                  <h2 className="mt-2 font-display text-h2 text-white">
                    One workspace for intake, booking and live consultation access
                  </h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                  Patient-ready
                </span>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                    <CalendarClock className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="text-sm text-white/60">Next consultation</p>
                    <p className="font-medium text-white">Cardiology review at 14:30</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <HeartHandshake className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Intake quality
                  </p>
                  <p className="mt-2 text-lg leading-snug text-white">
                    Personal details, symptoms and history are captured in one guided path.
                  </p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                  <Activity className="h-5 w-5 text-accent" />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                    Care continuity
                  </p>
                  <p className="mt-2 text-lg leading-snug text-white">
                    Patients return to the exact next action instead of restarting the flow.
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.04))] p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/58">
                      Trust layer
                    </p>
                    <p className="mt-2 max-w-sm text-white/88">
                      Actions, layout and language stay reassuring even when patients are stressed
                      or short on time.
                    </p>
                  </div>
                  <ShieldCheck className="h-8 w-8 text-white/90" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]" id="platform">
        <Card className="dark-aurora border-white/10 text-white">
          <div className="space-y-5">
            <Badge className="bg-white/10 text-white" variant="default">
              Product strategy
            </Badge>
            <h2 className="max-w-xl font-display text-h2 text-white">
              Build the category leader by making digital care feel composed, human and exact.
            </h2>
            <div className="grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                Patients always see the next best action first.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                Critical context travels with the consultation.
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                Every surface should feel branded, clear and easy to trust.
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilityCards.map((card) => {
            const Icon = card.icon

            return (
              <Card key={card.title} interactive>
                <div className="space-y-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[20px] bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-h3 text-text-primary">{card.title}</h3>
                    <p className="text-body text-text-secondary">{card.description}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]" id="experience">
        <Card className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="dark-aurora flex flex-col justify-between gap-8 p-7 text-white">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/58">
                  Experience system
                </p>
                <h2 className="max-w-md font-display text-h1 text-white">
                  A care brand system that stays coherent from landing page to live visit.
                </h2>
                <p className="max-w-md text-body-lg text-white/72">
                  Strong hierarchy, calmer density and consistent actions make the product feel
                  deliberate instead of improvised.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/78">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>Gentle onboarding with better reassurance</span>
                </div>
                <div className="flex items-center gap-3 text-white/78">
                  <Activity className="h-4 w-4 text-accent" />
                  <span>Operational dashboard with cleaner emphasis</span>
                </div>
                <div className="flex items-center gap-3 text-white/78">
                  <Stethoscope className="h-4 w-4 text-accent" />
                  <span>Consultation context visible before entry</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-7 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {experienceCards.map((card) => (
                <div key={card.title} className="panel-quiet rounded-[24px] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    {card.title}
                  </p>
                  <p className="mt-3 text-body-lg leading-relaxed text-text-primary">{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]" id="outcomes">
        <Card>
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="success">Outcome driven</Badge>
              <h2 className="max-w-2xl font-display text-h2 text-text-primary">
                Patients move faster, trust the flow sooner and return to a product that feels
                built for care.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="panel-quiet rounded-[22px] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Brand</p>
                <p className="mt-3 text-lg text-text-primary">Distinctive healthtech presence</p>
              </div>
              <div className="panel-quiet rounded-[22px] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">UX</p>
                <p className="mt-3 text-lg text-text-primary">Friendlier actions and better flow</p>
              </div>
              <div className="panel-quiet rounded-[22px] p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-text-tertiary">Trust</p>
                <p className="mt-3 text-lg text-text-primary">More reassurance at every step</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="dark-aurora border-white/10 text-white">
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              <Badge className="bg-white/10 text-white" variant="default">
                Ready to launch
              </Badge>
              <h2 className="max-w-lg font-display text-h2 text-white">
                Give patients a telehealth experience that feels as advanced as the care behind it.
              </h2>
            </div>

            <Link
              className={buttonVariants({
                className:
                  'w-full justify-between rounded-[20px] bg-white px-5 text-surface-dark hover:bg-white/94 focus-visible:ring-white/30',
                size: 'lg'
              })}
              href="/signup"
            >
              Start the care journey
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
