// ─── Expert ───────────────────────────────────────────────────────────────────
export interface Expert {
  id: string
  name: string
  logo?: string
  specialty: string
  location: string
  address?: string
  lat?: number
  lng?: number
  sectors: string[]
  expertise: string[]
  level: 'Conseil' | 'Accompagnement' | 'Formation' | 'Développement'
  description: string
  website?: string
  email?: string
}

// ─── Ambassadeur ──────────────────────────────────────────────────────────────
export interface Ambassadeur {
  id: string
  prenom: string
  nom: string
  organisation: string
  type: 'Régional' | 'Sectoriel'
  secteur?: string
  email?: string
  commentaires?: string
}

// ─── Event ────────────────────────────────────────────────────────────────────
export type EventType = 'Conférence' | 'Atelier' | 'Webinaire' | 'Networking' | 'Café Data'

export interface Event {
  id: string
  title: string
  date: string
  startTime?: string
  endTime?: string
  location: string
  type: EventType
  summary: string
  description?: string
  link?: string
  isPast: boolean
  image?: string
}

// ─── News ─────────────────────────────────────────────────────────────────────
export type NewsCategory = 'IA générative' | 'Industrie' | 'Réglementation' | 'Outils' | 'Territoire' | 'Innovation'

export interface NewsArticle {
  id: string
  title: string
  category: NewsCategory
  date: string
  author?: string
  summary: string
  body?: unknown[]
  image?: string
  sourceUrl?: string
  readTime: number
  isHero?: boolean
}

// ─── Training ─────────────────────────────────────────────────────────────────
export type TrainingLevel = 'Débutant' | 'Intermédiaire' | 'Avancé'
export type TrainingFormat = 'En ligne' | 'Présentiel' | 'Mixte'
export type TrainingProfile = 'Dirigeants' | 'Managers / Métiers' | 'Profils techniques' | 'Collectivités'

export interface Training {
  id: string
  title: string
  provider: string
  level: TrainingLevel
  format: TrainingFormat
  profile: TrainingProfile
  objective: string
  duration: string
  link?: string
}

// ─── Testimonial ──────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string
  author: string
  role: string
  company: string
  quote: string
  avatar?: string
}

// ─── Partner ──────────────────────────────────────────────────────────────────
export interface Partner {
  id: string
  name: string
  logo?: string
  type: 'Institution' | 'Entreprise' | 'Académique'
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
export interface Stat {
  label: string
  value: string
  description?: string
}

// ─── Company (SIRET lookup) ───────────────────────────────────────────────────
export interface CompanyInfo {
  siret: string
  raisonSociale: string
  adresse: string
  codeNAF: string
  libelleNAF: string
  formeJuridique: string
  codePostal: string
  ville: string
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
export type QuizNeed = 'discover' | 'project' | 'expert' | 'training'
export type QuizStructure = 'pme' | 'startup' | 'collectivite' | 'eti' | 'structure'
export type QuizMaturity = 'beginner' | 'intermediate' | 'advanced'

export interface QuizState {
  step: number
  need: QuizNeed | null
  structure: QuizStructure | null
  maturity: QuizMaturity | null
}

export interface QuizResult {
  title: string
  description: string
  ctas: Array<{ label: string; href: string }>
}

// ─── Project Form ─────────────────────────────────────────────────────────────
export interface ProjectFormData {
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  siret: string
  sector: string
  companySize: string
  maturityLevel: string
  projectType: string
  estimatedBudget: string
  projectHorizon: string
  mainNeed: string
  description: string
}
