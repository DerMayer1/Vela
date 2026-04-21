import { cn } from '@/lib/utils/cn'

interface AvatarProps {
  className?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
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
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary-light font-medium text-primary',
        sizeClasses[size],
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}
