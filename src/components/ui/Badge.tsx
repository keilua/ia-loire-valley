import { cn } from '../../utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'magenta' | 'violet' | 'orange' | 'rose' | 'gray' | 'green'
  className?: string
}

export function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        {
          'bg-magenta/10 text-magenta': variant === 'magenta',
          'bg-violet/10 text-violet': variant === 'violet',
          'bg-orange/15 text-[#c4733a]': variant === 'orange',
          'bg-rose/15 text-[#9e4e96]': variant === 'rose',
          'bg-gray-100 text-gray-600': variant === 'gray',
          'bg-green-100 text-green-700': variant === 'green',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
