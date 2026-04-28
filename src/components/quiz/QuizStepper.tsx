import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'
import type { QuizState, QuizNeed, QuizStructure, QuizMaturity } from '../../types'

interface QuizStepperProps {
  state: QuizState
  onUpdate: (updates: Partial<QuizState>) => void
  onComplete: () => void
}

const TOTAL_STEPS = 3

const needOptions: Array<{ value: QuizNeed; label: string; icon: string; desc: string }> = [
  { value: 'discover', label: 'Comprendre l\'IA', icon: '🔍', desc: 'Découvrir les bases et les opportunités' },
  { value: 'project', label: 'Lancer un projet', icon: '🚀', desc: 'Structurer et démarrer un projet IA' },
  { value: 'expert', label: 'Trouver un expert', icon: '👥', desc: 'Identifier le bon partenaire' },
  { value: 'training', label: 'Se former à l\'IA', icon: '🎓', desc: 'Monter en compétences' },
]

const structureOptions: Array<{ value: QuizStructure; label: string; icon: string }> = [
  { value: 'pme', label: 'PME', icon: '🏢' },
  { value: 'startup', label: 'Startup', icon: '⚡' },
  { value: 'collectivite', label: 'Collectivité', icon: '🏛️' },
  { value: 'eti', label: 'ETI / Grand groupe', icon: '🏭' },
  { value: 'structure', label: "Structure d'accompagnement", icon: '🤝' },
]

const maturityOptions: Array<{ value: QuizMaturity; label: string; icon: string; desc: string }> = [
  { value: 'beginner', label: 'Débutant', icon: '🌱', desc: 'Je découvre l\'IA' },
  { value: 'intermediate', label: 'Intermédiaire', icon: '🌿', desc: 'J\'ai quelques bases ou expériences' },
  { value: 'advanced', label: 'Avancé', icon: '🌳', desc: 'Je travaille déjà avec l\'IA' },
]

const steps = [
  { label: 'Besoin', question: 'Quel est votre besoin principal ?' },
  { label: 'Structure', question: 'Quel type de structure êtes-vous ?' },
  { label: 'Maturité', question: 'Quel est votre niveau de maturité IA ?' },
]

export function QuizStepper({ state, onUpdate, onComplete }: QuizStepperProps) {
  const { step, need, structure, maturity } = state

  const canNext =
    (step === 0 && need !== null) ||
    (step === 1 && structure !== null) ||
    (step === 2 && maturity !== null)

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      onUpdate({ step: step + 1 })
    } else {
      onComplete()
    }
  }

  function handleBack() {
    if (step > 0) onUpdate({ step: step - 1 })
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 card-shadow border border-gray-100 max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0',
                i < step ? 'gradient-brand text-white' : i === step ? 'bg-magenta/10 text-magenta ring-2 ring-magenta/30' : 'bg-gray-100 text-gray-400',
              )}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={cn('text-xs font-medium hidden sm:block', i === step ? 'text-magenta' : 'text-gray-400')}>
              {s.label}
            </span>
            {i < TOTAL_STEPS - 1 && (
              <div className={cn('flex-1 h-0.5 mx-1 rounded-full transition-all duration-300', i < step ? 'bg-magenta' : 'bg-gray-200')} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            {steps[step].question}
          </h2>

          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {needOptions.map(opt => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={need === opt.value}
                  onClick={() => onUpdate({ need: opt.value })}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {structureOptions.map(opt => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  selected={structure === opt.value}
                  onClick={() => onUpdate({ structure: opt.value })}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-3">
              {maturityOptions.map(opt => (
                <OptionCard
                  key={opt.value}
                  icon={opt.icon}
                  label={opt.label}
                  desc={opt.desc}
                  selected={maturity === opt.value}
                  onClick={() => onUpdate({ maturity: opt.value })}
                  fullWidth
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </button>

        <Button onClick={handleNext} disabled={!canNext}>
          {step === TOTAL_STEPS - 1 ? 'Voir mes recommandations' : 'Suivant'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

interface OptionCardProps {
  icon: string
  label: string
  desc?: string
  selected: boolean
  onClick: () => void
  fullWidth?: boolean
}

function OptionCard({ icon, label, desc, selected, onClick, fullWidth }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-150',
        fullWidth ? 'w-full' : '',
        selected
          ? 'border-magenta bg-magenta/5 shadow-sm'
          : 'border-gray-200 hover:border-magenta/40 hover:bg-gray-50',
      )}
    >
      <span className="text-2xl flex-shrink-0">{icon}</span>
      <div>
        <div className={cn('font-semibold text-sm', selected ? 'text-magenta' : 'text-gray-800')}>
          {label}
        </div>
        {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
      </div>
    </button>
  )
}
