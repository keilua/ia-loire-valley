import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Newspaper, ArrowRight, Calendar, Tag } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/input'
import { Card } from '../components/ui/card'
import { useNews } from '../hooks/useData'
import { LoadingGrid, LoadingError } from '../components/ui/LoadingGrid'

const categories = ['Tous', 'IA Générative', 'Industrie', 'Réglementation', 'Outils', 'Territoire', 'Innovation']

const categoryColors: Record<string, string> = {
  'IA Générative': 'bg-magenta/20 text-magenta',
  Territoire: 'bg-violet/20 text-violet',
  Innovation: 'bg-orange/20 text-orange',
  Réglementation: 'bg-rose/20 text-rose',
  Outils: 'bg-magenta/20 text-magenta',
  Industrie: 'bg-violet/20 text-violet',
}

export function NewsPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { data: articles = [], loading, error } = useNews()

  const filteredArticles = articles.filter(a =>
    selectedCategory === 'all' || a.category === selectedCategory,
  )

  const featuredArticle = articles.find(a => a.isHero)
  const otherArticles = filteredArticles.filter(a => !a.isHero || selectedCategory !== 'all')

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center text-violet hover:text-magenta mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />Retour à l'accueil
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Actualités IA</h1>
          <p className="text-lg text-gray-600">
            Restez informé des dernières actualités sur l'intelligence artificielle et le territoire
          </p>
        </div>

        {/* Newsletter */}
        <Card className="p-8 mb-12 bg-linear-to-br from-magenta to-violet rounded-3xl text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Newsletter IA Loire Valley</h2>
              <p className="opacity-90">Recevez chaque semaine les actualités IA directement dans votre boîte mail</p>
            </div>
            {subscribed ? (
              <div className="bg-white/20 rounded-2xl px-6 py-3 text-white font-semibold">
                ✓ Inscription confirmée !
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); setSubscribed(true) }}
                className="flex gap-3 w-full md:w-auto"
              >
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="bg-white/90 border-none min-w-55 text-gray-900 placeholder:text-gray-500"
                />
                <Button type="submit" variant="white" className="rounded-xl whitespace-nowrap">
                  S'inscrire
                </Button>
              </form>
            )}
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-violet" />
            <h3 className="font-semibold text-gray-900">Filtrer par thème</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const catKey = cat === 'Tous' ? 'all' : cat
              const isActive = selectedCategory === catKey
              return (
                <Button
                  key={cat}
                  size="sm"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`rounded-full ${isActive ? 'bg-linear-to-r from-magenta to-violet text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-none'}`}
                >
                  {cat}
                </Button>
              )
            })}
          </div>
        </div>

        {loading ? <LoadingGrid count={6} /> : error ? <LoadingError message={error} /> : (
          <>
            {/* Featured */}
            {featuredArticle && selectedCategory === 'all' && (
              <Card className="mb-12 overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="bg-linear-to-br from-magenta to-violet h-64 md:h-auto flex items-center justify-center">
                    <Newspaper className="w-24 h-24 text-white opacity-20" />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[featuredArticle.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {featuredArticle.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredArticle.date}</span>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-magenta transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredArticle.summary}</p>
                    <div className="flex items-center text-magenta group-hover:gap-2 transition-all">
                      <span className="font-medium">Lire l'article</span>
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherArticles.map(article => (
                <Card key={article.id} className="overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group cursor-pointer">
                  <div className="bg-linear-to-br from-magenta/20 to-violet/20 h-48 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-violet opacity-30" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-magenta transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                    <div className="flex items-center text-magenta text-sm">
                      <span className="font-medium">Lire plus</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune actualité trouvée</h3>
                <p className="text-gray-600 mb-4">Essayez de sélectionner une autre catégorie</p>
                <Button variant="outline" className="rounded-xl" onClick={() => setSelectedCategory('all')}>
                  Voir toutes les actualités
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
