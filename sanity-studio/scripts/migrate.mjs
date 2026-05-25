/**
 * Script de migration : importe les données mock dans Sanity.
 *
 * Usage :
 *   node scripts/migrate.mjs
 *
 * Prérequis :
 *   - npm install dans sanity-studio/
 *   - Avoir un token d'écriture dans SANITY_TOKEN
 *   - Remplir PROJECT_ID et DATASET ci-dessous
 *
 * Obtenir un token : https://www.sanity.io/manage → projet → API → Tokens → Add API token (Editor)
 */

import { createClient } from '@sanity/client'

// ⚠️  À remplir avant de lancer le script
const PROJECT_ID   = 'dqwhxx3m'
const DATASET      = 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN ?? 'VOTRE_TOKEN_ICI'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  token: SANITY_TOKEN,
  useCdn: false,
})

// ─── Données mock ────────────────────────────────────────────────────────────

const events = [
  { id: '1', title: "CAF'DATA #12 : IA – Par où commencer pour ne pas se planter ?", date: '2025-07-09', location: "CODA – École d'informatique, Orléans", type: 'Atelier', summary: "Les clés pour construire une stratégie IA concrète et adaptée à votre organisation.", link: 'https://ia-loirevalley.fr/agenda/cafdata-12-ia-par-ou-commencer-pour-ne-pas-se-planter/' },
  { id: '2', title: "Journée Expert – L'IA au service des territoires", date: '2025-06-24', location: 'Centre de Création Contemporaine Olivier Debré (CCCOD), Tours', type: 'Conférence', summary: "Une journée complète pour explorer comment l'IA peut transformer les services publics.", link: 'https://ia-loirevalley.fr/agenda/journee-expert-lia-au-service-des-territoires/' },
  { id: '3', title: "Festival Re{Dé}connecte – Arts hybrides & cultures numériques", date: '2025-06-17', location: 'Centre-Val de Loire', type: 'Conférence', summary: "Festival de 5 jours autour des arts hybrides, des cultures numériques et de l'IA.", link: 'https://ia-loirevalley.fr/agenda/festival-redeconnecte-arts-hybrides-cultures-numeriques/' },
  { id: '4', title: "Intelligence Artificielle : Mythes et Réalités", date: '2025-06-11', location: 'CRIJ Centre-Val de Loire', type: 'Conférence', summary: "Une conférence grand public pour démêler le vrai du faux sur l'IA.", link: 'https://ia-loirevalley.fr/agenda/intelligence-artificielle-mythes-et-realites/' },
  { id: '5', title: "Tournée Régionale – Place du Numérique", date: '2025-05-06', location: 'Centre-Val de Loire (itinérant)', type: 'Conférence', summary: "Événement grand public et gratuit sur les métiers et enjeux du numérique.", link: 'https://ia-loirevalley.fr/agenda/tournee-regionale-place-du-numerique/' },
  { id: '6', title: "French Tech Tour Centre-Val de Loire", date: '2025-04-29', location: 'Centre-Val de Loire (itinérant)', type: 'Networking', summary: "Mise à l'honneur des startups régionales et du développement innovant.", link: 'https://ia-loirevalley.fr/agenda/french-tech-tour-centre-val-de-loire-en-partenariat-avec-digital-loire-valley/' },
  { id: '7', title: "Journée « L'IA au service du Droit »", date: '2025-04-09', location: 'Centre-Val de Loire', type: 'Conférence', summary: "L'intelligence artificielle transforme le monde du droit.", link: 'https://ia-loirevalley.fr/agenda/journee-lia-au-service-du-droit/' },
  { id: '8', title: "Les Rencontres de la donnée", date: '2025-04-03', location: 'Orléans', type: 'Networking', summary: "Matinée de networking et d'échanges autour des enjeux de la donnée.", link: 'https://ia-loirevalley.fr/agenda/les-rencontres-de-la-donnee-le-3-avril-a-orleans/' },
  { id: '9', title: "CAF'DATA #11 : Vos données ont de la valeur… et des prédateurs !", date: '2025-04-02', location: "LAB'O Village By CA, Orléans", type: 'Atelier', summary: "Sécurité numérique et économique pour professionnels.", link: 'https://ia-loirevalley.fr/agenda/cafdata-11-vos-donnees-ont-de-la-valeur-et-des-predateurs/' },
  { id: '10', title: "L'IA va-t-elle sauver le monde ?", date: '2025-03-27', location: "Amphithéâtre Jousse, Faculté de Droit", type: 'Conférence', summary: "« Tribunal pour les Générations Futures » organisé par Usbek & Rica.", link: 'https://ia-loirevalley.fr/agenda/lia-va-t-elle-sauver-le-monde/' },
]

