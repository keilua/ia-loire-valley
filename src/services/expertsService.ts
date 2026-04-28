import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { experts as mockExperts } from '../data/experts'
import type { Expert } from '../types'

function toExpert(row: Record<string, unknown>): Expert {
  return {
    id: row.id as string,
    name: row.name as string,
    avatar: row.avatar as string,
    specialty: row.specialty as string,
    location: row.location as string,
    sectors: row.sectors as string[],
    expertise: row.expertise as string[],
    level: row.level as Expert['level'],
    description: row.description as string,
    website: (row.website as string | null) ?? undefined,
    email: (row.email as string | null) ?? undefined,
  }
}

export async function fetchExperts(): Promise<Expert[]> {
  if (!isSupabaseConfigured || !supabase) return mockExperts

  const { data, error } = await supabase
    .from('experts')
    .select('*')
    .order('name')

  if (error || !data) {
    console.warn('[expertsService] Supabase error, fallback to mock:', error?.message)
    return mockExperts
  }

  return data.map(toExpert)
}
