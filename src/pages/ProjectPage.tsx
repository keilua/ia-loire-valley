import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'

// ── Lookup SIRET/SIREN → données entreprise ──────────────────────────────────

function nafToSecteur(naf: string): string {
  const code = parseInt(naf?.slice(0, 2) ?? '0', 10)
  if (code >= 1 && code <= 3) return 'Agriculture et alimentation'
  if (code >= 10 && code <= 33) return 'Industrie manufacturière'
  if (code === 35) return "Énergie et services d'utilité publique"
  if (code >= 36 && code <= 39) return 'Environnement'
  if (code >= 41 && code <= 43) return 'Construction'
  if (code >= 45 && code <= 47) return 'Commerce de gros et de détail'
  if (code >= 49 && code <= 53) return 'Mobilité (y compris automobile)'
  if (code >= 55 && code <= 56) return 'Tourisme (y compris restaurants et hôtellerie)'
  if (code >= 58 && code <= 63) return 'Télécommunications, information et communication'
  if (code >= 64 && code <= 66) return 'Services financiers'
  if (code === 68) return 'Immobilier, location et services aux entreprises'
  if (code >= 69 && code <= 75) return 'Activités spécialisées, scientifiques et techniques'
  if (code >= 77 && code <= 82) return 'Immobilier, location et services aux entreprises'
  if (code === 85) return 'Enseignement'
  if (code >= 86 && code <= 88) return 'Sciences de la vie et soins de santé'
  if (code >= 90 && code <= 93) return 'Secteur de la culture et de la création'
  if (code >= 94 && code <= 96) return 'Services collectifs, sociaux et personnels'
  return 'Autre'
}

function deptToOption(dept: string): string {
  const MAP: Record<string, string> = {
    '18': '18 - Cher', '28': '28 - Eure-et-Loir', '36': '36 - Indre',
    '37': '37 - Indre-et-Loire', '41': '41 - Loir-et-Cher', '45': '45 - Loiret',
  }
  return MAP[dept] ?? 'Hors région'
}

function trancheToNb(tranche: string): string {
  const MAP: Record<string, string> = {
    'NN': '0', '00': '0', '01': '1', '02': '3', '03': '6',
    '11': '10', '12': '20', '21': '50', '22': '100', '31': '200',
    '32': '250', '41': '500', '42': '1 000', '51': '2 000', '52': '5 000', '53': '10 000',
  }
  return MAP[tranche] ?? ''
}

// ── Types ────────────────────────────────────────────────────────────────────

type RadioValue = 'Non utilisé' | 'Envisagé' | 'Opérationnel' | ''

type ArrayField =
  | 'domainesProjet' | 'preparationNumerique' | 'processusDematerialises'
  | 'moyensAcces' | 'outilsPresence' | 'accompagnementRH' | 'actionsFormation'
  | 'gestionDonnees' | 'cybersecurite' | 'solutionsEnv' | 'principesEnv' | 'politiqueEnv'

interface QuizData {
  // Étape 1 — Fiche structure
  raisonSociale: string
  siret: string
  anneeCreation: string
  departement: string
  nbSalaries: string
  secteur: string
  descriptionActivite: string
  siteWeb: string
  nomPrenom: string
  fonction: string
  email: string
  telephone: string
  projetIdentifie: string
  domainesProjet: string[]
  descriptionProjet: string
  // Étape 2 — Stratégie numérique
  investissements: Record<string, { realise: boolean; envisage: boolean }>
  preparationNumerique: string[]
  infoStrategique: string
  // Étape 3 — Environnement existant
  processusDematerialises: string[]
  moyensAcces: string[]
  outilsPresence: string[]
  infoEnvironnement: string
  // Étape 4 — Contexte RH
  accompagnementRH: string[]
  actionsFormation: string[]
  infoRH: string
  // Étape 5 — Gestion des données
  gestionDonnees: string[]
  cybersecurite: string[]
  infoDonnees: string
  // Étape 6 — Automatisation et IA
  technologiesIndustrie: Record<string, RadioValue>
  solutionsIA: Record<string, RadioValue>
  infoIA: string
  // Étape 7 — Numérique responsable
  solutionsEnv: string[]
  principesEnv: string[]
  politiqueEnv: string[]
  infoRSE: string
  // Consentement
  rgpdConsent: boolean
}

// ── Données statiques ────────────────────────────────────────────────────────

const SECTEURS = [
  'Aéronautique et espace',
  'Activités spécialisées, scientifiques et techniques',
  'Agriculture et alimentation',
  'Biens/produits de consommation',
  'Commerce de gros et de détail',
  'Construction',
  'Défense et sécurité',
  'Enseignement',
  'Énergie et services d\'utilité publique',
  'Environnement',
  'Immobilier, location et services aux entreprises',
  'Industrie manufacturière',
  'Mobilité (y compris automobile)',
  'Sciences de la vie et soins de santé',
  'Services collectifs, sociaux et personnels',
  'Services financiers',
  'Secteur de la culture et de la création',
  'Télécommunications, information et communication',
  'Tourisme (y compris restaurants et hôtellerie)',
  'Autre',
]

