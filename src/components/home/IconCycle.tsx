import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { JOURNEY_ICONS } from '../../assets/icons'
import { prefersReducedMotion } from '../../hooks/useInView'

const HOLD_MS = 2600
const FADE_MS = 550

function GoldIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      className="icon-cycle-glyph"
      draggable={false}
      aria-hidden
    />
  )
}

export default function IconCycle() {
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const indexRef = useRef(0)
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) {
      window.clearTimeout(id)
    }
    timersRef.current = []
  }, [])

  const queueTimer = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay)
    timersRef.current.push(id)
    return id
  }, [])

  const runCycle = useCallback(() => {
    if (reduceMotion) return

    // 1) Fade current icon out completely.
    setVisible(false)

    queueTimer(() => {
      // 2) Swap icon while fully hidden.
      const next = (indexRef.current + 1) % JOURNEY_ICONS.length
      indexRef.current = next
      setIndex(next)

      // 3) Fade the new icon in after the outgoing fade finishes.
      queueTimer(() => {
        window.requestAnimationFrame(() => setVisible(true))
      }, 40)
    }, FADE_MS)
  }, [queueTimer, reduceMotion])

  useEffect(() => {
    if (reduceMotion) return

    const intervalId = window.setInterval(runCycle, HOLD_MS + FADE_MS * 2)

    return () => {
      window.clearInterval(intervalId)
      clearTimers()
    }
  }, [clearTimers, reduceMotion, runCycle])

  const active = JOURNEY_ICONS[index]

  return (
    <div
      className="relative h-full w-full"
      role="img"
      aria-label={
        reduceMotion
          ? `${active.label} — BizQuest learning journey`
          : `BizQuest learning journey: ${active.label}`
      }
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {active.label}
      </div>

      <div
        className="pointer-events-none absolute inset-[18%] rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="icon-cycle-stage transition-opacity ease-in-out"
          style={{
            opacity: reduceMotion ? 1 : visible ? 1 : 0,
            transitionDuration: reduceMotion ? '0ms' : `${FADE_MS}ms`,
          }}
        >
          <GoldIcon
            src={
              reduceMotion ? JOURNEY_ICONS[0].src : active.src
            }
          />
        </div>
      </div>
    </div>
  )
}
