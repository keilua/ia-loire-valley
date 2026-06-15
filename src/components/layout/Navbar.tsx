import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Lightbulb, Rocket, Users, GraduationCap, Euro } from 'lucide-react'
import logo from '../../assets/LOGO IA LOIRE VALLEY.png'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { cn } from '../../utils/cn'

const services = [
  { label: 'Découvrir l\'IA', href: '/decouvrir-ia', desc: 'Comprendre les fondamentaux', icon: Lightbulb, color: 'from-magenta to-rose' },
  { label: 'Diagnostic IA', href: '/lancer-projet', desc: 'Structurer votre démarche IA', icon: Rocket, color: 'from-violet to-magenta' },
  { label: 'Trouver un expert', href: '/experts', desc: 'Identifier le bon partenaire', icon: Users, color: 'from-orange to-magenta' },
  { label: 'Se former à l\'IA', href: '/se-former', desc: 'Monter en compétences', icon: GraduationCap, color: 'from-rose to-violet' },
  { label: 'Aides & financements', href: '/aides', desc: 'Subventions, prêts, fiscalité', icon: Euro, color: 'from-violet to-rose' },
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
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <div className="gradient-brand rounded-xl px-4 py-2 flex items-center justify-center shrink-0">
              <img src={logo} alt="IA Loire Valley" className="h-8 w-auto max-w-40" />
            </div>
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
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-magenta/5 transition-colors group"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${service.color} flex items-center justify-center shrink-0`}>
                            <service.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-gray-900 group-hover:text-magenta transition-colors">
                              {service.label}
                            </span>
                            <span className="text-xs text-gray-500">{service.desc}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/agenda">Agenda</NavLink>
            <NavLink to="/actualites">Actualités</NavLink>
            <NavLink to="/a-propos">À propos</NavLink>
            <Link to="/quiz" className="ml-1">
              <Button size="sm">Bilan d'orientation</Button>
            </Link>
          </nav>

          {/* JCI logo + Mobile toggle */}
          <div className="flex items-center gap-3">
            <img src="/logo-jci-orleans.svg" alt="JCI Orléans" className="hidden md:block h-8 w-auto" />
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
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${service.color} flex items-center justify-center shrink-0`}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-900">{service.label}</span>
                    <span className="text-xs text-gray-500">{service.desc}</span>
                  </div>
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                <Link to="/agenda" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                  Agenda
                </Link>
                <Link to="/actualites" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                  Actualités
                </Link>
                <Link to="/a-propos" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50">
                  À propos
                </Link>
              </div>
              <div className="pt-3">
                <Link to="/quiz">
                  <Button className="w-full justify-center">Bilan d'orientation</Button>
                </Link>
              </div>
              <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">En partenariat avec</span>
                <img src="/logo-jci-orleans.svg" alt="JCI Orléans" className="h-6 w-auto" />
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
