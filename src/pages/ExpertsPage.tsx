import { useState, lazy, Suspense, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, Mail, Building2, Users, Filter, Phone, ChevronDown } from 'lucide-react'
import { formatPhone } from '../utils/formatPhone'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useExperts, useAmbassadeurs } from '../hooks/useData'
import { geocode, getGeoCity } from '../services/geocodingService'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'
import { ExpertModal } from '../components/experts/ExpertModal'
import type { Expert, Ambassadeur } from '../types'

const InteractiveMap = lazy(() => import('../components/map/InteractiveMap').then(m => ({ default: m.InteractiveMap })))

const levelColors: Record<string, string> = {
  Conseil: 'bg-magenta/10 text-magenta',
  Accompagnement: 'bg-violet/10 text-violet',
  Formation: 'bg-orange/10 text-orange',
  Développement: 'bg-rose/10 text-rose',
}

const secteurColors: Record<string, string> = {
  INDUSTRIE: 'bg-orange/10 text-orange',
  SANTE: 'bg-rose/10 text-rose',
  AGRICULTURE: 'bg-green-100 text-green-700',
  EDUCATION: 'bg-blue-100 text-blue-700',
}

type Tab = 'experts' | 'ambassadeurs'

export function ExpertsPage() {
  const [tab, setTab] = useState<Tab>('experts')
  const [search, setSearch] = useState('')
  const [selectedModal, setSelectedModal] = useState<Expert | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedVille, setSelectedVille] = useState<string | null>(null)

  const { data: experts = [], loading: loadingExperts, error: errorExperts } = useExperts()
  const { data: ambassadeurs = [], loading: loadingAmb, error: errorAmb } = useAmbassadeurs()
  const [villeMap, setVilleMap] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    if (ambassadeurs.length === 0) return
    let cancelled = false

    async function enrichVilles() {
      for (const amb of ambassadeurs) {
        if (cancelled) break
        // Geocode if not cached yet (returns instantly if already cached)
        if (getGeoCity(amb.organisation) === undefined) {
          await geocode(amb.organisation)
        }
        if (cancelled) break
        const city = getGeoCity(amb.organisation)
        if (city) {
          setVilleMap(prev => {
            if (prev.get(amb.id) === city) return prev
            const next = new Map(prev)
            next.set(amb.id, city)
            return next
          })
        }
      }
    }

    enrichVilles()
    return () => { cancelled = true }
  }, [ambassadeurs])

  const availableVilles = useMemo(
    () => [...new Set(experts.map(e => e.location).filter(Boolean))].sort(),
    [experts]
  )
  const LEVELS = ['Conseil', 'Accompagnement', 'Formation', 'Développement'] as const
  const activeFilterCount = (selectedLevel ? 1 : 0) + (selectedVille ? 1 : 0)

  const filteredExperts = useMemo(() => {
    const q = search.toLowerCase()
    const seen = new Set<string>()
    return experts.filter(e => {
      if (seen.has(e.id)) return false
      seen.add(e.id)
      if (selectedLevel && e.level !== selectedLevel) return false
      if (selectedVille && e.location !== selectedVille) return false
      return q === '' ||
        e.name.toLowerCase().includes(q) ||
        e.specialty.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.sectors.some(s => s.toLowerCase().includes(q))
    })
  }, [experts, search, selectedLevel, selectedVille])

  const filteredAmb = useMemo(() => {
    const q = search.toLowerCase()
    const seen = new Set<string>()
    return ambassadeurs.filter(a => {
      if (seen.has(a.id)) return false
      seen.add(a.id)
      return q === '' ||
        a.nom.toLowerCase().includes(q) ||
        a.prenom.toLowerCase().includes(q) ||
        a.organisation.toLowerCase().includes(q) ||
        (a.secteur ?? '').toLowerCase().includes(q) ||
        (villeMap.get(a.id) ?? '').toLowerCase().includes(q)
    })
  }, [ambassadeurs, search, villeMap])

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="sm:hidden">Annuaire IA<br />Centre-Val de Loire</span>
            <span className="hidden sm:inline">Annuaire IA Centre-Val de Loire</span>
          </h1>
          <p className="text-lg text-gray-600 sm:whitespace-nowrap">
            Trouvez les experts IA et les ambassadeurs du programme national{' '}
            <a
              href="https://www.entreprises.gouv.fr/la-dge/actualites/osez-lia-le-plan-pour-diffuser-lia-dans-toutes-les-entreprises"
              target="_blank"
              rel="noopener noreferrer"
              className="text-magenta hover:underline font-medium"
            >«&nbsp;Osez l'IA&nbsp;»</a>
            {' '}dans votre région.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-8 p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => { setTab('experts'); setSearch(''); setSelectedLevel(null); setSelectedVille(null); setFiltersOpen(false) }}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              tab === 'experts'
                ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0 hidden sm:block" />
            <span>Experts IA</span>
            {experts.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 hidden sm:inline ${tab === 'experts' ? 'bg-white/20' : 'bg-gray-100'}`}>
                {experts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('ambassadeurs'); setSearch(''); setSelectedLevel(null); setSelectedVille(null); setFiltersOpen(false) }}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              tab === 'ambassadeurs'
                ? 'bg-linear-to-r from-violet to-magenta text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 shrink-0 hidden sm:block" />
            <span>Ambassadeurs</span>
            {ambassadeurs.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 hidden sm:inline ${tab === 'ambassadeurs' ? 'bg-white/20' : 'bg-gray-100'}`}>
                {ambassadeurs.length}
              </span>
            )}
          </button>
        </div>

        {/* Map — between tabs and search */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm">Chargement de la carte…</div>}>
            {tab === 'experts'
              ? <InteractiveMap key="experts" experts={filteredExperts} onExpertClick={id => { const e = experts.find(x => x.id === id); if (e) setSelectedModal(e) }} />
              : <InteractiveMap key="ambassadeurs" ambassadeurs={filteredAmb} />
            }
          </Suspense>
        </div>

        {/* Search + Filters */}
        <Card className="p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={tab === 'experts' ? 'Rechercher par nom, spécialité, ville…' : 'Rechercher par nom, organisation, ville…'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
              />
            </div>
            {tab === 'experts' && (
              <button
                onClick={() => setFiltersOpen(v => !v)}
                className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                  filtersOpen || activeFilterCount > 0
                    ? 'border-magenta text-magenta bg-magenta/5'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filtres</span>
                {activeFilterCount > 0 && (
                  <span className="bg-magenta text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* Expanded filter panel — experts only */}
          {tab === 'experts' && filtersOpen && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-4">
              {/* Niveau */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Niveau</p>
                <div className="flex flex-wrap gap-1.5">
                  {LEVELS.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                        selectedLevel === level
                          ? levelColors[level]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ville */}
              {availableVilles.length > 1 && (
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Ville</p>
                  <div className="flex flex-wrap gap-1.5">
                    {availableVilles.map(ville => (
                      <button
                        key={ville}
                        onClick={() => setSelectedVille(selectedVille === ville ? null : ville)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                          selectedVille === ville
                            ? 'bg-violet/10 text-violet'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {ville}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setSelectedLevel(null); setSelectedVille(null) }}
                  className="text-xs text-magenta hover:underline self-start"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          )}
        </Card>

        {/* ── EXPERTS TAB ── */}
        {tab === 'experts' && (
          <>
            {loadingExperts ? <LoadingGrid count={6} variant="expert" /> : errorExperts ? <LoadingError message={errorExperts} /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredExperts.map(expert => (
                  <ExpertCard key={expert.id} expert={expert} onClick={() => setSelectedModal(expert)} />
                ))}
                {filteredExperts.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    Aucun expert trouvé pour « {search} »
                  </div>
                )}
              </div>
            )}

            <Card className="p-6 bg-linear-to-br from-violet/5 to-magenta/5 border border-violet/10 shadow-none">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Vous êtes expert IA en Centre-Val de Loire ?</h3>
                  <p className="text-sm text-gray-600">Rejoignez l'annuaire et rendez-vous visible auprès des entreprises de la région.</p>
                </div>
                <Link to="/experts/register">
                  <Button className="rounded-xl shrink-0">Rejoindre l'annuaire</Button>
                </Link>
              </div>
            </Card>
          </>
        )}

        {/* ── AMBASSADEURS TAB ── */}
        {tab === 'ambassadeurs' && (
          <>
            <Card className="p-4 mb-6 bg-blue-50/50 border border-blue-200 shadow-none">
              <p className="text-sm text-blue-800">
                Les ambassadeurs «&nbsp;Osez l'IA&nbsp;» sont des professionnels volontaires labellisés par l'État
                pour sensibiliser les PME et ETI à l'intelligence artificielle dans leur région.
              </p>
            </Card>

            {loadingAmb ? <LoadingGrid count={6} variant="expert" /> : errorAmb ? <LoadingError message={errorAmb} /> : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredAmb.map(amb => (
                  <AmbassadeurCard key={amb.id} ambassadeur={amb} />
                ))}
                {filteredAmb.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    Aucun ambassadeur trouvé pour « {search} »
                  </div>
                )}
              </div>
            )}

          </>
        )}

      </div>

      {selectedModal && (
        <ExpertModal expert={selectedModal} onClose={() => setSelectedModal(null)} />
      )}
    </div>
  )
}

function ExpertCard({ expert, onClick }: { expert: Expert; onClick: () => void }) {
  const initials = expert.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  return (
    <Card
      className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
          {expert.logo
            ? <img src={expert.logo} alt={expert.name} className="w-full h-full object-contain p-1.5" loading="lazy" />
            : <span className="text-lg font-bold text-gray-400">{initials}</span>
          }
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-magenta transition-colors truncate">{expert.name}</h3>
          <p className="text-sm text-violet truncate">{expert.specialty}</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />{expert.location}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${levelColors[expert.level] ?? 'bg-gray-100 text-gray-600'}`}>
          {expert.level}
        </span>
        {expert.sectors.slice(0, 2).map(s => (
          <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{s}</span>
        ))}
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 mb-3">{expert.description}</p>
      {expert.phone && (
        <a
          href={`tel:${expert.phone}`}
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1.5 text-xs text-gray-500 mb-3 w-fit sm:pointer-events-none sm:cursor-default hover:text-magenta sm:hover:text-gray-500 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />{formatPhone(expert.phone)}
        </a>
      )}
      <Button size="sm" variant="outline" className="w-full rounded-xl group-hover:border-magenta group-hover:text-magenta transition-colors mt-auto">
        Voir le profil
      </Button>
    </Card>
  )
}

function AmbassadeurCard({ ambassadeur: a }: { ambassadeur: Ambassadeur }) {
  const initials = `${a.prenom[0] ?? ''}${a.nom[0] ?? ''}`.toUpperCase()
  return (
    <Card className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet to-magenta flex items-center justify-center shrink-0">
          <span className="text-lg font-bold text-white">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 group-hover:text-violet transition-colors">
            {a.prenom} {a.nom}
          </h3>
          <p className="text-sm text-violet truncate">{a.organisation}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {a.type === 'Sectoriel' && (
          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-orange/10 text-orange">
            Sectoriel
          </span>
        )}
        {a.secteur && (
          <span className={`text-xs px-2.5 py-1 rounded-full ${secteurColors[a.secteur] ?? 'bg-gray-100 text-gray-600'}`}>
            {a.secteur}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 mt-auto">
        {a.email && (
          <a href={`mailto:${a.email}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet transition-colors w-fit">
            <Mail className="w-3.5 h-3.5 shrink-0" />{a.email}
          </a>
        )}
        {a.phone && (
          <a href={`tel:${a.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-violet transition-colors w-fit sm:pointer-events-none sm:cursor-default sm:hover:text-gray-500">
            <Phone className="w-3.5 h-3.5 shrink-0" />{formatPhone(a.phone)}
          </a>
        )}
      </div>
    </Card>
  )
}
