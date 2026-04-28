import type { Expert, Training } from '../types'
import { experts as allExperts } from '../data/experts'
import { trainings as allTrainings } from '../data/training'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FundingAid {
  name: string
  provider: string
  description: string
  amount: string
  eligibility: string
  link?: string
}

export interface ActionStep {
  number: number
  title: string
  description: string
  urgency: 'immediate' | 'short' | 'medium'
}

export interface OrientationResult {
  experts: Expert[]
  trainings: Training[]
  fundings: FundingAid[]
  actionPlan: ActionStep[]
  summaryLine: string
}

// ─── Form values (mirrors ProjectForm schema) ──────────────────────────────

export interface FormSnapshot {
  company: string
  sector: string
  companySize: string
  maturityLevel: string
  projectType: string
  estimatedBudget: string
  projectHorizon: string
  mainNeed: string
}

// ─── Sector map ────────────────────────────────────────────────────────────

const SECTOR_TO_EXPERT_SECTORS: Record<string, string[]> = {
  industrie: ['Industrie', 'Logistique'],
  sante: ['Santé'],
  finance: ['Finance'],
  retail: ['Retail', 'Marketing', 'Communication'],
  rh: ['RH', 'Formation'],
  collectivite: ['Collectivités'],
  btp: ['BTP', 'Industrie'],
  energie: ['Énergie', 'Industrie'],
  tech: ['Tech'],
  agri: ['Industrie'],
  autre: [],
}

const PROJECT_TO_EXPERTISE: Record<string, string[]> = {
  automatisation: ['Automatisation', 'Prompt engineering'],
  analyse: ['Machine Learning', 'Data pipeline'],
  prediction: ['Maintenance prédictive', 'Machine Learning', 'IoT'],
  nlp: ['NLP', 'IA générative', 'Prompt engineering'],
  vision: ['Vision industrielle'],
  generatif: ['IA générative', 'Automatisation', 'Prompt engineering'],
  recommandation: ['Machine Learning', 'Analytics RH'],
  autre: [],
}

// ─── Expert scoring ────────────────────────────────────────────────────────

function scoreExpert(expert: Expert, sectors: string[], expertiseTags: string[]): number {
  let score = 0
  for (const s of sectors) {
    if (expert.sectors.some(es => es.toLowerCase().includes(s.toLowerCase()))) score += 2
  }
  for (const tag of expertiseTags) {
    if (expert.expertise.some(e => e.toLowerCase().includes(tag.toLowerCase()))) score += 1
  }
  return score
}

function matchExperts(form: FormSnapshot): Expert[] {
  const sectors = SECTOR_TO_EXPERT_SECTORS[form.sector] ?? []
  const expertiseTags = PROJECT_TO_EXPERTISE[form.projectType] ?? []

  // For collectivities, always include Céline Moreau
  const baseExperts = [...allExperts]

  const scored = baseExperts
    .map(e => ({ expert: e, score: scoreExpert(e, sectors, expertiseTags) }))
    .sort((a, b) => b.score - a.score)

  const top = scored.filter(x => x.score > 0).slice(0, 3).map(x => x.expert)

  // Fallback if no match: return generic strategy + training experts
  if (top.length === 0) {
    return baseExperts.filter(e => e.level === 'Conseil' || e.level === 'Formation').slice(0, 2)
  }
  return top
}

// ─── Training scoring ──────────────────────────────────────────────────────

const MATURITY_TO_LEVEL: Record<string, Training['level'][]> = {
  none: ['Débutant'],
  beginner: ['Débutant'],
  exploring: ['Débutant', 'Intermédiaire'],
  running: ['Intermédiaire', 'Avancé'],
  advanced: ['Avancé', 'Intermédiaire'],
}

const SIZE_TO_PROFILE: Record<string, Training['profile'][]> = {
  tpe: ['Dirigeants', 'Managers / Métiers'],
  pme: ['Dirigeants', 'Managers / Métiers', 'Profils techniques'],
  eti: ['Profils techniques', 'Managers / Métiers', 'Dirigeants'],
  ge: ['Profils techniques', 'Managers / Métiers'],
  collectivite: ['Collectivités', 'Dirigeants'],
  startup: ['Profils techniques', 'Managers / Métiers'],
}

function matchTrainings(form: FormSnapshot): Training[] {
  const levels = MATURITY_TO_LEVEL[form.maturityLevel] ?? ['Débutant']
  const profiles = SIZE_TO_PROFILE[form.companySize] ?? ['Managers / Métiers']

  // Special case: formation need → prioritize training experts
  const needsFormation = form.mainNeed === 'formation' || form.mainNeed === 'tout'

  const scored = allTrainings.map(t => {
    let score = 0
    if (levels.includes(t.level)) score += 3
    if (profiles.includes(t.profile)) score += 2
    if (form.companySize === 'collectivite' && t.profile === 'Collectivités') score += 4
    if (needsFormation) score += 1
    return { training: t, score }
  }).sort((a, b) => b.score - a.score)

  return scored.filter(x => x.score > 0).slice(0, 3).map(x => x.training)
}

// ─── Funding aids ──────────────────────────────────────────────────────────

