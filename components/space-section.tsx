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
  return (
    <section id="space" className="space-narrative relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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

        <Reveal>
          <blockquote className="mx-auto mt-24 max-w-4xl border-y border-primary/20 py-12 text-center lg:mt-36 lg:py-20">
            <p className="text-balance font-serif text-3xl font-light italic leading-tight text-foreground sm:text-5xl lg:text-6xl">
              &ldquo;A dental clinic that truly feels like a sanctuary.&rdquo;
            </p>
            <footer className="kicker mt-8 text-primary">A patient perspective</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}
