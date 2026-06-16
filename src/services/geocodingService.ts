const CACHE_KEY = 'geocode_cache'
const CITY_CACHE_KEY = 'geocode_city_cache'
const memCache = new Map<string, [number, number] | null>()
const cityMemCache = new Map<string, string | null>()
let lastRequest = 0

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (raw) {
      const entries = JSON.parse(raw) as [string, [number, number] | null][]
      entries.forEach(([k, v]) => memCache.set(k, v))
    }
  } catch { /* ignore */ }
  try {
    const raw = localStorage.getItem(CITY_CACHE_KEY)
    if (raw) {
      const entries = JSON.parse(raw) as [string, string | null][]
      entries.forEach(([k, v]) => cityMemCache.set(k, v))
    }
  } catch { /* ignore */ }
}

function saveCache(key: string, coords: [number, number] | null, city: string | null) {
  memCache.set(key, coords)
  cityMemCache.set(key, city)
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify([...memCache.entries()]))
    localStorage.setItem(CITY_CACHE_KEY, JSON.stringify([...cityMemCache.entries()]))
  } catch { /* ignore */ }
}

loadCache()

/** Returns the city if geocoded, null if geocoded but no city found, undefined if not yet geocoded */
export function getGeoCity(query: string): string | null | undefined {
  if (!cityMemCache.has(query)) return undefined
  return cityMemCache.get(query) ?? null
}

export async function geocode(query: string): Promise<[number, number] | null> {
  if (memCache.has(query)) return memCache.get(query)!

  const wait = 1100 - (Date.now() - lastRequest)
  if (wait > 0) await new Promise(r => setTimeout(r, wait))
  lastRequest = Date.now()

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=fr&addressdetails=1`
    const res = await fetch(url, {
      headers: {
        'Accept-Language': 'fr',
        'User-Agent': 'IALoireValley/1.0 (contact@ialoirevalley.fr)',
      },
    })
    const data = await res.json()
    if (data.length > 0) {
      const coords: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)]
      const addr = data[0].address ?? {}
      const city: string | null = addr.city ?? addr.town ?? addr.village ?? addr.municipality ?? null
      saveCache(query, coords, city)
      return coords
    }
  } catch { /* ignore */ }

  saveCache(query, null, null)
  return null
}

// Kept for backwards compat
export const geocodeOrg = geocode

export const CITY_COORDS: Record<string, [number, number]> = {
  'Orléans': [47.9029, 1.9087],
  'Tours': [47.3941, 0.6848],
  'Blois': [47.5861, 1.3359],
  'Châteauroux': [46.8132, 1.6910],
  'Bourges': [47.0810, 2.3987],
  'Chartres': [48.4469, 1.4890],
  'Vierzon': [47.2215, 2.0693],
  'Vendôme': [47.7930, 1.0651],
}
