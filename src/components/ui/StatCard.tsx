import type { Stat } from '../../types'

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="text-center px-6 py-4">
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-1">
        {stat.value}
      </div>
      <div className="text-base font-semibold text-gray-800">{stat.label}</div>
      {stat.description && (
        <div className="text-sm text-gray-500 mt-0.5">{stat.description}</div>
      )}
    </div>
  )
}
