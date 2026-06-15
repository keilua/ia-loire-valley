import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar as CalendarIcon, MapPin, X, Clock, ExternalLink } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useEvents } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'
import type { Event } from '../types'

const typeColors: Record<string, string> = {
  Webinaire: 'bg-magenta/20 text-magenta',
  Atelier: 'bg-violet/20 text-violet',
  Networking: 'bg-orange/20 text-orange',
  Conférence: 'bg-rose/20 text-rose',
  'Café Data': 'bg-amber-100 text-amber-700',
}

const typeGradients: Record<string, string> = {
  Webinaire: 'from-magenta to-rose',
  Atelier: 'from-violet to-magenta',
  Networking: 'from-orange to-magenta',
  Conférence: 'from-rose to-violet',
  'Café Data': 'from-amber-400 to-orange',
}

function getGradient(type: string) {
  return typeGradients[type] ?? 'from-magenta to-violet'
}

// ── Modal ──────────────────────────────────────────────────────────────────────

function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        {event.image && (
          <div className="h-52 w-full overflow-hidden rounded-t-3xl">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}
        {!event.image && (
          <div className={`h-32 w-full rounded-t-3xl bg-linear-to-br ${getGradient(event.type)} flex items-center justify-center`}>
            <CalendarIcon className="w-12 h-12 text-white/60" />
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium mb-3 ${typeColors[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
                {event.type}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Infos */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-magenta" />
              <span>{event.date}</span>
            </div>
            {(event.startTime || event.endTime) && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet" />
                <span>{event.startTime}{event.endTime ? ` – ${event.endTime}` : ''}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{event.description}</p>
          )}
          {!event.description && event.summary && (
            <p className="text-gray-700 leading-relaxed mb-6">{event.summary}</p>
          )}

          {/* CTA */}
          {event.link && (
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full px-8 w-full sm:w-auto">
                <ExternalLink className="mr-2 w-4 h-4" />
                S'inscrire
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────

export function AgendaPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selected, setSelected] = useState<Event | null>(null)

  const { data: events = [], loading, error } = useEvents()

  const filtered = events
    .filter(e => {
      if (filter === 'upcoming') return !e.isPast
      if (filter === 'past') return e.isPast
      return true
    })
    .filter(e => typeFilter === 'all' || e.type === typeFilter)

  const upcoming = filtered.filter(e => !e.isPast)
  const past = filtered.filter(e => e.isPast)

  const filterBtn = (active: boolean, onClick: () => void, label: string, activeClass = 'bg-linear-to-r from-magenta to-violet text-white') => (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
        active ? activeClass : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agenda des événements IA</h1>
          <p className="text-lg text-gray-600">
            Participez aux événements, conférences et ateliers autour de l'IA en Centre-Val de Loire
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2 flex-wrap">
              {filterBtn(filter === 'all', () => setFilter('all'), 'Tous')}
              {filterBtn(filter === 'upcoming', () => setFilter('upcoming'), 'À venir')}
              {filterBtn(filter === 'past', () => setFilter('past'), 'Récents')}
            </div>
            <div className="flex gap-2 flex-wrap sm:ml-auto">
              {filterBtn(typeFilter === 'all', () => setTypeFilter('all'), 'Tous les types')}
              {filterBtn(typeFilter === 'Conférence', () => setTypeFilter('Conférence'), 'Conférences')}
              {filterBtn(typeFilter === 'Atelier', () => setTypeFilter('Atelier'), 'Ateliers')}
              {filterBtn(typeFilter === 'Webinaire', () => setTypeFilter('Webinaire'), 'Webinaires')}
              {filterBtn(typeFilter === 'Café Data', () => setTypeFilter('Café Data'), 'Café Data')}
            </div>
          </div>
        </Card>

        {loading ? <LoadingGrid count={4} /> : error ? <LoadingError message={error} /> : (
          <>
            {/* À venir */}
            {upcoming.length > 0 && filter !== 'past' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">À venir</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcoming.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => setSelected(event)} />
                  ))}
                </div>
              </div>
            )}

            {/* Passés */}
            {past.length > 0 && filter !== 'upcoming' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements récents</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {past.map(event => (
                    <EventCard key={event.id} event={event} onClick={() => setSelected(event)} past />
                  ))}
                </div>
              </div>
            )}

            {/* Vide */}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun événement trouvé</h3>
                <p className="text-gray-600 mb-4">Modifiez vos filtres pour voir plus d'événements</p>
                <Button variant="outline" className="rounded-xl" onClick={() => { setFilter('all'); setTypeFilter('all') }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

// ── Card ───────────────────────────────────────────────────────────────────────

function EventCard({ event, onClick, past = false }: { event: Event; onClick: () => void; past?: boolean }) {
  return (
    <Card
      className={`overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group ${past ? 'opacity-70 hover:opacity-100' : ''}`}
      onClick={onClick}
    >
      {/* Image ou gradient */}
      {event.image ? (
        <div className="h-40 overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className={`h-40 bg-linear-to-br ${getGradient(event.type)} flex items-center justify-center`}>
          <CalendarIcon className="w-10 h-10 text-white/50" />
        </div>
      )}

      <div className="p-5">
        {/* Badge type */}
        <span className={`inline-block text-xs px-2.5 py-1 rounded-full font-medium mb-3 ${typeColors[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
          {event.type}
        </span>

        {/* Titre */}
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-magenta transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Date + lieu */}
        <div className="flex flex-col gap-1.5 mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-magenta shrink-0" />
            <span>{event.date}{event.startTime ? ` · ${event.startTime}${event.endTime ? `–${event.endTime}` : ''}` : ''}</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-violet shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
        </div>

        {/* Résumé */}
        {event.summary && (
          <p className="text-sm text-gray-600 line-clamp-3">{event.summary}</p>
        )}
      </div>
    </Card>
  )
}
