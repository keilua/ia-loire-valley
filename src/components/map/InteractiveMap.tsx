import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { geocode } from '../../services/geocodingService'
import type { Expert, Ambassadeur } from '../../types'

// Fix default Leaflet marker icon in Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function makeIcon(color: string) {
  return L.divIcon({
    html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
    className: '',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  })
}

const expertIcon = makeIcon('#C9419C')
const ambassadeurIcon = makeIcon('#7B5DB8')

// Centre-Val de Loire bounds
const CVL_CENTER: [number, number] = [47.6, 1.7]

interface MapMarker {
  id: string
  lat: number
  lng: number
  label: string
  sublabel?: string
  color: 'expert' | 'ambassadeur'
}

interface Props {
  experts?: Expert[]
  ambassadeurs?: Ambassadeur[]
}

export function InteractiveMap({ experts = [], ambassadeurs = [] }: Props) {
  const [markers, setMarkers] = useState<MapMarker[]>([])
  const [geocoding, setGeocoding] = useState(0)

  useEffect(() => {
    if (experts.length === 0) return
    let cancelled = false

    // Experts with hardcoded coords → instant
    const withCoords = experts.filter(e => e.lat && e.lng)
    const toGeocode = experts.filter(e => !e.lat || !e.lng)

    if (withCoords.length > 0) {
      setMarkers(withCoords.map(e => ({
        id: e.id, lat: e.lat!, lng: e.lng!,
        label: e.name, sublabel: e.specialty, color: 'expert' as const,
      })))
    }

    if (toGeocode.length === 0) return
    setGeocoding(toGeocode.length)

    async function run() {
      for (const expert of toGeocode) {
        if (cancelled) break
        const coords = await geocode(expert.address ?? expert.location)
        if (coords && !cancelled) {
          setMarkers(prev => [...prev, {
            id: expert.id, lat: coords[0], lng: coords[1],
            label: expert.name, sublabel: expert.specialty, color: 'expert' as const,
          }])
        }
        if (!cancelled) setGeocoding(g => g - 1)
      }
    }

    run()
    return () => { cancelled = true }
  }, [experts])

  useEffect(() => {
    if (ambassadeurs.length === 0) return
    let cancelled = false
    setGeocoding(ambassadeurs.length)

    async function run() {
      for (const amb of ambassadeurs) {
        if (cancelled) break
        const coords = await geocode(amb.organisation)
        if (coords && !cancelled) {
          setMarkers(prev => [
            ...prev,
            {
              id: amb.id,
              lat: coords[0],
              lng: coords[1],
              label: `${amb.prenom} ${amb.nom}`,
              sublabel: amb.organisation,
              color: 'ambassadeur' as const,
            },
          ])
        }
        if (!cancelled) setGeocoding(g => g - 1)
      }
    }

    run()
    return () => { cancelled = true }
  }, [ambassadeurs])

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm isolate" style={{ height: 420 }}>
      {geocoding > 0 && (
        <div className="absolute top-3 right-3 z-1000 bg-white/90 backdrop-blur-sm text-xs text-gray-600 px-3 py-1.5 rounded-full shadow-sm">
          Localisation en cours… ({geocoding} restants)
        </div>
      )}
      <MapContainer center={CVL_CENTER} zoom={8} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map(m => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={m.color === 'expert' ? expertIcon : ambassadeurIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{m.label}</p>
                {m.sublabel && <p className="text-gray-500 text-xs mt-0.5">{m.sublabel}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="absolute bottom-3 left-3 z-1000 flex gap-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
        {experts.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full bg-magenta inline-block" />Experts
          </span>
        )}
        {ambassadeurs.length > 0 && (
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-3 h-3 rounded-full bg-violet inline-block" />Ambassadeurs
          </span>
        )}
      </div>
    </div>
  )
}
