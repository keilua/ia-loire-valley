import { cn } from '../../utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('rounded-2xl bg-white', className)} {...props}>
      {children}
    </div>
  )
}
