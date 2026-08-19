import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="w-full bg-gold px-5 py-20 md:py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Bring BizQuest to Your School
        </h2>
        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-navy/80 md:text-lg">
          Start a chapter and give your students the chance to build real
          solutions for their community.
        </p>
        <Link
          to="/chapters"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-navy px-8 py-3.5 font-body text-sm font-semibold text-white transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(27,42,74,0.25)]"
        >
          Start a Chapter
        </Link>
      </div>
    </section>
  )
}
