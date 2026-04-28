import { Search } from 'lucide-react'

interface FilterBarProps {
  search: string
  onSearchChange: (v: string) => void
  sector: string
  onSectorChange: (v: string) => void
  location: string
  onLocationChange: (v: string) => void
  level: string
  onLevelChange: (v: string) => void
  sectors: string[]
  locations: string[]
  levels: string[]
}

export function FilterBar({
  search, onSearchChange,
  sector, onSectorChange,
  location, onLocationChange,
  level, onLevelChange,
  sectors, locations, levels,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl p-4 card-shadow border border-gray-100 flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un expert..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition-colors"
          aria-label="Rechercher un expert"
        />
      </div>

      {/* Filters */}
      {[
        { value: sector, onChange: onSectorChange, options: sectors, placeholder: 'Secteur', label: 'Filtrer par secteur' },
        { value: location, onChange: onLocationChange, options: locations, placeholder: 'Ville', label: 'Filtrer par ville' },
        { value: level, onChange: onLevelChange, options: levels, placeholder: 'Type', label: 'Filtrer par type' },
      ].map(f => (
        <select
          key={f.placeholder}
          value={f.value}
          onChange={e => f.onChange(e.target.value)}
          aria-label={f.label}
          className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition-colors text-gray-700"
        >
          <option value="">{f.placeholder}</option>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ))}
    </div>
  )
}
