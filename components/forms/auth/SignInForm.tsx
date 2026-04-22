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
    <form className="space-y-6" onSubmit={onSubmit}>
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

      <div className="flex items-center justify-between gap-4 border-t border-[#e8edf5] pt-1">
        <span className="text-sm text-text-secondary">Need password support?</span>
        <Link
          className="text-sm font-medium text-text-primary transition hover:text-primary"
          href="/signup"
        >
          Create account
        </Link>
      </div>

      {formError ? (
        <p
          className="rounded-[18px] border border-danger/20 bg-danger/5 px-4 py-3 text-sm text-danger"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <Button
        className="w-full rounded-[18px] border-[#10294d] bg-[#10294d] text-[1.02rem] text-white shadow-[0_16px_32px_rgba(16,41,77,0.18)] hover:bg-[#0d2240] hover:shadow-[0_20px_36px_rgba(16,41,77,0.22)]"
        disabled={isSubmitting}
        size="lg"
        type="submit"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
        <ArrowRight className="h-4 w-4" />
      </Button>

      <p className="text-center text-sm leading-6 text-text-tertiary">
        Access is protected and routes you directly to your patient workspace.
      </p>
    </form>
  )
}