const DEPARTEMENTS = [
  '18 - Cher', '28 - Eure-et-Loir', '36 - Indre',
  '37 - Indre-et-Loire', '41 - Loir-et-Cher', '45 - Loiret', 'Hors région',
]

const DOMAINES_PROJET = ['Formation', 'Dématérialisation', 'Cybersécurité', 'Intelligence Artificielle', 'Objets connectés', 'Autre']

const DOMAINES_INVESTISSEMENT = [
  'Développement et innovation (conception de produits, R&D)',
  'Planification et gestion de projet',
  'Production et fabrication (biens, emballage, maintenance, services)',
  'Collaboration interne et externe (échanges avec d\'autres sites ou entreprises partenaires)',
  'Logistique - Stockage (gestion des stocks et entrepôts)',
  'Marketing, vente et services à la clientèle (gestion de la clientèle, traitement des commandes, centre d\'assistance, etc.)',
  'Logistique - Livraison et facturation (expédition, factures électroniques)',
  'Administration et RH (gestion des employés, documents internes)',
  'Achats et marchés publics',
  '(Cyber)sécurité et respect de la réglementation sur les données à caractère personnel/du RGPD',
]

const PREPARATION_NUMERIQUE = [
  'Nous avons identifié nos besoins numériques et ils sont alignés sur nos objectifs commerciaux.',
  'Nous avons prévu un budget pour financer la transformation numérique (fonds propres, prêts, subventions).',
  'Nos infrastructures informatiques sont adaptées pour soutenir la transformation numérique.',
  'Nous avons des experts en numérique en interne ou en sous-traitance (ou avons identifié nos besoins en recrutement).',
  'La direction de l\'entreprise est prête à procéder aux changements d\'organisation nécessaires.',
  'Au sein de l\'entreprise, les équipes sont formées et prêtes à adopter les nouveaux outils numériques.',
  'L\'architecture de l\'entreprise et les processus opérationnels peuvent être adaptés si la numérisation l\'exige.',
  'Nos produits ou services sont déjà numérisés ou complétés par des solutions digitales.',
  'Nous suivons la satisfaction de nos clients et partenaires sur nos services en ligne (réseaux sociaux, e-commerce, emails...).',
  'Nous avons pris en compte les risques liés à la transformation numérique (effets imprévus sur d\'autres activités).',
]

const PROCESSUS_DEMATERIALISES = [
  'Connexion avec les Administrations en ligne (Chorus, marchés publics)',
  'Outils de collaboration à distance (télétravail, visio, formations en ligne)',
  'Outils de gestion d\'entreprise (gestion des clients, stocks, facturation, production... exemples de solutions: GED, ERP, CRM, PLM, WMS)',
]

const MOYENS_ACCES = [
  'Connexion à distance (VPN, cloud, accès sécurisé aux systèmes internes).',
  'Intranet de l\'entreprise (ex : portail sécurisé accessible à distance)',
]

const OUTILS_PRESENCE = [
  'Site web d\'entreprise (présentation, catalogue en ligne, site vitrine)',
  'Formulaires et blogs/forums (interaction avec les clients et prospects)',
  'Messagerie instantanée et réseaux sociaux pour communiquer avec les clients',
  'Vente en ligne (e-commerce B2C ou B2B)',
  'Marketing en ligne (publicités sur internet, réseaux sociaux professionnels, référencement)',
]

const ACCOMPAGNEMENT_RH = [
  'Nous informons clairement nos employés sur les changements numériques et les impliquons dans le processus',
  'Nous surveillons l\'impact du numérique sur le bien-être des employés (crainte du changement, équilibre pro/perso, connexion permanente)',
  'Nous impliquons tout le personnel (même non spécialiste du numérique) dans la conception des nouveaux outils et processus',
  'Nous donnons plus d\'autonomie aux employés avec des outils numériques adaptés',
  'Nous adaptons les postes et l\'organisation du travail selon les besoins des employés',
  'Nous proposons des modes de travail flexibles grâce à la numérisation, comme le télétravail ou des horaires aménagés',
  'Nous offrons un support technique via une équipe ou un service d\'assistance numérique',
]

const ACTIONS_FORMATION = [
  'Nous sensibilisons nos employés aux nouvelles technologies numériques',
  'Nous évaluons leurs compétences pour identifier leurs besoins en formation',
  'Nous élaborons un plan de formation',
  'Nous organisons des formations ciblées (tutoriels, formations courtes en ligne)',
  'Nous encourageons l\'apprentissage par la pratique (parrainage, mentorat, expérimentation)',
  'Nous proposons des stages ou immersions dans des domaines clés',
  'Nous permettons l\'accès à des formations externes (organismes spécialisés, universités, fournisseurs)',
  'Nous utilisons des dispositifs de formation subventionnés pour accompagner les collaborateurs (OPCO,...)',
]

