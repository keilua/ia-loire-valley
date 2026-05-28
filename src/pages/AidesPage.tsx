import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Euro, BadgeCheck, Building2, Globe, Landmark } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'

type AideType = 'all' | 'national' | 'regional' | 'fiscal' | 'formation'

const aides = [
  {
    id: '1',
    name: 'Prêt Transformation Numérique',
    org: 'BpiFrance',
    type: 'national' as AideType,
    category: 'Prêt sans garantie',
    amount: '100 000 € – 3 M€',
    eligibility: 'PME et ETI',
    description: 'Financement sans garantie pour accélérer votre transition numérique et intégrer des solutions IA dans vos processus.',
    link: 'https://www.bpifrance.fr',
    tags: ['Sans garantie', 'PME', 'ETI'],
    color: 'from-blue-500 to-violet',
  },
  {
    id: '2',
    name: 'Aide à l\'Innovation – Volet IA',
    org: 'BpiFrance',
    type: 'national' as AideType,
    category: 'Subvention + avance remboursable',
    amount: 'Jusqu\'à 600 000 €',
    eligibility: 'Startups et PME innovantes',
    description: 'Soutien aux projets d\'innovation technologique incluant l\'intelligence artificielle, via subvention et avance remboursable.',
    link: 'https://www.bpifrance.fr',
    tags: ['Innovation', 'IA', 'Startups'],
    color: 'from-magenta to-rose',
  },
  {
    id: '3',
    name: 'Crédit d\'Impôt Recherche (CIR)',
    org: 'Direction Générale des Finances',
    type: 'fiscal' as AideType,
    category: 'Avantage fiscal',
    amount: '30 % des dépenses R&D',
    eligibility: 'Toutes entreprises avec activité R&D',
    description: 'Réduction d\'impôt sur vos dépenses de recherche et développement. Applicable aux projets IA incluant une composante R&D.',
    link: 'https://www.impots.gouv.fr/professionnel/questions/puis-je-pretendre-au-credit-impot-recherche',
    tags: ['Fiscal', 'R&D', 'Toutes tailles'],
    color: 'from-violet to-magenta',
  },
  {
    id: '4',
    name: 'Crédit d\'Impôt Innovation (CII)',
    org: 'Direction Générale des Finances',
    type: 'fiscal' as AideType,
    category: 'Avantage fiscal',
    amount: '20 % des dépenses (30 % JEI)',
    eligibility: 'PME au sens européen',
    description: 'Crédit d\'impôt pour les dépenses d\'innovation hors R&D fondamentale. Couvre les premières réalisations prototypes IA.',
    link: 'https://www.impots.gouv.fr/professionnel/credit-dimpot-pour-investissements-productifs',
    tags: ['Fiscal', 'Innovation', 'PME'],
    color: 'from-orange to-magenta',
  },
  {
    id: '5',
    name: 'France 2030 – Programme IA',
    org: 'BpiFrance / État',
    type: 'national' as AideType,
    category: 'Appel à projets',
    amount: 'Variable selon AAP',
    eligibility: 'Consortiums et entreprises innovantes',
    description: 'Financement de projets stratégiques en IA dans le cadre du plan d\'investissement France 2030. Plusieurs appels à projets par an.',
    link: 'https://www.bpifrance.fr/france-2030',
    tags: ['Grands projets', 'Consortiums', 'Stratégique'],
    color: 'from-rose to-violet',
  },
  {
    id: '6',
    name: 'Aides Région Centre-Val de Loire',
    org: 'Région Centre-Val de Loire',
    type: 'regional' as AideType,
    category: 'Subvention régionale',
    amount: 'Variable selon dispositif',
    eligibility: 'Entreprises domiciliées en région CVL',
    description: 'Dispositifs régionaux pour la transformation numérique et l\'adoption de l\'IA : AMI, subventions innovation, cofinancement.',
    link: 'https://www.centre-valdeloire.fr/le-guide-des-aides-de-la-region-centre-val-de-loire',
    tags: ['Régional', 'Numérique', 'CVL'],
    color: 'from-violet to-rose',
  },
  {
    id: '7',
    name: 'FNE-Formation & OPCO',
    org: 'Ministère du Travail / OPCO',
    type: 'formation' as AideType,
    category: 'Prise en charge formation',
    amount: 'Prise en charge totale ou partielle',
    eligibility: 'Salariés de toutes entreprises',
    description: 'Financement des formations IA pour vos équipes via votre OPCO ou le FNE-Formation. Cumulable avec le CPF.',
    link: 'https://travail-emploi.gouv.fr',
    tags: ['Formation', 'Salariés', 'CPF'],
    color: 'from-magenta to-violet',
  },
  {
    id: '8',
    name: 'Horizon Europe',
    org: 'Union Européenne',
    type: 'national' as AideType,
    category: 'Programme européen',
    amount: 'Plusieurs millions €',
    eligibility: 'Consortiums européens, labos, entreprises',
    description: 'Programme-cadre européen finançant la recherche et l\'innovation, avec des appels dédiés à l\'IA responsable et aux données.',
    link: 'https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_fr',
    tags: ['Européen', 'R&D', 'Consortiums'],
    color: 'from-blue-500 to-magenta',
  },
]

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
  const [activeType, setActiveType] = useState<AideType>('all')

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
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${aide.color} flex items-center justify-center shrink-0`}>
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

        {/* CTA */}
        <Card className="p-8 sm:p-12 bg-linear-to-br from-gray-50 to-purple-50/30 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vous ne savez pas par où commencer ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Faites le diagnostic IA pour identifier les aides adaptées à votre situation et vos projets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="rounded-full px-8">
                Faire le diagnostic <ArrowRight className="ml-2 w-5 h-5" />
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
