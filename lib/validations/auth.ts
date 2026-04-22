import { z } from 'zod'

const emailSchema = z
  .string()
  .trim()
  .email('Enter a valid email address')
  .max(254, 'Email address is too long')
  .transform((value) => value.toLowerCase())

const nameSchema = z
  .string()
  .trim()
  .min(2, 'This field must be at least 2 characters')
  .max(80, 'This field is too long')

const passwordSchema = z
  .string()
  .min(10, 'Password must be at least 10 characters')
  .max(128, 'Password is too long')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
  .regex(/\d/, 'Password must include at least one number')

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

export const signUpSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema
})

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>
