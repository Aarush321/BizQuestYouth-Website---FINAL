import { Link } from 'react-router-dom'

export default function SupportCta() {
  return (
    <section className="relative overflow-hidden bg-gold px-5 py-20 md:py-24">
      <div
        className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/20 blur-2xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="post-it post-it-pink post-it-tilt-right max-w-sm px-6 py-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy/60">
            Let&rsquo;s build together
          </p>
          <p className="mt-2 font-display text-xl font-semibold leading-snug text-navy">
            Bring the idea. We&rsquo;ll bring the team.
          </p>
        </div>

        <h2 className="mt-8 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Ready to support our mission?
        </h2>
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-navy/80 md:text-lg">
          Partner with us, sponsor a project, or help fund IT access for
          underserved students and businesses. We&rsquo;d love to hear from you.
        </p>
        <Link
          to="/connect"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-8 py-3.5 font-body text-sm font-semibold text-white transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(27,42,74,0.25)]"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}
