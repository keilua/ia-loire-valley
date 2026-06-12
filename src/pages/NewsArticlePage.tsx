import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, User, ExternalLink, Newspaper } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { Button } from '../components/ui/Button'
import { useNews } from '../hooks/useData'

const categoryColors: Record<string, string> = {
  'IA générative': 'bg-magenta/20 text-magenta',
  Territoire: 'bg-violet/20 text-violet',
  Innovation: 'bg-orange/20 text-orange',
  Réglementation: 'bg-rose/20 text-rose',
  Outils: 'bg-magenta/20 text-magenta',
  Industrie: 'bg-violet/20 text-violet',
}

const portableTextComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-magenta pl-6 py-2 my-6 text-gray-700 italic bg-magenta/5 rounded-r-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 pl-2">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 pl-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline">{children}</span>
    ),
    link: ({ value, children }: { value?: { href: string; blank?: boolean }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-magenta hover:text-violet underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; caption?: string } }) =>
      value?.asset?.url ? (
        <figure className="my-8">
          <img
            src={value.asset.url}
            alt={value.caption ?? ''}
            className="rounded-2xl w-full object-cover max-h-96"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      ) : null,
  },
}

export function NewsArticlePage() {
  const { id } = useParams<{ id: string }>()
  const { data: articles = [], loading, error } = useNews()

  const article = articles.find(a => a.id === id)

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-magenta border-t-transparent" />
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center py-20">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article introuvable</h1>
          <p className="text-gray-600 mb-6">Cet article n'existe pas ou a été supprimé.</p>
          <Link to="/actualites">
            <Button className="rounded-xl">Retour aux actualités</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Link to="/actualites" className="inline-flex items-center text-violet hover:text-magenta mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />Retour aux actualités
        </Link>

        {/* Image */}
        {article.image ? (
          <div className="rounded-3xl overflow-hidden mb-8 h-64 sm:h-80">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="rounded-3xl h-40 bg-linear-to-br from-magenta to-violet flex items-center justify-center mb-8">
            <Newspaper className="w-16 h-16 text-white/30" />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min de lecture</span>
          </div>
          {article.author && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          )}
        </div>

        {/* Titre */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Résumé */}
        <p className="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
          {article.summary}
        </p>

        {/* Contenu */}
        {article.body && article.body.length > 0 ? (
          <div className="prose-article">
            <PortableText value={article.body as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />
          </div>
        ) : article.sourceUrl ? (
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <p className="text-gray-600 mb-4">Cet article provient d'une source externe.</p>
            <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-xl">
                <ExternalLink className="w-4 h-4 mr-2" />
                Lire l'article complet
              </Button>
            </a>
          </div>
        ) : null}

        {/* Source */}
        {article.sourceUrl && article.body && article.body.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-magenta transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Source originale
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
