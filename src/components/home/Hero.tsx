import { Link } from 'react-router-dom'
import SectionEyebrow from '../ui/SectionEyebrow'
import IconCycle from './IconCycle'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col overflow-hidden bg-white"
    >
      {/* Subtle navy wash from top-left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 0% 0%, rgba(27, 42, 74, 0.045) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-28 md:px-8 lg:py-24">
        <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-10">
          <div className="relative z-10 max-w-xl">
            <SectionEyebrow>Student-led</SectionEyebrow>

            <h1 className="mt-4 font-display text-[2.1rem] font-bold leading-[1.08] text-navy sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
              Students teaching students how to build things.
            </h1>

            <p className="mt-6 max-w-[500px] font-body text-base leading-relaxed text-slate md:text-xl md:leading-relaxed">
              BizQuest is a student-run nonprofit. Our chapters meet to learn
              coding, business, and AI, then use what they learn on projects
              for people in their own neighborhoods.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                to="/chapters"
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:min-w-[9.5rem]"
              >
                Join a Chapter
              </Link>
              <Link
                to="/fundraise"
                className="inline-flex items-center justify-center rounded-full border-[1.5px] border-navy bg-transparent px-7 py-3 font-body text-sm font-semibold text-navy transition-[background-color,color,border-color] duration-150 hover:bg-navy hover:text-white sm:min-w-[9.5rem]"
              >
                Support Us
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px] xl:h-[420px] xl:w-[420px]">
            <IconCycle />
          </div>
        </div>
      </div>

      <a
        href="#mission"
        className="hero-scroll-cue absolute bottom-6 z-10 flex flex-col items-center gap-1.5 text-slate/70 transition-colors hover:text-navy"
        aria-label="Scroll to content below"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3.5 6L8 10.5L12.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  )
}
