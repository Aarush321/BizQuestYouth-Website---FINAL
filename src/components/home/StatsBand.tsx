import { useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'

type Stat = {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

// Placeholder targets — swap in real numbers later without touching layout
const STATS: Stat[] = [
  { value: 500, suffix: '+', label: 'Students Reached' },
  { value: 5000, prefix: '$', suffix: '+', label: 'Dollars Raised' },
  { value: 4, label: 'Chapters' },
]

const DURATION = 1500
const STAGGER = 100

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function StatCount({
  stat,
  start,
  delay,
  reduceMotion,
}: {
  stat: Stat
  start: boolean
  delay: number
  reduceMotion: boolean
}) {
  const [current, setCurrent] = useState(reduceMotion ? stat.value : 0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    if (reduceMotion) {
      setCurrent(stat.value)
      return
    }

    let startTime: number | null = null
    let timeoutId: number | undefined

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / DURATION, 1)
      setCurrent(Math.round(easeOutCubic(progress) * stat.value))
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    timeoutId = window.setTimeout(() => {
      frame.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [start, reduceMotion, stat.value, delay])

  const formatted = `${stat.prefix ?? ''}${current.toLocaleString('en-US')}${
    stat.suffix ?? ''
  }`

  return (
    <span className="font-display text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
      {formatted}
    </span>
  )
}

export default function StatsBand() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const start = reduceMotion || inView

  return (
    <section className="w-full bg-navy py-16 md:py-20">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 px-5 sm:gap-x-6 sm:gap-y-12 md:px-8 lg:grid-cols-3"
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <StatCount
              stat={stat}
              start={start}
              delay={i * STAGGER}
              reduceMotion={reduceMotion}
            />
            <span className="mt-3 max-w-[9.5rem] font-mono text-[12px] uppercase leading-snug tracking-[0.12em] text-white sm:max-w-none sm:text-[13px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