const GESTION_DONNEES = [
  'Nous avons mis en place une politique de gestion des données (règles et bonnes pratiques, cartographie des données)',
  'Nous collectons nos données de manière numérique',
  'Nous stockons nos données sous format numérique (logiciels bureautiques, ERP, CRM, dossiers électroniques,...)',
  'Nos systèmes sont connectés et permettent l\'échange fluide des données entre différentes plateformes',
  'Nos données sont accessibles en temps réel depuis plusieurs appareils et emplacements',
  'Nous analysons systématiquement les données pour appuyer nos prises de décision',
  'Nous combinons nos données internes avec des sources externes pour affiner nos analyses',
  'Nos analyses sont facilement accessibles via des outils comme des tableaux de bord, sans besoin d\'experts',
]

const CYBERSECURITE = [
  'Nous avons une politique de sécurité des données avec des règles et des bonnes pratiques',
  'Nous protégeons les données clients contre les cyberattaques',
  'Nos employés sont sensibilisés / formés régulièrement aux risques de cybersécurité et à la protection des données',
  'Nous surveillons et évaluons les cybermenaces de façon continue',
  'Nous effectuons des sauvegardes sécurisées des données critiques (hors site ou dans le cloud)',
  'Nous avons un plan de continuité d\'activité en cas de cyberattaque ou de panne majeure',
]

const TECHNO_INDUSTRIE = [
  'Jumeaux numériques et simulation (modélisation en temps réel des équipements et processus)',
  'Réalité virtuelle et augmentée (formation immersive, assistance à distance, visualisation 3D)',
  'Conception et fabrication assistées par ordinateur (CAO, FAO pour la conception et la production)',
  'Systèmes d\'exécution de fabrication (MES pour suivre et optimiser la production en temps réel)',
  'Internet des objets (IoT industriel) (capteurs connectés, machines communicantes, maintenance prédictive)',
  'Technologie blockchain (traçabilité, sécurité et certification des échanges de données)',
  'Fabrication additive (impression 3D) (prototypage rapide, production personnalisée)',
  'Robotique et dispositifs autonomes (automatisation des tâches, robots collaboratifs, véhicules autonomes)',
]

const SOLUTIONS_IA = [
  'Analyse et compréhension du langage (chatbots, analyse de texte, traduction automatique, détection des sentiments)',
  'Reconnaissance d\'images et vision par ordinateur (analyse de photos, vidéos, surveillance, inspection automatisée)',
  'Reconnaissance et traitement audio (transcription vocale, synthèse de la parole, commandes vocales)',
  'Analyse et prise de décision assistée (veille stratégique, analyse de données, recommandations intelligentes, contrôle automatisé)',
]

const SOLUTIONS_ENV = [
  'Adoption d\'un modèle économique durable (économie circulaire, sobriété numérique, optimisation des ressources)',
  'Développement de services numériques durables (éco-conception logicielle, solutions à faible impact environnemental)',
  'Conception de produits durables avec gestion du cycle de vie (éco-conception, recyclabilité, optimisation des flux de production)',
  'Mise en œuvre de méthodes de production durables (optimisation des process, réduction des déchets, énergies renouvelables)',
]

const PRINCIPES_ENV = [
  'Gestion des déchets grâce aux outils numériques (suivi des déchets, recyclage intelligent, gestion responsable du matériel IT)',
  'Production d\'énergie durable dans ses propres locaux (énergies renouvelables, gestion intelligente de l\'énergie, optimisation des infrastructures IT)',
  'Optimisation de la consommation et du coût des matières premières (réduction du gaspillage, gestion durable des ressources)',
  'Réduction de l\'impact logistique (optimisation des transports et des emballages)',
  'Sensibilisation des consommateurs (applications numériques favorisant des comportements écoresponsables)',
  'Dématérialisation des processus administratifs pour réduire l\'empreinte environnementale (réduction de l\'usage du papier, digitalisation des flux, optimisation des ressources)',
]

const POLITIQUE_ENV = [
  'Intégration du volet environnemental dans la stratégie globale de l\'entreprise (RSE, engagement durable, suivi des indicateurs d\'impact écologique)',
  'Obtention ou maintien d\'une certification environnementale',
  'Inclusion de critères environnementaux dans les appels d\'offres et la sélection des fournisseurs',
  'Optimisation de la consommation des outils numériques pour réduire l\'empreinte carbone (sobriété numérique, hébergement green, éco-conception IT)',
  'Recyclage / réutilisation des équipements technologiques',
]

