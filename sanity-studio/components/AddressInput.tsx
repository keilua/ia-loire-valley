import { useState } from 'react'
import { useFormValue, useDocumentOperation } from 'sanity'
import type { StringInputProps } from 'sanity'

export function AddressInput(props: StringInputProps) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const rawId = useFormValue(['_id']) as string
  const docId = rawId?.replace(/^drafts\./, '')
  const docType = useFormValue(['_type']) as string
  const { patch, commit } = useDocumentOperation(docId, docType)

  const handleGeocode = async () => {
    const address = props.value
    if (!address) {
      setStatus('⚠️ Remplissez l\'adresse d\'abord')
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
      )
      const data = await res.json()

      if (data.features?.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates as [number, number]
        const score: number = data.features[0].properties.score

        patch.execute([{ set: { lat, lng } }])
        commit.execute()
        setStatus(`✅ Coordonnées enregistrées (précision ${Math.round(score * 100)}%)`)
      } else {
        setStatus('❌ Adresse non trouvée — essayez une adresse plus précise')
      }
    } catch {
      setStatus('❌ Erreur réseau — réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {props.renderDefault(props)}
      <button
        type="button"
        onClick={handleGeocode}
        disabled={loading || !props.value}
        style={{
          padding: '8px 14px',
          background: loading || !props.value ? '#e5e7eb' : '#7B5DB8',
          color: loading || !props.value ? '#9ca3af' : 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading || !props.value ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: 500,
          alignSelf: 'flex-start',
          transition: 'background 0.2s',
        }}
      >
        {loading ? '⏳ Géolocalisation en cours…' : '📍 Géocoder l\'adresse'}
      </button>
      {status && (
        <p style={{
          fontSize: '12px',
          color: status.startsWith('✅') ? '#16a34a' : status.startsWith('⚠️') ? '#d97706' : '#dc2626',
          margin: 0,
        }}>
          {status}
        </p>
      )}
    </div>
  )
}
