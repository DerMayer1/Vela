import { Badge, Card } from '@/components/ui'
import { SignInForm } from '@/components/forms/auth/SignInForm'

export function SignInPage() {
  return (
    <Card className="border-white/80 bg-white/60 backdrop-blur-xl">
      <div className="space-y-7">
        <div className="space-y-4">
          <Badge variant="default">Secure sign in</Badge>
          <div className="space-y-2">
            <h1 className="font-display text-h1 text-text-primary">Welcome back</h1>
            <p className="text-body-lg text-text-secondary">
              Access your appointments, records and next care actions from one trusted patient
              workspace.
            </p>
          </div>
        </div>

        <SignInForm />

        <div className="panel-quiet rounded-[24px] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            What happens next
          </p>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            Returning patients land directly in their dashboard, where upcoming visits and profile
            status are surfaced upfront.
          </p>
        </div>
      </div>
    </Card>
  )
}
