const IDEAS = [
  {
    label: 'Bake Sale',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M8 22c0-5.5 4.5-10 10-10s10 4.5 10 10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M6 22h24v4a4 4 0 01-4 4H10a4 4 0 01-4-4v-4z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="16" r="1.25" fill="currentColor" />
        <circle cx="18" cy="13.5" r="1.25" fill="currentColor" />
        <circle cx="22" cy="16" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Coding-a-thon',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M13 12L7 18l6 6M23 12l6 6-6 6M20 10l-4 16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Sponsor a Chapter',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M18 10v16M14 14.5c0-1.7 1.8-3 4-3s4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.3 4-3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Tech Workshop',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect
          x="6"
          y="8"
          width="24"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path d="M12 28h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M18 24v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path
          d="M13 16h4M19 16h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Pitch Night',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M8 26L16 10l4 8 4-4 4 12"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 28h22" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Service Auction',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M10 14l8-6 8 6v12a2 2 0 01-2 2H12a2 2 0 01-2-2V14z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M15 28V20h6v8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: 'Merch Drop',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <path
          d="M10 13l-3 3v11a2 2 0 002 2h18a2 2 0 002-2V16l-3-3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M10 13V11a8 8 0 0116 0v2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
] as const

export default function FundraisingIdeas() {
  return (
    <section className="w-full bg-navy px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-gold">
          Ideas for Your Chapter
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
          Raise funds your way.
        </h2>

        <div className="hide-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-2 md:-mx-0 md:gap-10 md:px-0">
          {IDEAS.map((idea) => (
            <div
              key={idea.label}
              className="flex w-[7.5rem] shrink-0 snap-start flex-col items-center text-center sm:w-32"
            >
              <div className="text-gold">{idea.icon}</div>
              <span className="mt-4 font-body text-sm font-medium leading-snug text-white">
                {idea.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
