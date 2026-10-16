import { Link } from 'react-router-dom'
import SectionEyebrow from '../ui/SectionEyebrow'

export default function SupportIntro() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 md:px-8 md:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-pink/30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionEyebrow>Reach out to support</SectionEyebrow>
          <h1 className="mt-4 font-display text-[2rem] font-bold leading-[1.08] text-navy sm:text-4xl lg:text-[2.85rem]">
            Want to help out?
          </h1>
          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-slate md:text-lg">
            We raise money for laptops, software, and events. We also team up
            with local businesses that could use some help with their tech. If
            either of those sounds like you, reach out.
          </p>
          <Link
            to="/connect"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          >
            Reach Out to Support
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="post-it-board rounded-2xl p-6 md:p-8">
            <div className="post-it post-it-gold post-it-tilt-left mx-auto max-w-[15rem]">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                Why we do this
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug text-navy">
                Plenty of kids have ideas.
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy/85">
                Fewer have a laptop, decent internet, and someone to show them
                where to start.
              </p>
            </div>

            <div className="post-it post-it-pink post-it-tilt-right mt-6 ml-auto max-w-[14rem]">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                Student-run
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-navy">
                Every chapter is run by students. So is the national team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