const experts = [
  { id: 'e1', name: 'Sophie Marchand', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie', specialty: 'Stratégie IA & Transformation digitale', location: 'Orléans', sectors: ['Industrie', 'Logistique', 'Services'], expertise: ['Conseil', 'Feuille de route IA', 'Change management'], level: 'Conseil', description: "Accompagne les PME et ETI dans la définition de leur stratégie IA.", website: 'https://example.com', email: 'sophie.marchand@example.com' },
  { id: 'e2', name: 'Thomas Rivière', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas', specialty: 'Data Science & Machine Learning', location: 'Tours', sectors: ['Santé', 'Finance', 'Retail'], expertise: ['Machine Learning', 'Deep Learning', 'NLP'], level: 'Développement', description: "Expert en data science et machine learning avec plus de 10 ans d'expérience.", email: 'thomas.riviere@example.com' },
  { id: 'e3', name: 'Isabelle Fontaine', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle', specialty: 'IA appliquée aux RH & Recrutement', location: 'Blois', sectors: ['RH', 'Formation', 'Services'], expertise: ['IA RH', 'Automatisation', 'Analytics RH'], level: 'Accompagnement', description: "Spécialiste de l'application de l'IA dans les processus RH.", email: 'isabelle.fontaine@example.com' },
  { id: 'e4', name: 'Marc Dubois', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc', specialty: 'IA industrielle & Maintenance prédictive', location: 'Châteauroux', sectors: ['Industrie', 'Énergie', 'BTP'], expertise: ['IoT', 'Maintenance prédictive', 'Vision industrielle'], level: 'Développement', description: "Développe des solutions d'IA pour l'industrie 4.0.", email: 'marc.dubois@example.com' },
  { id: 'e5', name: 'Céline Moreau', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Celine', specialty: 'IA & Secteur public / Collectivités', location: 'Orléans', sectors: ['Collectivités', 'Éducation', 'Mobilité'], expertise: ['Service public', 'Open data', 'Smart city'], level: 'Conseil', description: "Accompagne les collectivités dans leur transformation numérique.", email: 'celine.moreau@example.com' },
  { id: 'e6', name: 'Alexandre Petit', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre', specialty: 'Formation IA & Montée en compétences', location: 'Tours', sectors: ['Formation', 'RH', 'Industrie'], expertise: ['Formation', 'Sensibilisation', 'Ateliers pratiques'], level: 'Formation', description: "Formateur certifié en IA, conçoit des programmes pour tous les profils.", email: 'alexandre.petit@example.com' },
  { id: 'e7', name: 'Nathalie Bernard', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nathalie', specialty: 'IA générative & Automatisation', location: 'Bourges', sectors: ['Communication', 'Marketing', 'Services'], expertise: ['IA générative', 'Automatisation', 'Prompt engineering'], level: 'Accompagnement', description: "Aide les entreprises à intégrer les outils d'IA générative.", email: 'nathalie.bernard@example.com' },
  { id: 'e8', name: 'Julien Leroy', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julien', specialty: 'Data Engineering & Infrastructure IA', location: 'Tours', sectors: ['Tech', 'Finance', 'Industrie'], expertise: ['Data pipeline', 'MLOps', 'Cloud IA'], level: 'Développement', description: "Architecte data et ML Ops, spécialisé dans les infrastructures IA.", email: 'julien.leroy@example.com' },
]

const news = [
  { id: 'n1', title: "5 entreprises de la région ont transformé leur production grâce à l'IA", category: 'Territoire', date: '2025-04-14', summary: "Portrait croisé de cinq PME et ETI du Centre-Val de Loire qui ont réussi leur virage IA.", readTime: 6, isHero: true },
  { id: 'n2', title: "Qu'est-ce que l'IA Act et pourquoi votre entreprise doit s'y préparer", category: 'Réglementation', date: '2025-04-10', summary: "Le règlement européen sur l'intelligence artificielle entre progressivement en vigueur.", readTime: 5 },
  { id: 'n3', title: "Mistral, GPT-4o, Gemini : quel LLM choisir pour votre entreprise en 2025 ?", category: 'Outils', date: '2025-04-07', summary: "Comparatif pratique des principaux modèles de langage disponibles pour les entreprises.", readTime: 7 },
  { id: 'n4', title: "La maintenance prédictive par IA s'impose dans l'industrie de la région", category: 'Industrie', date: '2025-04-03', summary: "Plusieurs fabricants d'Indre-et-Loire et du Cher ont adopté des solutions IA.", readTime: 4 },
  { id: 'n5', title: "IA générative : comment les équipes marketing s'en emparent", category: 'IA générative', date: '2025-03-28', summary: "Rédaction, image, vidéo, SEO... L'IA générative transforme les pratiques marketing.", readTime: 5 },
  { id: 'n6', title: "Open source et IA : la région soutient deux nouvelles initiatives", category: 'Innovation', date: '2025-03-24', summary: "La Région Centre-Val de Loire finance deux projets IA open source.", readTime: 3 },
  { id: 'n7', title: "Former ses équipes à l'IA : quels dispositifs existent en Centre-Val de Loire ?", category: 'Territoire', date: '2025-03-19', summary: "Tour d'horizon des aides et financements pour la montée en compétences IA.", readTime: 6 },
]

const trainings = [
  { id: 't1', title: "IA pour dirigeants : comprendre, décider, agir", provider: 'CCI Centre-Val de Loire', level: 'Débutant', format: 'Présentiel', profile: 'Dirigeants', objective: "Comprendre les enjeux et opportunités de l'IA.", duration: '1 journée', link: 'https://example.com' },
  { id: 't2', title: "Initiation à l'IA générative pour managers", provider: 'Digital Loire Valley', level: 'Débutant', format: 'En ligne', profile: 'Managers / Métiers', objective: "Découvrir les outils d'IA générative et identifier les cas d'usage.", duration: '3h en ligne', link: 'https://example.com' },
  { id: 't3', title: "Python & Machine Learning – Fondamentaux", provider: 'INSA Centre-Val de Loire', level: 'Intermédiaire', format: 'Mixte', profile: 'Profils techniques', objective: "Maîtriser les bases du machine learning avec Python.", duration: '3 jours', link: 'https://example.com' },
  { id: 't4', title: "IA et service public : enjeux et usages", provider: 'CNFPT', level: 'Débutant', format: 'En ligne', profile: 'Collectivités', objective: "Comprendre les applications de l'IA dans les collectivités.", duration: '2h en ligne', link: 'https://example.com' },
  { id: 't5', title: "Deep Learning & Réseaux de neurones", provider: 'Université de Tours', level: 'Avancé', format: 'Présentiel', profile: 'Profils techniques', objective: "Maîtriser les architectures de deep learning.", duration: '5 jours', link: 'https://example.com' },
  { id: 't6', title: "Automatiser ses processus avec l'IA – sans coder", provider: 'BPI Formation', level: 'Débutant', format: 'En ligne', profile: 'Managers / Métiers', objective: "Utiliser des outils no-code pour automatiser des tâches répétitives.", duration: '4h en ligne', link: 'https://example.com' },
  { id: 't7', title: "Stratégie data pour décideurs", provider: 'CCI Loire', level: 'Intermédiaire', format: 'Présentiel', profile: 'Dirigeants', objective: "Construire une stratégie data orientée valeur.", duration: '2 jours', link: 'https://example.com' },
  { id: 't8', title: "IA et marchés publics : ce que ça change", provider: 'ADGCF', level: 'Intermédiaire', format: 'Mixte', profile: 'Collectivités', objective: "Intégrer l'IA dans les achats et marchés publics.", duration: '1 journée', link: 'https://example.com' },
]

// ─── Import ────────────────────────────────────────────────────────────────────

async function importDocuments(type, items, transform) {
  console.log(`\n📦  Import ${type} (${items.length} docs)…`)
  for (const item of items) {
    const doc = { _type: type, ...transform(item) }
    await client.createOrReplace({ _id: `${type}-${item.id}`, ...doc })
    process.stdout.write('.')
  }
  console.log(' ✓')
}

await importDocuments('event', events, ({ id: _id, ...rest }) => rest)
await importDocuments('expert', experts, ({ id: _id, ...rest }) => rest)
await importDocuments('newsArticle', news, ({ id: _id, ...rest }) => rest)
await importDocuments('training', trainings, ({ id: _id, ...rest }) => rest)

console.log('\n✅  Migration terminée !')
