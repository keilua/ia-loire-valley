interface LoadingGridProps {
  cols?: number
  count?: number
  height?: string
  variant?: 'default' | 'expert'
}

function Shimmer({ className }: { className: string }) {
  return <div className={`bg-gray-200 animate-pulse rounded-lg ${className}`} />
}

function ExpertCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-start gap-4 mb-4">
        <Shimmer className="w-14 h-14 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-3/4" />
          <Shimmer className="h-3 w-1/2" />
          <Shimmer className="h-3 w-1/3" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <Shimmer className="h-6 w-20 rounded-full" />
        <Shimmer className="h-6 w-16 rounded-full" />
      </div>
      <Shimmer className="h-3 w-full mb-1.5" />
      <Shimmer className="h-3 w-4/5 mb-4" />
      <Shimmer className="h-8 w-full rounded-xl" />
    </div>
  )
}

export function LoadingGrid({ cols = 3, count = 6, height = 'h-48', variant = 'default' }: LoadingGridProps) {
  if (variant === 'expert') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-6`}>
        {Array.from({ length: count }).map((_, i) => <ExpertCardSkeleton key={i} />)}
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-5`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-gray-200 rounded-2xl ${height} animate-pulse`} />
      ))}
    </div>
  )
}

export function LoadingError({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-gray-400">
      <p className="text-base font-medium text-red-400">{message}</p>
      <p className="text-sm mt-1">Réessayez ultérieurement ou rechargez la page.</p>
    </div>
  )
}
