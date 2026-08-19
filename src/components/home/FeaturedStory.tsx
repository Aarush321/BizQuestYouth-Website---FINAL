import { useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks/useInView'

export default function FeaturedStory() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [offset, setOffset] = useState(0)
  const reduceMotion = useMemo(prefersReducedMotion, [])

  useEffect(() => {
    if (reduceMotion) return
    const node = sectionRef.current
    if (!node) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = node.getBoundingClientRect()
      const viewportH = window.innerHeight
      // Progress from -1 (below viewport) to 1 (above), 0 when centered.
      const progress =
        (rect.top + rect.height / 2 - viewportH / 2) / (viewportH / 2 + rect.height / 2)
      // Slower image movement: a few tens of px across the scroll range.
      setOffset(Math.max(-1, Math.min(1, progress)) * 28)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  return (
    <section ref={sectionRef} className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex aspect-[4/3] items-center justify-center bg-slate/10"
            style={{ transform: `translateY(${offset}px)`, willChange: 'transform' }}
          >
            <span className="font-mono text-sm uppercase tracking-[0.14em] text-slate">
              [photo]
            </span>
          </div>
        </div>

        <figure className="max-w-xl">
          <blockquote className="font-display text-[1.75rem] font-medium italic leading-snug text-navy md:text-[2rem]">
            “BizQuest gave me the confidence to build something real for the
            first time.”
          </blockquote>
          <figcaption className="mt-6 font-mono text-xs uppercase tracking-[0.12em] text-slate">
            — Placeholder quote, replace with real testimonial
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
