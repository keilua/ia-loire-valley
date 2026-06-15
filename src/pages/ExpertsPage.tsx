import { useState, lazy, Suspense, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, MapPin, Mail, Building2, Users, Filter } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useExperts, useAmbassadeurs } from '../hooks/useData'
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

  const { data: experts = [], loading: loadingExperts, error: errorExperts } = useExperts()
  const { data: ambassadeurs = [], loading: loadingAmb, error: errorAmb } = useAmbassadeurs()

  const filteredExperts = useMemo(() => {
    const q = search.toLowerCase()
    const seen = new Set<string>()
    return experts.filter(e => {
      if (seen.has(e.id)) return false
      seen.add(e.id)
      return q === '' ||
        e.name.toLowerCase().includes(q) ||
        e.specialty.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.sectors.some(s => s.toLowerCase().includes(q))
    })
  }, [experts, search])

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
        (a.secteur ?? '').toLowerCase().includes(q)
    })
  }, [ambassadeurs, search])

  return (
    <div className="min-h-screen pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Annuaire IA — Centre-Val de Loire</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Trouvez les experts IA et les ambassadeurs du programme national «&nbsp;Osez l'IA&nbsp;» dans votre région.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 gap-2 mb-8 p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => { setTab('experts'); setSearch('') }}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              tab === 'experts'
                ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>Experts IA</span>
            {experts.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${tab === 'experts' ? 'bg-white/20' : 'bg-gray-100'}`}>
                {experts.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setTab('ambassadeurs'); setSearch('') }}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              tab === 'ambassadeurs'
                ? 'bg-linear-to-r from-violet to-magenta text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span className="truncate">Ambassadeurs</span>
            {ambassadeurs.length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${tab === 'ambassadeurs' ? 'bg-white/20' : 'bg-gray-100'}`}>
                {ambassadeurs.length}
              </span>
            )}
          </button>
        </div>

        {/* Map — between tabs and search */}
        <div className="mb-6">
          <Suspense fallback={<div className="h-80 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500 text-sm">Chargement de la carte…</div>}>
            {tab === 'experts'
              ? <InteractiveMap key="experts" experts={filteredExperts} />
              : <InteractiveMap key="ambassadeurs" ambassadeurs={filteredAmb} />
            }
          </Suspense>
        </div>

        {/* Search */}
        <Card className="p-4 mb-8 shadow-sm">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={tab === 'experts' ? 'Rechercher par nom, spécialité, secteur…' : 'Rechercher par nom, organisation, secteur…'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
              />
            </div>
          </div>
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
      className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group"
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
      <p className="text-xs text-gray-500 line-clamp-2 mb-4">{expert.description}</p>
      <Button size="sm" variant="outline" className="w-full rounded-xl group-hover:border-magenta group-hover:text-magenta transition-colors">
        Voir le profil
      </Button>
    </Card>
  )
}

function AmbassadeurCard({ ambassadeur: a }: { ambassadeur: Ambassadeur }) {
  const initials = `${a.prenom[0] ?? ''}${a.nom[0] ?? ''}`.toUpperCase()
  return (
    <Card className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
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
      {a.email && (
        <a href={`mailto:${a.email}`} onClick={e => e.stopPropagation()}>
          <Button size="sm" variant="outline" className="w-full rounded-xl group-hover:border-violet group-hover:text-violet transition-colors">
            <Mail className="w-3.5 h-3.5" />
            Contacter
          </Button>
        </a>
      )}
    </Card>
  )
}
