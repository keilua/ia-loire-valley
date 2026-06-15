import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Euro, BadgeCheck, Building2, Globe, Landmark } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useAides } from '../hooks/useData'
import type { AideType } from '../types'

const typeColors: Record<string, string> = {
  national: 'from-blue-500 to-violet',
  regional: 'from-violet to-rose',
  fiscal: 'from-orange to-magenta',
  formation: 'from-magenta to-violet',
}

const typeLabels: Record<string, string> = {
  all: 'Toutes les aides',
  national: 'Nationales',
  regional: 'Régionales',
  fiscal: 'Fiscales',
  formation: 'Formation',
}

const typeIcons: Record<string, React.ElementType> = {
  national: Building2,
  regional: Landmark,
  fiscal: Euro,
  formation: BadgeCheck,
}

export function AidesPage() {
  const [activeType, setActiveType] = useState<AideType | 'all'>('all')
  const { data: aides = [] } = useAides()

  const filtered = activeType === 'all' ? aides : aides.filter(a => a.type === activeType)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aides & financements IA</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Découvrez les dispositifs publics pour financer votre projet IA : subventions, prêts, avantages fiscaux et prise en charge de formations.
          </p>
        </div>

        {/* Banner */}
        <Card className="p-6 mb-8 bg-linear-to-br from-violet/10 to-magenta/5 border border-violet/20 shadow-none">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet/20 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-violet" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Besoin d'être accompagné ?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Nos experts peuvent vous aider à identifier les aides auxquelles vous êtes éligible et à monter votre dossier.{' '}
                <Link to="/experts" className="text-magenta hover:underline font-medium">Trouver un expert →</Link>
              </p>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(typeLabels) as AideType[]).map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeType === type
                  ? 'bg-linear-to-r from-magenta to-violet text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {typeLabels[type]}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filtered.map(aide => {
            const Icon = typeIcons[aide.type] ?? Euro
            return (
              <Card key={aide.id} className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${typeColors[aide.type] ?? 'from-violet to-magenta'} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-0.5 group-hover:text-magenta transition-colors leading-tight">
                      {aide.name}
                    </h3>
                    <p className="text-sm text-violet font-medium">{aide.org}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">{aide.category}</span>
                  <span className="text-xs px-2.5 py-1 bg-magenta/10 text-magenta rounded-full font-medium">{aide.amount}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">{aide.description}</p>

                <p className="text-xs text-gray-500 mb-4">
                  <span className="font-medium">Éligibilité : </span>{aide.eligibility}
                </p>

                <a href={aide.link} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="rounded-xl w-full group-hover:border-magenta group-hover:text-magenta transition-colors">
                    En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </Card>
            )
          })}
        </div>

        {/* Annuaires */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Aller plus loin</h2>
          <p className="text-gray-500 mb-6">Annuaires et guides pour trouver d'autres aides adaptées à votre situation.</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Aides Entreprises', desc: 'Annuaire complet des aides publiques pour les entreprises françaises', url: 'https://www.aides-entreprises.fr/' },
              { name: 'France Num', desc: 'Moteur de recherche officiel des aides à la transformation numérique', url: 'https://www.francenum.gouv.fr/aides-financieres/trouver-une-aide-financiere' },
              { name: 'Les-Aides.fr', desc: 'Annuaire national de toutes les aides publiques aux entreprises', url: 'https://les-aides.fr' },
            ].map((r, i) => (
              <a key={i} href={r.url} target="_blank" rel="noopener noreferrer">
                <Card className="p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group h-full">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 group-hover:text-magenta transition-colors">{r.name}</h3>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </div>
                  <p className="text-sm text-gray-600">{r.desc}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="p-8 sm:p-12 bg-linear-to-br from-gray-50 to-purple-50/30 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vous ne savez pas par où commencer ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Faites le bilan d'orientation pour identifier les aides adaptées à votre situation et vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="rounded-full px-8">
                Faire le bilan d'orientation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/lancer-projet">
              <Button size="lg" variant="outline" className="rounded-full px-8">Décrire mon projet</Button>
            </Link>
          </div>
        </Card>

      </div>
    </div>
  )
}
