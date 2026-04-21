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
  onValueChange?: ((value: string) => void) | undefined
}

export function Tabs({ activeValue, className, items, onValueChange }: TabsProps) {
  const hasInteractiveTabs = items.some((item) => Boolean(item.href)) || Boolean(onValueChange)

  return (
    <div
      className={cn(
        'floating-glass inline-flex max-w-full items-center gap-1.5 overflow-x-auto rounded-[22px] p-1.5',
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
                'inline-flex h-11 items-center gap-2 rounded-[18px] px-4 text-sm font-semibold transition-all duration-300',
                active
                  ? 'border border-primary-hover/80 bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_28px_rgba(28,92,255,0.24)]'
                  : 'text-text-secondary hover:bg-primary-soft hover:text-text-primary'
              )}
              href={item.href}
            >
              {content}
            </Link>
          )
        }

        return (
          <button
            key={item.value}
            className={cn(
              'inline-flex h-11 items-center gap-2 rounded-[18px] px-4 text-sm font-semibold transition-all duration-300',
              active
                ? 'border border-primary-hover/80 bg-[linear-gradient(135deg,_rgb(var(--color-primary)),_rgb(var(--color-primary-hover)))] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_28px_rgba(28,92,255,0.24)]'
                : 'text-text-secondary hover:bg-primary-soft hover:text-text-primary'
            )}
            onClick={() => onValueChange?.(item.value)}
            role={hasInteractiveTabs ? 'tab' : undefined}
            type="button"
          >
            {content}
          </button>
        )
      })}
    </div>
  )
}
