import { MarketingHeader } from '@/components/layout/MarketingHeader'
import { PageTransition } from '@/components/motion/PageTransition'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="page-shell min-h-screen bg-[radial-gradient(circle_at_top,_rgba(28,92,255,0.14),_transparent_24%),radial-gradient(circle_at_80%_0%,_rgba(18,196,162,0.12),_transparent_20%),linear-gradient(180deg,_#f5f9ff_0%,_#f8fbff_100%)]">
      <MarketingHeader />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  )
}
