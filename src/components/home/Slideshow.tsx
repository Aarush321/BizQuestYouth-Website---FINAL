import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'

type Slide = {
  imageUrl: string | null
  caption: string
}

// Placeholder slides — swap in real imageUrls later without changing layout logic.
const SLIDES: Slide[] = [
  { imageUrl: null, caption: 'Students sketching solutions at Memphis Chapter' },
  { imageUrl: null, caption: 'Pitch night — teams presenting to local mentors' },
  { imageUrl: null, caption: 'Coding workshop in progress' },
  { imageUrl: null, caption: 'Community partners touring student projects' },
  { imageUrl: null, caption: 'Chapter lead training weekend' },
  { imageUrl: null, caption: 'Demo day celebration' },
]

const AUTO_MS = 5000
const RESUME_MS = 3000
const FADE_MS = 600

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M11 4L6 9l5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M7 4l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Slideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef<number | null>(null)
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const count = SLIDES.length
  const active = SLIDES[index]

  const clearResume = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current)
      resumeTimer.current = null
    }
  }, [])

  const pause = useCallback(() => {
    clearResume()
    setPaused(true)
  }, [clearResume])

  const scheduleResume = useCallback(() => {
    clearResume()
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false)
      resumeTimer.current = null
    }, RESUME_MS)
  }, [clearResume])

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count)
      pause()
      if (!reduceMotion) scheduleResume()
    },
    [count, pause, reduceMotion, scheduleResume],
  )

  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count)
    }, AUTO_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, count])

  useEffect(() => () => clearResume(), [clearResume])

  return (
    <section
      className="group/slideshow relative h-[45vh] w-full overflow-hidden bg-slate/10 md:h-[65vh]"
      aria-roledescription="carousel"
      aria-label="BizQuest moments"
      onMouseEnter={pause}
      onMouseLeave={() => {
        if (!reduceMotion) scheduleResume()
      }}
      onTouchStart={pause}
      onTouchEnd={() => {
        if (!reduceMotion) scheduleResume()
      }}
    >
      {/* Slides — stacked, crossfade via opacity */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const isActive = i === index
          return (
            <div
              key={slide.caption}
              className="absolute inset-0 transition-opacity ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                transitionDuration: reduceMotion ? '0ms' : `${FADE_MS}ms`,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              aria-hidden={!isActive}
            >
              {slide.imageUrl ? (
                <img
                  src={slide.imageUrl}
                  alt={slide.caption}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate/15">
                  <span className="font-mono text-sm uppercase tracking-[0.14em] text-slate">
                    [photo {i + 1}]
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {index + 1} of {count}: {active.caption}
      </div>

      {/* Caption */}
      {active.caption ? (
        <div className="pointer-events-none absolute bottom-14 left-0 z-10 max-w-[min(90%,28rem)] bg-navy/75 px-4 py-2.5 md:bottom-16 md:left-0 md:max-w-md md:px-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/90 md:text-xs">
            {active.caption}
          </p>
        </div>
      ) : null}

      {/* Arrows — always subtle on mobile; fade in on desktop hover */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy shadow-[0_2px_8px_rgba(27,42,74,0.12)] transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:opacity-100 md:left-5 md:opacity-0 md:group-hover/slideshow:opacity-100"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy shadow-[0_2px_8px_rgba(27,42,74,0.12)] transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:opacity-100 md:right-5 md:opacity-0 md:group-hover/slideshow:opacity-100"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div
        className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-1 md:bottom-5"
        role="tablist"
        aria-label="Slide indicators"
      >
        {SLIDES.map((slide, i) => {
          const isActive = i === index
          return (
            <button
              key={slide.caption}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}: ${slide.caption}`}
              onClick={() => goTo(i)}
              className="flex h-10 w-10 items-center justify-center rounded-full"
            >
              <span
                className={
                  isActive
                    ? 'block h-2.5 w-2.5 rounded-full bg-gold'
                    : 'block h-2.5 w-2.5 rounded-full border-[1.5px] border-gold/55 bg-transparent'
                }
                aria-hidden
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}
