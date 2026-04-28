import { cn } from '../../utils/cn'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered ? 'text-center' : '', 'mb-12', className)}>
      {eyebrow && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-magenta/10 text-magenta mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-500 max-w-2xl leading-relaxed">
          {centered ? <span className="block mx-auto">{description}</span> : description}
        </p>
      )}
    </div>
  )
}
