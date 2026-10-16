import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'
import SectionEyebrow from '../ui/SectionEyebrow'

const PRIORITIES = [
  {
    title: 'Laptops and software',
    body: 'For students who don’t have a computer at home.',
    noteClass: 'post-it-gold post-it-tilt-left',
  },
  {
    title: 'Meetings and events',
    body: 'Chapter meetings, workshops, and pitch competitions, mostly in neighborhoods that don’t get much of this.',
    noteClass: 'post-it-blue post-it-tilt-right',
  },
  {
    title: 'Mentors',
    body: 'Getting students in a room with local business owners who can answer their questions.',
    noteClass: 'post-it-pink post-it-tilt-left',
  },
] as const

export default function WhyWeRaise() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2)
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const revealed = reduceMotion || inView

  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl gap-12 transition-[opacity,transform] duration-500 ease-out lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <div>
          <SectionEyebrow>Why we raise money</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            A lot of kids don&rsquo;t have a laptop at home.
          </h2>
          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-slate md:text-lg">
            <p>
              We kept meeting students with good ideas who had no way to act on
              them. Some didn&rsquo;t have a computer. Some didn&rsquo;t have
              internet at home. Most had never talked to anyone who&rsquo;d
              started a business.
            </p>
            <p>
              So the biggest goal for the money we raise is closing the
              education and technology gap in places like Memphis and other big
              cities with high poverty rates. Where you grow up shouldn&rsquo;t
              decide whether you get to learn this stuff.
            </p>
          </div>
          <Link
            to="/fundraise"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          >
            Help Us Out
          </Link>
        </div>

        <div>
          <p className="rotate-[-3deg] font-hand text-2xl text-teal md:text-[1.75rem]">
            where your money goes ↓
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {PRIORITIES.map((item) => (
              <li key={item.title} className={`post-it ${item.noteClass}`}>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-navy/80">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
