import { Link } from 'react-router-dom'
import logoLight from '../../assets/logo-light.png'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fundraise', label: 'Support' },
  { to: '/chapters', label: 'Chapters' },
  { to: '/leadership', label: 'Leadership' },
  { to: '/connect', label: 'Connect' },
] as const

const GET_INVOLVED = [
  { to: '/fundraise', label: 'Support Us' },
  { to: '/chapters', label: 'Start a Chapter' },
  { to: '/connect', label: 'Volunteer' },
] as const

export default function Footer() {
  return (
    <footer className="w-full bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-xs shrink-0">
            <Link to="/" className="rounded-sm" aria-label="BizQuest home">
              <img src={logoLight} alt="BizQuest" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/70">
              A student-run organization teaching coding, business, and AI.
              Started in April 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10 lg:gap-14">
            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/50">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="font-body text-sm text-white/85 transition-colors hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/50">
                Get Involved
              </h3>
              <ul className="mt-4 space-y-2.5">
                {GET_INVOLVED.map(({ to, label }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="font-body text-sm text-white/85 transition-colors hover:text-gold"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/50">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="mailto:contactbizquest@gmail.com"
                    className="font-body text-sm text-white/85 transition-colors hover:text-gold"
                  >
                    contactbizquest@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+19013195544"
                    className="font-body text-sm text-white/85 transition-colors hover:text-gold"
                  >
                    +1 (901) 319-5544
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl px-5 py-4 md:px-8">
          <p className="font-mono text-xs text-white/45">
            © {new Date().getFullYear()} BizQuest Youth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
