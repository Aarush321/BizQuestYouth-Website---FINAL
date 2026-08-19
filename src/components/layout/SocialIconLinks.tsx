function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/bizquest901/',
    label: 'Instagram',
    Icon: InstagramIcon,
  },
] as const

type SocialIconLinksProps = {
  className?: string
  linkClassName?: string
}

export default function SocialIconLinks({
  className = 'flex items-center gap-4',
  linkClassName = 'text-white/55 transition-colors duration-200 hover:text-gold',
}: SocialIconLinksProps) {
  return (
    <div className={className} aria-label="Social links">
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={linkClassName}
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}
