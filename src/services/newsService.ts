import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { news as mockNews } from '../data/news'
import type { NewsArticle } from '../types'

function toArticle(row: Record<string, unknown>): NewsArticle {
  return {
    id: row.id as string,
    title: row.title as string,
    category: row.category as NewsArticle['category'],
    date: row.date as string,
    summary: row.summary as string,
    image: (row.image as string | null) ?? undefined,
    readTime: row.read_time as number,
    isHero: row.is_hero as boolean,
  }
}

export async function fetchNews(): Promise<NewsArticle[]> {
  if (!isSupabaseConfigured || !supabase) return mockNews

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })

  if (error || !data) {
    console.warn('[newsService] Supabase error, fallback to mock:', error?.message)
    return mockNews
  }

  return data.map(toArticle)
}
