import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { Sidebar } from '@/components/layout/Sidebar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(10,110,189,0.12),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#ffffff_100%)]">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] lg:grid lg:grid-cols-[240px_1fr]">
        <Sidebar />
        <div className="flex min-h-screen min-w-0 flex-col">
          <AppHeader />
          <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">
            {children}
          </main>
          <BottomNav />
        </div>
      </div>
    </div>
  )
}
