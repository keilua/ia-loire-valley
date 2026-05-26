import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Target, Users, MapPin, Mail, Zap, Heart } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'

const values = [
  {
    icon: Target,
    title: 'Orientation, pas vente',
    description: 'Nous sommes un tiers de confiance neutre. Notre mission est de vous orienter vers les bons acteurs, sans intérêt commercial.',
    color: 'from-magenta to-rose',
  },
  {
    icon: MapPin,
    title: 'Ancré dans le territoire',
    description: 'Une plateforme pensée pour et par les acteurs économiques de Centre-Val de Loire, au plus proche des réalités locales.',
    color: 'from-violet to-magenta',
  },
  {
    icon: Users,
    title: 'Accessible à tous',
    description: 'Dirigeants, managers, collectivités : nous parlons à toutes les structures, quelle que soit leur maturité numérique.',
    color: 'from-orange to-magenta',
  },
  {
    icon: Heart,
    title: 'Open & collaboratif',
    description: 'La plateforme s\'enrichit avec ses utilisateurs. Experts, formateurs, porteurs de projets : rejoignez l\'écosystème.',
    color: 'from-rose to-violet',
  },
]

const partners = [
  { name: 'JCE Orléans', role: 'Porteur de projet', placeholder: true },
  { name: 'Région Centre-Val de Loire', role: 'Partenaire institutionnel', placeholder: true },
  { name: 'Digital Loire Valley', role: 'Partenaire numérique', placeholder: true },
  { name: 'CCI Centre-Val de Loire', role: 'Partenaire économique', placeholder: true },
]

const team = [
  { name: 'À compléter', role: 'Porteur de projet', placeholder: true },
  { name: 'À compléter', role: 'Coordinateur', placeholder: true },
  { name: 'À compléter', role: 'Partenaire technique', placeholder: true },
]

export function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">À propos</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            IA Loire Valley est la plateforme régionale d'orientation et d'accompagnement à l'intelligence artificielle en Centre-Val de Loire.
          </p>
        </div>

        {/* Mission */}
        <Card className="p-8 mb-10 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl gradient-brand flex items-center justify-center shrink-0">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Notre mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Face à la complexité de l'intelligence artificielle et à la multitude d'acteurs, d'offres et de dispositifs disponibles,
                les entreprises et collectivités du territoire manquent souvent d'un point d'entrée clair et de confiance.
              </p>
              <p className="text-gray-600 leading-relaxed">
                IA Loire Valley joue ce rôle d'<strong className="text-gray-800">orienteur régional</strong> : comprendre votre situation,
                identifier vos besoins, et vous connecter aux bons experts, formations et financements — sans conflit d'intérêt,
                sans démarche commerciale.
              </p>
            </div>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos engagements</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <Card key={i} className="p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${v.color} flex items-center justify-center shrink-0`}>
                    <v.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nos partenaires</h2>
          <p className="text-gray-500 mb-6">La plateforme est portée par un réseau d'acteurs institutionnels et économiques du territoire.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {partners.map((p, i) => (
              <Card key={i} className="p-5 shadow-sm text-center">
                {p.placeholder && (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Building2 className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                <p className="font-semibold text-gray-900 text-sm mb-1">{p.name}</p>
                <p className="text-xs text-gray-500">{p.role}</p>
              </Card>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Logos à venir</p>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">L'équipe</h2>
          <p className="text-gray-500 mb-6">Les personnes qui portent et animent la plateforme.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <Card key={i} className="p-5 shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-gray-300" />
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </Card>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">* Section à compléter</p>
        </div>

        {/* Contact CTA */}
        <Card className="p-8 sm:p-12 bg-linear-to-br from-gray-50 to-purple-50/30 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Rejoindre l'initiative</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Vous êtes expert IA, formateur, institution ou porteur de projet ? Contribuez à enrichir la plateforme et à développer l'écosystème IA régional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@ialoirevalley.fr">
              <Button size="lg" className="rounded-full px-8">
                <Mail className="mr-2 w-5 h-5" />Nous contacter
              </Button>
            </a>
            <Link to="/lancer-projet">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Décrire un projet <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Card>

      </div>
    </div>
  )
}

function Building2({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )
}
