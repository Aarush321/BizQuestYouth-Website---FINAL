import { useState, type FormEvent } from 'react'

const INTEREST_OPTIONS = [
  'Joining as a Student',
  'Donating',
  'Partnering as an Organization',
  'Starting a Chapter',
  'Other',
] as const

type Interest = (typeof INTEREST_OPTIONS)[number]

type FormData = {
  name: string
  email: string
  interest: Interest | ''
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

// Always 2px border so focus doesn't shift layout; light slate idle → navy + gold glow on focus.
const INPUT_CLASS =
  'w-full rounded-lg border-2 border-slate/25 bg-white px-3 py-3 font-body text-sm text-navy placeholder:text-slate transition-[border-color,box-shadow] duration-150 focus:border-navy focus:outline-none focus:shadow-[0_0_0_3px_rgba(245,166,35,0.28)]'

const EMPTY_FORM: FormData = {
  name: '',
  email: '',
  interest: '',
  message: '',
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Please enter your name.'
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!data.interest) {
    errors.interest = 'Please select an option.'
  }

  if (!data.message.trim()) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setSubmitError(null)

    if (Object.keys(nextErrors).length > 0) return

    const payload = {
      'form-name': 'contact',
      'bot-field': '',
      name: form.name.trim(),
      email: form.email.trim(),
      interest: form.interest,
      message: form.message.trim(),
    }

    if (!import.meta.env.PROD) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      })
      if (!res.ok) {
        throw new Error('Form submission failed')
      }
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Something went wrong sending your message. Please email contactbizquest@gmail.com or try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl border-l-[3px] border-gold bg-navy px-6 py-6 shadow-[0_8px_24px_rgba(27,42,74,0.12)]"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-lg font-semibold text-white">
          Thanks — we&rsquo;ll be in touch soon.
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-white/70">
          Your message has been received. A BizQuest teammate will follow up
          shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don&rsquo;t fill this out if you&rsquo;re human:{' '}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div>
        <label
          htmlFor="contact-name"
          className="mb-2 block font-body text-sm font-medium text-navy"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={INPUT_CLASS}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p
            id="contact-name-error"
            className="mt-1.5 font-body text-sm text-red-600/80"
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-2 block font-body text-sm font-medium text-navy"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={INPUT_CLASS}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email ? (
          <p
            id="contact-email-error"
            className="mt-1.5 font-body text-sm text-red-600/80"
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-interest"
          className="mb-2 block font-body text-sm font-medium text-navy"
        >
          I&rsquo;m interested in...
        </label>
        <select
          id="contact-interest"
          name="interest"
          value={form.interest}
          onChange={(e) =>
            updateField('interest', e.target.value as Interest | '')
          }
          className={`${INPUT_CLASS} appearance-none bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%231B2A4A' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
          }}
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={
            errors.interest ? 'contact-interest-error' : undefined
          }
        >
          <option value="" disabled>
            Select an option
          </option>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interest ? (
          <p
            id="contact-interest-error"
            className="mt-1.5 font-body text-sm text-red-600/80"
          >
            {errors.interest}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-2 block font-body text-sm font-medium text-navy"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => updateField('message', e.target.value)}
          className={`${INPUT_CLASS} resize-y`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
        />
        {errors.message ? (
          <p
            id="contact-message-error"
            className="mt-1.5 font-body text-sm text-red-600/80"
          >
            {errors.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="font-body text-sm text-red-600/80" role="alert">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-3.5 font-body text-sm font-semibold text-navy transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#de951f] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {submitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
