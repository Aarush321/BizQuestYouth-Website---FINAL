import { useMemo } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'

export default function MissionStrip() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const revealed = reduceMotion || inView

  return (
    <section id="mission" className="bg-white px-5 py-16 md:px-8 md:py-28">
      <div
        ref={ref}
        className="mx-auto max-w-[700px] text-center transition-[opacity,transform] duration-500 ease-out"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <h2 className="font-display text-2xl font-semibold leading-[1.15] text-navy md:text-4xl">
          To empower the next generation of innovators by providing
          underserved students with the technical, entrepreneurial, and
          leadership skills needed to solve real community problems.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-slate">
          Because students learn best by building real solutions for real
          people.
        </p>
      </div>
    </section>
  )
}
