import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Briefcase, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useExperts } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'

const avatarColors = [
  'from-magenta to-rose',
  'from-violet to-magenta',
  'from-orange to-magenta',
  'from-rose to-violet',
  'from-magenta to-violet',
  'from-violet to-rose',
]

export function ExpertsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const { data: experts = [], loading, error } = useExperts()

  const filteredExperts = experts.filter(expert => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector =
      selectedSector === 'all' ||
      expert.sectors.some(s => s.toLowerCase().includes(selectedSector.toLowerCase()))
    const matchesLocation =
      selectedLocation === 'all' || expert.location === selectedLocation

    return matchesSearch && matchesSector && matchesLocation
  })

  const locations = [...new Set(experts.map(e => e.location))].sort()

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Annuaire des experts IA</h1>
          <p className="text-lg text-gray-600">Trouvez l'expert IA qui correspond à vos besoins en Centre-Val de Loire</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Rechercher un expert…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger>
                <SelectValue placeholder="Secteur d'activité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les secteurs</SelectItem>
                <SelectItem value="industrie">Industrie</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="retail">Commerce / Retail</SelectItem>
                <SelectItem value="rh">RH / Formation</SelectItem>
                <SelectItem value="collectivite">Collectivités</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredExperts.length}</span>
            {' '}expert{filteredExperts.length > 1 ? 's' : ''} trouvé{filteredExperts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingGrid count={6} />
        ) : error ? (
          <LoadingError message={error} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert, i) => (
              <Card
                key={expert.id}
                className="p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center shrink-0 overflow-hidden`}>
                    {expert.avatar ? (
                      <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-lg font-bold">
                        {expert.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{expert.name}</h3>
                    <p className="text-sm text-violet font-medium truncate">{expert.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 text-magenta shrink-0" />
                  <span>{expert.location}</span>
                </div>

                <div className="flex items-start gap-2 mb-4">
                  <Briefcase className="w-4 h-4 text-magenta mt-0.5 shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {expert.sectors.slice(0, 3).map((sector, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">{expert.description}</p>

                {expert.email && (
                  <a href={`mailto:${expert.email}`}>
                    <Button className="w-full justify-center rounded-xl">
                      <Mail className="w-4 h-4 mr-2" />Contacter
                    </Button>
                  </a>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && !error && filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun expert trouvé</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier vos critères de recherche</p>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => { setSearchTerm(''); setSelectedSector('all'); setSelectedLocation('all') }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
