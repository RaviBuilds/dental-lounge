import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function SpaceSection() {
  return (
    <section id="space" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Intro column */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div>
              <Reveal>
                <p className="kicker text-primary">The space</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
                  A dental clinic that doesn&apos;t feel like one.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted-foreground">
                  Step into a space designed to make you breathe a little
                  easier — red-tiled roof, glass treatment rooms and a garden
                  you can see from the chair.
                </p>
              </Reveal>
            </div>

            <Reveal variant="clip" delay={120} className="mt-10 overflow-hidden rounded-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/entrance.jpg"
                  alt="The illuminated DentaLounge entrance at night with a glowing tooth sign"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Tall feature image */}
          <Reveal variant="clip" className="overflow-hidden rounded-sm lg:col-span-4">
            <div className="relative h-full min-h-[420px] w-full">
              <Image
                src="/assets/garden.jpg"
                alt="The DentaLounge garden at night with stone pathways, grass and lush tropical planting beside glass treatment rooms"
                fill
                sizes="(max-width: 1024px) 100vw, 32vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Stacked pair */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:gap-10">
            <Reveal variant="clip" delay={80} className="overflow-hidden rounded-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/treatment-room-2.jpg"
                  alt="A DentaLounge treatment chair beside a large window with plants and natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal variant="clip" delay={160} className="overflow-hidden rounded-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/assets/exterior-day.jpg"
                  alt="The DentaLounge exterior in daylight showing the red tiled roof and greenery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-serif text-2xl font-light italic leading-snug text-foreground sm:text-3xl">
            &ldquo;A dental clinic that truly feels like a sanctuary.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  )
}
