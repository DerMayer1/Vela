import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { and, eq } from 'drizzle-orm'
import { authConfig } from '@/lib/auth/config'
import { db } from '@/lib/db'
import { patientProfiles, tenants, users } from '@/lib/db/schema'
import { verifyPassword } from '@/lib/auth/password'
import { signInSchema } from '@/lib/validations/auth'
import { resolveTenantSlugFromHost } from '@/lib/tenant/resolve'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, request) {
        const validatedCredentials = signInSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          return null
        }

        const hostHeader = request instanceof Request ? request.headers.get('host') : null
        const tenantSlug = resolveTenantSlugFromHost(hostHeader)

        const [record] = await db
          .select({
            email: users.email,
            firstName: users.firstName,
            id: users.id,
            lastName: users.lastName,
            onboardingCompleted: patientProfiles.onboardingCompleted,
            passwordHash: users.passwordHash,
            tenantId: tenants.id,
            tenantSlug: tenants.slug
          })
          .from(users)
          .innerJoin(tenants, eq(tenants.id, users.tenantId))
          .leftJoin(
            patientProfiles,
            and(eq(patientProfiles.userId, users.id), eq(patientProfiles.tenantId, users.tenantId))
          )
          .where(
            and(
              eq(users.email, validatedCredentials.data.email),
              eq(tenants.slug, tenantSlug)
            )
          )
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
          onboardingCompleted: record.onboardingCompleted ?? false,
          tenantId: record.tenantId,
          tenantSlug: record.tenantSlug
        }
      }
    })
  ]
})
