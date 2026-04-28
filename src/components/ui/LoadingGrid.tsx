interface LoadingGridProps {
  cols?: number
  count?: number
  height?: string
}

export function LoadingGrid({ cols = 3, count = 6, height = 'h-48' }: LoadingGridProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${cols} gap-5`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`bg-gray-100 rounded-2xl ${height} animate-pulse`} />
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
