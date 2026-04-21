import Link from 'next/link'
import { BrandMark } from '@/components/layout/BrandMark'
import { buttonVariants } from '@/components/ui'

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-surface/88 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark compact href="/" />
        <div className="flex items-center gap-2">
          <Link
            className={buttonVariants({ size: 'sm', variant: 'ghost' })}
            href="/signin"
          >
            Sign in
          </Link>
          <Link
            className={buttonVariants({ size: 'sm', variant: 'primary' })}
            href="/signup"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
