/**
 * Géocode les adresses des experts via l'API officielle française (api-adresse.data.gouv.fr)
 * et met à jour les champs lat/lng dans Sanity.
 *
 * Usage:
 *   SANITY_TOKEN=xxx node scripts/geocode-experts.mjs
 */

import { createClient } from '@sanity/client'

const PROJECT_ID   = 'dqwhxx3m'
const DATASET      = 'production'
const SANITY_TOKEN = process.env.SANITY_TOKEN

if (!SANITY_TOKEN) { console.error('SANITY_TOKEN manquant'); process.exit(1) }

const client = createClient({ projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-01-01', token: SANITY_TOKEN, useCdn: false })

async function geocodeFr(address) {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
  const res = await fetch(url)
  const data = await res.json()
  if (data.features?.length > 0) {
    const [lng, lat] = data.features[0].geometry.coordinates
    return { lat, lng, score: data.features[0].properties.score }
  }
  return null
}

// Fetch all experts from Sanity
const experts = await client.fetch('*[_type == "expert"]{_id, name, address, location}')
console.log(`\n📍 Géocodage de ${experts.length} experts...\n`)

let ok = 0, fail = 0

for (const expert of experts) {
  const query = expert.address || expert.location || expert.name
  const result = await geocodeFr(query)

  if (result && result.score > 0.3) {
    await client.patch(expert._id).set({ lat: result.lat, lng: result.lng }).commit()
    console.log(`✓ ${expert.name} → ${result.lat.toFixed(4)}, ${result.lng.toFixed(4)} (score: ${result.score.toFixed(2)})`)
    ok++
  } else {
    console.log(`✗ ${expert.name} → non trouvé (query: "${query}")`)
    fail++
  }

  // Small delay to be polite
  await new Promise(r => setTimeout(r, 100))
}

console.log(`\n✅ ${ok} géocodés, ${fail} non trouvés`)
