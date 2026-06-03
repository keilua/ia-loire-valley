import { useEffect } from 'react'
import { X, MapPin, Mail, Globe, Building2, Star } from 'lucide-react'
import { Button } from '../ui/Button'
import type { Expert } from '../../types'

const levelColors: Record<string, string> = {
  Conseil: 'bg-magenta/10 text-magenta',
  Accompagnement: 'bg-violet/10 text-violet',
  Formation: 'bg-orange/10 text-orange',
  Développement: 'bg-rose/10 text-rose',
}

interface Props {
  expert: Expert
  onClose: () => void
}

export function ExpertModal({ expert, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const initials = expert.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-5">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden border border-gray-200">
                {expert.logo
                  ? <img src={expert.logo} alt={expert.name} className="w-full h-full object-contain p-2" loading="lazy" />
                  : <span className="text-2xl font-bold text-gray-400">{initials}</span>
                }
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{expert.name}</h2>
                <p className="text-violet font-medium">{expert.specialty}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {expert.location}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[expert.level] ?? 'bg-gray-100 text-gray-600'}`}>
              {expert.level}
            </span>
            {expert.sectors.map(s => (
              <span key={s} className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600">{s}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-violet" />Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">{expert.description}</p>
          </div>

          {expert.expertise.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-magenta" />Domaines d'expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map(e => (
                  <span key={e} className="px-3 py-1 rounded-full text-xs bg-magenta/10 text-magenta">{e}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {expert.email && (
              <a href={`mailto:${expert.email}`} className="flex-1">
                <Button className="w-full rounded-xl">
                  <Mail className="mr-2 w-4 h-4" />Contacter
                </Button>
              </a>
            )}
            {expert.website && (
              <a href={expert.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full rounded-xl">
                  <Globe className="mr-2 w-4 h-4" />Site web
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
