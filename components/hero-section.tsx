'use client'

import { MapPin, ArrowDown } from 'lucide-react'
import { clinic } from '@/lib/site-data'

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Ambient clinic video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/exterior-night.jpg"
        aria-hidden="true"
      >
        <source src="/assets/clinic-tour.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <p className="kicker mb-6 flex items-center gap-3 text-background/80 [animation:none]">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Mehdipatnam, Hyderabad
            </span>
          </p>

          <h1 className="text-balance font-serif text-5xl font-light leading-[0.98] text-background sm:text-6xl lg:text-8xl">
            Dentistry,
            <br />
            without the <span className="italic text-accent">stress.</span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-background/85">
            A calmer approach to modern dentistry, designed around you — where
            clinical excellence meets a garden, glass and quiet warmth.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory"
            >
              Book a Consultation
              <ArrowDown className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-background/40 px-7 py-4 text-sm font-medium text-background backdrop-blur-sm transition-colors duration-300 hover:bg-background/10"
            >
              Explore DentaLounge
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 mx-auto mb-8 flex w-full max-w-7xl items-center justify-between px-6 lg:px-10">
        <span className="text-xs uppercase tracking-[0.24em] text-background/60">
          {clinic.tagline}
        </span>
        <div className="flex items-center gap-3 text-background/60">
          <span className="text-xs uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-8 w-px origin-top animate-[dl-pulse-line_2.4s_ease-in-out_infinite] bg-background/50" />
        </div>
      </div>
    </section>
  )
}
