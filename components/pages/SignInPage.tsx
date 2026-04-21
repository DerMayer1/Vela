import { Badge, Card } from '@/components/ui'
import { SignInForm } from '@/components/forms/auth/SignInForm'

export function SignInPage() {
  return (
    <Card className="backdrop-blur">
      <div className="space-y-6">
        <div className="space-y-3">
          <Badge variant="default">Sign in</Badge>
          <div className="space-y-2">
            <h1 className="font-display text-h1 text-text-primary">Welcome back</h1>
            <p className="text-body text-text-secondary">
              Sign in with your Vela Health account to continue to onboarding,
              profile and consultations.
            </p>
          </div>
        </div>

        <SignInForm />
      </div>
    </Card>
  )
}
