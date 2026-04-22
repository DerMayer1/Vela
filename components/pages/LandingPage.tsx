'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  Stethoscope
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Badge, Card, buttonVariants } from '@/components/ui'

const heroStats = [
  {
    description: 'Average patient setup',
    label: '4 min'
  },
  {
    description: 'Care access availability',
    label: '24/7'
  },
  {
    description: 'Unified patient workspace',
    label: '1 flow'
  }
]

const featureCards = [
  {
    description: 'Identity, consent and intake happen in one guided path with less hesitation.',
    icon: ClipboardCheck,
    title: 'Guided onboarding'
  },
  {
    description:
      'Scheduling, reminders and consultation entry stay connected so patients do not lose context.',
    icon: CalendarClock,
    title: 'Connected appointments'
  },
  {
    description: 'Clear hierarchy, stronger copy and safer visual cues improve confidence at every step.',
    icon: ShieldCheck,
    title: 'Trust-first interface'
  }
]

const previewItems = [
  'Upcoming consultation is visible before entry',
  'Patients continue exactly where they left off',
  'Profile, booking and records stay in one place'
]

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04
    }
  }
}

const sectionContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export function LandingPage() {
  const reduceMotion = useReducedMotion()
  const heroMotionProps = reduceMotion
    ? {}
    : {
        animate: 'show' as const,
        initial: 'hidden' as const,
        variants: heroContainer
      }
  const sectionMotionProps = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        variants: sectionContainer,
        viewport: { once: true, amount: 0.2 },
        whileInView: 'show' as const
      }
  const outcomesMotionProps = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        variants: sectionContainer,
        viewport: { once: true, amount: 0.18 },
        whileInView: 'show' as const
      }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-20 pt-8 sm:px-6 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-10">
      <motion.section
        className="hero-mesh relative overflow-hidden rounded-[36px] border border-white/70 px-6 py-8 shadow-lg sm:px-8 sm:py-10 lg:px-12 lg:py-12"
        id="platform"
        {...heroMotionProps}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(28,92,255,0.08),_transparent_24%),radial-gradient(circle_at_left_bottom,_rgba(18,196,162,0.08),_transparent_18%)]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div className="space-y-8" variants={item}>
            <div className="space-y-5">
              <Badge variant="info">Built for modern virtual care</Badge>
              <div className="space-y-4">
                <h1 className="max-w-[10ch] font-display text-[clamp(3.5rem,7vw,6.2rem)] leading-[0.9] tracking-[-0.06em] text-text-primary">
                  Care navigation patients can trust immediately.
                </h1>
                <p className="max-w-2xl text-[1.08rem] leading-8 text-text-secondary">
                  Vela brings onboarding, scheduling, consultation access and follow-up into one
                  clear patient experience with calmer hierarchy, better continuity and stronger
                  trust cues.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className={buttonVariants({
                  className:
                    'group min-w-[220px] justify-between pr-4 text-white hover:text-white',
                  size: 'lg',
                  variant: 'primary'
                })}
                href="/signup"
              >
                Start onboarding
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                className={buttonVariants({
                  className: 'min-w-[220px] justify-center hover:-translate-y-0.5',
                  size: 'lg',
                  variant: 'secondary'
                })}
                href="/signin"
              >
                Enter portal
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.description}
                  {...(reduceMotion ? {} : { whileHover: { y: -4 } })}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="rounded-[24px] border border-[#d9e3ef] bg-white/80 p-4 shadow-[0_14px_30px_rgba(10,24,49,0.05)]"
                >
                  <p className="text-[2rem] font-semibold tracking-[-0.04em] text-text-primary">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-text-secondary">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item}>
            <Card className="border-[#d8e2ef] bg-[linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(245,248,252,0.96))]">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Patient workspace
                  </p>
                  <h2 className="mt-2 max-w-md font-display text-h2 text-text-primary">
                    One place for intake, booking and consultation entry
                  </h2>
                </div>
                <span className="rounded-full border border-border/80 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
                  Ready now
                </span>
              </div>

              <div className="rounded-[28px] bg-[linear-gradient(160deg,_#163257_0%,_#10284a_100%)] p-5 text-white shadow-[0_24px_50px_rgba(10,24,49,0.22)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Stethoscope className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="text-sm text-white/62">Next consultation</p>
                    <p className="mt-1 text-lg font-medium text-white">
                      Cardiology review at 14:30
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {previewItems.map((preview, index) => (
                  <motion.div
                    key={preview}
                    className="flex items-start gap-3 rounded-[20px] border border-[#e2eaf3] bg-white px-4 py-4"
                    {...(reduceMotion
                      ? {}
                      : {
                          animate: { opacity: 1, x: 0 },
                          initial: { opacity: 0, x: 12 }
                        })}
                    transition={{
                      duration: 0.34,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.12 + index * 0.06
                    }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm leading-6 text-text-secondary">{preview}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]"
        id="experience"
        {...sectionMotionProps}
      >
        <motion.div variants={item}>
          <Card className="bg-[linear-gradient(160deg,_#163257_0%,_#11284a_100%)] text-white shadow-[0_28px_60px_rgba(10,24,49,0.2)]">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white" variant="default">
                Design direction
              </Badge>
              <h2 className="max-w-[12ch] font-display text-h2 text-white">
                Premium without becoming cold, dense or confusing.
              </h2>
              <p className="max-w-md text-body-lg text-white/74">
                The interface should feel composed, readable and calm under pressure, especially
                when patients are entering care for the first time.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                Better hierarchy for primary actions
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                Clearer distinction between content and chrome
              </div>
              <div className="rounded-[20px] border border-white/10 bg-white/8 px-4 py-3 text-white/82">
                More trustworthy buttons, forms and states
              </div>
            </div>
          </div>
          </Card>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                variants={item}
                {...(reduceMotion ? {} : { whileHover: { y: -6 } })}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="border-[#dbe4ef]" interactive>
                <div className="space-y-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-h3 text-text-primary">{card.title}</h3>
                    <p className="text-body leading-7 text-text-secondary">{card.description}</p>
                  </div>
                </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      <motion.section
        className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]"
        id="outcomes"
        {...outcomesMotionProps}
      >
        <motion.div variants={item}>
          <Card className="border-[#dbe4ef]">
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="success">Outcome driven</Badge>
              <h2 className="max-w-[16ch] font-display text-h2 text-text-primary">
                Faster entry, less hesitation and better continuity across the care journey.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[20px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Brand
                </p>
                <p className="mt-3 text-lg leading-8 text-text-primary">
                  More distinctive healthtech presence
                </p>
              </div>
              <div className="rounded-[20px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  UX
                </p>
                <p className="mt-3 text-lg leading-8 text-text-primary">
                  Friendlier actions and clearer progression
                </p>
              </div>
              <div className="rounded-[20px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                  Trust
                </p>
                <p className="mt-3 text-lg leading-8 text-text-primary">
                  More reassurance before every critical action
                </p>
              </div>
            </div>
          </div>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="bg-[linear-gradient(160deg,_#163257_0%,_#11284a_100%)] text-white shadow-[0_28px_60px_rgba(10,24,49,0.2)]">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-3">
              <Badge className="bg-white/10 text-white" variant="default">
                Ready to launch
              </Badge>
              <h2 className="max-w-[12ch] font-display text-h2 text-white">
                Give patients a telehealth experience that feels deliberate from the first click.
              </h2>
            </div>

            <Link
              className="group inline-flex h-14 w-full items-center justify-between rounded-[18px] bg-white px-5 text-[1.02rem] font-semibold tracking-[-0.01em] text-[#10294d] shadow-[0_14px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f7f9fc]"
              href="/signup"
            >
              Start the care journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          </Card>
        </motion.div>
      </motion.section>
    </div>
  )
}
