import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { ProjectForm } from '../components/project/ProjectForm'

const steps = [
  { number: '01', title: 'Identifier le besoin', description: 'Définir clairement le problème à résoudre' },
  { number: '02', title: 'Évaluer la maturité', description: 'Analyser votre niveau de préparation' },
  { number: '03', title: 'Repérer les bons partenaires', description: 'Trouver les experts adaptés' },
  { number: '04', title: 'Mobiliser les dispositifs', description: 'Identifier les aides disponibles' },
  { number: '05', title: 'Passer à l\'action', description: 'Structurer et lancer le projet' },
]

export function ProjectPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lancer un projet IA</h1>
          <p className="text-lg text-gray-600">
            Bénéficiez d'un accompagnement personnalisé pour structurer votre projet d'intelligence artificielle
          </p>
        </div>

        {/* Steps */}
        <Card className="p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Les étapes d'un projet IA réussi</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-magenta/10 to-violet/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-violet">{step.number}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Form */}
        <Card className="p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Formulaire d'orientation</h2>
          <ProjectForm />
        </Card>

        <div className="mt-8 text-center">
          <Link to="/quiz">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-magenta text-magenta">
              Faire le bilan d'orientation à la place
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
