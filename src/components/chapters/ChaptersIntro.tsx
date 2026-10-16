import SectionEyebrow from '../ui/SectionEyebrow'

export default function ChaptersIntro() {
  return (
    <section className="bg-white px-5 pt-16 pb-4 md:px-8 md:pt-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Chapters</SectionEyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Where we meet.
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-slate md:text-lg">
          We have chapters in Tennessee, New Jersey, and Delhi, India. If
          there isn&rsquo;t one near you, you can start one.
        </p>
      </div>
    </section>
  )
}
