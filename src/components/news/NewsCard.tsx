import { Clock } from 'lucide-react'
import type { NewsArticle } from '../../types'
import { Badge } from '../ui/Badge'

interface NewsCardProps {
  article: NewsArticle
  hero?: boolean
}

const catVariant: Record<string, 'magenta' | 'violet' | 'orange' | 'rose' | 'gray'> = {
  'IA générative': 'magenta',
  'Industrie': 'violet',
  'Réglementation': 'orange',
  'Outils': 'rose',
  'Territoire': 'gray',
  'Innovation': 'violet',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function NewsCard({ article, hero = false }: NewsCardProps) {
  if (hero) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 group cursor-pointer hover:card-shadow-lg transition-all duration-200">
        {article.image && (
          <div className="aspect-[16/7] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={catVariant[article.category] ?? 'gray'}>{article.category}</Badge>
            <span className="text-sm text-gray-400">{formatDate(article.date)}</span>
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} min
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">{article.title}</h2>
          <p className="text-gray-600 leading-relaxed">{article.summary}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 group cursor-pointer hover:card-shadow-lg transition-all duration-200 flex flex-col">
      {article.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={catVariant[article.category] ?? 'gray'}>{article.category}</Badge>
          <span className="text-xs text-gray-400">{formatDate(article.date)}</span>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug text-base line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">{article.summary}</p>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-auto">
          <Clock className="w-3 h-3" />
          {article.readTime} min de lecture
        </div>
      </div>
    </div>
  )
}
