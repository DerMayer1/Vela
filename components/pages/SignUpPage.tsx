import { Badge, Card } from '@/components/ui'
import { SignUpForm } from '@/components/forms/auth/SignUpForm'

export function SignUpPage() {
  return (
    <Card className="backdrop-blur">
      <div className="space-y-6">
        <div className="space-y-3">
          <Badge variant="info">Get started</Badge>
          <div className="space-y-2">
            <h1 className="font-display text-h1 text-text-primary">
              Create your account
            </h1>
            <p className="text-body text-text-secondary">
              Create a patient account and continue straight into onboarding.
            </p>
          </div>
        </div>

        <SignUpForm />
      </div>
    </Card>
  )
}
