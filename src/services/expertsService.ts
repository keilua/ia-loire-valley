import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { EXPERTS_QUERY } from '../lib/sanityQueries'
import { experts as mockExperts } from '../data/experts'
import type { Expert } from '../types'

export async function fetchExperts(): Promise<Expert[]> {
  if (!isSanityConfigured || !sanity) return mockExperts

  try {
    return await sanity.fetch<Expert[]>(EXPERTS_QUERY)
  } catch (err) {
    console.warn('[expertsService] Sanity error, fallback to mock:', err)
    return mockExperts
  }
}
