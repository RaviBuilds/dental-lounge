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
  night: {
    src: '/assets/exterior-night.jpg',
    alt: 'The DentaLounge exterior glowing warmly among trees at night',
  },
} as const

function SpaceCaption({ index, label, children }: { index: string; label: string; children: React.ReactNode }) {
  return (
    <figcaption className="space-caption mt-4 border-t border-primary/20 pt-3">
      <div className="flex items-start justify-between gap-4">
        <p className="kicker text-primary">{index} / {label}</p>
        <p className="max-w-[17rem] text-right text-sm leading-relaxed text-muted-foreground">{children}</p>
      </div>
    </figcaption>
  )
}

function SpaceImage({ src, alt, sizes, className = '' }: { src: string; alt: string; sizes: string; className?: string }) {
  return (
    <div className={`space-image relative overflow-hidden rounded-sm bg-muted ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  )
}

export function SpaceSection() {
  return (
    <section id="space" className="space-narrative relative overflow-hidden bg-background py-24 lg:py-36">
      <div className="space-contour" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="space-mobile-flow lg:hidden">
          <Reveal>
            <p className="kicker text-primary">The space / 01</p>
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

          <Reveal variant="clip" delay={120} className="space-arrival mt-10">
            <figure>
              <SpaceImage src={spaces.entrance.src} alt={spaces.entrance.alt} sizes="100vw" className="aspect-[4/5]" />
              <SpaceCaption index="01" label="Arrival">A softer first impression, from the moment you walk through the gate.</SpaceCaption>
            </figure>
          </Reveal>

          <Reveal delay={140} className="space-statement mt-14 border-y border-primary/20 py-10">
            <p className="kicker text-primary">A different kind of visit</p>
            <p className="mt-4 max-w-sm font-serif text-3xl font-light leading-tight text-foreground">The setting is part of the treatment — calm, considered and close to nature.</p>
          </Reveal>

          <Reveal variant="clip" delay={100} className="mt-14">
            <figure>
              <SpaceImage src={spaces.garden.src} alt={spaces.garden.alt} sizes="100vw" className="aspect-[4/5] space-image-garden" />
              <SpaceCaption index="02" label="Garden">Greenery that changes the pace of a clinical visit.</SpaceCaption>
            </figure>
          </Reveal>

          <Reveal variant="clip" delay={100} className="space-feature mt-14">
            <figure>
              <div className="space-feature-visual relative">
                <SpaceImage src={spaces.treatment.src} alt={spaces.treatment.alt} sizes="100vw" className="aspect-[4/3]" />
                <div className="space-annotation space-annotation-light" aria-hidden="true"><span>NATURAL LIGHT</span><i /></div>
                <div className="space-annotation space-annotation-garden" aria-hidden="true"><span>GARDEN VIEW</span><i /></div>
              </div>
              <SpaceCaption index="03" label="Treatment room">Natural light, quiet materials and enough room to feel unhurried.</SpaceCaption>
            </figure>
          </Reveal>

          <Reveal variant="clip" delay={100} className="mt-14">
            <figure>
              <SpaceImage src={spaces.chair.src} alt={spaces.chair.alt} sizes="100vw" className="aspect-[4/5] space-image-chair" />
              <SpaceCaption index="04" label="From the chair">A view that gives you something else to look at — and a moment to settle.</SpaceCaption>
            </figure>
          </Reveal>

          <Reveal delay={100} className="space-review mt-14 border-y border-primary/20 py-10">
            <p className="kicker text-primary">05 / Patient perspective</p>
            <blockquote className="mt-5 max-w-sm font-serif text-3xl font-light italic leading-tight text-foreground">
              &ldquo;The atmosphere is professional, calm, loving, clean, and incredibly welcoming.&rdquo;
            </blockquote>
            <footer className="kicker mt-6 text-muted-foreground">Google review · Calm &amp; welcoming</footer>
          </Reveal>

          <Reveal variant="clip" delay={100} className="space-closing mt-14">
            <figure>
              <SpaceImage src={spaces.night.src} alt={spaces.night.alt} sizes="100vw" className="aspect-[4/5] space-image-closing" />
              <SpaceCaption index="06" label="Experience">Warm light for a softer arrival, before and after dark.</SpaceCaption>
            </figure>
          </Reveal>
        </div>

        <div className="hidden lg:block">
          <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
            <div className="lg:col-span-5 lg:pt-6">
              <Reveal><p className="kicker text-primary">The space / 01</p></Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 max-w-xl text-balance font-serif text-5xl font-light leading-[0.98] text-foreground sm:text-6xl lg:text-7xl">A dental clinic that doesn&apos;t feel like one.</h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">Step into a space designed to make you breathe a little easier — red-tiled roof, glass treatment rooms and a garden you can see from the chair.</p>
              </Reveal>
            </div>

            <Reveal variant="clip" delay={120} className="space-arrival lg:col-span-7">
              <figure>
                <SpaceImage src={spaces.entrance.src} alt={spaces.entrance.alt} sizes="58vw" className="aspect-[16/10]" />
                <SpaceCaption index="01" label="Arrival">A softer first impression, from the moment you walk through the gate.</SpaceCaption>
              </figure>
            </Reveal>

            <Reveal delay={120} className="space-statement lg:col-span-4 lg:col-start-2 lg:pt-16">
              <p className="kicker text-primary">A different kind of visit</p>
              <p className="mt-5 font-serif text-3xl font-light leading-tight text-primary sm:text-4xl">The setting is part of the treatment — calm, considered and close to nature.</p>
            </Reveal>

            <Reveal variant="clip" delay={100} className="lg:col-span-4 lg:col-start-8 lg:pt-10">
              <figure>
                <SpaceImage src={spaces.garden.src} alt={spaces.garden.alt} sizes="33vw" className="aspect-[4/5] space-image-garden" />
                <SpaceCaption index="02" label="Garden">Greenery that changes the pace of a clinical visit.</SpaceCaption>
              </figure>
            </Reveal>

            <Reveal variant="clip" delay={120} className="space-feature lg:col-span-10 lg:col-start-2">
              <figure>
                <div className="space-feature-visual relative">
                  <SpaceImage src={spaces.treatment.src} alt={spaces.treatment.alt} sizes="83vw" className="aspect-[16/9]" />
                  <div className="space-annotation space-annotation-light" aria-hidden="true"><span>NATURAL LIGHT</span><i /></div>
                  <div className="space-annotation space-annotation-garden" aria-hidden="true"><span>GARDEN VIEW</span><i /></div>
                </div>
                <SpaceCaption index="03" label="Treatment room">Natural light, quiet materials and enough room to feel unhurried.</SpaceCaption>
              </figure>
            </Reveal>

            <Reveal variant="clip" delay={100} className="lg:col-span-6 lg:col-start-3 lg:pt-6">
              <figure>
                <SpaceImage src={spaces.chair.src} alt={spaces.chair.alt} sizes="50vw" className="aspect-[4/3] space-image-chair" />
                <SpaceCaption index="04" label="From the chair">A view that gives you something else to look at — and a moment to settle.</SpaceCaption>
              </figure>
            </Reveal>

            <Reveal delay={120} className="space-review lg:col-span-4 lg:col-start-9 lg:pt-20">
              <p className="kicker text-primary">05 / Patient perspective</p>
              <blockquote className="mt-5 font-serif text-3xl font-light italic leading-tight text-foreground">&ldquo;The atmosphere is professional, calm, loving, clean, and incredibly welcoming.&rdquo;</blockquote>
              <footer className="kicker mt-6 text-muted-foreground">Google review · Calm &amp; welcoming</footer>
            </Reveal>

            <Reveal variant="clip" delay={120} className="space-closing lg:col-span-8 lg:col-start-3 lg:pt-8">
              <figure>
                <SpaceImage src={spaces.night.src} alt={spaces.night.alt} sizes="66vw" className="aspect-[16/9] space-image-closing" />
                <SpaceCaption index="06" label="Experience">Warm light for a softer arrival, before and after dark.</SpaceCaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal className="space-transition mt-24 border-t border-primary/20 pt-8 lg:mt-36 lg:flex lg:items-end lg:justify-between">
          <p className="kicker text-primary">The experience continues</p>
          <p className="mt-3 max-w-md text-pretty font-serif text-3xl font-light leading-tight text-foreground lg:mt-0 lg:text-right">Not just a place you visit. A feeling you carry with you.</p>
        </Reveal>
      </div>
    </section>
  )
}
