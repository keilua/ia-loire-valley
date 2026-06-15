import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { PARTENAIRES_QUERY } from '../lib/sanityQueries'
import { partenaires as mockPartenaires } from '../data/partenaires'
import type { Partenaire } from '../types'

export async function fetchPartenaires(): Promise<Partenaire[]> {
  if (!isSanityConfigured || !sanity) return mockPartenaires

  try {
    return await sanity.fetch<Partenaire[]>(PARTENAIRES_QUERY)
  } catch (err) {
    console.warn('[partenairesService] Sanity error, fallback to mock:', err)
    return mockPartenaires
  }
}
