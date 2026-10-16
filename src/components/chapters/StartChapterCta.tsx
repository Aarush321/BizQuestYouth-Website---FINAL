import { Link } from 'react-router-dom'

export default function StartChapterCta() {
  return (
    <section className="w-full bg-navy px-5 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-[2.75rem]">
          Don&rsquo;t see your city? Start a chapter.
        </h2>
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-white/75 md:text-lg">
          Send us a message and we&rsquo;ll help you get it going.
        </p>
        <Link
          to="/connect"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  )
}
