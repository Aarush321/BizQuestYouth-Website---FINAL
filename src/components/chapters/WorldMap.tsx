import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  type ProjectionFunction,
} from 'react-simple-maps'
import { geoEqualEarth } from 'd3-geo'
import countries from 'world-atlas/countries-110m.json'
import { prefersReducedMotion } from '../../hooks/useInView'
import { CHAPTERS, type Chapter } from '../../data/chapters'

const MAP_WIDTH = 980
const MAP_HEIGHT = 551

// Shared projection instance: used both to render the base map and to
// compute each chapter dot's position, so the two always stay in sync.
const projection = geoEqualEarth()
  .scale(155)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])

const StaticMap = memo(function StaticMap() {
  return (
    <ComposableMap
      projection={projection as unknown as ProjectionFunction}
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Geographies geography={countries}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              style={{
                // Teal land tint stays understated so gold chapter dots dominate.
                default: {
                  fill: 'rgba(46, 139, 154, 0.07)',
                  stroke: 'rgba(27, 42, 74, 0.14)',
                  strokeWidth: 0.6,
                  outline: 'none',
                },
                hover: {
                  fill: 'rgba(46, 139, 154, 0.07)',
                  stroke: 'rgba(27, 42, 74, 0.14)',
                  strokeWidth: 0.6,
                  outline: 'none',
                },
                pressed: {
                  fill: 'rgba(46, 139, 154, 0.07)',
                  stroke: 'rgba(27, 42, 74, 0.14)',
                  strokeWidth: 0.6,
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
})

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
    >
      <path
        d="M12 2.4l2.47 6.02 6.53.55-4.96 4.22 1.5 6.38L12 16.5l-5.54 3.07 1.5-6.38L3 8.97l6.53-.55L12 2.4z"
        fill="currentColor"
        stroke="white"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChapterMarker({
  chapter,
  isActive,
  reduceMotion,
  delay,
  onHover,
  onUnhover,
  onTogglePin,
}: {
  chapter: Chapter
  isActive: boolean
  reduceMotion: boolean
  delay: number
  onHover: () => void
  onUnhover: () => void
  onTogglePin: () => void
}) {
  const [x, y] = projection([chapter.lng, chapter.lat]) ?? [0, 0]
  const leftPct = (x / MAP_WIDTH) * 100
  const topPct = (y / MAP_HEIGHT) * 100

  const placeBelow = topPct < 22
  const hAlign = leftPct < 15 ? 'left' : leftPct > 85 ? 'right' : 'center'

  const translateX = hAlign === 'left' ? '0%' : hAlign === 'right' ? '-100%' : '-50%'
  const translateY = placeBelow ? '14px' : 'calc(-100% - 14px)'

  return (
    <button
      type="button"
      className="group absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      style={{ left: `${leftPct}%`, top: `${topPct}%`, zIndex: isActive ? 30 : 10 }}
      aria-label={
        chapter.studentCount
          ? `${chapter.name}, ${chapter.city}, ${chapter.studentCount} students`
          : `${chapter.name}, ${chapter.city}`
      }
      aria-expanded={isActive}
      onMouseEnter={onHover}
      onMouseLeave={onUnhover}
      onFocus={onHover}
      onBlur={onUnhover}
      onClick={(e) => {
        e.stopPropagation()
        onTogglePin()
      }}
    >
      <span
        className={`relative flex items-center justify-center ${
          chapter.featured ? 'h-5 w-5' : 'h-3 w-3'
        }`}
      >
        {!reduceMotion && (
          <span
            className="chapter-pulse absolute inset-0 rounded-full border-2 border-gold"
            style={{ animationDelay: `${delay}s` }}
            aria-hidden
          />
        )}
        {chapter.featured ? (
          <StarIcon
            className={`relative text-gold drop-shadow-[0_1px_2px_rgba(27,42,74,0.25)] transition-transform duration-150 ease-out group-hover:scale-[1.2] ${
              isActive ? 'scale-[1.2]' : ''
            }`}
          />
        ) : (
          <span
            className={`relative h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_0_1.5px_rgba(255,255,255,0.9)] transition-transform duration-150 ease-out group-hover:scale-[1.3] ${
              isActive ? 'scale-[1.3]' : ''
            }`}
          />
        )}
      </span>

      {isActive && (
        <div
          className="pointer-events-none absolute w-max max-w-[220px] rounded-lg border-l-[3px] border-gold bg-navy px-4 py-3 shadow-[0_8px_24px_rgba(27,42,74,0.28)]"
          style={{
            left: '0px',
            top: '0px',
            transform: `translate(${translateX}, ${translateY})`,
          }}
        >
          <p className="font-display text-sm font-semibold leading-snug text-white">
            {chapter.name}
          </p>
          <p className="mt-0.5 font-body text-xs text-white/70">{chapter.city}</p>
          {chapter.studentCount ? (
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
              {chapter.studentCount} students
            </p>
          ) : null}
        </div>
      )}
    </button>
  )
}

export default function WorldMap() {
  // Hover/focus (transient, desktop + keyboard) and pin (click/tap, sticky)
  // are tracked separately so a click doesn't immediately cancel out the
  // focus event that precedes it in the browser's native event order.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)
  const activeIndex = pinnedIndex ?? hoveredIndex
  const containerRef = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useMemo(prefersReducedMotion, [])

  useEffect(() => {
    if (pinnedIndex === null) return

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setPinnedIndex(null)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [pinnedIndex])

  return (
    <section className="bg-slate/5 px-5 py-16 md:px-8 md:py-24 lg:flex lg:min-h-[85vh] lg:flex-col lg:justify-center">
      <div className="mx-auto w-full max-w-6xl">
        <div
          ref={containerRef}
          onClick={() => setPinnedIndex(null)}
          className="relative aspect-[980/551] w-full overflow-visible rounded-2xl border border-slate/10 bg-white p-5 shadow-[0_1px_3px_rgba(27,42,74,0.04)] md:p-10"
        >
          <div className="relative h-full w-full overflow-visible">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <StaticMap />
            </div>

            {CHAPTERS.map((chapter, i) => (
              <ChapterMarker
                key={chapter.name}
                chapter={chapter}
                isActive={activeIndex === i}
                reduceMotion={reduceMotion}
                delay={i * 0.35}
                onHover={() => setHoveredIndex(i)}
                onUnhover={() => setHoveredIndex((prev) => (prev === i ? null : prev))}
                onTogglePin={() => setPinnedIndex((prev) => (prev === i ? null : i))}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-slate/70 md:hidden">
          Tap a marker to see chapter details
        </p>
      </div>
    </section>
  )
}
