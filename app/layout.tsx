import type { Metadata } from 'next'
import { AppProviders } from '@/components/providers/AppProviders'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vela Health',
  description: 'Patient-facing telehealth platform foundation'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