const STEPS = [
  { label: 'Présentation', category: 'INTRODUCTION' },
  { label: 'Fiche structure', category: 'VOTRE ENTREPRISE' },
  { label: 'Stratégie numérique', category: 'STRATÉGIE NUMÉRIQUE' },
  { label: 'Environnement existant', category: 'ENVIRONNEMENT EXISTANT' },
  { label: 'Contexte RH', category: 'CONTEXTE RH' },
  { label: 'Gestion des données', category: 'GESTION DES DONNÉES' },
  { label: 'Automatisation et IA', category: 'AUTOMATISATION ET IA' },
  { label: 'Numérique responsable', category: 'NUMÉRIQUE RESPONSABLE' },
]

const initRadio = (items: string[]): Record<string, RadioValue> =>
  Object.fromEntries(items.map(k => [k, '']))

const initial: QuizData = {
  raisonSociale: '', siret: '', anneeCreation: '', departement: '', nbSalaries: '',
  secteur: '', descriptionActivite: '', siteWeb: '', nomPrenom: '', fonction: '',
  email: '', telephone: '', projetIdentifie: '', domainesProjet: [], descriptionProjet: '',
  investissements: Object.fromEntries(DOMAINES_INVESTISSEMENT.map(d => [d, { realise: false, envisage: false }])),
  preparationNumerique: [], infoStrategique: '',
  processusDematerialises: [], moyensAcces: [], outilsPresence: [], infoEnvironnement: '',
  accompagnementRH: [], actionsFormation: [], infoRH: '',
  gestionDonnees: [], cybersecurite: [], infoDonnees: '',
  technologiesIndustrie: initRadio(TECHNO_INDUSTRIE),
  solutionsIA: initRadio(SOLUTIONS_IA), infoIA: '',
  solutionsEnv: [], principesEnv: [], politiqueEnv: [], infoRSE: '',
  rgpdConsent: false,
}

// ── Composants utilitaires ────────────────────────────────────────────────────

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

function QuestionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-gray-800 mb-3 text-sm leading-relaxed">{children}</p>
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className={`flex items-start gap-3 p-4 rounded-2xl cursor-pointer transition-all border-2 ${
      checked
        ? 'border-violet bg-violet/5'
        : 'border-gray-100 bg-gray-50/80 hover:border-violet/30 hover:bg-gray-50'
    }`}>
      <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-colors ${
        checked ? 'bg-violet border-violet' : 'border-gray-300'
      }`}>
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={`text-sm leading-relaxed ${checked ? 'text-violet font-medium' : 'text-gray-700'}`}>{label}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    </label>
  )
}

function RadioItem({ label, selected, onChange }: { label: string; selected: boolean; onChange: () => void }) {
  return (
    <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
      selected ? 'border-violet bg-violet/5' : 'border-gray-100 bg-gray-50/80 hover:border-violet/30'
    }`}>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-violet' : 'border-gray-300'}`}>
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-violet" />}
      </div>
      <span className={`text-sm font-medium ${selected ? 'text-violet' : 'text-gray-800'}`}>{label}</span>
      <input type="radio" className="sr-only" checked={selected} onChange={onChange} />
    </label>
  )
}

function FieldInput({ label, required, ...props }: { label: string; required?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-magenta ml-1">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet"
      />
    </div>
  )
}

