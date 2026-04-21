'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { signInSchema, type SignInValues } from '@/lib/validations/auth'

export function SignInForm() {
  const router = useRouter()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)

    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    })

    if (!result || result.error) {
      setFormError('Invalid email or password')
      return
    }

    router.push('/dashboard')
    router.refresh()
  })

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input
        autoComplete="email"
        error={errors.email?.message}
        id="email"
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register('email')}
      />
      <Input
        autoComplete="current-password"
        error={errors.password?.message}
        id="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        {...register('password')}
      />

      <div className="flex items-center justify-end gap-4">
        <span className="text-sm text-text-tertiary">Need password support?</span>
      </div>

      {formError ? (
        <p className="text-sm text-danger" role="alert">
          {formError}
        </p>
      ) : null}

      <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
        {isSubmitting ? 'Signing in...' : 'Sign in'}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-sm text-text-secondary">
        Don&apos;t have an account?{' '}
        <Link className="font-medium text-primary hover:text-primary-hover" href="/signup">
          Sign up
        </Link>
      </p>
    </form>
  )
}
