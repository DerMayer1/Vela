'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { signUpSchema, type SignUpValues } from '@/lib/validations/auth'

export function SignUpForm() {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)

    const response = await fetch('/api/signup', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string }
      setFormError(payload.error ?? 'Failed to create account')
      return
    }

    const authResult = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (!authResult || authResult.error) {
      setFormError('Account created, but automatic sign in failed')
      return
    }

    router.push('/onboarding')
    router.refresh()
  })

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          error={errors.firstName?.message}
          id="first-name"
          label="First name"
          placeholder="Alex"
          {...register('firstName')}
        />
        <Input
          error={errors.lastName?.message}
          id="last-name"
          label="Last name"
          placeholder="Johnson"
          {...register('lastName')}
        />
      </div>

      <Input
        autoComplete="email"
        error={errors.email?.message}
        id="signup-email"
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register('email')}
      />
      <Input
        autoComplete="new-password"
        description="Use at least 8 characters, including a letter and a number."
        error={errors.password?.message}
        id="signup-password"
        label="Password"
        placeholder="Create a password"
        type="password"
        {...register('password')}
      />

      {formError ? (
        <p className="text-sm text-danger" role="alert">
          {formError}
        </p>
      ) : null}

      <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
        {isSubmitting ? 'Creating account...' : 'Create account'}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link className="font-medium text-primary hover:text-primary-hover" href="/signin">
          Sign in
        </Link>
      </p>
    </form>
  )
}