function FieldSelect({ label, required, options, value, onChange }: {
  label: string; required?: boolean; options: string[]; value: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}{required && <span className="text-magenta ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet bg-white"
      >
        <option value="">— Sélectionnez —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function FieldTextarea({ label, value, onChange, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet resize-none"
      />
    </div>
  )
}

const RADIO_COLS: RadioValue[] = ['Non utilisé', 'Envisagé', 'Opérationnel']

const RADIO_COL_STYLES: Record<RadioValue, { active: string; inactive: string }> = {
  '': { active: '', inactive: '' },
  'Non utilisé': {
    active: 'border-gray-400 bg-gray-100 text-gray-700 font-semibold',
    inactive: 'border-gray-200 bg-white text-gray-500 hover:border-gray-300',
  },
  'Envisagé': {
    active: 'border-orange bg-orange/10 text-orange font-semibold',
    inactive: 'border-gray-200 bg-white text-gray-500 hover:border-orange/40',
  },
  'Opérationnel': {
    active: 'border-violet bg-violet/10 text-violet font-semibold',
    inactive: 'border-gray-200 bg-white text-gray-500 hover:border-violet/40',
  },
}

function RadioCardGroup({ items, values, onChange }: {
  items: string[]
  values: Record<string, RadioValue>
  onChange: (item: string, val: RadioValue) => void
}) {
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">{item}</p>
          <div className="grid grid-cols-3 gap-2">
            {RADIO_COLS.map(col => {
              const isActive = values[item] === col
              const styles = RADIO_COL_STYLES[col]
              return (
                <button
                  key={col}
                  type="button"
                  onClick={() => onChange(item, col)}
                  className={`py-2 px-1 rounded-xl border-2 text-xs text-center transition-all cursor-pointer ${
                    isActive ? styles.active : styles.inactive
                  }`}
                >
                  {col}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Étapes ────────────────────────────────────────────────────────────────────

function StepIntro() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagnostic de maturité numérique</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ce questionnaire s'inscrit dans le cadre de l'initiative régionale <strong>IA Loire Valley</strong> pour accompagner la transformation numérique des entreprises du Centre-Val de Loire.
      </p>
      <p className="text-gray-600 leading-relaxed mb-6">
        En 7 étapes, évaluez votre maturité dans les domaines clés : stratégie, environnement existant, ressources humaines, gestion des données, automatisation et numérique responsable.
      </p>
      <div className="bg-violet/5 rounded-2xl p-5 border border-violet/10">
        <p className="text-sm font-semibold text-violet mb-3">À l'issue du questionnaire :</p>
        <ul className="space-y-2">
          {[
            'Un entretien de bilan vous sera proposé',
            'Un plan d\'action adapté à votre entreprise sera identifié',
            'Vous serez mis en relation avec les bons experts et dispositifs régionaux',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-violet shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function StepFicheStructure({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const [lookupStatus, setLookupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  const handleSiret = async (value: string) => {
    set('siret')(value)
    const clean = value.replace(/\s/g, '')
    if (clean.length !== 9 && clean.length !== 14) { setLookupStatus('idle'); return }
    setLookupStatus('loading')
    try {
      const res = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${clean}&page=1&per_page=1`)
      const json = await res.json()
      const company = json.results?.[0]
      if (!company) { setLookupStatus('error'); return }
      const siege = company.siege ?? {}
      setData(d => ({
        ...d,
        raisonSociale: company.nom_raison_sociale || company.nom_complet || d.raisonSociale,
        secteur: nafToSecteur(siege.activite_principale ?? ''),
        departement: deptToOption(siege.departement ?? ''),
        anneeCreation: company.date_creation?.slice(0, 4) ?? d.anneeCreation,
        nbSalaries: trancheToNb(company.tranche_effectif_salarie ?? ''),
      }))
      setLookupStatus('success')
    } catch {
      setLookupStatus('error')
    }
  }

  return (
    <div className="space-y-8">
      <SectionTitle title="Fiche structure" subtitle="Informations générales sur votre organisation" />

      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Votre organisation</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Raison Sociale" required value={data.raisonSociale} onChange={e => set('raisonSociale')(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              SIRET / SIREN<span className="text-magenta ml-1">*</span>
            </label>
            <div className="relative">
              <input
                value={data.siret}
                onChange={e => handleSiret(e.target.value)}
                placeholder="Ex: 123 456 789 ou 123 456 789 00012"
                className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet/30 focus:border-violet"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {lookupStatus === 'loading' && <Loader2 className="w-4 h-4 text-violet animate-spin" />}
                {lookupStatus === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                {lookupStatus === 'error' && <AlertCircle className="w-4 h-4 text-orange-400" />}
              </div>
            </div>
            {lookupStatus === 'success' && (
              <p className="text-xs text-green-600 mt-1">Entreprise trouvée — champs pré-remplis</p>
            )}
            {lookupStatus === 'error' && (
              <p className="text-xs text-orange-500 mt-1">Entreprise non trouvée — remplissez manuellement</p>
            )}
          </div>
          <FieldInput label="Année de création" required placeholder="ex: 2015" value={data.anneeCreation} onChange={e => set('anneeCreation')(e.target.value)} />
          <FieldSelect label="Département" required options={DEPARTEMENTS} value={data.departement} onChange={set('departement')} />
          <FieldInput label="Nombre de salariés" required value={data.nbSalaries} onChange={e => set('nbSalaries')(e.target.value)} />
          <FieldSelect label="Secteur d'activité" required options={SECTEURS} value={data.secteur} onChange={set('secteur')} />
        </div>
        <FieldTextarea label="Description de l'activité" value={data.descriptionActivite} onChange={set('descriptionActivite')} rows={3} />
        <FieldInput label="Site web" placeholder="https://" value={data.siteWeb} onChange={e => set('siteWeb')(e.target.value)} />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interlocuteur du diagnostic</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <FieldInput label="Nom Prénom" required value={data.nomPrenom} onChange={e => set('nomPrenom')(e.target.value)} />
          <FieldInput label="Fonction" required value={data.fonction} onChange={e => set('fonction')(e.target.value)} />
          <FieldInput label="Email" required type="email" value={data.email} onChange={e => set('email')(e.target.value)} />
          <FieldInput label="Téléphone" required value={data.telephone} onChange={e => set('telephone')(e.target.value)} />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mon projet numérique</p>
        <QuestionLabel>Avez-vous déjà identifié le(s) projet(s) numérique(s) prioritaire(s) pour votre entreprise ?</QuestionLabel>
        <div className="space-y-2">
          {['OUI', 'NON', 'Ne sais pas'].map(opt => (
            <RadioItem
              key={opt} label={opt}
              selected={data.projetIdentifie === opt}
              onChange={() => setData(d => ({ ...d, projetIdentifie: opt }))}
            />
          ))}
        </div>

        {data.projetIdentifie === 'OUI' && (
          <div className="pl-2 pt-2">
            <QuestionLabel>Si oui, dans quel(s) domaine(s) ?</QuestionLabel>
            <div className="space-y-2">
              {DOMAINES_PROJET.map(d => (
                <CheckItem key={d} label={d} checked={data.domainesProjet.includes(d)} onChange={() => toggleCheckbox('domainesProjet', d)} />
              ))}
            </div>
          </div>
        )}

        <FieldTextarea label="Décrivez votre projet numérique (optionnel)" value={data.descriptionProjet} onChange={set('descriptionProjet')} rows={3} />
      </div>
    </div>
  )
}

function StepStrategieNumerique({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  const toggleInvestissement = (domaine: string, type: 'realise' | 'envisage') => {
    setData(d => ({
      ...d,
      investissements: {
        ...d.investissements,
        [domaine]: { ...d.investissements[domaine], [type]: !d.investissements[domaine][type] },
      },
    }))
  }

  return (
    <div className="space-y-8">
      <SectionTitle title="Stratégie numérique" subtitle="État d'intégration du numérique dans vos projets existants et futurs" />

      <div>
        <QuestionLabel>Dans quels domaines votre entreprise a-t-elle déjà réalisé, ou envisage-t-elle de réaliser, des investissements liés à la transition numérique ?</QuestionLabel>
        <div className="space-y-3">
          {DOMAINES_INVESTISSEMENT.map(domaine => {
            const realise = data.investissements[domaine]?.realise ?? false
            const envisage = data.investissements[domaine]?.envisage ?? false
            return (
              <div key={domaine} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">{domaine}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleInvestissement(domaine, 'realise')}
                    className={`py-2 px-3 rounded-xl border-2 text-xs text-center transition-all cursor-pointer ${
                      realise
                        ? 'border-violet bg-violet/10 text-violet font-semibold'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-violet/40'
                    }`}
                  >
                    Réalisé
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInvestissement(domaine, 'envisage')}
                    className={`py-2 px-3 rounded-xl border-2 text-xs text-center transition-all cursor-pointer ${
                      envisage
                        ? 'border-magenta bg-magenta/10 text-magenta font-semibold'
                        : 'border-gray-200 bg-white text-gray-500 hover:border-magenta/40'
                    }`}
                  >
                    Envisagé
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <QuestionLabel>En quoi votre entreprise est-elle prête à avancer dans la transformation numérique ?</QuestionLabel>
        <div className="space-y-2">
          {PREPARATION_NUMERIQUE.map(item => (
            <CheckItem key={item} label={item} checked={data.preparationNumerique.includes(item)} onChange={() => toggleCheckbox('preparationNumerique', item)} />
          ))}
        </div>
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoStrategique} onChange={set('infoStrategique')} />
    </div>
  )
}

function StepEnvironnement({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  return (
    <div className="space-y-8">
      <SectionTitle title="Environnement existant" subtitle="L'environnement numérique existant dans votre organisation" />

      <div>
        <QuestionLabel>Quels sont les processus déjà dématérialisés dans l'entreprise ?</QuestionLabel>
        <div className="space-y-2">
          {PROCESSUS_DEMATERIALISES.map(item => (
            <CheckItem key={item} label={item} checked={data.processusDematerialises.includes(item)} onChange={() => toggleCheckbox('processusDematerialises', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Quels moyens sont utilisés pour accéder aux ressources de l'entreprise depuis l'extérieur ?</QuestionLabel>
        <div className="space-y-2">
          {MOYENS_ACCES.map(item => (
            <CheckItem key={item} label={item} checked={data.moyensAcces.includes(item)} onChange={() => toggleCheckbox('moyensAcces', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Quels outils ou solutions utilisez-vous pour assurer votre présence en ligne ?</QuestionLabel>
        <div className="space-y-2">
          {OUTILS_PRESENCE.map(item => (
            <CheckItem key={item} label={item} checked={data.outilsPresence.includes(item)} onChange={() => toggleCheckbox('outilsPresence', item)} />
          ))}
        </div>
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoEnvironnement} onChange={set('infoEnvironnement')} />
    </div>
  )
}

function StepContexteRH({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  return (
    <div className="space-y-8">
      <SectionTitle title="Contexte RH" subtitle="Le positionnement des collaborateurs face aux pratiques numériques" />

      <div>
        <QuestionLabel>Comment accompagnez-vous vos employés dans la transition numérique au quotidien (autonomie, qualité de vie au travail, implication) ?</QuestionLabel>
        <div className="space-y-2">
          {ACCOMPAGNEMENT_RH.map(item => (
            <CheckItem key={item} label={item} checked={data.accompagnementRH.includes(item)} onChange={() => toggleCheckbox('accompagnementRH', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Quelles actions mettez-vous en place pour former vos collaborateurs aux outils numériques ?</QuestionLabel>
        <div className="space-y-2">
          {ACTIONS_FORMATION.map(item => (
            <CheckItem key={item} label={item} checked={data.actionsFormation.includes(item)} onChange={() => toggleCheckbox('actionsFormation', item)} />
          ))}
        </div>
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoRH} onChange={set('infoRH')} />
    </div>
  )
}

function StepGestionDonnees({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Gestion des données"
        subtitle="La gestion et la protection des données exploitées dans votre organisation (Conformité RGPD, sauvegarde, cybersécurité,...)"
      />

      <div>
        <QuestionLabel>Comment votre entreprise gère-t-elle ses données en termes de stockage, organisation, accès et exploitation ?</QuestionLabel>
        <div className="space-y-2">
          {GESTION_DONNEES.map(item => (
            <CheckItem key={item} label={item} checked={data.gestionDonnees.includes(item)} onChange={() => toggleCheckbox('gestionDonnees', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Comment la cybersécurité est-elle intégrée dans votre entreprise ?</QuestionLabel>
        <div className="space-y-2">
          {CYBERSECURITE.map(item => (
            <CheckItem key={item} label={item} checked={data.cybersecurite.includes(item)} onChange={() => toggleCheckbox('cybersecurite', item)} />
          ))}
        </div>
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoDonnees} onChange={set('infoDonnees')} />
    </div>
  )
}

function StepAutomatisationIA({ data, setData }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  const setRadio = (table: 'technologiesIndustrie' | 'solutionsIA', item: string, val: RadioValue) => {
    setData(d => ({ ...d, [table]: { ...d[table], [item]: val } }))
  }

  return (
    <div className="space-y-8">
      <SectionTitle title="Automatisation et IA" subtitle="Positionnement des technologies avancées et Industrie 4.0" />

      <div>
        <QuestionLabel>Votre entreprise a-t-elle intégré ou envisage d'intégrer des technologies de l'Industrie 4.0 dans ses processus de production ou d'exploitation ?</QuestionLabel>
        <RadioCardGroup
          items={TECHNO_INDUSTRIE}
          values={data.technologiesIndustrie}
          onChange={(item, val) => setRadio('technologiesIndustrie', item, val)}
        />
      </div>

      <div>
        <QuestionLabel>Votre entreprise a-t-elle intégré ou envisage d'intégrer des solutions d'intelligence artificielle dans ses différents processus ?</QuestionLabel>
        <RadioCardGroup
          items={SOLUTIONS_IA}
          values={data.solutionsIA}
          onChange={(item, val) => setRadio('solutionsIA', item, val)}
        />
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoIA} onChange={set('infoIA')} />
    </div>
  )
}

function StepNumeriqueResponsable({ data, setData, toggleCheckbox }: {
  data: QuizData
  setData: React.Dispatch<React.SetStateAction<QuizData>>
  toggleCheckbox: (field: ArrayField, value: string) => void
}) {
  const set = (field: keyof QuizData) => (value: string) =>
    setData(d => ({ ...d, [field]: value }))

  return (
    <div className="space-y-8">
      <SectionTitle title="Numérique responsable" subtitle="Technologies, pratiques, comportements orientés développement durable" />

      <div>
        <QuestionLabel>Comment utilisez-vous des solutions numériques pour réduire votre impact environnemental et optimiser vos ressources ?</QuestionLabel>
        <div className="space-y-2">
          {SOLUTIONS_ENV.map(item => (
            <CheckItem key={item} label={item} checked={data.solutionsEnv.includes(item)} onChange={() => toggleCheckbox('solutionsEnv', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Comment intégrez-vous les principes de durabilité environnementale à l'aide des outils numériques (basse consommation, recyclage, sensibilisation) ?</QuestionLabel>
        <div className="space-y-2">
          {PRINCIPES_ENV.map(item => (
            <CheckItem key={item} label={item} checked={data.principesEnv.includes(item)} onChange={() => toggleCheckbox('principesEnv', item)} />
          ))}
        </div>
      </div>

      <div>
        <QuestionLabel>Votre entreprise a-t-elle mis en place une politique environnementale pour réduire son impact écologique ?</QuestionLabel>
        <div className="space-y-2">
          {POLITIQUE_ENV.map(item => (
            <CheckItem key={item} label={item} checked={data.politiqueEnv.includes(item)} onChange={() => toggleCheckbox('politiqueEnv', item)} />
          ))}
        </div>
      </div>

      <FieldTextarea label="Informations complémentaires" value={data.infoRSE} onChange={set('infoRSE')} />
    </div>
  )
}

function SuccessScreen({ data }: { data: QuizData }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-violet to-magenta flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Merci, {data.nomPrenom} !</h1>
        <p className="text-gray-600 leading-relaxed mb-8">
          Votre diagnostic pour <strong>{data.raisonSociale}</strong> a bien été envoyé. Notre équipe va analyser vos réponses et vous contactera prochainement pour un entretien de bilan.
        </p>
        <Link to="/">
          <Button size="lg" className="rounded-full px-8">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────

export function ProjectPage() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<QuizData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [stepError, setStepError] = useState<string | null>(null)

  const totalSteps = STEPS.length
  const progress = (step / (totalSteps - 1)) * 100

  const toggleCheckbox = (field: ArrayField, value: string) => {
    setData(d => {
      const current = d[field] as string[]
      return {
        ...d,
        [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
      }
    })
  }

  const validateStep = (): string | null => {
    if (step === 1) {
      if (!data.raisonSociale.trim()) return 'La Raison Sociale est obligatoire.'
      if (!data.nomPrenom.trim()) return 'Le Nom et Prénom de l\'interlocuteur sont obligatoires.'
      if (!data.fonction.trim()) return 'La Fonction est obligatoire.'
      if (!data.email.trim()) return 'L\'email est obligatoire.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'L\'adresse email n\'est pas valide.'
      if (!data.telephone.trim()) return 'Le téléphone est obligatoire.'
    }
    return null
  }

  const goNext = () => {
    const error = validateStep()
    if (error) { setStepError(error); return }
    setStepError(null)
    setStep(s => s + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goPrev = () => {
    setStepError(null)
    setStep(s => s - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (!data.rgpdConsent) {
      setStepError('Vous devez accepter le traitement de vos données avant d\'envoyer le diagnostic.')
      return
    }
    setStepError(null)
    setSubmitting(true)
    try {
      const id = import.meta.env.VITE_FORMSPREE_DIAGNOSTIC_ID
      if (id) {
        await fetch(`https://formspree.io/f/${id}`, {
          method: 'POST',
          body: JSON.stringify({ ...data, _subject: `Diagnostic IA — ${data.raisonSociale}` }),
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        })
      }
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) return <SuccessScreen data={data} />

  return (
    <div className="min-h-screen bg-gray-50 pt-4 sm:pt-10">
      {/* Barre de progression */}
      <div className="fixed top-16 left-0 right-0 z-40 h-1.5 bg-gray-200">
        <div
          className="h-full bg-linear-to-r from-violet to-magenta transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
        </Link>

        {/* Catégorie + compteur */}
        <div className="flex items-center justify-between mb-6 gap-3">
          <span className="inline-flex items-center bg-violet/10 text-violet text-xs font-bold tracking-wider uppercase rounded-full px-3 py-1.5 min-w-0 truncate">
            {STEPS[step].category}
          </span>
          {step > 0 && (
            <span className="text-sm text-gray-400 font-medium shrink-0">
              ÉTAPE {step} / {totalSteps - 1}
            </span>
          )}
        </div>

        {/* Carte contenu */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sm:p-8">
          {/* Pills de progression (étapes 1 à totalSteps-1, pas sur l'intro) */}
          {step > 0 && (
            <div className="flex gap-1.5 mb-6">
              {Array.from({ length: totalSteps - 1 }, (_, i) => i + 1).map(i => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-violet' : i === step ? 'bg-magenta' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
          {step === 0 && <StepIntro />}
          {step === 1 && <StepFicheStructure data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
          {step === 2 && <StepStrategieNumerique data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
          {step === 3 && <StepEnvironnement data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
          {step === 4 && <StepContexteRH data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
          {step === 5 && <StepGestionDonnees data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
          {step === 6 && <StepAutomatisationIA data={data} setData={setData} />}
          {step === 7 && <StepNumeriqueResponsable data={data} setData={setData} toggleCheckbox={toggleCheckbox} />}
        </div>

        {/* Consentement RGPD — affiché uniquement à la dernière étape */}
        {step === totalSteps - 1 && (
          <label className="flex items-start gap-3 mt-4 p-4 bg-white rounded-2xl border border-gray-100 cursor-pointer">
            <input
              type="checkbox"
              checked={data.rgpdConsent}
              onChange={e => { setData(d => ({ ...d, rgpdConsent: e.target.checked })); setStepError(null) }}
              className="mt-0.5 w-4 h-4 accent-violet shrink-0"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              J'accepte que les données saisies soient transmises à <strong>Dev'Up Centre-Val de Loire</strong> et à l'équipe <strong>IA Loire Valley</strong> dans le cadre de cet accompagnement, conformément au RGPD. Ces données ne seront utilisées qu'à des fins d'orientation et de suivi de mon projet numérique. <span className="text-magenta font-medium">*</span>
            </span>
          </label>
        )}

        {/* Message d'erreur */}
        {stepError && (
          <div className="flex items-start gap-2 mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {stepError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          {step > 0 ? (
            <button
              onClick={goPrev}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
          ) : <div />}

          {step < totalSteps - 1 ? (
            <Button onClick={goNext} className="rounded-full px-8">
              Suivant <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting} className="rounded-full px-8">
              {submitting ? 'Envoi en cours…' : 'Envoyer mon diagnostic'}
              {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
