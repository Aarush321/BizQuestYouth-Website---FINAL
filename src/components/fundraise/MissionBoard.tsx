import { useMemo } from 'react'
import { prefersReducedMotion, useInView } from '../../hooks/useInView'

type PostIt = {
  tag: string
  title: string
  body: string
  variant: 'gold' | 'blue' | 'teal' | 'pink' | 'navy'
  tilt: 'left' | 'right' | 'none'
}

const POSTITS: PostIt[] = [
  {
    tag: '01 / Mission',
    title: 'Collaborate with local business',
    body: 'Student teams partner with real businesses — building websites, tools, and tech solutions that actually get used.',
    variant: 'gold',
    tilt: 'left',
  },
  {
    tag: '02 / Impact',
    title: 'Lift underserved businesses',
    body: 'We raise funds and volunteer hours to help small, under-resourced businesses get the digital presence and tools they need.',
    variant: 'blue',
    tilt: 'right',
  },
  {
    tag: '03 / Access',
    title: 'Fund IT for underserved people',
    body: 'Donations and sponsorships go toward laptops, software, AI tools, and training — so more students can break into tech.',
    variant: 'pink',
    tilt: 'right',
  },
  {
    tag: '04 / Together',
    title: 'Real projects, real community',
    body: 'Every partnership is hands-on: students learn by doing, businesses get help, and communities see change they can feel.',
    variant: 'navy',
    tilt: 'left',
  },
]

const variantClass: Record<PostIt['variant'], string> = {
  gold: 'post-it-gold',
  blue: 'post-it-blue',
  teal: 'post-it-teal',
  pink: 'post-it-pink',
  navy: 'post-it-navy',
}

const tiltClass: Record<PostIt['tilt'], string> = {
  left: 'post-it-tilt-left',
  right: 'post-it-tilt-right',
  none: '',
}

function PostItCard({
  postIt,
  revealed,
  delay,
}: {
  postIt: PostIt
  revealed: boolean
  delay: number
}) {
  return (
    <article
      className={[
        'post-it transition-[opacity,transform] duration-500 ease-out',
        variantClass[postIt.variant],
        tiltClass[postIt.tilt],
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p
        className={[
          'font-mono text-[10px] uppercase tracking-[0.14em]',
          postIt.variant === 'navy' ? 'text-gold/90' : 'text-navy/60',
        ].join(' ')}
      >
        {postIt.tag}
      </p>
      <h3
        className={[
          'mt-2 font-display text-lg font-semibold leading-snug',
          postIt.variant === 'navy' ? 'text-white' : 'text-navy',
        ].join(' ')}
      >
        {postIt.title}
      </h3>
      <p
        className={[
          'mt-2 font-body text-sm leading-relaxed',
          postIt.variant === 'navy' ? 'text-white/85' : 'text-navy/80',
        ].join(' ')}
      >
        {postIt.body}
      </p>
    </article>
  )
}

export default function MissionBoard() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15)
  const reduceMotion = useMemo(prefersReducedMotion, [])
  const revealed = reduceMotion || inView

  return (
    <section className="bg-slate/[0.04] px-5 py-16 md:px-8 md:py-24">
      <div ref={ref} className="mx-auto max-w-6xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-teal">
          What we stand for
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-navy md:text-4xl">
          Our mission, pinned up.
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-slate">
          BizQuest brings students, donors, and local partners together — raising
          money and building projects that open doors for underserved businesses
          and people in IT.
        </p>

        <div className="post-it-board mt-12 rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {POSTITS.map((postIt, i) => (
              <PostItCard
                key={postIt.tag}
                postIt={postIt}
                revealed={revealed}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
