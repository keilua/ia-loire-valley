import { Link } from 'react-router-dom'
import { Mail, MapPin, ArrowRight } from 'lucide-react'
import logo from '../../assets/LOGO IA LOIRE VALLEY.png'

const nav = {
  Services: [
    { label: 'Découvrir l\'IA', href: '/decouvrir-ia' },
    { label: 'Diagnostic IA', href: '/lancer-projet' },
    { label: 'Trouver un expert', href: '/experts' },
    { label: 'Se former à l\'IA', href: '/se-former' },
    { label: 'Aides & financements', href: '/aides' },
  ],
  Ressources: [
    { label: 'Agenda', href: '/agenda' },
    { label: 'Actualités', href: '/actualites' },
    { label: "Bilan d'orientation", href: '/quiz' },
    { label: 'À propos', href: '/a-propos' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img src={logo} alt="IA Loire Valley" className="h-8 w-auto" />
              </Link>
              <img src="/logo-jci-orleans.svg" alt="JCI Orléans" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              La plateforme régionale pour comprendre l'IA, trouver un expert et lancer votre projet en Centre-Val de Loire.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <a href="mailto:contact@ialoirevalley.fr" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                contact@ialoirevalley.fr
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Centre-Val de Loire
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([title, links]) => (
            <div key={title}>
              <p className="text-white font-semibold text-sm mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Prêt à vous lancer ?</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Faites le bilan d'orientation en 3 minutes et obtenez des recommandations personnalisées.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 text-sm font-semibold text-magenta hover:text-rose transition-colors"
            >
              Démarrer le bilan
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} IA Loire Valley – Plateforme régionale d'orientation IA</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales" className="hover:text-gray-400 transition-colors">Mentions légales</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
