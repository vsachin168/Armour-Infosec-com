'use client'

import { useState, type FormEvent } from 'react'

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

const inputClass =
  'w-full px-4 py-3 bg-white/80 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-mono text-sm'

const labelClass = 'block text-sm font-mono text-gray-500 dark:text-gray-400 mb-2'
const errorClass = 'mt-1.5 text-xs font-mono text-red-500 dark:text-red-400'

// Google Forms entry IDs — mapped to the field semantics below.
const FIELD = {
  name: 'entry.1121572583',
  phone: 'entry.86501343',
  email: 'entry.1904996806',
  message: 'entry.634592121',
} as const

function validate(data: { name: string; email: string; phone: string; message: string }): FieldErrors {
  const errors: FieldErrors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name'
  if (!data.email.trim()) errors.email = 'Please enter your email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address'
  if (!data.phone.trim()) errors.phone = 'Please enter your phone number'
  else if (!/^[+\d][\d\s-]{6,}$/.test(data.phone)) errors.phone = 'Enter a valid phone number'
  if (!data.message.trim()) errors.message = 'Please tell us how we can help'
  else if (data.message.trim().length < 10) errors.message = 'Message is too short'
  return errors
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const read = (entryId: string) => {
      const el = form.elements.namedItem(entryId) as HTMLInputElement | HTMLTextAreaElement | null
      return el?.value ?? ''
    }
    const payload = {
      name: read(FIELD.name),
      email: read(FIELD.email),
      phone: read(FIELD.phone),
      message: read(FIELD.message),
    }
    const validation = validate(payload)
    setErrors(validation)
    if (Object.keys(validation).length > 0) {
      event.preventDefault()
      const firstKey = Object.keys(validation)[0] as keyof FieldErrors
      const firstEntry = FIELD[firstKey]
      form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${firstEntry}"]`)?.focus()
      return
    }
    // Validation passed — let the form submit naturally to Google via the
    // hidden iframe (no preventDefault), then swap to the success state.
    setSubmitting(true)
    setTimeout(() => setSubmitted(true), 800)
  }

  if (submitted) {
    return (
      <>
        <div
          id="successMsg"
          role="status"
          aria-live="polite"
          className="rounded-2xl bg-white/80 dark:bg-white/[0.04] border border-accent/30 dark:border-cyber-border px-6 py-10 text-center backdrop-blur-md shadow-sm"
        >
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent/10 border border-accent/25 text-accent" aria-hidden="true">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Message received</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto leading-relaxed">
            Thanks for reaching out. A member of our team will reply within 24 hours.
          </p>
        </div>
        {/* Hidden iframe stays mounted so the form's prior POST resolves cleanly. */}
        <iframe
          name="hidden_iframe"
          title="Hidden form submission target"
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
        />
      </>
    )
  }

  return (
    <>
      <form
        id="contactForm"
        action="https://docs.google.com/forms/d/e/1FAIpQLSdXOQUHGs5YReyC3ArKtSf1dx_wMTumpIvJoBKoVX36DPWwcQ/formResponse"
        method="POST"
        target="hidden_iframe"
        onSubmit={onSubmit}
        noValidate
        className="space-y-5"
        aria-label="Contact enquiry form"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              Name <span className="text-accent">*</span>
            </label>
            <input
              id="contact-name"
              name={FIELD.name}
              type="text"
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass}
              placeholder="Your full name"
            />
            {errors.name && <p id="name-error" className={errorClass}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Email <span className="text-accent">*</span>
            </label>
            <input
              id="contact-email"
              name={FIELD.email}
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass}
              placeholder="you@example.com"
            />
            {errors.email && <p id="email-error" className={errorClass}>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="text-accent">*</span>
          </label>
          <input
            id="contact-phone"
            name={FIELD.phone}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={inputClass}
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p id="phone-error" className={errorClass}>{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Message <span className="text-accent">*</span>
          </label>
          <textarea
            id="contact-message"
            name={FIELD.message}
            required
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputClass} resize-none`}
            placeholder="Tell us what you're looking for — training, assessment, or consulting."
          />
          {errors.message && <p id="message-error" className={errorClass}>{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3.5 bg-accent text-white font-mono font-medium rounded-xl hover:opacity-90 hover:shadow-[0_0_25px_var(--color-accent-glow)] transition-all duration-300 shadow-lg shadow-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Sending…' : 'Send Enquiry'}
        </button>
        <p className="text-xs font-mono text-gray-500 dark:text-gray-400 text-center">
          We respond within 24 hours. No spam — your details stay private.
        </p>
      </form>

      {/* Google Forms submission target — keeps the post off-screen so the
          page doesn't navigate when the user submits. Must stay mounted. */}
      <iframe
        name="hidden_iframe"
        title="Hidden form submission target"
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />
    </>
  )
}
