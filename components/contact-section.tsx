'use client'

import { useState, type FormEvent } from 'react'
import { Phone, MessageCircle, MapPin, Check, ArrowUpRight } from 'lucide-react'
import { clinic } from '@/lib/site-data'

const treatmentOptions = [
  'General consultation',
  'Invisalign / Aligners',
  'Braces',
  'Root canal / Crown',
  'Wisdom tooth',
  'Pediatric / Family',
  'Something else',
]

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState(treatmentOptions[0])
  const [message, setMessage] = useState('')

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapsQuery)}`

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = `Hello DentaLounge, I'd like to book a consultation.%0A%0AName: ${encodeURIComponent(
      name,
    )}%0APhone: ${encodeURIComponent(phone)}%0AInterest: ${encodeURIComponent(
      interest,
    )}%0A%0A${encodeURIComponent(message)}`
    window.open(`https://wa.me/${clinic.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <section id="contact" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: details + quick actions + map */}
          <div className="lg:col-span-5">
            <p className="kicker text-primary">Visit us</p>
            <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
              The final step in the story.
            </h2>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <address className="not-italic leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">DentaLounge</span>
                  <br />
                  {clinic.address.line1}
                  <br />
                  {clinic.address.line2}
                  <br />
                  {clinic.address.city}
                </address>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href={`tel:${clinic.phoneRaw}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {clinic.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${clinic.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-deep"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a
                href={`https://wa.me/${clinic.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                <MapPin className="h-4 w-4" /> Directions
              </a>
            </div>

            <div className="mt-10 overflow-hidden rounded-sm border border-border">
              <iframe
                title="Map to DentaLounge, Mehdipatnam"
                src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&output=embed`}
                width="100%"
                height="260"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[0.2]"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-border bg-card p-8 lg:p-10">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl text-foreground">Almost there</h3>
                  <p className="mt-3 max-w-sm text-pretty text-muted-foreground">
                    We&apos;ve opened WhatsApp with your details ready to send. Prefer
                    to talk? Call us any time at {clinic.phoneDisplay}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm text-primary underline underline-offset-4"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-foreground">Book a consultation</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Share a few details and we&apos;ll continue on WhatsApp — calm and
                      unhurried.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your name
                      </label>
                      <input
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="Full name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone
                      </label>
                      <input
                        id="phone"
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="interest" className="text-sm font-medium text-foreground">
                      I&apos;m interested in
                    </label>
                    <select
                      id="interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    >
                      {treatmentOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Anything you&apos;d like us to know?{' '}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      placeholder="Tell us a little about what you're looking for."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-teal-deep sm:w-auto"
                  >
                    Continue on WhatsApp
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
