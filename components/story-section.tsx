import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const principles = [
  {
    number: '01',
    title: 'Feel at ease',
    text: 'A calmer environment that helps take the anxiety out of a dental visit.',
  },
  {
    number: '02',
    title: 'Be understood',
    text: 'Doctors who take the time to explain what is happening, answer questions and help you feel informed.',
  },
  {
    number: '03',
    title: 'Feel cared for',
    text: 'Gentle, patient care designed around the person in the chair — not just the procedure.',
  },
]

export function StorySection() {
  return (
    <section className="relative overflow-hidden bg-background py-28 lg:py-40" aria-labelledby="idea-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-20 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-28">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker text-primary">The idea</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="idea-title" className="mt-6 max-w-3xl text-balance font-serif text-5xl font-light leading-[0.98] text-foreground sm:text-6xl lg:text-8xl">
                Not your usual
                <br />
                dental clinic.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  We believe exceptional dentistry should feel different.
                </p>
                <p className="text-foreground">
                  Less clinical. Less intimidating. More human.
                </p>
                <p>
                  At DentaLounge, modern dental care meets a calm environment designed to help you feel at ease from the moment you arrive — so the treatment feels like the smallest part of the visit.
                </p>
              </div>
            </Reveal>

            <div className="mt-14 max-w-lg border-y border-border py-5 sm:mt-16">
              {['Less clinical', 'Less intimidating', 'More human'].map((phrase, index) => (
                <Reveal key={phrase} delay={240 + index * 100}>
                  <p className={`flex items-center justify-between py-2 font-serif text-2xl font-light tracking-tight sm:text-3xl ${index === 2 ? 'text-primary' : 'text-foreground'}`}>
                    <span>{phrase}</span>
                    <span className="font-sans text-xs tracking-[0.24em] text-muted-foreground">0{index + 1}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:pt-16">
            <Reveal variant="clip" className="relative overflow-hidden rounded-sm">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/assets/treatment-room-1.jpg"
                  alt="A DentaLounge treatment room opening onto tropical greenery through full glass walls"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.035]"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 flex items-start justify-between gap-5">
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Treatment rooms open directly onto the garden — greenery is part of the care.
                </p>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">01 / 04</span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:col-start-3 lg:pt-8">
            <Reveal>
              <p className="kicker text-primary">What it feels like</p>
            </Reveal>
            <Reveal delay={100}>
              <figure className="relative mt-8 pl-8 sm:pl-14">
                <span aria-hidden="true" className="absolute -left-1 -top-7 font-serif text-7xl leading-none text-primary/30 sm:-left-2 sm:-top-10 sm:text-9xl">“</span>
                <blockquote className="max-w-4xl font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                  A dental clinic that truly feels like a sanctuary.
                </blockquote>
                <figcaption className="mt-7 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  — Sabah Lathwala · Google Review
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="lg:col-span-10 lg:col-start-2 lg:pt-8">
            <Reveal>
              <div className="mb-8 flex items-end justify-between gap-6 border-b border-border pb-5">
                <h3 className="font-serif text-3xl font-light text-foreground sm:text-4xl">The experience, in practice.</h3>
                <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:block">Three principles</span>
              </div>
            </Reveal>
            <div className="divide-y divide-border">
              {principles.map((principle, index) => (
                <Reveal key={principle.number} delay={index * 100}>
                  <article className="group grid gap-3 py-7 transition-colors duration-500 hover:text-primary sm:grid-cols-[5rem_1fr_1.25fr] sm:items-baseline sm:gap-8 sm:py-9">
                    <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground">{principle.number}</p>
                    <h4 className="font-serif text-3xl font-light capitalize text-foreground transition-colors duration-500 group-hover:text-primary sm:text-4xl">{principle.title}</h4>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">{principle.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal delay={100}>
              <figure className="border-l border-primary/50 pl-6 sm:pl-8">
                <blockquote className="font-serif text-2xl font-light leading-tight text-foreground sm:text-3xl">
                  “Monthly appointments at DentaLounge are super chill and something i look forward to.”
                </blockquote>
                <figcaption className="mt-5 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  — Sahel Akram · Google Review
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="border-t border-border pt-8 lg:col-span-12 lg:pt-10">
            <Reveal>
              <a href="#space" className="group flex items-center justify-between gap-6 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                <span>A different experience starts with a different environment.</span>
                <span className="flex shrink-0 items-center gap-3 text-primary">The space <span aria-hidden="true" className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span></span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
