import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '../ui/Button'
import type { QuizState } from '../../types'

interface QuizResultProps {
  state: QuizState
  onReset: () => void
}

function computeResult(state: QuizState) {
  const { need, structure, maturity } = state

  let title = 'Votre parcours personnalisé'
  let description = 'Voici les ressources et interlocuteurs les plus adaptés à votre situation.'
  const ctas: Array<{ label: string; href: string }> = []

  if (need === 'discover') {
    title = 'Commencez par comprendre l\'IA'
    description = `${maturity === 'beginner' ? 'En tant que débutant, ' : ''}nous vous recommandons de parcourir nos ressources pédagogiques avant de vous lancer dans un projet concret.`
    ctas.push({ label: 'Découvrir l\'IA', href: '/decouvrir' })
    ctas.push({ label: 'Se former', href: '/formations' })
    ctas.push({ label: 'Voir les événements', href: '/agenda' })
  } else if (need === 'project') {
    title = 'Lancez votre projet IA'
    description = `${structure === 'collectivite' ? 'En tant que collectivité, des ' : 'Des '}accompagnements et aides spécifiques existent pour structurer votre démarche${maturity === 'beginner' ? ' même sans connaissances techniques' : ''}.`
    ctas.push({ label: 'Lancer un projet', href: '/projet' })
    ctas.push({ label: 'Trouver un expert', href: '/experts' })
    ctas.push({ label: 'Voir les aides', href: '/projet#aides' })
  } else if (need === 'expert') {
    title = 'Trouvez le bon expert'
    description = `Notre annuaire référence des experts ${structure === 'collectivite' ? 'spécialisés secteur public' : 'en Centre-Val de Loire'} pour vous accompagner.`
    ctas.push({ label: 'Voir les experts', href: '/experts' })
    ctas.push({ label: 'Lancer un projet', href: '/projet' })
  } else if (need === 'training') {
    title = 'Montez en compétences'
    description = `Des formations adaptées à votre profil${maturity === 'advanced' ? ' avancé' : maturity === 'intermediate' ? ' intermédiaire' : ' débutant'} sont disponibles.`
    ctas.push({ label: 'Voir les formations', href: '/formations' })
    ctas.push({ label: 'Voir les ressources', href: '/decouvrir' })
    ctas.push({ label: 'Voir les événements', href: '/agenda' })
  }

  return { title, description, ctas }
}

export function QuizResult({ state, onReset }: QuizResultProps) {
  const result = computeResult(state)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-6 md:p-10 card-shadow border border-gray-100 max-w-2xl mx-auto text-center"
    >
      <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl">✨</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{result.title}</h2>
      <p className="text-gray-600 leading-relaxed mb-8">{result.description}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        {result.ctas.map(cta => (
          <Link key={cta.href} to={cta.href}>
            <Button size="md" className="w-full sm:w-auto">
              {cta.label}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        ))}
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors mx-auto"
      >
        <RefreshCw className="w-4 h-4" />
        Recommencer le bilan
      </button>
    </motion.div>
  )
}
