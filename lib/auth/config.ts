import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  session: {
    maxAge: 60 * 60 * 8,
    strategy: 'jwt',
    updateAge: 60 * 15
  },
  useSecureCookies: process.env.NODE_ENV === 'production',
  pages: {
    signIn: '/signin'
  },
  providers: [],
  trustHost: true,
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        if (user.id) {
          token.sub = user.id
        }

        if (user.email !== undefined) {
          token.email = user.email
        }

        if (user.name !== undefined) {
          token.name = user.name
        }

        token.onboardingCompleted = user.onboardingCompleted
        token.tenantId = user.tenantId
        token.tenantSlug = user.tenantSlug
      }

      if (trigger === 'update' && session?.user) {
        token.name = session.user.name ?? token.name
        token.email = session.user.email ?? token.email
        token.onboardingCompleted =
          session.user.onboardingCompleted ?? token.onboardingCompleted
        token.tenantId = session.user.tenantId || token.tenantId
        token.tenantSlug = session.user.tenantSlug || token.tenantSlug
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.email = token.email ?? session.user.email ?? ''
        session.user.id = token.sub ?? ''

        if (token.name !== undefined) {
          session.user.name = token.name
        }

        session.user.onboardingCompleted = Boolean(token.onboardingCompleted)
        session.user.tenantId = typeof token.tenantId === 'string' ? token.tenantId : ''
        session.user.tenantSlug =
          typeof token.tenantSlug === 'string' ? token.tenantSlug : ''
      }

      return session
    }
  }
} satisfies NextAuthConfig
