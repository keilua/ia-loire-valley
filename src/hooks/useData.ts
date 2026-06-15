import { useState, useEffect } from 'react'
import { fetchEvents } from '../services/eventsService'
import { fetchExperts } from '../services/expertsService'
import { fetchNews } from '../services/newsService'
import { fetchTrainings } from '../services/trainingsService'
import { fetchAmbassadeurs } from '../services/ambassadeursService'
import { fetchPlatforms } from '../services/platformsService'
import { fetchAides } from '../services/aidesService'
import { fetchPartenaires } from '../services/partenairesService'
import { fetchTeam } from '../services/teamService'
import type { Event, Expert, NewsArticle, Training, Ambassadeur, Platform, Aide, Partenaire, TeamMember } from '../types'

interface UseDataResult<T> {
  data: T[]
  loading: boolean
  error: string | null
}

function useAsyncData<T>(fetcher: () => Promise<T[]>): UseDataResult<T> {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetcher()
      .then(result => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError('Impossible de charger les données.')
          console.error(err)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}

export const useEvents       = (): UseDataResult<Event>       => useAsyncData(fetchEvents)
export const useExperts      = (): UseDataResult<Expert>      => useAsyncData(fetchExperts)
export const useNews         = (): UseDataResult<NewsArticle> => useAsyncData(fetchNews)
export const useTrainings    = (): UseDataResult<Training>    => useAsyncData(fetchTrainings)
export const useAmbassadeurs = (): UseDataResult<Ambassadeur> => useAsyncData(fetchAmbassadeurs)
export const usePlatforms    = (): UseDataResult<Platform>    => useAsyncData(fetchPlatforms)
export const useAides        = (): UseDataResult<Aide>        => useAsyncData(fetchAides)
export const usePartenaires  = (): UseDataResult<Partenaire>  => useAsyncData(fetchPartenaires)
export const useTeam         = (): UseDataResult<TeamMember>  => useAsyncData(fetchTeam)
