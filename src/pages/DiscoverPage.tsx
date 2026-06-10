import { Link } from 'react-router-dom'
import { ArrowLeft, Brain, TrendingUp, Shield, BookOpen, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'

const useCases = [
  {
    title: 'Automatisation des tâches',
    description: 'Gagnez du temps en automatisant les processus répétitifs',
    examples: ['Traitement de documents', 'Gestion emails', 'Support client'],
  },
  {
    title: 'Analyse de données',
    description: 'Prenez de meilleures décisions basées sur vos données',
    examples: ['Prévisions de ventes', 'Détection d\'anomalies', 'Optimisation'],
  },
  {
    title: 'Personnalisation',
    description: 'Offrez une expérience unique à chaque client',
    examples: ['Recommandations produits', 'Contenus adaptés', 'Parcours client'],
  },
  {
    title: 'Génération de contenu',
    description: 'Créez du contenu texte, image ou code rapidement',
    examples: ['Rédaction assistée', 'Génération d\'images', 'Code et documentation'],
  },
]

const benefits = [
  { icon: TrendingUp, title: 'Gains de productivité', description: 'Automatisez les tâches répétitives et concentrez-vous sur l\'essentiel' },
  { icon: Brain, title: 'Meilleures décisions', description: 'Analysez vos données pour identifier tendances et opportunités' },
  { icon: Sparkles, title: 'Innovation continue', description: 'Explorez de nouveaux services et modes de fonctionnement' },
  { icon: Shield, title: 'Avantage compétitif', description: 'Restez à la pointe et différenciez-vous de la concurrence' },
]

const considerations = [
  { title: 'Qualité des données', description: 'L\'IA nécessite des données fiables et bien structurées pour être efficace' },
  { title: 'Compétences', description: 'Former vos équipes est essentiel pour réussir l\'intégration de l\'IA' },
  { title: 'Éthique & conformité', description: 'Respecter les réglementations (RGPD, AI Act) et principes éthiques' },
  { title: 'Coûts & ROI', description: 'Évaluer l\'investissement nécessaire et le retour attendu' },
]

const resources = [
  { title: 'Guide : Les bases de l\'IA pour les dirigeants', type: 'PDF', duration: '15 min', color: 'from-magenta to-rose' },
  { title: 'Webinaire : IA et PME – Par où commencer ?', type: 'Vidéo', duration: '45 min', color: 'from-violet to-magenta' },
  { title: 'Étude de cas : L\'IA dans l\'industrie locale', type: 'Article', duration: '10 min', color: 'from-orange to-magenta' },
  { title: 'Lexique : Les termes clés de l\'IA', type: 'PDF', duration: '5 min', color: 'from-rose to-violet' },
]

export function DiscoverPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Découvrir l'intelligence artificielle</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Comprendre les fondamentaux de l'IA et découvrir comment cette technologie peut transformer votre entreprise
          </p>
        </div>

        {/* What is AI */}
        <Card className="p-8 mb-12 bg-linear-to-br from-white to-purple-50/30 rounded-3xl shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-magenta to-violet flex items-center justify-center shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Qu'est-ce que l'intelligence artificielle ?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                L'intelligence artificielle désigne des systèmes informatiques capables d'effectuer des tâches qui
                nécessitent normalement l'intelligence humaine : comprendre le langage, reconnaître des images,
                prendre des décisions, apprendre de l'expérience.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Aujourd'hui, l'IA est accessible aux entreprises de toutes tailles et peut être appliquée à de nombreux
                cas d'usage concrets, de l'automatisation à l'analyse prédictive en passant par la génération de contenu.
              </p>
            </div>
          </div>
        </Card>

        {/* Use Cases */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Exemples d'usages en entreprise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => (
              <Card key={i} className="p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{uc.title}</h3>
                <p className="text-gray-600 mb-4">{uc.description}</p>
                <div className="space-y-2">
                  {uc.examples.map((ex, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-magenta" />
                      <span className="text-sm text-gray-700">{ex}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Les bénéfices potentiels</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <Card key={i} className="p-6 shadow-sm text-center">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-magenta/10 to-violet/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-7 h-7 text-violet" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600">{b.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Points d'attention */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Points d'attention</h2>
          <Card className="p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-6">
              {considerations.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-orange/20 flex items-center justify-center">
                    <span className="text-orange font-bold text-sm">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ressources pédagogiques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((r, i) => (
              <Card key={i} className="p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${r.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-magenta transition-colors">{r.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{r.type}</span>
                      <span>{r.duration}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-r from-magenta to-violet rounded-3xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Prêt à passer à l'action ?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">Explorez nos services pour aller plus loin dans votre démarche IA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" variant="white" className="rounded-full px-8">
                Faire le bilan d'orientation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/experts">
              <Button size="lg" className="rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10 shadow-none">
                Trouver un expert
              </Button>
            </Link>
            <Link to="/lancer-projet">
              <Button size="lg" className="rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10 shadow-none">
                Lancer mon projet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
