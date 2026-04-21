import { cn } from '@/lib/utils/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  interactive?: boolean
  padding?: 'compact' | 'default' | 'none'
}

const paddingClasses = {
  compact: 'p-5 sm:p-6',
  default: 'p-6 sm:p-7 md:p-8',
  none: 'p-0'
}

export function Card({
  children,
  className,
  interactive = false,
  padding = 'default'
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[30px] border border-border/80 bg-[linear-gradient(180deg,_rgba(255,255,255,0.94),_rgba(245,249,255,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_18px_40px_rgba(10,24,49,0.08)] backdrop-blur-[18px]',
        paddingClasses[padding],
        interactive &&
          'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_24px_48px_rgba(10,24,49,0.1)]',
        className
      )}
    >
      {children}
    </div>
  )
}
