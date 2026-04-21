import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/signin'
  },
  providers: [],
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
      }

      if (trigger === 'update' && session?.user) {
        token.name = session.user.name ?? token.name
        token.email = session.user.email ?? token.email
        token.onboardingCompleted =
          session.user.onboardingCompleted ?? token.onboardingCompleted
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
      }

      return session
    }
  }
} satisfies NextAuthConfig
