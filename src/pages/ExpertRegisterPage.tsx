import { useState, useRef, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, CheckCircle, Send, X, Upload, Image } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/card'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_EXPERT_ID as string | undefined

const SECTORS = [
  'Industrie', 'Santé', 'Finance', 'Retail', 'RH', 'Formation',
  'Collectivités', 'BTP', 'Énergie', 'Tech', 'Communication',
  'Logistique', 'Marketing', 'Services',
]
const LEVELS = ['Conseil', 'Accompagnement', 'Formation', 'Développement'] as const
const CITIES = ['Orléans', 'Tours', 'Blois', 'Châteauroux', 'Bourges', 'Chartres', 'Autre']

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  specialty: z.string().min(3, 'Spécialité requise'),
  level: z.enum(['Conseil', 'Accompagnement', 'Formation', 'Développement'], { required_error: 'Type requis' }),
  location: z.string().min(1, 'Ville requise'),
  address: z.string().optional(),
  sectors: z.array(z.string()).min(1, 'Sélectionnez au moins un secteur'),
  expertise: z.array(z.string()).optional(),
  description: z.string().min(20, 'Description trop courte (20 caractères minimum)'),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export function ExpertRegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [expertiseInput, setExpertiseInput] = useState('')
  const [expertiseTags, setExpertiseTags] = useState<string[]>([])
  const logoInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { sectors: [], expertise: [] },
  })

  const selectedSectors = watch('sectors') ?? []

  const toggleSector = (sector: string) => {
    const current = selectedSectors
    setValue('sectors', current.includes(sector)
      ? current.filter(s => s !== sector)
      : [...current, sector]
    , { shouldValidate: true })
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const addExpertiseTag = (value: string) => {
    const tag = value.trim()
    if (tag && !expertiseTags.includes(tag)) {
      const updated = [...expertiseTags, tag]
      setExpertiseTags(updated)
      setValue('expertise', updated)
    }
    setExpertiseInput('')
  }

  const removeExpertiseTag = (tag: string) => {
    const updated = expertiseTags.filter(t => t !== tag)
    setExpertiseTags(updated)
    setValue('expertise', updated)
  }

  const handleExpertiseKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addExpertiseTag(expertiseInput)
    }
    if (e.key === 'Backspace' && !expertiseInput && expertiseTags.length > 0) {
      removeExpertiseTag(expertiseTags[expertiseTags.length - 1])
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!FORMSPREE_ID) {
      setError('Formulaire non configuré. Contactez l\'administrateur.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('_subject', `Nouvelle inscription expert : ${data.name}`)
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('specialty', data.specialty)
      formData.append('level', data.level)
      formData.append('location', data.location)
      if (data.address) formData.append('address', data.address)
      formData.append('sectors', data.sectors.join(', '))
      if (data.expertise && data.expertise.length > 0)
        formData.append('expertise', data.expertise.join(', '))
      formData.append('description', data.description)
      if (data.website) formData.append('website', data.website)
      if (data.message) formData.append('message', data.message)
      if (logoFile) formData.append('logo', logoFile)

      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Erreur lors de l\'envoi. Réessayez.')
      }
    } catch {
      setError('Erreur réseau. Réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Demande envoyée !</h2>
          <p className="text-gray-600 mb-6">
            Votre demande d'inscription a bien été transmise. Nous l'étudions et revenons vers vous sous 48h.
          </p>
          <Link to="/experts">
            <Button className="rounded-xl">Retour à l'annuaire</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">

        <div className="mb-10">
          <Link to="/experts" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'annuaire
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Rejoindre l'annuaire</h1>
          <p className="text-gray-600">
            Vous êtes expert IA en Centre-Val de Loire ? Remplissez ce formulaire — votre fiche sera vérifiée et publiée sous 48h.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">

            {/* Identité */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Informations générales</h2>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'organisation ou nom complet <span className="text-magenta">*</span>
                  </label>
                  <input {...register('name')} placeholder="ex: TerraQuant, Sophie Martin…"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email de contact <span className="text-magenta">*</span>
                  </label>
                  <input {...register('email')} type="email" placeholder="contact@votreentreprise.fr"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site web</label>
                  <input {...register('website')} type="url" placeholder="https://votresite.fr"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta" />
                  {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website.message}</p>}
                </div>

                {/* Logo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo de l'organisation</label>
                  {logoPreview ? (
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                      <img src={logoPreview} alt="Aperçu logo" className="w-14 h-14 object-contain rounded-lg border border-gray-100 bg-white" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate">{logoFile?.name}</p>
                        <p className="text-xs text-gray-400">{logoFile ? (logoFile.size / 1024).toFixed(0) + ' Ko' : ''}</p>
                      </div>
                      <button type="button" onClick={removeLogo}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => logoInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-magenta hover:text-magenta transition-colors">
                      <Image className="w-5 h-5" />
                      <span>Cliquez pour ajouter un logo</span>
                      <Upload className="w-4 h-4" />
                    </button>
                  )}
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG ou SVG — 2 Mo max</p>
                </div>
              </div>
            </Card>

            {/* Expertise */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Expertise</h2>
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Spécialité <span className="text-magenta">*</span>
                  </label>
                  <input {...register('specialty')} placeholder="ex: Conseil en stratégie IA, Data Science…"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta" />
                  {errors.specialty && <p className="text-xs text-red-500 mt-1">{errors.specialty.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'intervention <span className="text-magenta">*</span>
                  </label>
                  <select {...register('level')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta bg-white">
                    <option value="">Sélectionner…</option>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                  {errors.level && <p className="text-xs text-red-500 mt-1">{errors.level.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secteurs d'activité <span className="text-magenta">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SECTORS.map(sector => (
                      <button key={sector} type="button" onClick={() => toggleSector(sector)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                          selectedSectors.includes(sector)
                            ? 'bg-magenta text-white border-magenta'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-magenta hover:text-magenta'
                        }`}>
                        {sector}
                      </button>
                    ))}
                  </div>
                  {errors.sectors && <p className="text-xs text-red-500 mt-1">{errors.sectors.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Domaines d'expertise
                  </label>
                  <div className="w-full min-h-[44px] px-3 py-2 border border-gray-200 rounded-xl text-sm focus-within:ring-2 focus-within:ring-magenta/30 focus-within:border-magenta flex flex-wrap gap-1.5 items-center">
                    {expertiseTags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet/10 text-violet rounded-full text-xs font-medium">
                        {tag}
                        <button type="button" onClick={() => removeExpertiseTag(tag)} className="hover:text-magenta transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      value={expertiseInput}
                      onChange={e => setExpertiseInput(e.target.value)}
                      onKeyDown={handleExpertiseKeyDown}
                      onBlur={() => expertiseInput.trim() && addExpertiseTag(expertiseInput)}
                      placeholder={expertiseTags.length === 0 ? 'Machine Learning, NLP, Automatisation… (Entrée pour valider)' : ''}
                      className="flex-1 min-w-[160px] outline-none bg-transparent text-sm placeholder:text-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Appuyez sur Entrée ou virgule pour ajouter un domaine</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-magenta">*</span>
                  </label>
                  <textarea {...register('description')} rows={4}
                    placeholder="Décrivez votre activité, votre approche et ce que vous apportez à vos clients…"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta resize-none" />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                </div>
              </div>
            </Card>

            {/* Localisation */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Localisation</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville <span className="text-magenta">*</span>
                  </label>
                  <select {...register('location')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta bg-white">
                    <option value="">Sélectionner…</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
                  <input {...register('address')} placeholder="ex: 1 rue de la Paix, 45000 Orléans"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta" />
                </div>
              </div>
            </Card>

            {/* Message optionnel */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Message (optionnel)</h2>
              <textarea {...register('message')} rows={3}
                placeholder="Informations complémentaires, questions, contexte…"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-magenta/30 focus:border-magenta resize-none" />
            </Card>

            {error && (
              <p className="text-sm text-red-600 text-center bg-red-50 py-3 rounded-xl">{error}</p>
            )}

            <Button type="submit" size="lg" className="w-full rounded-xl" disabled={submitting}>
              {submitting
                ? 'Envoi en cours…'
                : <><Send className="mr-2 w-4 h-4" />Envoyer ma demande</>
              }
            </Button>

            <p className="text-xs text-center text-gray-400">
              Votre demande sera examinée sous 48h. Les champs marqués <span className="text-magenta">*</span> sont obligatoires.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
