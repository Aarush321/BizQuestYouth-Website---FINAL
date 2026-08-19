type SectionEyebrowProps = {
  children: string
}

/** Section label: navy text (AA) with a gold mark so gold stays the primary accent. */
export default function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <p className="inline-flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-navy">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
      {children}
    </p>
  )
}
