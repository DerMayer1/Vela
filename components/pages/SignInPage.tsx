import { Clock3 } from 'lucide-react'
import { Badge } from '@/components/ui'
import { SignInForm } from '@/components/forms/auth/SignInForm'

export function SignInPage() {
  return (
    <div className="space-y-7">
      <div className="space-y-4">
        <Badge className="bg-primary-soft text-primary shadow-none" variant="default">
          Secure sign in
        </Badge>
        <div className="space-y-2.5">
          <h1 className="max-w-[10ch] font-display text-[clamp(2.8rem,4.8vw,4.2rem)] leading-[0.92] tracking-[-0.05em] text-text-primary">
            Welcome back
          </h1>
          <p className="max-w-lg text-[1.02rem] leading-7 text-text-secondary">
            Continue to your appointments, records and next care actions from one secure patient
            workspace.
          </p>
        </div>
      </div>

      <SignInForm />

      <div className="flex items-start gap-3 rounded-[20px] border border-[#e4ebf4] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] px-4 py-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-[0_10px_24px_rgba(10,24,49,0.06)]">
          <Clock3 className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            What happens next
          </p>
          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Returning patients go directly to the dashboard, where visits and profile status are
            surfaced first.
          </p>
        </div>
      </div>
    </div>
  )
}
