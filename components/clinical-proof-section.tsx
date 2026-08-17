import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function ClinicalProofSection() {
  return (
    <section className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal variant="clip" className="overflow-hidden rounded-sm bg-teal-deep p-3 sm:p-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm">
                <Image
                  src="/assets/case-6-xray.jpg"
                  alt="Before and after dental X-rays showing a treated tooth at DentaLounge"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal>
              <p className="kicker text-primary">Clinical proof</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
                Precision you can <span className="italic text-primary">see.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Every smile has a different story. Our approach begins with
                understanding the problem, planning carefully, and treating
                with precision — supported by imaging that lets us show, not
                just tell.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8">
                <div>
                  <dt className="text-sm text-muted-foreground">Recurring in reviews</dt>
                  <dd className="mt-2 font-serif text-xl text-foreground">Modern equipment</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Our approach</dt>
                  <dd className="mt-2 font-serif text-xl text-foreground">Plan, then treat</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
