import { MarketingHeader } from '@/components/layout/MarketingHeader'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(10,110,189,0.12),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)]">
      <MarketingHeader />
      <main>{children}</main>
    </div>
  )
}
