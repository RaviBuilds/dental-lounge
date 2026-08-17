import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const spaces = {
  entrance: {
    src: '/assets/entrance.jpg',
    alt: 'The illuminated DentaLounge entrance at night with a glowing tooth sign',
  },
  garden: {
    src: '/assets/garden.jpg',
    alt: 'The DentaLounge garden at night with stone pathways and tropical planting beside glass treatment rooms',
  },
  treatment: {
    src: '/assets/treatment-room-1.jpg',
    alt: 'A bright DentaLounge treatment room with a dental chair beside a garden-facing window',
  },
  chair: {
    src: '/assets/treatment-room-2.jpg',
    alt: 'A DentaLounge treatment chair beside a large window with plants and natural light',
  },
  exterior: {
    src: '/assets/exterior-day.jpg',
    alt: 'The DentaLounge exterior in daylight showing the red tiled roof and surrounding greenery',
  },
  night: {
    src: '/assets/exterior-night.jpg',
    alt: 'The DentaLounge exterior glowing warmly among trees at night',
  },
} as const

function Caption({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 flex items-start justify-between gap-4 border-t border-primary/20 pt-3">
      <p className="kicker shrink-0 text-primary">{label}</p>
      <p className="max-w-[15rem] text-right text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}

export function SpaceSection() {
  const mobileGallery = [
    { ...spaces.garden, label: 'The garden', note: 'Greenery that changes the pace of a clinical visit.' },
    { ...spaces.treatment, label: 'The treatment room', note: 'Natural light and quiet materials.' },
    { ...spaces.exterior, label: 'From the outside', note: 'A clinic held gently by its surroundings.' },
    { ...spaces.night, label: 'After dark', note: 'Warm light for a softer arrival.' },
  ]

  return (
    <section id="space" className="space-narrative relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="space-mobile-flow lg:hidden">
          <Reveal>
            <p className="kicker text-primary">The space</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-sm text-balance font-serif text-5xl font-light leading-[0.98] text-foreground">
              A dental clinic that doesn&apos;t feel like one.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
              Step into a space designed to make you breathe a little easier — red-tiled roof, glass treatment rooms and a garden you can see from the chair.
            </p>
          </Reveal>

          <Reveal variant="clip" delay={120} className="image-lift mt-10">
            <figure>
              <div className="relative h-[72svh] min-h-[28rem] max-h-[42rem] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.entrance.src} alt={spaces.entrance.alt} fill sizes="100vw" className="object-cover" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 to-transparent px-5 pb-5 pt-20 text-background">
                  <p className="kicker text-background/70">Arrival</p>
                  <p className="mt-2 max-w-xs font-serif text-2xl font-light leading-tight">A softer first impression, from the moment you walk through the gate.</p>
                </div>
              </div>
            </figure>
          </Reveal>

          <div className="mt-12 -mx-6 bg-primary px-6 py-8 text-primary-foreground">
            <p className="kicker opacity-70">A different kind of visit</p>
            <p className="mt-4 max-w-sm font-serif text-3xl font-light leading-tight">The setting is part of the treatment — calm, considered and close to nature.</p>
          </div>

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="kicker text-primary">Walk through</p>
                <p className="mt-2 font-serif text-3xl font-light text-foreground">The details matter.</p>
              </div>
              <p className="kicker shrink-0 text-muted-foreground">Swipe to explore</p>
            </div>
            <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Clinic space gallery">
              {mobileGallery.map((item) => (
                <figure key={item.label} className="w-[78vw] shrink-0 snap-start">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                    <Image src={item.src} alt={item.alt} fill sizes="78vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-3 border-t border-primary/20 pt-3">
                    <p className="kicker text-primary">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px w-10 bg-primary/40" aria-hidden="true" />
              <span>01 — 04</span>
            </div>
          </div>

          <Reveal variant="clip" delay={100} className="image-lift mt-14">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.chair.src} alt={spaces.chair.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 border-t border-primary/20 pt-3">
                <p className="kicker text-primary">From the chair</p>
                <p className="mt-2 font-serif text-2xl font-light leading-tight text-foreground">A view that gives you something else to look at — and a moment to settle.</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <blockquote className="mt-14 border-y border-primary/20 py-10">
              <p className="text-balance font-serif text-3xl font-light italic leading-tight text-foreground">&ldquo;A dental clinic that truly feels like a sanctuary.&rdquo;</p>
              <footer className="kicker mt-6 text-primary">A patient perspective</footer>
            </blockquote>
          </Reveal>
        </div>

        <div className="hidden lg:block">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker text-primary">The space</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-xl text-balance font-serif text-5xl font-light leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">
                A dental clinic that doesn&apos;t feel like one.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Step into a space designed to make you breathe a little easier — red-tiled roof, glass treatment rooms and a garden you can see from the chair.
              </p>
            </Reveal>
          </div>

          <Reveal variant="clip" delay={120} className="image-lift lg:col-span-7">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.entrance.src} alt={spaces.entrance.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" priority />
              </div>
              <Caption label="Arrival">A softer first impression, from the moment you walk through the gate.</Caption>
            </figure>
          </Reveal>

          <div className="lg:col-span-4 lg:pt-20">
            <Reveal variant="clip" delay={80} className="image-lift">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <Image src={spaces.garden.src} alt={spaces.garden.alt} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                </div>
                <Caption label="The garden">Greenery that changes the pace of a clinical visit.</Caption>
              </figure>
            </Reveal>
          </div>

          <div className="flex flex-col gap-12 lg:col-span-8 lg:pt-40">
            <Reveal>
              <p className="max-w-2xl text-pretty font-serif text-3xl font-light leading-tight text-primary sm:text-4xl">
                The setting is part of the treatment — calm, considered and close to nature.
              </p>
            </Reveal>
            <Reveal variant="clip" delay={100} className="image-lift">
              <figure>
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted">
                  <Image src={spaces.treatment.src} alt={spaces.treatment.alt} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
                </div>
                <Caption label="The treatment room">Natural light, quiet materials and enough room to feel unhurried.</Caption>
              </figure>
            </Reveal>
          </div>

          <Reveal variant="clip" delay={100} className="image-lift lg:col-span-7 lg:col-start-3">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.chair.src} alt={spaces.chair.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              </div>
              <Caption label="From the chair">A view that gives you something else to look at — and a moment to settle.</Caption>
            </figure>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:pt-20">
            <Reveal variant="clip" delay={120} className="image-lift sm:translate-y-16">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.exterior.src} alt={spaces.exterior.alt} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal variant="clip" delay={180} className="image-lift">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image src={spaces.night.src} alt={spaces.night.alt} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Reveal>
            <blockquote className="mx-auto mt-24 max-w-4xl border-y border-primary/20 py-12 text-center lg:mt-36 lg:py-20">
            <p className="text-balance font-serif text-3xl font-light italic leading-tight text-foreground sm:text-5xl lg:text-6xl">
              &ldquo;A dental clinic that truly feels like a sanctuary.&rdquo;
            </p>
            <footer className="kicker mt-8 text-primary">A patient perspective</footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
