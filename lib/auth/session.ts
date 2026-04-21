import { auth } from '@/auth'

export async function requireSessionUser() {
  const session = await auth()

  if (!session?.user?.id || !session.user.tenantId || !session.user.tenantSlug) {
    return null
  }

  return session.user
}
