import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function StorySection() {
  return (
    <section className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="kicker text-primary">The idea</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
                Not your usual
                <br />
                dental clinic.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  We believe exceptional dentistry should feel different. Less
                  clinical. Less intimidating. More human.
                </p>
                <p>
                  At DentaLounge, modern dental care meets a calm environment
                  designed to help you feel at ease from the moment you
                  arrive — so the treatment feels like the smallest part of
                  the visit.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="clip" className="overflow-hidden rounded-sm">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/assets/treatment-room-1.jpg"
                  alt="A DentaLounge treatment room opening onto tropical greenery through full glass walls"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Treatment rooms open directly onto the garden — greenery is
                part of the care.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
