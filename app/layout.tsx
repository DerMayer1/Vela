import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import { AppProviders } from '@/components/providers/AppProviders'
import './globals.css'

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans'
})

const display = Sora({
  subsets: ['latin'],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'Vela Health',
  description: 'Patient-first telehealth platform for onboarding, scheduling and consultations'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
