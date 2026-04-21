import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  className?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-16 w-16 text-lg'
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function Avatar({ className, name, size = 'md' }: AvatarProps) {
  return (
    <span
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.94),_transparent_48%),linear-gradient(135deg,_rgb(var(--color-primary-light)),_rgb(var(--color-accent-soft)))] font-semibold text-primary shadow-[0_12px_24px_rgba(10,24,49,0.08)] ring-1 ring-white/88',
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}
