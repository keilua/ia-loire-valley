import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, GraduationCap, ArrowRight, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useTrainings, usePlatforms } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'
import type { TrainingLevel, TrainingFormat } from '../types'

const PER_PAGE = 6

export function TrainingPage() {
  const [selectedLevel, setSelectedLevel] = useState<TrainingLevel | 'all'>('all')
  const [selectedFormat, setSelectedFormat] = useState<TrainingFormat | 'all'>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { data: trainings = [], loading, error } = useTrainings()
  const { data: platforms = [] } = usePlatforms()

  const filteredTrainings = trainings.filter(t => {
    const q = search.toLowerCase()
    return (selectedLevel === 'all' || t.level === selectedLevel) &&
      (selectedFormat === 'all' || t.format === selectedFormat) &&
      (q === '' || t.title.toLowerCase().includes(q) || t.provider.toLowerCase().includes(q))
  })

  const totalPages = Math.ceil(filteredTrainings.length / PER_PAGE)
  const pagedTrainings = filteredTrainings.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  function goToPage(p: number) {
    setPage(p)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function setFilter<T>(setter: (v: T) => void) {
    return (v: T) => { setter(v); setPage(0) }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Se former à l'IA</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Découvrez les formations et ressources adaptées à votre profil pour monter en compétence sur l'intelligence artificielle
          </p>
        </div>

        {/* Notice */}
        <Card className="p-6 mb-8 bg-linear-to-br from-blue-50 to-purple-50/30 border border-blue-200 shadow-none">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-violet" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Notre rôle : vous orienter</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                IA Loire Valley ne propose pas directement de formations. Nous vous aidons à identifier les bonnes ressources,
                organismes et parcours de formation adaptés à votre besoin, proposés par nos partenaires et plateformes externes.
              </p>
            </div>
          </div>
        </Card>

        {/* Training from DB */}
        <div className="mb-12" ref={sectionRef}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Formations disponibles</h2>

          {/* Filters */}
          <div className="flex flex-col gap-3 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une formation ou un organisme…"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(0) }}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'Débutant', 'Intermédiaire', 'Avancé'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setFilter(setSelectedLevel)(lvl)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedLevel === lvl
                      ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {lvl === 'all' ? 'Tous les niveaux' : lvl}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'En ligne', 'Présentiel', 'Mixte'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setFilter(setSelectedFormat)(fmt)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedFormat === fmt
                      ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {fmt === 'all' ? 'Tous les formats' : fmt}
                </button>
              ))}
            </div>
          </div>

          {loading ? <LoadingGrid count={6} /> : error ? <LoadingError message={error} /> : (
            <>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {pagedTrainings.map(t => {
                  const inner = (
                    <Card key={t.id} className="p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group h-full">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 group-hover:text-magenta transition-colors text-sm leading-tight flex-1 mr-2">
                          {t.title}
                        </h4>
                        {t.link && <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-magenta shrink-0 transition-colors" />}
                      </div>
                      <p className="text-xs text-violet mb-2">{t.provider}</p>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{t.objective}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-[11px] px-2 py-0.5 bg-magenta/10 text-magenta rounded-full">{t.level}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{t.format}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{t.duration}</span>
                      </div>
                    </Card>
                  )
                  return t.link
                    ? <a key={t.id} href={t.link} target="_blank" rel="noopener noreferrer">{inner}</a>
                    : <div key={t.id}>{inner}</div>
                })}
                {filteredTrainings.length === 0 && (
                  <p className="col-span-2 text-center py-8 text-gray-500">Aucune formation ne correspond à ces filtres.</p>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 0}
                    className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        page === i
                          ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                          : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages - 1}
                    className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Partners */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Plateformes recommandées</h2>
          <p className="text-gray-500 mb-6">Ressources sélectionnées certaines entièrement gratuites.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {platforms.map(p => {
              const isInternal = p.url.startsWith('/')
              const card = (
                <Card className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-magenta transition-colors">{p.name}</h3>
                        {p.free && (
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">GRATUIT</span>
                        )}
                      </div>
                      <p className="text-sm text-violet">{p.type}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600">{p.topics}</p>
                </Card>
              )
              return isInternal
                ? <Link key={p.id} to={p.url}>{card}</Link>
                : <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer">{card}</a>
            })}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 sm:p-12 bg-linear-to-br from-gray-50 to-purple-50/30 rounded-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Besoin d'aide pour choisir ?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Faites le bilan d'orientation pour recevoir des recommandations de formations personnalisées selon votre profil et vos objectifs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="lg" className="rounded-full px-8">
                  Faire le bilan d'orientation <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/experts">
                <Button size="lg" variant="outline" className="rounded-full px-8">Trouver un expert</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
