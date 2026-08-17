import Image from 'next/image'
import { Phone } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { clinic } from '@/lib/site-data'

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/assets/garden.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-teal-deep/85" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center text-background lg:py-40">
        <Reveal>
          <p className="kicker text-background/60">{clinic.tagline}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] sm:text-5xl lg:text-6xl">
            Your smile deserves a <span className="italic text-accent">calmer</span> experience.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-background/80">
            Ready to experience stress-free dentistry? We&apos;d love to welcome you
            to DentaLounge.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory"
            >
              Book Your Consultation
            </a>
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full border border-background/40 px-7 py-4 text-sm font-medium text-background transition-colors duration-300 hover:bg-background/10"
            >
              <Phone className="h-4 w-4" />
              Call DentaLounge
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
