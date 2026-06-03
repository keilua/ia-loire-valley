import { motion } from 'framer-motion'
import { CheckCircle2, Users, BookOpen, Banknote, Zap, ExternalLink, Mail, Clock, ArrowRight } from 'lucide-react'
import type { OrientationResult } from '../../services/orientationEngine'
import { Button } from '../ui/Button'

interface Props {
  result: OrientationResult
  onReset: () => void
}

const urgencyColors = {
  immediate: 'bg-magenta/10 text-magenta border-magenta/20',
  short: 'bg-violet/10 text-violet border-violet/20',
  medium: 'bg-orange/10 text-orange border-orange/20',
}

const urgencyLabels = {
  immediate: 'Maintenant',
  short: 'Dans 1–2 mois',
  medium: 'Dans 3–6 mois',
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

export function OrientationResults({ result, onReset }: Props) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">

      {/* ── Header ── */}
      <motion.div variants={item} className="text-center mb-10">
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Votre orientation personnalisée</h3>
        <p className="text-sm text-gray-500">{result.summaryLine}</p>
      </motion.div>

      {/* ── Action plan ── */}
      <motion.section variants={item} className="mb-10">
        <SectionHeader icon={<Zap className="w-4 h-4" />} title="Votre plan d'action en 3 étapes" color="magenta" />
        <div className="space-y-3">
          {result.actionPlan.map(step => (
            <div key={step.number} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center shrink-0 text-white font-bold text-sm">
                {step.number}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{step.title}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${urgencyColors[step.urgency]}`}>
                    {urgencyLabels[step.urgency]}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Experts ── */}
      {result.experts.length > 0 && (
        <motion.section variants={item} className="mb-10">
          <SectionHeader icon={<Users className="w-4 h-4" />} title="Experts recommandés" color="violet" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {result.experts.map(expert => (
              <div key={expert.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
                    {expert.logo
                      ? <img src={expert.logo} alt={expert.name} className="w-full h-full object-contain p-1" loading="lazy" />
                      : <span className="text-sm font-bold text-gray-400">{expert.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</span>
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{expert.name}</p>
                    <p className="text-xs text-gray-500 truncate">{expert.location}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{expert.specialty}</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[11px] bg-violet/10 text-violet px-2 py-0.5 rounded-full font-medium">{expert.level}</span>
                </div>
                {expert.email && (
                  <a href={`mailto:${expert.email}`} className="flex items-center gap-1.5 text-xs text-magenta font-medium hover:underline mt-auto">
                    <Mail className="w-3 h-3" />
                    Contacter
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Trainings ── */}
      {result.trainings.length > 0 && (
        <motion.section variants={item} className="mb-10">
          <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Formations adaptées" color="orange" />
          <div className="space-y-3">
            {result.trainings.map(t => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm mb-0.5">{t.title}</p>
                  <p className="text-xs text-gray-500 mb-2">{t.provider}</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">{t.objective}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Tag label={t.level} color="orange" />
                    <Tag label={t.format} color="gray" />
                    <Tag label={t.profile} color="gray" />
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {t.duration}
                    </div>
                  </div>
                </div>
                {t.link && (
                  <a href={t.link} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 p-2 rounded-xl border border-gray-100 hover:border-orange hover:text-orange text-gray-400 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Fundings ── */}
      {result.fundings.length > 0 && (
        <motion.section variants={item} className="mb-10">
          <SectionHeader icon={<Banknote className="w-4 h-4" />} title="Aides et financements disponibles" color="green" />
          <div className="grid gap-3 sm:grid-cols-2">
            {result.fundings.map(f => (
              <div key={f.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{f.name}</p>
                  <span className="text-[11px] font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                    {f.amount}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{f.provider}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{f.description}</p>
                <p className="text-[11px] text-gray-400 mt-auto pt-1 border-t border-gray-50">{f.eligibility}</p>
                {f.link && (
                  <a href={f.link} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-magenta font-medium hover:underline">
                    <ExternalLink className="w-3 h-3" />
                    En savoir plus
                  </a>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ── Footer CTA ── */}
      <motion.div variants={item} className="bg-gradient-to-br from-magenta/5 to-violet/5 rounded-2xl border border-magenta/10 p-6 text-center">
        <p className="text-sm font-semibold text-gray-900 mb-1">Besoin d'aller plus loin ?</p>
        <p className="text-xs text-gray-500 mb-4">
          Un conseiller IA Loire Valley peut analyser votre dossier et vous mettre en relation directement avec les bons interlocuteurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button variant="primary" size="sm" onClick={onReset} className="flex items-center gap-2">
            <ArrowRight className="w-3.5 h-3.5" />
            Affiner ma demande
          </Button>
          <a href="/experts">
            <Button variant="secondary" size="sm">Voir tous les experts</Button>
          </a>
        </div>
      </motion.div>

    </motion.div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  const colorMap: Record<string, string> = {
    magenta: 'bg-magenta/10 text-magenta',
    violet: 'bg-violet/10 text-violet',
    orange: 'bg-orange/10 text-orange',
    green: 'bg-green-100 text-green-700',
  }
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${colorMap[color] ?? 'bg-gray-100 text-gray-500'}`}>
        {icon}
      </div>
      <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
    </div>
  )
}

function Tag({ label, color }: { label: string; color: string }) {
  const colorMap: Record<string, string> = {
    orange: 'bg-orange/10 text-orange',
    gray: 'bg-gray-100 text-gray-500',
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colorMap[color] ?? 'bg-gray-100 text-gray-500'}`}>
      {label}
    </span>
  )
}
