import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { AIDES_QUERY } from '../lib/sanityQueries'
import { aides as mockAides } from '../data/aides'
import type { Aide } from '../types'

export async function fetchAides(): Promise<Aide[]> {
  if (!isSanityConfigured || !sanity) return mockAides

  try {
    return await sanity.fetch<Aide[]>(AIDES_QUERY)
  } catch (err) {
    console.warn('[aidesService] Sanity error, fallback to mock:', err)
    return mockAides
  }
}
