import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Za-z]/, 'Password must include at least one letter')
  .regex(/\d/, 'Password must include at least one number')

export const signInSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export const signUpSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  password: passwordSchema
})

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
