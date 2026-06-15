import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { TEAM_QUERY } from '../lib/sanityQueries'
import { team as mockTeam } from '../data/team'
import type { TeamMember } from '../types'

export async function fetchTeam(): Promise<TeamMember[]> {
  if (!isSanityConfigured || !sanity) return mockTeam

  try {
    return await sanity.fetch<TeamMember[]>(TEAM_QUERY)
  } catch (err) {
    console.warn('[teamService] Sanity error, fallback to mock:', err)
    return mockTeam
  }
}
