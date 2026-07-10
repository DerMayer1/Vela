import { describe, expect, it } from 'vitest'
import { signInSchema, signUpSchema } from '@/lib/validations/auth'

const validSignUp = {
  email: 'Jane.Doe@Example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  password: 'Sup3rSecurePass'
}

describe('signUpSchema', () => {
  it('accepts a valid payload and lowercases the email', () => {
    const result = signUpSchema.parse(validSignUp)
    expect(result.email).toBe('jane.doe@example.com')
  })

  it('rejects invalid email addresses', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects passwords shorter than 10 characters', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, password: 'Sh0rtPass' }).success).toBe(false)
  })

  it('rejects passwords without an uppercase letter', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, password: 'alllower123' }).success).toBe(false)
  })

  it('rejects passwords without a lowercase letter', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, password: 'ALLUPPER123' }).success).toBe(false)
  })

  it('rejects passwords without a number', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, password: 'NoNumbersHere' }).success).toBe(
      false
    )
  })

  it('rejects single-character names', () => {
    expect(signUpSchema.safeParse({ ...validSignUp, firstName: 'J' }).success).toBe(false)
  })
})

describe('signInSchema', () => {
  it('accepts a valid payload', () => {
    expect(signInSchema.safeParse({ email: 'jane@example.com', password: 'x' }).success).toBe(true)
  })

  it('rejects an empty password', () => {
    expect(signInSchema.safeParse({ email: 'jane@example.com', password: '' }).success).toBe(false)
  })
})
