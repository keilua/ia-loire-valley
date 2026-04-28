import { cn } from '../../utils/cn'

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label className={cn('text-sm font-medium text-gray-700', className)} {...props}>
      {children}
    </label>
  )
}
