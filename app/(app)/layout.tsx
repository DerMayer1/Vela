import { AppShell } from '@/components/layout/AppShell'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({
  children
}: AuthenticatedLayoutProps) {
  return <AppShell>{children}</AppShell>
}
