import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          {
            // Primary
            'gradient-brand text-white shadow-md hover:opacity-90 hover:shadow-lg focus-visible:ring-magenta':
              variant === 'primary',
            // Secondary
            'bg-magenta/10 text-magenta hover:bg-magenta/20 focus-visible:ring-magenta':
              variant === 'secondary',
            // Outline
            'border-2 border-magenta text-magenta hover:bg-magenta hover:text-white focus-visible:ring-magenta':
              variant === 'outline',
            // Ghost
            'text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400':
              variant === 'ghost',
            // White
            'bg-white text-magenta shadow-md hover:shadow-lg hover:bg-gray-50 focus-visible:ring-white':
              variant === 'white',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-7 py-3.5': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
export { Button }
