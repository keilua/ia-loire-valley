import { MapPin, Mail, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Expert } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface ExpertCardProps {
  expert: Expert
}

const levelVariant: Record<Expert['level'], 'magenta' | 'violet' | 'orange' | 'rose'> = {
  Conseil: 'magenta',
  Accompagnement: 'violet',
  Formation: 'orange',
  Développement: 'rose',
}

export function ExpertCard({ expert }: ExpertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all duration-200 flex flex-col gap-4 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <img
          src={expert.avatar}
          alt={expert.name}
          className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{expert.name}</h3>
          <p className="text-sm text-magenta font-medium mt-0.5 leading-snug">{expert.specialty}</p>
          <div className="flex items-center gap-1 mt-1.5 text-sm text-gray-500">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {expert.location}
          </div>
        </div>
      </div>

      {/* Level badge */}
      <div>
        <Badge variant={levelVariant[expert.level]}>{expert.level}</Badge>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{expert.description}</p>

      {/* Sectors */}
      <div className="flex flex-wrap gap-1.5">
        {expert.sectors.slice(0, 3).map(sector => (
          <span key={sector} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
            {sector}
          </span>
        ))}
        {expert.sectors.length > 3 && (
          <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
            +{expert.sectors.length - 3}
          </span>
        )}
      </div>

      {/* CTAs */}
      <div className="flex gap-2 mt-auto pt-2">
        {expert.email && (
          <a
            href={`mailto:${expert.email}`}
            className="flex-1"
          >
            <Button variant="secondary" size="sm" className="w-full">
              <Mail className="w-4 h-4" />
              Contacter
            </Button>
          </a>
        )}
        {expert.website && (
          <a href={expert.website} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  )
}
