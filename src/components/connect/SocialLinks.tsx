import SocialIconLinks from '../layout/SocialIconLinks'

export default function SocialLinks() {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-slate">
        Follow along
      </p>
      <SocialIconLinks
        className="mt-4 flex items-center gap-5"
        linkClassName="text-navy transition-colors duration-200 hover:text-gold"
      />
    </div>
  )
}
