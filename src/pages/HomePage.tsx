import { Link } from 'react-router-dom'
import {
  Lightbulb, Rocket, Users, GraduationCap,
  ArrowRight, Calendar, Newspaper, Sparkles, CheckCircle,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { useEvents } from '../hooks/useData'

const mainServices = [
  {
    icon: Lightbulb,
    title: 'Découvrir l\'IA',
    description: 'Comprenez les usages de l\'intelligence artificielle pour votre entreprise',
    color: 'from-magenta to-rose',
    path: '/decouvrir-ia',
  },
  {
    icon: Rocket,
    title: 'Lancer un projet',
    description: 'Bénéficiez d\'un accompagnement pour structurer votre projet IA',
    color: 'from-violet to-magenta',
    path: '/lancer-projet',
  },
  {
    icon: Users,
    title: 'Trouver un expert',
    description: 'Accédez à notre annuaire d\'experts IA du territoire',
    color: 'from-orange to-magenta',
    path: '/experts',
  },
  {
    icon: GraduationCap,
    title: 'Se former à l\'IA',
    description: 'Découvrez les ressources et formations adaptées à vos besoins',
    color: 'from-rose to-violet',
    path: '/se-former',
  },
]

const recentNews = [
  { category: 'IA Générative', date: '12 Avril 2026', title: 'Les nouveaux usages de l\'IA générative en entreprise' },
  { category: 'Territoire', date: '10 Avril 2026', title: 'La région Centre-Val de Loire investit dans l\'IA' },
  { category: 'Innovation', date: '8 Avril 2026', title: 'Retour sur le dernier salon IA & Tech' },
]

export function HomePage() {
  const { data: events = [] } = useEvents()
  const previewEvents = events.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-white via-purple-50/30 to-pink-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-magenta/10 to-violet/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-magenta" />
            <span className="text-sm text-violet">Votre porte d'entrée vers l'IA</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Accélérez vos projets IA<br />en Centre-Val de Loire
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Trouvez un expert, identifiez les aides disponibles ou orientez vos équipes vers les bonnes ressources
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/experts">
              <Button size="lg" className="rounded-full px-8">
                Trouver un expert <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/lancer-projet">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Démarrer mon projet
              </Button>
            </Link>
          </div>
          <Link to="/quiz" className="inline-flex items-center text-violet hover:text-magenta transition-colors">
            <span className="underline">Je ne sais pas par où commencer</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-linear-to-br from-gray-50 to-purple-50/20 shadow-lg rounded-3xl p-8 sm:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">IA Loire Valley vous aide à :</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  { color: 'bg-magenta', text: 'Comprendre les usages de l\'IA' },
                  { color: 'bg-violet', text: 'Orienter vers des experts qualifiés' },
                  { color: 'bg-orange', text: 'Identifier des aides et accompagnements' },
                  { color: 'bg-rose', text: 'Trouver des événements et ressources utiles' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center shrink-0 mt-1`}>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Diagnostic CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-r from-magenta to-violet rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">Pas sûr de votre besoin ?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Répondez à quelques questions et recevez des recommandations personnalisées pour votre projet IA
            </p>
            <Link to="/quiz">
              <Button size="lg" variant="white" className="rounded-full px-8">
                Lancer le diagnostic <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Comment pouvons-nous vous aider ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explorez nos services pour accompagner votre transformation IA</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, i) => (
              <Link key={i} to={service.path} className="group">
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-magenta">
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Events & News */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-magenta/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-magenta" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Événements à venir</h2>
              </div>
              <Link to="/agenda" className="text-sm text-violet hover:text-magenta flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {previewEvents.length > 0 ? previewEvents.map((event, i) => (
                <Card key={i} className="p-5 hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-16 h-16 rounded-lg bg-linear-to-br from-magenta/10 to-violet/10 flex flex-col items-center justify-center">
                      <span className="text-xs text-violet font-medium">{event.date?.split(' ')[0]}</span>
                      <span className="text-lg font-bold text-magenta">{event.date?.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-orange/20 text-orange rounded-full shrink-0">{event.type}</span>
                        <span className="text-xs text-gray-500 truncate">{event.location}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">{event.title}</h4>
                    </div>
                  </div>
                </Card>
              )) : (
                <Card className="p-6 border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm mb-2">Consultez l'agenda pour les prochains événements.</p>
                  <Link to="/agenda" className="text-magenta text-sm font-medium hover:underline">Voir l'agenda →</Link>
                </Card>
              )}
            </div>
          </div>

          {/* News */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center">
                  <Newspaper className="w-5 h-5 text-violet" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Actualités IA</h2>
              </div>
              <Link to="/actualites" className="text-sm text-violet hover:text-magenta flex items-center gap-1 transition-colors">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentNews.map((news, i) => (
                <Card key={i} className="p-5 hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-rose/20 text-violet rounded-full">{news.category}</span>
                    <span className="text-xs text-gray-500">{news.date}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-magenta transition-colors text-sm">{news.title}</h4>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
