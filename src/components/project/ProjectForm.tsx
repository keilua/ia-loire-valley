import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search, CheckCircle2, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Input, Select, Textarea } from '../ui/FormFields'
import { Button } from '../ui/Button'
import { lookupCompanyBySiret, formatSiret } from '../../services/companyLookupService'

const schema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  company: z.string().min(2, 'Entreprise requise'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Téléphone invalide'),
  siret: z.string().optional().default(''),
  sector: z.string().min(1, 'Secteur requis'),
  companySize: z.string().min(1, 'Taille requise'),
  maturityLevel: z.string().min(1, 'Niveau requis'),
  projectType: z.string().min(1, 'Type de projet requis'),
  estimatedBudget: z.string().min(1, 'Budget estimatif requis'),
  projectHorizon: z.string().min(1, 'Horizon requis'),
  mainNeed: z.string().min(1, 'Besoin principal requis'),
  description: z.string().min(10, 'Description requise (min. 10 caractères)'),
})

type FormData = z.infer<typeof schema>

const sectorOptions = [
  { value: 'industrie', label: 'Industrie / Manufacturing' },
  { value: 'sante', label: 'Santé' },
  { value: 'finance', label: 'Finance / Assurance' },
  { value: 'retail', label: 'Commerce / Retail' },
  { value: 'rh', label: 'RH / Formation' },
  { value: 'collectivite', label: 'Collectivité / Secteur public' },
  { value: 'btp', label: 'BTP / Construction' },
  { value: 'energie', label: 'Énergie / Environnement' },
  { value: 'tech', label: 'Tech / Digital' },
  { value: 'agri', label: 'Agriculture' },
  { value: 'autre', label: 'Autre' },
]

const sizeOptions = [
  { value: 'tpe', label: 'TPE (< 10 salariés)' },
  { value: 'pme', label: 'PME (10–249 salariés)' },
  { value: 'eti', label: 'ETI (250–4999 salariés)' },
  { value: 'ge', label: 'Grand groupe (5000+)' },
  { value: 'collectivite', label: 'Collectivité' },
  { value: 'startup', label: 'Startup' },
]

const maturityOptions = [
  { value: 'none', label: 'Pas encore de projet IA' },
  { value: 'beginner', label: 'En réflexion' },
  { value: 'exploring', label: 'En cours d\'exploration' },
  { value: 'running', label: 'Projet(s) en cours' },
  { value: 'advanced', label: 'IA déjà déployée' },
]

const projectTypeOptions = [
  { value: 'automatisation', label: 'Automatisation de tâches' },
  { value: 'analyse', label: 'Analyse de données / BI' },
  { value: 'prediction', label: 'Prédiction / maintenance prédictive' },
  { value: 'nlp', label: 'Traitement du texte / NLP' },
  { value: 'vision', label: 'Vision par ordinateur' },
  { value: 'generatif', label: 'IA générative' },
  { value: 'recommandation', label: 'Recommandation / personnalisation' },
  { value: 'autre', label: 'Autre' },
]

const budgetOptions = [
  { value: 'lt10k', label: 'Moins de 10 000 €' },
  { value: '10_50k', label: '10 000 – 50 000 €' },
  { value: '50_150k', label: '50 000 – 150 000 €' },
  { value: 'gt150k', label: 'Plus de 150 000 €' },
  { value: 'unknown', label: 'Je ne sais pas encore' },
]

const horizonOptions = [
  { value: '3m', label: 'Moins de 3 mois' },
  { value: '6m', label: '3 à 6 mois' },
  { value: '1y', label: '6 mois à 1 an' },
  { value: 'gt1y', label: 'Plus d\'un an' },
]

const needOptions = [
  { value: 'conseil', label: 'Conseil et cadrage' },
  { value: 'technique', label: 'Développement technique' },
  { value: 'formation', label: 'Formation des équipes' },
  { value: 'aides', label: 'Identifier les aides disponibles' },
  { value: 'tout', label: 'Accompagnement complet' },
]

