import { sanity, isSanityConfigured } from '../lib/sanityClient'
import { NEWS_QUERY } from '../lib/sanityQueries'
import { news as mockNews } from '../data/news'
import type { NewsArticle } from '../types'

export async function fetchNews(): Promise<NewsArticle[]> {
  if (!isSanityConfigured || !sanity) return mockNews

  try {
    return await sanity.fetch<NewsArticle[]>(NEWS_QUERY)
  } catch (err) {
    console.warn('[newsService] Sanity error, fallback to mock:', err)
    return mockNews
  }
}
