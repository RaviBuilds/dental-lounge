'use client'

import { ArrowDown, MapPin, Star } from 'lucide-react'
import { clinic, treatments } from '@/lib/site-data'

export function HeroSection() {
  const treatmentLine = treatments.map((treatment) => treatment.category).join('  ·  ')

  return (
    <section id="top" className="relative flex min-h-[90svh] flex-col justify-end overflow-hidden sm:min-h-[94svh] lg:min-h-[100svh]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/exterior-night.jpg"
        aria-hidden="true"
      >
        <source src="/assets/clinic-tour.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/15 to-transparent" />
      <div className="absolute -right-20 top-1/4 hidden h-[26rem] w-[26rem] rounded-[48%_52%_55%_45%] border border-accent/30 lg:block" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-10 pt-32 sm:pb-14 lg:px-10 lg:pb-16 lg:pt-40">
        <div className="max-w-3xl">
          <p className="kicker mb-5 flex items-center gap-3 text-background/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-3.5" aria-hidden="true" />
              Mehdipatnam, Hyderabad
            </span>
          </p>

          <h1 className="max-w-3xl text-balance font-serif text-[3.25rem] font-light leading-[0.94] text-background sm:text-6xl lg:text-8xl">
            Dentistry,
            <br />
            without the <span className="italic text-accent">stress.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/85 sm:mt-7 sm:text-lg">
            A calmer approach to modern dentistry, designed around you — where
            clinical excellence meets a garden, glass and quiet warmth.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory sm:px-7 sm:py-4"
            >
              Book a Consultation
              <ArrowDown className="size-4 -rotate-90 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3.5 text-sm font-medium text-background backdrop-blur-sm transition-colors duration-300 hover:bg-background/10 sm:px-7 sm:py-4"
            >
              Explore DentaLounge
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-background/20 pt-4 text-background/80 sm:mt-10 sm:pt-5">
            <div className="flex items-center gap-2" aria-label={`${clinic.rating} out of 5 stars from ${clinic.reviewCount} Google reviews`}>
              <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-3 fill-current" />)}
              </span>
              <span className="text-sm font-medium text-background">{clinic.rating.toFixed(1)}</span>
              <span className="text-xs text-background/65">Google · {clinic.reviewCount} reviews</span>
            </div>
            <span className="hidden h-4 w-px bg-background/25 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 text-xs text-background/70">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Invisalign provider
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-[0.65rem] uppercase tracking-[0.22em] text-background/45">{treatmentLine}</p>
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-6 flex w-full max-w-7xl items-center justify-between px-6 sm:mb-8 lg:px-10">
        <span className="text-xs uppercase tracking-[0.24em] text-background/60">{clinic.tagline}</span>
        <div className="flex items-center gap-3 text-background/60">
          <span className="text-xs uppercase tracking-[0.24em]">Scroll</span>
          <span className="h-8 w-px origin-top animate-[dl-pulse-line_2.4s_ease-in-out_infinite] bg-background/50" />
        </div>
      </div>
    </section>
  )
}
