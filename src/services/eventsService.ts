import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { events as mockEvents } from '../data/events'
import type { Event } from '../types'

function toEvent(row: Record<string, unknown>): Event {
  return {
    id: row.id as string,
    title: row.title as string,
    date: row.date as string,
    location: row.location as string,
    type: row.type as Event['type'],
    summary: row.summary as string,
    link: (row.link as string | null) ?? undefined,
    isPast: row.is_past as boolean,
    image: (row.image as string | null) ?? undefined,
  }
}

export async function fetchEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured || !supabase) return mockEvents

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  if (error || !data) {
    console.warn('[eventsService] Supabase error, fallback to mock:', error?.message)
    return mockEvents
  }

  return data.map(toEvent)
}
