import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import type { Event } from '../../types'
import { Badge } from '../ui/Badge'

interface EventCardProps {
  event: Event
}

const typeVariant: Record<Event['type'], 'magenta' | 'violet' | 'orange' | 'rose'> = {
  'Conférence': 'magenta',
  'Atelier': 'violet',
  'Webinaire': 'orange',
  'Networking': 'rose',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 card-shadow border border-gray-100 flex flex-col gap-3 hover:card-shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between gap-3">
        <Badge variant={typeVariant[event.type]}>{event.type}</Badge>
        {event.isPast && (
          <span className="text-xs text-gray-400 font-medium">Passé</span>
        )}
      </div>

      <h3 className="font-bold text-gray-900 text-base leading-snug">{event.title}</h3>

      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{event.summary}</p>

      <div className="flex flex-col gap-1.5 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 flex-shrink-0 text-magenta" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 flex-shrink-0 text-violet" />
          {event.location}
        </div>
      </div>

      {event.link && !event.isPast && (
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-magenta hover:text-magenta-dark transition-colors mt-auto"
        >
          S'inscrire
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  )
}
