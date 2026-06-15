import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Manque SANITY_TOKEN. Lance : SANITY_TOKEN=xxx node scripts/seed-platforms.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: 'dqwhxx3m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const platforms = [
  {
    _type: 'platform',
    name: 'France Université Numérique (FUN)',
    type: 'MOOC gratuits',
    topics: "Bases de l'IA, machine learning, IA et société",
    url: 'https://www.fun-mooc.fr',
    free: true,
    order: 1,
  },
  {
    _type: 'platform',
    name: "Google – Fondamentaux de l'IA",
    type: 'Cours en ligne gratuit',
    topics: 'IA générative, Gemini, Machine Learning, Google Cloud',
    url: 'https://grow.google/intl/fr_fr/learn-skills/ai/',
    free: true,
    order: 2,
  },
  {
    _type: 'platform',
    name: 'Microsoft – AI Skills Initiative',
    type: 'Parcours gratuits',
    topics: 'Copilot, Azure AI, IA responsable, outils Microsoft 365',
    url: 'https://www.microsoft.com/fr-fr/ai/ai-skills',
    free: true,
    order: 3,
  },
  {
    _type: 'platform',
    name: 'INRIA – Classe IA',
    type: 'MOOC gratuit',
    topics: "Comprendre l'IA, éthique, algorithmes, données",
    url: 'https://www.fun-mooc.fr/fr/cours/lintelligence-artificielle-avec-intelligence/',
    free: true,
    order: 4,
  },
  {
    _type: 'platform',
    name: 'Coursera – IA for Everyone',
    type: 'Cours (audit gratuit)',
    topics: "Stratégie IA pour non-techniques, cas d'usage, feuille de route",
    url: 'https://www.coursera.org/learn/ai-for-everyone',
    free: true,
    order: 5,
  },
  {
    _type: 'platform',
    name: 'OpenClassrooms',
    type: 'Parcours certifiants',
    topics: 'Data science, IA appliquée, développement IA',
    url: 'https://openclassrooms.com',
    free: false,
    order: 6,
  },
  {
    _type: 'platform',
    name: 'Simplon.co',
    type: 'Formations intensives',
    topics: 'Data, IA, développement — formations accessibles et financées',
    url: 'https://simplon.co',
    free: false,
    order: 7,
  },
  {
    _type: 'platform',
    name: 'Organismes locaux partenaires',
    type: 'Formations présentielles CVL',
    topics: 'Formations sur-mesure pour entreprises de la région',
    url: 'https://ialoirevalley.fr/experts',
    free: false,
    order: 8,
  },
]

console.log(`🚀 Insertion de ${platforms.length} plateformes dans Sanity…`)

for (const platform of platforms) {
  const doc = await client.create(platform)
  console.log(`✅ ${platform.name} → ${doc._id}`)
}

console.log('\n🎉 Toutes les plateformes ont été ajoutées !')
