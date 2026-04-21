import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import { authConfig } from '@/lib/auth/config'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { pathname } = request.nextUrl
  const isAuthenticated = Boolean(request.auth?.user)
  const onboardingCompleted = Boolean(request.auth?.user?.onboardingCompleted)
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

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(
      new URL(onboardingCompleted ? '/dashboard' : '/onboarding', request.url)
    )
  }

  if (isAuthenticated && !onboardingCompleted && isProtectedRoute && !isOnboardingRoute) {
    return NextResponse.redirect(new URL('/onboarding', request.url))
  }

  if (isAuthenticated && onboardingCompleted && isOnboardingRoute) {
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
