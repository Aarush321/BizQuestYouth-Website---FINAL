import type { ReactNode } from 'react'
import SectionEyebrow from '../ui/SectionEyebrow'

type Program = {
  title: string
  body: string
  icon: ReactNode
}

function CodingIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect
        x="5"
        y="8"
        width="30"
        height="21"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="M3 33h34" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M16 15l-4 3.5 4 3.5M24 15l4 3.5-4 3.5"
        stroke="var(--color-gold)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="program-accent"
      />
    </svg>
  )
}

function AiIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M20 4v6M20 30v6M4 20h6M30 20h6M8.5 8.5l4.2 4.2M27.3 27.3l4.2 4.2M31.5 8.5l-4.2 4.2M12.7 27.3l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle
        cx="20"
        cy="20"
        r="1.75"
        fill="var(--color-gold)"
        className="program-accent"
      />
    </svg>
  )
}

function EntrepreneurshipIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M5 30V18M14 30V13M23 30V21"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path d="M4 34h30" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path
        d="M22 12l6-4 6 4M28 8v10"
        stroke="var(--color-gold)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="program-accent"
      />
    </svg>
  )
}

function CommunityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M5 31c0-5 4-8 9-8s9 3 9 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle
        cx="27"
        cy="16"
        r="3.5"
        stroke="var(--color-gold)"
        strokeWidth="1.75"
        className="program-accent"
      />
      <path
        d="M25 31c0-4 2.5-6.5 6-6.5s6 2.5 6 6.5"
        stroke="var(--color-gold)"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="program-accent"
      />
    </svg>
  )
}

const PROGRAMS: Program[] = [
  {
    title: 'Coding',
    body: 'Students build real websites, dashboards, and app prototypes—writing code that ships to actual community partners.',
    icon: <CodingIcon />,
  },
  {
    title: 'AI & Technology',
    body: 'From AI-powered tools to data visualizations, students use technology as a medium to solve meaningful problems.',
    icon: <AiIcon />,
  },
  {
    title: 'Entrepreneurship',
    body: 'Students learn to identify problems, validate ideas, research customers, and pitch solutions within real constraints.',
    icon: <EntrepreneurshipIcon />,
  },
  {
    title: 'Community Impact',
    body: 'Every project serves a local business, nonprofit, or school—turning lessons into measurable value for real people.',
    icon: <CommunityIcon />,
  },
]

export default function ProgramsPreview() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>What We Teach</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-4xl">
            Skills that turn students into builders.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRAMS.map((program) => (
            <div
              key={program.title}
              className="program-card group rounded-xl border border-slate/15 bg-white p-6 shadow-[0_1px_3px_rgba(27,42,74,0.04)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(27,42,74,0.10)] sm:p-8"
            >
              <div className="text-navy">{program.icon}</div>
              <h3 className="mt-6 font-display text-xl font-semibold text-navy">
                {program.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-slate">
                {program.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
