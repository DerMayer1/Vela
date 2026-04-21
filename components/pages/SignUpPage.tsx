import { Badge, Card } from '@/components/ui'
import { SignUpForm } from '@/components/forms/auth/SignUpForm'

export function SignUpPage() {
  return (
    <Card className="border-white/80 bg-white/60 backdrop-blur-xl">
      <div className="space-y-7">
        <div className="space-y-4">
          <Badge variant="info">Patient onboarding</Badge>
          <div className="space-y-2">
            <h1 className="font-display text-h1 text-text-primary">Create your account</h1>
            <p className="text-body-lg text-text-secondary">
              Set up your profile once and continue directly into intake, scheduling and care
              access.
            </p>
          </div>
        </div>

        <SignUpForm />

        <div className="panel-quiet rounded-[24px] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Account setup
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            New patients move straight into a guided onboarding flow so clinicians receive better
            context before the first consultation.
          </p>
        </div>
      </div>
    </Card>
  )
}
