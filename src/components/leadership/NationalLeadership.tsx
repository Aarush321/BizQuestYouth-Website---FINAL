import SectionEyebrow from '../ui/SectionEyebrow'
import aarushImg from '../../assets/leadership/aarush-ravichandran.png'
import avaneeshImg from '../../assets/leadership/avaneesh-chandran.png'
import kushagraImg from '../../assets/leadership/kushagra-dixit.png'
import navneethImg from '../../assets/leadership/navneeth-manoj.png'
import shreyanImg from '../../assets/leadership/shreyan-seth.png'
import uthejImg from '../../assets/leadership/uthej-katikaneni.png'

type Leader = {
  name: string
  title: string
  imageUrl: string | null
  imagePosition?: string
  imageFit?: 'cover' | 'contain'
}

// Placeholder roles/photos — swap titles and imageUrls without touching layout.
const LEADERS: Leader[] = [
  {
    name: 'Aarush Ravichandran',
    title: 'Co-Founder & Chief Executive Officer',
    imageUrl: aarushImg,
    imagePosition: 'left 12%',
  },
  {
    name: 'Uthej Katikaneni',
    title: 'Co-Founder & Chief Financial Officer',
    imageUrl: uthejImg,
    imagePosition: 'center 55%',
  },
  {
    name: 'Kushagra Dixit',
    title: 'Chief Operations Officer',
    imageUrl: kushagraImg,
    imagePosition: 'center 28%',
  },
  {
    name: 'Navneeth Manoj',
    title: 'Chief Growth Officer',
    imageUrl: navneethImg,
    imagePosition: 'center 28%',
  },
  {
    name: 'Avaneesh Chandran',
    title: 'Chief Marketing Officer',
    imageUrl: avaneeshImg,
    imagePosition: 'center 12%',
  },
  {
    name: 'Shreyan Seth',
    title: 'Chief Technology Officer',
    imageUrl: shreyanImg,
    imagePosition: 'center 18%',
  },
]

export default function NationalLeadership() {
  return (
    <section className="bg-white px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <SectionEyebrow>Our team</SectionEyebrow>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
            The people running BizQuest Youth.
          </h1>
          <p className="mt-4 font-body text-base leading-relaxed text-slate md:text-lg">
            BizQuest Youth was started in April 2025 by Aarush Ravichandran
            (CEO) and Uthej Katikaneni (CFO).
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {LEADERS.map((leader) => (
            <li key={leader.name}>
              <article className="group flex flex-col items-center text-center transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1">
                <div className="aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl bg-slate/10 shadow-[0_1px_3px_rgba(27,42,74,0.04)] transition-shadow duration-150 ease-out group-hover:shadow-[0_12px_28px_rgba(27,42,74,0.10)]">
                  {leader.imageUrl ? (
                    <img
                      src={leader.imageUrl}
                      alt={`${leader.name}, ${leader.title} of BizQuest Youth`}
                      className={`h-full w-full ${
                        leader.imageFit === 'contain'
                          ? 'object-contain'
                          : 'object-cover'
                      }`}
                      style={{
                        objectPosition: leader.imagePosition ?? 'center',
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-slate">
                        [photo]
                      </span>
                    </div>
                  )}
                </div>
                <h2 className="mt-5 font-display text-lg font-semibold text-navy md:text-xl">
                  {leader.name}
                </h2>
                <p className="mt-1.5 font-body text-sm text-slate">{leader.title}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
