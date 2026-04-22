import { ClipboardPlus } from 'lucide-react'
import { Badge } from '@/components/ui'
import { SignUpForm } from '@/components/forms/auth/SignUpForm'

export function SignUpPage() {
  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <Badge className="bg-accent/10 text-accent shadow-none" variant="info">
          Patient onboarding
        </Badge>
        <div className="space-y-2.5">
          <h1 className="max-w-[11ch] font-display text-[clamp(2.8rem,4.8vw,4.2rem)] leading-[0.92] tracking-[-0.05em] text-text-primary">
            Create your account
          </h1>
          <p className="max-w-lg text-[1.02rem] leading-7 text-text-secondary">
            Start once, save your identity and continue directly into intake, scheduling and care
            access.
          </p>
        </div>
      </div>

      <SignUpForm />

      <div className="flex items-start gap-3 rounded-[20px] border border-[#e4ebf4] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] px-4 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-accent shadow-[0_10px_24px_rgba(10,24,49,0.06)]">
          <ClipboardPlus className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            After account creation
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            New patients continue straight into onboarding so the first consultation starts with
            better context.
          </p>
        </div>
      </div>
    </div>
  )
}
