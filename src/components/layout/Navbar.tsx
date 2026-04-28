import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const services = [
  { label: 'Découvrir l\'IA', href: '/decouvrir-ia', desc: 'Comprendre les fondamentaux' },
  { label: 'Lancer un projet', href: '/lancer-projet', desc: 'Structurer votre démarche IA' },
  { label: 'Trouver un expert', href: '/experts', desc: 'Identifier le bon partenaire' },
  { label: 'Se former à l\'IA', href: '/se-former', desc: 'Monter en compétences' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-sm',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-bold text-lg text-gray-900 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span>IA Loire Valley</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  servicesOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                )}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full pt-2 w-64"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 overflow-hidden">
                      {services.map(service => (
                        <Link
                          key={service.href}
                          to={service.href}
                          className="flex flex-col px-4 py-3 rounded-xl hover:bg-magenta/5 transition-colors group"
                        >
                          <span className="text-sm font-semibold text-gray-900 group-hover:text-magenta transition-colors">
                            {service.label}
                          </span>
                          <span className="text-xs text-gray-500 mt-0.5">{service.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/agenda">Agenda</NavLink>
            <NavLink to="/actualites">Actualités</NavLink>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/quiz" className="hidden md:block">
              <Button size="sm">Diagnostic IA</Button>
            </Link>
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Services</p>
              {services.map(service => (
                <Link
                  key={service.href}
                  to={service.href}
                  className="flex flex-col px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900">{service.label}</span>
                  <span className="text-xs text-gray-500">{service.desc}</span>
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                <Link to="/agenda" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                  Agenda
                </Link>
                <Link to="/actualites" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                  Actualités
                </Link>
              </div>
              <div className="pt-3">
                <Link to="/quiz">
                  <Button className="w-full justify-center">Diagnostic IA</Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
        active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      )}
    >
      {children}
    </Link>
  )
}
