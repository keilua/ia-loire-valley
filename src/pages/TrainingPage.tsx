import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, GraduationCap, Users, Code, Briefcase, Building, Filter, ArrowRight,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useTrainings, usePlatforms } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'

const profiles = [
  {
    icon: Briefcase,
    title: 'Dirigeants / Décideurs',
    color: 'from-magenta to-rose',
    objective: 'Comprendre les enjeux stratégiques de l\'IA',
    contentType: 'Executive briefings, études de cas, vision stratégique',
    level: 'Sensibilisation',
    format: 'Présentiel / Webinaire',
  },
  {
    icon: Users,
    title: 'Managers / Fonctions support',
    color: 'from-violet to-magenta',
    objective: 'Piloter des projets IA et accompagner les équipes',
    contentType: 'Gestion de projet IA, change management, outils',
    level: 'Intermédiaire',
    format: 'Formation mixte',
  },
  {
    icon: Building,
    title: 'Équipes métiers',
    color: 'from-orange to-magenta',
    objective: 'Utiliser l\'IA au quotidien dans son activité',
    contentType: 'Outils d\'IA générative, automatisation, productivité',
    level: 'Opérationnel',
    format: 'Ateliers pratiques',
  },
  {
    icon: Code,
    title: 'Profils techniques',
    color: 'from-rose to-violet',
    objective: 'Développer et déployer des solutions IA',
    contentType: 'Machine Learning, Deep Learning, MLOps, frameworks',
    level: 'Technique avancé',
    format: 'Formation longue',
  },
]

export function TrainingPage() {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedFormat, setSelectedFormat] = useState('all')

  const { data: trainings = [], loading, error } = useTrainings()
  const { data: platforms = [] } = usePlatforms()

  const filteredProfiles = profiles.filter(p => {
    const matchesLevel = selectedLevel === 'all' || p.level.includes(selectedLevel)
    const matchesFormat = selectedFormat === 'all' || p.format.includes(selectedFormat)
    return matchesLevel && matchesFormat
  })

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

        {/* Filters */}
        <Card className="p-6 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-violet" />
            <h3 className="font-semibold text-gray-900">Filtrer par profil</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                <SelectItem value="Sensibilisation">Sensibilisation</SelectItem>
                <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                <SelectItem value="Technique">Technique avancé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les formats</SelectItem>
                <SelectItem value="Présentiel">Présentiel</SelectItem>
                <SelectItem value="Webinaire">En ligne</SelectItem>
                <SelectItem value="mixte">Mixte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Profiles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Parcours par profil</h2>
          <div className="grid gap-6">
            {filteredProfiles.map((profile, i) => (
              <Card key={i} className="p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${profile.color} flex items-center justify-center shrink-0`}>
                    <profile.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Objectif : </span>{profile.objective}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-gray-700">Type de contenu : </span>{profile.contentType}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <span className="text-xs px-3 py-1 bg-magenta/10 text-magenta rounded-full">{profile.level}</span>
                        <span className="text-xs px-3 py-1 bg-violet/10 text-violet rounded-full">{profile.format}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="rounded-xl">
                        Voir les formations recommandées <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Training from DB */}
        {!loading && !error && trainings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Formations disponibles</h2>
            {loading ? <LoadingGrid count={4} /> : error ? <LoadingError message={error} /> : (
              <div className="grid md:grid-cols-2 gap-4">
                {trainings.map(t => {
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
              </div>
            )}
          </div>
        )}

        {/* Partners */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Plateformes recommandées</h2>
          <p className="text-gray-500 mb-6">Ressources sélectionnées — certaines entièrement gratuites.</p>
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
