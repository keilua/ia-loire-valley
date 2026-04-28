import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Calendar as CalendarIcon, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useEvents } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'

const typeColors: Record<string, string> = {
  Webinaire: 'bg-magenta/20 text-magenta',
  Atelier: 'bg-violet/20 text-violet',
  Networking: 'bg-orange/20 text-orange',
  Conférence: 'bg-rose/20 text-rose',
}

const typeGradients: Record<string, string> = {
  Webinaire: 'from-magenta to-rose',
  Atelier: 'from-violet to-magenta',
  Networking: 'from-orange to-magenta',
  Conférence: 'from-rose to-violet',
}

function getGradient(type: string) {
  return typeGradients[type] ?? 'from-magenta to-violet'
}

export function AgendaPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [typeFilter, setTypeFilter] = useState('all')

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
    <Button
      size="sm"
      onClick={onClick}
      className={`rounded-full ${active ? activeClass : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-none'}`}
    >
      {label}
    </Button>
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
              {filterBtn(typeFilter === 'all', () => setTypeFilter('all'), 'Tous les types', 'bg-gray-900 text-white')}
              {filterBtn(typeFilter === 'Conférence', () => setTypeFilter('Conférence'), 'Conférences', 'bg-rose text-white')}
              {filterBtn(typeFilter === 'Atelier', () => setTypeFilter('Atelier'), 'Ateliers', 'bg-violet text-white')}
              {filterBtn(typeFilter === 'Webinaire', () => setTypeFilter('Webinaire'), 'Webinaires', 'bg-magenta text-white')}
            </div>
          </div>
        </Card>

        {loading ? <LoadingGrid count={4} /> : error ? <LoadingError message={error} /> : (
          <>
            {/* Upcoming */}
            {upcoming.length > 0 && filter !== 'past' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">À venir</h2>
                <div className="space-y-4">
                  {upcoming.map(event => (
                    <Card key={event.id} className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className={`shrink-0 w-20 h-20 rounded-xl bg-linear-to-br ${getGradient(event.type)} flex flex-col items-center justify-center text-white`}>
                          <span className="text-xs font-medium">{event.date?.split(' ')[1]}</span>
                          <span className="text-2xl font-bold">{event.date?.split(' ')[0]}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-magenta transition-colors">
                                {event.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs ${typeColors[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
                                  {event.type}
                                </span>
                                {event.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4 text-magenta" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                          </div>
                          {event.summary && <p className="text-gray-600 mb-4 leading-relaxed">{event.summary}</p>}
                          <div className="flex items-center justify-between">
                            <span />
                            {event.link && (
                              <a href={event.link} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="rounded-xl">Voir l'événement</Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            {past.length > 0 && filter !== 'upcoming' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements récents</h2>
                <div className="space-y-4">
                  {past.map(event => (
                    <Card key={event.id} className="p-6 shadow-sm opacity-75 hover:opacity-100 transition-opacity">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className={`shrink-0 w-20 h-20 rounded-xl bg-linear-to-br ${getGradient(event.type)} flex flex-col items-center justify-center text-white opacity-60`}>
                          <span className="text-xs font-medium">{event.date?.split(' ')[1]}</span>
                          <span className="text-2xl font-bold">{event.date?.split(' ')[0]}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs ${typeColors[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
                              {event.type}
                            </span>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-magenta" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          {event.summary && <p className="text-gray-600">{event.summary}</p>}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty */}
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
    </div>
  )
}
