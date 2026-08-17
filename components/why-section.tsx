import { Reveal } from '@/components/reveal'
import { whyPillars } from '@/lib/site-data'

export function WhySection() {
  return (
    <section className="relative bg-primary py-24 text-primary-foreground lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker text-primary-foreground/60">Why DentaLounge</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] sm:text-5xl">
                A calmer place for something most people don&apos;t look forward to.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-primary-foreground/80">
                Dental anxiety is real. So we started with the environment,
                then the people, then the approach — and let the experience
                follow. Gentle care, comfort and calm, without overpromising.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-sm border border-primary-foreground/15 sm:grid-cols-2">
              {whyPillars.map((pillar, i) => (
                <Reveal
                  key={pillar.title}
                  delay={(i % 2) * 100}
                  className="group bg-primary p-7 transition-colors duration-500 hover:bg-teal-deep"
                >
                  <span className="block h-px w-8 bg-accent transition-all duration-500 group-hover:w-14" />
                  <h3 className="mt-5 font-serif text-xl">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                    {pillar.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
