import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'
import SectionEyebrow from '../ui/SectionEyebrow'
import meeting1 from '../../assets/slideshow/meeting-1.jpg'
import meeting2 from '../../assets/slideshow/meeting-2.jpg'
import meeting3 from '../../assets/slideshow/meeting-3.jpg'
import meeting4 from '../../assets/slideshow/meeting-4.jpg'
import meeting5 from '../../assets/slideshow/meeting-5.jpg'
import meeting6 from '../../assets/slideshow/meeting-6.jpg'

type Slide = {
  imageUrl: string
  alt: string
}

const SLIDES: Slide[] = [
  { imageUrl: meeting1, alt: 'A full library of students at a BizQuest chapter meeting' },
  { imageUrl: meeting2, alt: 'A student presenting a business idea to the chapter' },
  { imageUrl: meeting3, alt: 'Students gathered around tables during a meeting' },
  { imageUrl: meeting4, alt: 'Student leaders speaking to the room' },
  { imageUrl: meeting5, alt: 'Students talking and working on laptops before a meeting' },
  { imageUrl: meeting6, alt: 'Students listening during a BizQuest session' },
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
    <section className="relative overflow-hidden bg-[#e5f0f8] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionEyebrow>Life at BizQuest</SectionEyebrow>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            A few photos from our meetings.
          </h2>
        </div>

        <div className="relative mt-10 md:-rotate-1">
          <span className="slideshow-tape left-8 -rotate-6" aria-hidden />
          <span className="slideshow-tape right-8 rotate-6" aria-hidden />

          <div className="rounded-2xl bg-white p-2.5 shadow-[0_18px_40px_rgba(27,42,74,0.18)] md:p-4">
            <div
              className="group/slideshow relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate/10 md:aspect-[16/10]"
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
              {SLIDES.map((slide, i) => {
                const isActive = i === index
                return (
                  <img
                    key={slide.imageUrl}
                    src={slide.imageUrl}
                    alt={slide.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="absolute inset-0 h-full w-full object-cover transition-opacity ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transitionDuration: reduceMotion ? '0ms' : `${FADE_MS}ms`,
                    }}
                    aria-hidden={!isActive}
                  />
                )
              })}

              <div className="sr-only" aria-live="polite" aria-atomic="true">
                Slide {index + 1} of {count}: {active.alt}
              </div>

              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-[0_2px_8px_rgba(27,42,74,0.12)] transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:opacity-100 md:left-5 md:opacity-0 md:group-hover/slideshow:opacity-100"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-navy shadow-[0_2px_8px_rgba(27,42,74,0.12)] transition-[opacity,background-color] duration-200 hover:bg-white focus-visible:opacity-100 md:right-5 md:opacity-0 md:group-hover/slideshow:opacity-100"
              >
                <ChevronRight />
              </button>
            </div>

            <div
              className="mt-2 flex items-center justify-center gap-1 md:mt-3"
              role="tablist"
              aria-label="Slide indicators"
            >
              {SLIDES.map((slide, i) => {
                const isActive = i === index
                return (
                  <button
                    key={slide.imageUrl}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-full"
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
          </div>
        </div>
      </div>
    </section>
  )
}
