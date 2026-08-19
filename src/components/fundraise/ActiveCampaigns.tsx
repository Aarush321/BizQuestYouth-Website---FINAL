import { Link } from 'react-router-dom'

type Campaign = {
  title: string
  description: string
  goalAmount: number
  raisedAmount: number
  imageUrl: string | null
}

// Placeholder campaigns — swap in real entries without changing layout.
const CAMPAIGNS: Campaign[] = [
  {
    title: 'Chapter Starter Kits',
    description: 'Equip new chapters with laptops, materials, and curriculum kits.',
    goalAmount: 15000,
    raisedAmount: 9200,
    imageUrl: null,
  },
  {
    title: 'AI Tools Access Fund',
    description: 'Provide students with licensed software and AI platform access.',
    goalAmount: 8000,
    raisedAmount: 5100,
    imageUrl: null,
  },
  {
    title: 'Community Project Grants',
    description: 'Seed grants so student teams can prototype solutions for partners.',
    goalAmount: 20000,
    raisedAmount: 7400,
    imageUrl: null,
  },
  {
    title: 'Mentor Training Program',
    description: 'Train volunteer mentors who guide chapters through real projects.',
    goalAmount: 10000,
    raisedAmount: 3800,
    imageUrl: null,
  },
]

function formatDollars(n: number) {
  return `$${n.toLocaleString('en-US')}`
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const pct = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
  )

  return (
    <article className="program-card flex flex-col overflow-hidden rounded-xl border border-slate/15 bg-white shadow-[0_1px_3px_rgba(27,42,74,0.04)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(27,42,74,0.10)]">
      <div className="flex aspect-[16/10] items-center justify-center bg-slate/10">
        {campaign.imageUrl ? (
          <img
            src={campaign.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-mono text-sm uppercase tracking-[0.14em] text-slate/60">
            [photo]
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-navy">
          {campaign.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-slate">
          {campaign.description}
        </p>

        <div className="mt-5">
          <div
            className="h-2 overflow-hidden rounded-full bg-slate/15"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${pct}% of goal raised`}
          >
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2.5 font-mono text-[11px] tracking-[0.04em] text-slate">
            {formatDollars(campaign.raisedAmount)} of{' '}
            {formatDollars(campaign.goalAmount)} raised
          </p>
        </div>

        <Link
          to="/connect"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gold px-5 py-2.5 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        >
          Donate
        </Link>
      </div>
    </article>
  )
}

export default function ActiveCampaigns() {
  return (
    <section className="bg-slate/[0.04] px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">
          Active Fundraisers
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.title} campaign={campaign} />
          ))}
        </div>
      </div>
    </section>
  )
}
