import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Lightbulb, Rocket, Users, GraduationCap, CheckCircle,
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'
import { Progress } from '../components/ui/progress'

interface QuizAnswers {
  need?: string
  organizationType?: string
  maturityLevel?: string
}

function getRecommendations(answers: QuizAnswers) {
  const { need } = answers
  if (need === 'comprendre') return {
    title: 'Commencez par découvrir l\'IA',
    description: 'Nous vous recommandons de vous familiariser avec les concepts et cas d\'usage de l\'IA.',
    ctas: [
      { label: 'Découvrir les ressources', path: '/decouvrir-ia' },
      { label: 'Se former à l\'IA', path: '/se-former' },
    ],
  }
  if (need === 'lancer') return {
    title: 'Structurez votre projet IA',
    description: 'Vous êtes prêt à passer à l\'action. Nous pouvons vous aider à cadrer votre projet.',
    ctas: [
      { label: 'Lancer mon projet', path: '/lancer-projet' },
      { label: 'Voir les experts', path: '/experts' },
    ],
  }
  if (need === 'expert') return {
    title: 'Trouvez l\'expert adapté',
    description: 'Notre annuaire regroupe les meilleurs experts IA du territoire.',
    ctas: [
      { label: 'Voir les experts', path: '/experts' },
      { label: 'Voir les événements utiles', path: '/agenda' },
    ],
  }
  if (need === 'formation') return {
    title: 'Montez en compétence sur l\'IA',
    description: 'Nous vous orientons vers les formations et ressources adaptées à votre profil.',
    ctas: [
      { label: 'Voir les formations recommandées', path: '/se-former' },
      { label: 'Découvrir l\'IA', path: '/decouvrir-ia' },
    ],
  }
  return {
    title: 'Explorez nos services',
    description: 'Découvrez toutes les ressources disponibles pour votre projet IA.',
    ctas: [
      { label: 'Lancer mon projet', path: '/lancer-projet' },
      { label: 'Voir les experts', path: '/experts' },
    ],
  }
}

const needOptions = [
  { value: 'comprendre', icon: Lightbulb, label: 'Comprendre l\'IA', color: 'from-magenta to-rose' },
  { value: 'lancer', icon: Rocket, label: 'Lancer un projet', color: 'from-violet to-magenta' },
  { value: 'expert', icon: Users, label: 'Trouver un expert', color: 'from-orange to-magenta' },
  { value: 'formation', icon: GraduationCap, label: 'Se former à l\'IA', color: 'from-rose to-violet' },
]

const orgOptions = [
  { value: 'pme', label: 'PME' },
  { value: 'startup', label: 'Startup' },
  { value: 'collectivite', label: 'Collectivité' },
  { value: 'eti', label: 'ETI / Grand groupe' },
  { value: 'accompagnement', label: 'Structure d\'accompagnement' },
]

const maturityOptions = [
  { value: 'debutant', label: 'Débutant', description: 'Je découvre l\'IA' },
  { value: 'intermediaire', label: 'Intermédiaire', description: 'J\'ai quelques notions' },
  { value: 'avance', label: 'Avancé', description: 'Je maîtrise les concepts' },
]

const needLabels: Record<string, string> = {
  comprendre: 'Comprendre l\'IA',
  lancer: 'Lancer un projet',
  expert: 'Trouver un expert',
  formation: 'Se former à l\'IA',
}
const orgLabels: Record<string, string> = {
  pme: 'PME',
  startup: 'Startup',
  collectivite: 'Collectivité',
  eti: 'ETI / Grand groupe',
  accompagnement: 'Structure d\'accompagnement',
}
const maturityLabels: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
}

export function QuizPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const totalSteps = 3

  const handleAnswer = (question: keyof QuizAnswers, answer: string) => {
    const next = { ...answers, [question]: answer }
    setAnswers(next)
    if (currentStep < totalSteps) {
      setTimeout(() => setCurrentStep(s => s + 1), 250)
    } else {
      setTimeout(() => setCurrentStep(4), 250)
    }
  }

  const recommendations = getRecommendations(answers)

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 via-purple-50/20 to-pink-50/20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Diagnostic IA</h1>
          <p className="text-lg text-gray-600">Répondez à quelques questions pour recevoir des recommandations personnalisées</p>
        </div>

        {currentStep <= totalSteps && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Question {currentStep} sur {totalSteps}</span>
              <span className="text-sm font-medium text-violet">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} />
          </div>
        )}

        {/* Step 1 */}
        {currentStep === 1 && (
          <Card className="p-8 sm:p-12 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quel est votre besoin principal ?</h2>
            <div className="space-y-4">
              {needOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('need', opt.value)}
                  className="w-full flex items-center gap-4 p-5 rounded-2xl border-2 border-gray-200 hover:border-magenta hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${opt.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <opt.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg font-medium text-gray-900">{opt.label}</span>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-magenta group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <Card className="p-8 sm:p-12 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quel type d'organisation êtes-vous ?</h2>
            <div className="space-y-3">
              {orgOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('organizationType', opt.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-magenta hover:bg-magenta/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-900">{opt.label}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="mt-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />Précédent
            </button>
          </Card>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <Card className="p-8 sm:p-12 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quel est votre niveau de maturité IA ?</h2>
            <div className="space-y-3">
              {maturityOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer('maturityLevel', opt.value)}
                  className="w-full p-5 rounded-xl border-2 border-gray-200 hover:border-magenta hover:bg-magenta/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-medium text-gray-900 mb-1">{opt.label}</div>
                      <div className="text-sm text-gray-600">{opt.description}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-magenta group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="mt-6 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />Précédent
            </button>
          </Card>
        )}

        {/* Results */}
        {currentStep === 4 && (
          <Card className="p-8 sm:p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-magenta to-violet flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{recommendations.title}</h2>
              <p className="text-lg text-gray-600">{recommendations.description}</p>
            </div>

            <div className="bg-linear-to-br from-gray-50 to-purple-50/30 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Vos réponses :</h3>
              <div className="space-y-2 text-sm">
                {answers.need && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-magenta" />
                    <span className="text-gray-600">Besoin : <span className="text-gray-900 font-medium">{needLabels[answers.need]}</span></span>
                  </div>
                )}
                {answers.organizationType && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet" />
                    <span className="text-gray-600">Organisation : <span className="text-gray-900 font-medium">{orgLabels[answers.organizationType]}</span></span>
                  </div>
                )}
                {answers.maturityLevel && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange" />
                    <span className="text-gray-600">Maturité : <span className="text-gray-900 font-medium">{maturityLabels[answers.maturityLevel]}</span></span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Prochaines étapes recommandées :</h3>
              {recommendations.ctas.map((cta, i) => (
                <Link key={i} to={cta.path}>
                  <Button className="w-full justify-between rounded-xl mb-2">
                    <span>{cta.label}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setCurrentStep(1); setAnswers({}) }}
                className="text-sm text-gray-600 hover:text-magenta underline transition-colors"
              >
                Recommencer le diagnostic
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