const ALL_FUNDINGS: Array<FundingAid & { eligibleSizes: string[]; minMaturity: string[] }> = [
  {
    name: 'Diagnostic Numérique CCI',
    provider: 'CCI Centre-Val de Loire',
    description: 'Audit gratuit de votre maturité numérique et IA, avec plan d\'action personnalisé remis en fin de mission.',
    amount: 'Gratuit',
    eligibility: 'Toutes entreprises de la région',
    link: 'https://www.cci-loirevalley.fr',
    eligibleSizes: ['tpe', 'pme', 'eti', 'ge', 'startup', 'collectivite'],
    minMaturity: ['none', 'beginner', 'exploring', 'running', 'advanced'],
  },
  {
    name: 'Prêt Transformation Numérique Bpifrance',
    provider: 'Bpifrance',
    description: 'Financement de 10 000 € à 3 M€ pour les projets de transformation digitale et d\'IA. Taux préférentiels, sans garantie sur les actifs.',
    amount: '10 000 € – 3 M€',
    eligibility: 'PME, ETI, startups françaises',
    link: 'https://www.bpifrance.fr',
    eligibleSizes: ['pme', 'eti', 'startup'],
    minMaturity: ['beginner', 'exploring', 'running', 'advanced'],
  },
  {
    name: 'Aide Région – Numérique & Innovation',
    provider: 'Région Centre-Val de Loire',
    description: 'Subvention pouvant couvrir jusqu\'à 50 % des dépenses d\'investissement dans des projets IA ou de transformation numérique pour les entreprises régionales.',
    amount: 'Jusqu\'à 50 % des dépenses',
    eligibility: 'PME et ETI implantées en Centre-Val de Loire',
    link: 'https://www.centre-valdeloire.fr',
    eligibleSizes: ['pme', 'eti'],
    minMaturity: ['beginner', 'exploring', 'running', 'advanced'],
  },
  {
    name: 'France 2030 – AMI IA',
    provider: 'BPI France / État',
    description: 'Appel à manifestation d\'intérêt pour les projets IA ambitieux. Subventions et avances remboursables pour les projets à fort impact.',
    amount: 'Variable (dossier)',
    eligibility: 'Toutes entreprises sur projets structurants',
    link: 'https://www.bpifrance.fr/nos-appels-a-projets-concours',
    eligibleSizes: ['pme', 'eti', 'ge', 'startup'],
    minMaturity: ['exploring', 'running', 'advanced'],
  },
  {
    name: 'Financement OPCO – Formation IA',
    provider: 'OPCO (selon branche)',
    description: 'Prise en charge totale ou partielle des formations IA de vos collaborateurs via votre opérateur de compétences.',
    amount: 'Jusqu\'à 100 % de la formation',
    eligibility: 'Toutes entreprises de droit privé',
    link: 'https://www.opco.fr',
    eligibleSizes: ['tpe', 'pme', 'eti', 'ge', 'startup'],
    minMaturity: ['none', 'beginner', 'exploring', 'running', 'advanced'],
  },
  {
    name: 'Crédit d\'Impôt Innovation (CII)',
    provider: 'Direction Générale des Finances Publiques',
    description: 'Crédit d\'impôt de 20 % (30 % en Corse) sur les dépenses d\'innovation, incluant les projets IA pour les PME.',
    amount: '20 % des dépenses éligibles',
    eligibility: 'PME au sens communautaire',
    link: 'https://www.impots.gouv.fr',
    eligibleSizes: ['tpe', 'pme', 'startup'],
    minMaturity: ['exploring', 'running', 'advanced'],
  },
  {
    name: 'Fonds Européen FEDER – Innovation numérique',
    provider: 'Europe / Région Centre-Val de Loire',
    description: 'Cofinancement européen pour les projets d\'innovation numérique et IA portés par des collectivités ou entreprises locales.',
    amount: 'Variable selon projet',
    eligibility: 'Collectivités et entreprises régionales',
    link: 'https://www.centre-valdeloire.fr/vivre/europe/les-fonds-europeens',
    eligibleSizes: ['collectivite', 'pme', 'eti'],
    minMaturity: ['beginner', 'exploring', 'running', 'advanced'],
  },
]

function matchFundings(form: FormSnapshot): FundingAid[] {
  return ALL_FUNDINGS
    .filter(f =>
      f.eligibleSizes.includes(form.companySize) &&
      f.minMaturity.includes(form.maturityLevel)
    )
    .slice(0, 4)
    .map(({ eligibleSizes: _s, minMaturity: _m, ...f }) => f)
}

// ─── Action plan ────────────────────────────────────────────────────────────

