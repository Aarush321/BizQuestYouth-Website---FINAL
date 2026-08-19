import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import logoLight from '../../assets/logo-light.png'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fundraise', label: 'Support' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/connect', label: 'Connect' },
] as const

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Mobile menu sits on navy, so force solid appearance while open.
  const solid = !isHome || scrolledPastHero || menuOpen

  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(false)
      return
    }

    const update = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.9)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  const linkColor = solid ? 'text-white' : 'text-navy'

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      // Slightly tighter tracking/gap so 5 items still clear the logo + Donate at md.
      'relative rounded-sm font-body font-medium text-sm uppercase tracking-[0.04em] transition-colors duration-[220ms] lg:tracking-[0.05em]',
      linkColor,
      'after:absolute after:left-0 after:right-0 after:-bottom-1.5 after:h-0.5 after:bg-gold after:transition-opacity after:duration-[220ms]',
      isActive ? 'after:opacity-100' : 'after:opacity-0',
    ].join(' ')

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 h-20 w-full transition-[background-color,box-shadow] duration-[220ms] ease-out',
        solid
          ? 'bg-navy shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
          : 'bg-transparent shadow-none',
      ].join(' ')}
    >
      <div className="relative z-50 mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link
          to="/"
          className="shrink-0 rounded-sm"
          aria-label="BizQuest home"
        >
          <img
            src={solid ? logoLight : logo}
            alt="BizQuest"
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 lg:gap-7 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/fundraise"
            className="hidden rounded-full bg-gold px-5 py-2 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:inline-flex"
          >
            Reach Out
          </Link>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden ${linkColor} transition-colors duration-[220ms]`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={[
          'fixed inset-0 z-40 flex flex-col bg-navy px-6 pb-10 pt-24 transition-[opacity,visibility] duration-[250ms] md:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-1 flex-col gap-2" aria-label="Mobile">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-4 font-display text-2xl font-semibold text-white transition-colors',
                  isActive ? 'text-gold' : 'hover:bg-white/5',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/fundraise"
          onClick={() => setMenuOpen(false)}
          className="mt-auto w-full rounded-full bg-gold py-3.5 text-center font-body text-base font-semibold text-navy transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          Reach Out
        </Link>
      </div>
    </header>
  )
}
