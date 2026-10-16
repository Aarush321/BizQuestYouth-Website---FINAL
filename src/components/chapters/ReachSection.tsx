import SectionEyebrow from '../ui/SectionEyebrow'

const STATES = ['Tennessee', 'Georgia', 'Mississippi', 'Texas'] as const

const METHODS = [
  {
    title: 'Pitch competitions',
    body: 'Students pitch their own business ideas to a panel of judges.',
  },
  {
    title: 'Chapter meetings',
    body: 'Where most of the learning happens. Members work on tech, business, and AI projects together.',
  },
  {
    title: 'Workshops & virtual sessions',
    body: 'We run some in person and some online, so you can join even if there’s no chapter near you.',
  },
] as const

export default function ReachSection() {
  return (
    <section className="bg-slate/[0.04] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Outside our chapters</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
            Where BizQuest has reached.
          </h2>
          <p className="mt-4 font-body text-base leading-relaxed text-slate md:text-lg">
            Besides our chapters, we&rsquo;ve worked with students from{' '}
            {STATES.length} states so far.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {STATES.map((state) => (
            <li
              key={state}
              className="rounded-full border-[1.5px] border-navy bg-white px-4 py-2 font-body text-sm font-medium text-navy"
            >
              {state}
            </li>
          ))}
        </ul>

        <h3 className="mt-14 font-display text-xl font-semibold text-navy md:text-2xl">
          How students find us
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {METHODS.map((method) => (
            <article
              key={method.title}
              className="rounded-xl border-l-[3px] border-gold bg-white px-6 py-6 shadow-[0_1px_3px_rgba(27,42,74,0.06)]"
            >
              <h4 className="font-display text-lg font-semibold text-navy">
                {method.title}
              </h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-slate">
                {method.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
