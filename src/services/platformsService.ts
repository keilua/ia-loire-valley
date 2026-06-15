import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { PLATFORMS_QUERY } from '../lib/sanityQueries'
import { platforms as mockPlatforms } from '../data/platforms'
import type { Platform } from '../types'

export async function fetchPlatforms(): Promise<Platform[]> {
  if (!isSanityConfigured || !sanity) return mockPlatforms

  try {
    return await sanity.fetch<Platform[]>(PLATFORMS_QUERY)
  } catch (err) {
    console.warn('[platformsService] Sanity error, fallback to mock:', err)
    return mockPlatforms
  }
}
