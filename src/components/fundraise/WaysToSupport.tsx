import { Link } from 'react-router-dom'

type Way = {
  emoji: string
  title: string
  body: string
  variant: 'gold' | 'blue' | 'teal' | 'pink'
  tilt: 'left' | 'right'
}

const WAYS: Way[] = [
  {
    emoji: '🤝',
    title: 'Partner as a business',
    body: 'Got a tech problem at your business? A student team can work on it with you.',
    variant: 'gold',
    tilt: 'left',
  },
  {
    emoji: '💡',
    title: 'Sponsor a project',
    body: 'Pay for a chapter project that helps a local business or community group.',
    variant: 'blue',
    tilt: 'right',
  },
  {
    emoji: '💻',
    title: 'Pay for a laptop',
    body: 'Help us buy laptops and software for students who don’t have them.',
    variant: 'pink',
    tilt: 'right',
  },
  {
    emoji: '🎯',
    title: 'Host a fundraiser',
    body: 'A bake sale, a pitch night, whatever works where you are. Send what you raise our way.',
    variant: 'gold',
    tilt: 'left',
  },
  {
    emoji: '🧑‍🏫',
    title: 'Mentor a team',
    body: 'If you know tech, business, or design, come talk to a chapter.',
    variant: 'blue',
    tilt: 'right',
  },
  {
    emoji: '✉️',
    title: 'Just message us',
    body: 'Not sure where you fit? Tell us what you’re thinking and we’ll figure it out.',
    variant: 'teal',
    tilt: 'left',
  },
]

const variantClass: Record<Way['variant'], string> = {
  gold: 'post-it-gold',
  blue: 'post-it-blue',
  teal: 'post-it-teal',
  pink: 'post-it-pink',
}

export default function WaysToSupport() {
  return (
    <section className="w-full bg-navy px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-gold">
          Ways to get involved
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
          Pick a post-it.
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-white/75">
          Go with whichever one fits you. If none of them do, message us
          anyway.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {WAYS.map((way) => (
            <article
              key={way.title}
              className={[
                'post-it transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]',
                variantClass[way.variant],
                way.tilt === 'left' ? 'post-it-tilt-left' : 'post-it-tilt-right',
              ].join(' ')}
            >
              <span className="text-2xl" aria-hidden>
                {way.emoji}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-navy">
                {way.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/80">
                {way.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/connect"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          >
            Reach Out to Support
          </Link>
        </div>
      </div>
    </section>
  )
}
