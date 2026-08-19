import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="bg-white px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Page not found.
        </h1>
        <p className="mt-4 font-body text-base leading-relaxed text-slate">
          That URL doesn&rsquo;t match a page on this site.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
