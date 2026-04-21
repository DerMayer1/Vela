import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { eq } from 'drizzle-orm'
import { authConfig } from '@/lib/auth/config'
import { db } from '@/lib/db'
import { patientProfiles, users } from '@/lib/db/schema'
import { verifyPassword } from '@/lib/auth/password'
import { signInSchema } from '@/lib/validations/auth'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const validatedCredentials = signInSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          return null
        }

        const [record] = await db
          .select({
            email: users.email,
            firstName: users.firstName,
            id: users.id,
            lastName: users.lastName,
            onboardingCompleted: patientProfiles.onboardingCompleted,
            passwordHash: users.passwordHash
          })
          .from(users)
          .leftJoin(patientProfiles, eq(patientProfiles.userId, users.id))
          .where(eq(users.email, validatedCredentials.data.email))
          .limit(1)

        if (!record) {
          return null
        }

        const isValidPassword = await verifyPassword(
          validatedCredentials.data.password,
          record.passwordHash
        )

        if (!isValidPassword) {
          return null
        }

        return {
          email: record.email,
          id: record.id,
          name: `${record.firstName} ${record.lastName}`,
          onboardingCompleted: record.onboardingCompleted ?? false
        }
      }
    })
  ]
})
