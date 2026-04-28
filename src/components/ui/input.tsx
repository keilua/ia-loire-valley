import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm',
        'placeholder:text-gray-400 text-gray-900',
        'focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
})

Input.displayName = 'Input'
export { Input }
