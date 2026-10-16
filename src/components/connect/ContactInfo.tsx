import SectionEyebrow from '../ui/SectionEyebrow'

const EMAIL = 'contactbizquest@gmail.com'
const PHONE_DISPLAY = '+1 (901) 319-5544'
const PHONE_TEL = '+19013195544'
// Leave empty to hide the address line; swap in a real mailing address later.
const MAILING_ADDRESS = ''

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h-2A2 2 0 004.5 6.5c0 8.01 6.49 14.5 14.5 14.5a2 2 0 002-2v-2l-3.5-1.5-2 2a12.5 12.5 0 01-5.5-5.5l2-2L8.5 4.5z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ContactInfo() {
  return (
    <div>
      <SectionEyebrow>Connect</SectionEyebrow>
      <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-navy md:text-[2.75rem]">
        Get in Touch
      </h1>
      <p className="mt-4 max-w-md font-body text-base leading-relaxed text-slate">
        Questions, ideas, or want to get involved? Send us a message or email
        us directly.
      </p>

      <ul className="mt-10 space-y-5">
        <li>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-3 font-body text-base font-medium text-navy underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-gold hover:decoration-gold"
          >
            <span className="text-gold">
              <EnvelopeIcon />
            </span>
            {EMAIL}
          </a>
        </li>
        <li>
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-3 font-body text-base font-medium text-navy underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-gold hover:decoration-gold"
          >
            <span className="text-gold">
              <PhoneIcon />
            </span>
            {PHONE_DISPLAY}
          </a>
        </li>
      </ul>

      {MAILING_ADDRESS ? (
        <p className="mt-8 font-body text-sm leading-relaxed text-slate">
          {MAILING_ADDRESS}
        </p>
      ) : null}
    </div>
  )
}