export function ProjectForm() {
  const [submitted, setSubmitted] = useState(false)
  const [siretLoading, setSiretLoading] = useState(false)
  const [siretError, setSiretError] = useState<string | null>(null)
  const [siretSuccess, setSiretSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormData>({ resolver: zodResolver(schema) as any })

  const siretValue = watch('siret') ?? ''

  async function handleSiretLookup() {
    setSiretLoading(true)
    setSiretError(null)
    setSiretSuccess(null)
    const result = await lookupCompanyBySiret(siretValue)
    setSiretLoading(false)
    if (result.success && result.data) {
      const d = result.data
      setValue('company', d.raisonSociale, { shouldValidate: true })
      setSiretSuccess(`${d.raisonSociale} — ${d.ville} (${d.codeNAF})`)
    } else {
      setSiretError(result.error ?? 'Erreur de recherche')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_data: FormData) {
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Nous analysons votre situation et reviendrons vers vous sous 48h avec des recommandations personnalisées.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 text-sm text-amber-800">
        <strong>Important :</strong> Ce formulaire ne constitue pas une demande de devis. Il permet uniquement d'orienter votre entreprise vers les aides, accompagnements et interlocuteurs pertinents.
      </div>

      {/* Identity */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">Vos coordonnées</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="firstName" label="Prénom *" placeholder="Marie" error={errors.firstName?.message} {...register('firstName')} />
          <Input id="lastName" label="Nom *" placeholder="Dupont" error={errors.lastName?.message} {...register('lastName')} />
          <Input id="email" type="email" label="Email professionnel *" placeholder="marie@entreprise.fr" error={errors.email?.message} {...register('email')} />
          <Input id="phone" type="tel" label="Téléphone *" placeholder="06 12 34 56 78" error={errors.phone?.message} {...register('phone')} />
        </div>
      </section>

      {/* Company */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">Votre entreprise</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* SIRET */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block" htmlFor="siret">
              SIRET (optionnel – pour préremplir)
            </label>
            <div className="flex gap-2">
              <input
                id="siret"
                type="text"
                placeholder="123 456 789 00012"
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta transition-colors"
                value={siretValue}
                onChange={e => setValue('siret', formatSiret(e.target.value))}
                maxLength={17}
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleSiretLookup}
                disabled={siretLoading || siretValue.replace(/\s/g, '').length !== 14}
              >
                <Search className="w-4 h-4" />
                {siretLoading ? 'Recherche…' : 'Chercher'}
              </Button>
            </div>
            {siretError && <p className="text-xs text-red-500 mt-1">{siretError}</p>}
            {siretSuccess && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                {siretSuccess}
              </p>
            )}
          </div>

          <Input id="company" label="Raison sociale *" placeholder="Mon Entreprise SAS" error={errors.company?.message} {...register('company')} />
          <Select id="sector" label="Secteur d'activité *" options={sectorOptions} placeholder="Choisir…" error={errors.sector?.message} {...register('sector')} />
          <Select id="companySize" label="Taille de l'entreprise *" options={sizeOptions} placeholder="Choisir…" error={errors.companySize?.message} {...register('companySize')} />
          <Select id="maturityLevel" label="Maturité IA *" options={maturityOptions} placeholder="Choisir…" error={errors.maturityLevel?.message} {...register('maturityLevel')} />
        </div>
      </section>

      {/* Project */}
      <section className="mb-8">
        <h3 className="text-base font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">Votre projet</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select id="projectType" label="Type de projet *" options={projectTypeOptions} placeholder="Choisir…" error={errors.projectType?.message} {...register('projectType')} />
          <Select id="estimatedBudget" label="Budget estimatif *" options={budgetOptions} placeholder="Choisir…" error={errors.estimatedBudget?.message} {...register('estimatedBudget')} />
          <Select id="projectHorizon" label="Horizon du projet *" options={horizonOptions} placeholder="Choisir…" error={errors.projectHorizon?.message} {...register('projectHorizon')} />
          <Select id="mainNeed" label="Besoin principal *" options={needOptions} placeholder="Choisir…" error={errors.mainNeed?.message} {...register('mainNeed')} />
          <div className="sm:col-span-2">
            <Textarea
              id="description"
              label="Description libre *"
              placeholder="Décrivez votre projet, vos enjeux, vos attentes…"
              error={errors.description?.message}
              rows={5}
              {...register('description')}
            />
          </div>
        </div>
      </section>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? 'Envoi en cours…' : 'Voir les aides et accompagnements possibles'}
      </Button>
    </form>
  )
}
