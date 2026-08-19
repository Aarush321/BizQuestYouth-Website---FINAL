import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'
import SectionEyebrow from '../ui/SectionEyebrow'

type PastFundraiser = {
  title: string
  amountRaised: number
  timeframe: string
  imageUrl: string | null
}

// Placeholder history — swap in real wins without changing layout.
const PAST_FUNDRAISERS: PastFundraiser[] = [
  {
    title: 'Spring Coding-a-thon',
    amountRaised: 4200,
    timeframe: 'Mar 2025',
    imageUrl: null,
  },
  {
    title: 'Sponsor a Chapter Drive',
    amountRaised: 12500,
    timeframe: 'Nov 2024',
    imageUrl: null,
  },
  {
    title: 'Community Tech Workshop',
    amountRaised: 3100,
    timeframe: 'Sep 2024',
    imageUrl: null,
  },
  {
    title: 'Holiday Bake Sale Circuit',
    amountRaised: 1850,
    timeframe: 'Dec 2024',
    imageUrl: null,
  },
  {
    title: 'Pitch Night Showcase',
    amountRaised: 6700,
    timeframe: 'May 2025',
    imageUrl: null,
  },
]

function formatDollars(n: number) {
  return `$${n.toLocaleString('en-US')}`
}

export default function PastFundraisers() {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const reduceMotion = useMemo(prefersReducedMotion, [])

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateEdges()
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges])

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-past-card]')
    const step = card ? card.offsetWidth + 24 : 280
    el.scrollBy({
      left: dir * step,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Highlight reel</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
              Past Wins
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll past fundraisers left"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M11 4L6 9l5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Scroll past fundraisers right"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white disabled:pointer-events-none disabled:opacity-30"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M7 4l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative mt-10">
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
              canPrev ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
              canNext ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            ref={scrollerRef}
            className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
          >
            {PAST_FUNDRAISERS.map((item) => (
              <article
                key={item.title}
                data-past-card
                className="w-[240px] shrink-0 snap-start overflow-hidden rounded-xl border border-slate/15 bg-white shadow-[0_1px_3px_rgba(27,42,74,0.04)] sm:w-[260px]"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-slate/10">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate">
                      [photo]
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate">
                    {item.timeframe}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-display text-3xl font-bold text-navy">
                    <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-gold align-middle" aria-hidden />
                    {formatDollars(item.amountRaised)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
