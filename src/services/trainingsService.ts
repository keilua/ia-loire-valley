import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { TRAININGS_QUERY } from '../lib/sanityQueries'
import { trainings as mockTrainings } from '../data/training'
import type { Training } from '../types'

export async function fetchTrainings(): Promise<Training[]> {
  if (!isSanityConfigured || !sanity) return mockTrainings

  try {
    return await sanity.fetch<Training[]>(TRAININGS_QUERY)
  } catch (err) {
    console.warn('[trainingsService] Sanity error, fallback to mock:', err)
    return mockTrainings
  }
}
