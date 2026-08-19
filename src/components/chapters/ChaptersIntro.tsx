import SectionEyebrow from '../ui/SectionEyebrow'

export default function ChaptersIntro() {
  return (
    <section className="bg-white px-5 pt-16 pb-4 md:px-8 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Our Network</SectionEyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Chapters Across the WORLD
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-slate md:text-lg">
          Find a chapter near you — or start one where BizQuest hasn’t landed
          yet.
        </p>
      </div>
    </section>
  )
}
