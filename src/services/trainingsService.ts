import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { trainings as mockTrainings } from '../data/training'
import type { Training } from '../types'

function toTraining(row: Record<string, unknown>): Training {
  return {
    id: row.id as string,
    title: row.title as string,
    provider: row.provider as string,
    level: row.level as Training['level'],
    format: row.format as Training['format'],
    profile: row.profile as Training['profile'],
    objective: row.objective as string,
    duration: row.duration as string,
    link: (row.link as string | null) ?? undefined,
  }
}

export async function fetchTrainings(): Promise<Training[]> {
  if (!isSupabaseConfigured || !supabase) return mockTrainings

  const { data, error } = await supabase
    .from('trainings')
    .select('*')
    .order('title')

  if (error || !data) {
    console.warn('[trainingsService] Supabase error, fallback to mock:', error?.message)
    return mockTrainings
  }

  return data.map(toTraining)
}
