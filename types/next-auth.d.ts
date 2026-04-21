import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      onboardingCompleted: boolean
      tenantId: string
      tenantSlug: string
    }
  }

  interface User {
    id: string
    onboardingCompleted: boolean
    tenantId: string
    tenantSlug: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    onboardingCompleted?: boolean
    tenantId?: string
    tenantSlug?: string
  }
}
