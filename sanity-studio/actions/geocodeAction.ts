import { useClient, useDocumentOperation } from 'sanity'
import type { DocumentActionProps } from 'sanity'

export function GeocodeAction({ id, type, draft, published }: DocumentActionProps) {
  const client = useClient({ apiVersion: '2024-01-01' })
  const { patch, commit } = useDocumentOperation(id, type)

  if (type !== 'expert') return null

  return {
    label: '📍 Géocoder l\'adresse',
    title: 'Calcule automatiquement les coordonnées GPS depuis l\'adresse',
    onHandle: async () => {
      const doc = (draft ?? published) as Record<string, unknown> | null
      const address = doc?.address as string | undefined

      if (!address) {
        // eslint-disable-next-line no-alert
        alert('Remplissez le champ "Adresse complète" avant de géocoder.')
        return
      }

      try {
        const res = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
        )
        const data = await res.json()

        if (data.features?.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates as [number, number]
          const score = data.features[0].properties.score as number

          patch.execute([{ set: { lat, lng } }])
          commit.execute()

          // eslint-disable-next-line no-alert
          alert(`✅ Coordonnées enregistrées (précision : ${Math.round(score * 100)}%)`)
        } else {
          // eslint-disable-next-line no-alert
          alert('❌ Adresse non trouvée. Essayez une adresse plus précise.')
        }
      } catch {
        // eslint-disable-next-line no-alert
        alert('❌ Erreur réseau. Réessayez.')
      }
    },
  }
}