const ACTION_PLANS: Record<string, ActionStep[]> = {
  none: [
    {
      number: 1,
      title: 'Faites un diagnostic IA gratuit',
      description: 'La CCI Centre-Val de Loire propose un audit numérique gratuit pour identifier vos premières opportunités IA sans engagement.',
      urgency: 'immediate',
    },
    {
      number: 2,
      title: 'Sensibilisez vos équipes dirigeantes',
      description: 'Une demi-journée de formation suffit pour aligner votre direction sur les enjeux IA et poser les bases d\'une décision éclairée.',
      urgency: 'short',
    },
    {
      number: 3,
      title: 'Identifiez un cas d\'usage pilote',
      description: 'Ciblez une tâche répétitive, chronophage ou coûteuse dans votre activité. C\'est souvent là que l\'IA apporte les gains les plus rapides.',
      urgency: 'medium',
    },
  ],
  beginner: [
    {
      number: 1,
      title: 'Structurez votre réflexion avec un expert',
      description: 'Un consultant IA peut vous aider à cartographier vos processus et hiérarchiser les cas d\'usage selon leur faisabilité et leur ROI potentiel.',
      urgency: 'immediate',
    },
    {
      number: 2,
      title: 'Testez un outil IA en conditions réelles',
      description: 'Avant tout investissement lourd, expérimentez un outil no-code (IA générative, automatisation) sur un périmètre limité pour valider l\'adhésion des équipes.',
      urgency: 'short',
    },
    {
      number: 3,
      title: 'Préparez votre dossier de financement',
      description: 'Des aides spécifiques existent pour les entreprises en phase d\'exploration IA. Un conseiller BPI ou CCI peut vous orienter en moins d\'une heure.',
      urgency: 'medium',
    },
  ],
  exploring: [
    {
      number: 1,
      title: 'Priorisez et cadrez votre cas d\'usage',
      description: 'Transformez votre exploration en projet concret : définissez les données disponibles, les KPIs cibles, et le budget alloué au pilote.',
      urgency: 'immediate',
    },
    {
      number: 2,
      title: 'Constituez l\'équipe projet',
      description: 'Associez un référent métier, un expert technique (interne ou externe) et un sponsor direction. L\'IA réussit quand les trois sont alignés.',
      urgency: 'short',
    },
    {
      number: 3,
      title: 'Sécurisez un financement avant de lancer',
      description: 'France 2030, aides régionales, CII… Les financements disponibles peuvent couvrir 30 à 50 % de votre projet. Déposez le dossier en parallèle du lancement.',
      urgency: 'medium',
    },
  ],
  running: [
    {
      number: 1,
      title: 'Mesurez et documentez vos premiers résultats',
      description: 'Mettez en place un tableau de bord simple (temps gagné, coût réduit, erreurs évitées). Ces chiffres seront clés pour convaincre d\'étendre le projet.',
      urgency: 'immediate',
    },
    {
      number: 2,
      title: 'Identifiez les prochains périmètres à IA-iser',
      description: 'Fort des apprentissages du pilote, cartographiez les 2-3 processus suivants à fort potentiel. La scalabilité commence maintenant.',
      urgency: 'short',
    },
    {
      number: 3,
      title: 'Formez les équipes en continu',
      description: 'L\'adoption est le principal frein à la valeur. Investissez dans la formation et le change management avant de passer à l\'échelle.',
      urgency: 'medium',
    },
  ],
  advanced: [
    {
      number: 1,
      title: 'Industrialisez et automatisez le cycle ML',
      description: 'Mettez en place un pipeline MLOps pour automatiser l\'entraînement, le déploiement et la surveillance de vos modèles en production.',
      urgency: 'immediate',
    },
    {
      number: 2,
      title: 'Valorisez votre maturité IA en externe',
      description: 'Votre avance est un actif : communiquez sur vos résultats, participez aux événements IA Loire Valley, et positionnez-vous comme référence dans votre secteur.',
      urgency: 'short',
    },
    {
      number: 3,
      title: 'Lancez un programme de formation interne',
      description: 'Transformez vos experts en formateurs internes. La culture IA durable passe par la diffusion des compétences à tous les niveaux de l\'organisation.',
      urgency: 'medium',
    },
  ],
}

// ─── Summary line ──────────────────────────────────────────────────────────

const MATURITY_LABELS: Record<string, string> = {
  none: 'sans projet IA défini',
  beginner: 'en phase de réflexion',
  exploring: 'en exploration IA',
  running: 'avec projet(s) IA en cours',
  advanced: 'avec IA déjà déployée',
}

const PROJECT_LABELS: Record<string, string> = {
  automatisation: 'automatisation de tâches',
  analyse: 'analyse de données',
  prediction: 'prédiction / maintenance',
  nlp: 'traitement du texte',
  vision: 'vision par ordinateur',
  generatif: 'IA générative',
  recommandation: 'recommandation',
  autre: 'projet IA',
}

// ─── Main function ─────────────────────────────────────────────────────────

export function computeOrientation(form: FormSnapshot): OrientationResult {
  const experts = matchExperts(form)
  const trainings = matchTrainings(form)
  const fundings = matchFundings(form)
  const actionPlan = ACTION_PLANS[form.maturityLevel] ?? ACTION_PLANS.beginner

  const maturityLabel = MATURITY_LABELS[form.maturityLevel] ?? ''
  const projectLabel = PROJECT_LABELS[form.projectType] ?? 'projet IA'
  const summaryLine = `${form.company} — ${maturityLabel}, projet de ${projectLabel}`

  return { experts, trainings, fundings, actionPlan, summaryLine }
}
