import { useMemo, useState } from 'react'
import { CHAPTERS } from '../../data/chapters'
import SectionEyebrow from '../ui/SectionEyebrow'

export default function ChapterList() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CHAPTERS
    return CHAPTERS.filter(
      (chapter) =>
        chapter.name.toLowerCase().includes(q) ||
        chapter.city.toLowerCase().includes(q),
    )
  }, [query])

  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Full List</SectionEyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy md:text-4xl">
              Every Chapter
            </h2>
          </div>

          <div className="relative w-full sm:w-72">
            <label htmlFor="chapter-search" className="sr-only">
              Search chapters by name or city
            </label>
            <input
              id="chapter-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or city"
              autoComplete="off"
              className="w-full rounded-full border-2 border-slate/25 bg-white px-4 py-2.5 font-body text-sm text-navy placeholder:text-slate transition-[border-color,box-shadow] duration-150 focus:border-navy focus:outline-none focus:shadow-[0_0_0_3px_rgba(245,166,35,0.28)]"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-10 font-body text-sm text-slate">
            No chapters match “{query}.”
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((chapter) => (
              <li key={chapter.name}>
                <article className="h-full rounded-xl border-l-[3px] border-gold bg-navy px-5 py-5 shadow-[0_8px_24px_rgba(27,42,74,0.12)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(27,42,74,0.18)]">
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">
                    {chapter.name}
                  </h3>
                  <p className="mt-1 font-body text-sm text-white/70">
                    {chapter.city}
                  </p>
                  {chapter.studentCount ? (
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
                      {chapter.studentCount} students
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
