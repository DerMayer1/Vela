import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface TabItem {
  href?: string
  icon?: LucideIcon
  label: string
  value: string
}

interface TabsProps {
  activeValue: string
  className?: string
  items: TabItem[]
}

export function Tabs({ activeValue, className, items }: TabsProps) {
  return (
    <div
      className={cn(
        'inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-border bg-surface-raised p-1',
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === activeValue
        const Icon = item.icon
        const content = (
          <>
            {Icon ? <Icon className="h-4 w-4" /> : null}
            <span>{item.label}</span>
          </>
        )

        if (item.href) {
          return (
            <Link
              key={item.value}
              className={cn(
                'inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition',
                active
                  ? 'bg-surface text-text-primary shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              )}
              href={item.href}
            >
              {content}
            </Link>
          )
        }

        return (
          <span
            key={item.value}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium',
              active
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary'
            )}
          >
            {content}
          </span>
        )
      })}
    </div>
  )
}
