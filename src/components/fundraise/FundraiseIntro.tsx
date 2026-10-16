import SectionEyebrow from '../ui/SectionEyebrow'

export default function FundraiseIntro() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>Support the mission</SectionEyebrow>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
          Every Dollar Builds Something Real
        </h1>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-slate md:text-lg">
          Your gift funds what student innovators need most: materials and
          supplies for chapters, access to AI tools and software, mentor and
          training support, and the project resources that help teams ship
          solutions for local businesses, community groups, and schools.
        </p>
      </div>
    </section>
  )
}
