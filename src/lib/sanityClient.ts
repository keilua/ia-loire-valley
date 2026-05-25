import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset   = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'

export const isSanityConfigured = Boolean(projectId)

export const sanity = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null
