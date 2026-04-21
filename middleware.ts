import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { authConfig } from '@/lib/auth/config'
import { resolveTenantSlugFromHost } from '@/lib/tenant/resolve'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { pathname } = request.nextUrl
  const currentTenantSlug = resolveTenantSlugFromHost(request.headers.get('host'))
  const isAuthenticated = Boolean(request.auth?.user)
  const onboardingCompleted = Boolean(request.auth?.user?.onboardingCompleted)
  const sessionTenantSlug = request.auth?.user?.tenantSlug ?? ''
  const hasTenantMismatch =
    isAuthenticated && Boolean(sessionTenantSlug) && sessionTenantSlug !== currentTenantSlug
  const isAuthRoute = pathname === '/signin' || pathname === '/signup'
  const isOnboardingRoute = pathname.startsWith('/onboarding')
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/consultations') ||
    pathname.startsWith('/profile') ||
    isOnboardingRoute

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (hasTenantMismatch && !isAuthRoute) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (isAuthenticated && !hasTenantMismatch && isAuthRoute) {
    return NextResponse.redirect(
      new URL(onboardingCompleted ? '/dashboard' : '/onboarding', request.url)
    )
  }

  if (
    isAuthenticated &&
    !hasTenantMismatch &&
    !onboardingCompleted &&
    isProtectedRoute &&
    !isOnboardingRoute
  ) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  if (isAuthenticated && !hasTenantMismatch && onboardingCompleted && isOnboardingRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/consultations/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
    '/signin',
    '/signup'
  ]
}
