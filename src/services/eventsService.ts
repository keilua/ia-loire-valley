import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { EVENTS_QUERY } from '../lib/sanityQueries'
import { events as mockEvents } from '../data/events'
import type { Event } from '../types'

const TODAY = new Date().toISOString().split('T')[0]

export async function fetchEvents(): Promise<Event[]> {
  if (!isSanityConfigured || !sanity) return mockEvents

  try {
    const data = await sanity.fetch<Array<Event & { date: string }>>(EVENTS_QUERY)
    return data.map(e => ({ ...e, isPast: e.date < TODAY }))
  } catch (err) {
    console.warn('[eventsService] Sanity error, fallback to mock:', err)
    return mockEvents
  }
}
