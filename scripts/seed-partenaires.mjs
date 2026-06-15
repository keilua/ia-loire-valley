import { createClient } from '@sanity/client'

const token = process.env.SANITY_TOKEN
if (!token) {
  console.error('❌  Manque SANITY_TOKEN. Lance : SANITY_TOKEN=xxx node scripts/seed-partenaires.mjs')
  process.exit(1)
}

const client = createClient({
  projectId: 'dqwhxx3m',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const partenaires = [
  {
    _type: 'partenaire',
    name: 'JCI Orléans',
    role: 'Porteur de projet',
    order: 1,
  },
  {
    _type: 'partenaire',
    name: 'Région Centre-Val de Loire',
    role: 'Partenaire institutionnel',
    url: 'https://www.centre-valdeloire.fr',
    order: 2,
  },
  {
    _type: 'partenaire',
    name: 'Recia',
    role: 'Partenaire numérique',
    url: 'https://www.recia.fr',
    order: 3,
  },
  {
    _type: 'partenaire',
    name: 'CCI Centre-Val de Loire',
    role: 'Partenaire économique',
    url: 'https://www.centrevaldeloire.cci.fr',
    order: 4,
  },
]

console.log(`🚀 Insertion de ${partenaires.length} partenaires dans Sanity…`)
console.log('ℹ️  Les logos devront être ajoutés manuellement via le Studio Sanity.')

for (const p of partenaires) {
  const doc = await client.create(p)
  console.log(`✅ ${p.name} → ${doc._id}`)
}

console.log('\n🎉 Partenaires ajoutés ! Pensez à uploader les logos dans le Studio.')
