import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { doctors } from '@/lib/site-data'

const qualities = ['Professional', 'Gentle', 'Patient', 'Empathetic', 'Attentive']

export function DoctorsSection() {
  return (
    <section id="doctors" className="relative overflow-hidden bg-stone py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="kicker text-primary">The people</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
                Meet the people behind your <span className="italic text-primary">care.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Skill matters. So does how you make someone feel. Our team is
                known — again and again in patient reviews — for treating
                people with the same patience and warmth as precision.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {qualities.map((q) => (
                  <li
                    key={q}
                    className="rounded-full border border-border bg-background px-4 py-2 text-sm text-secondary-foreground"
                  >
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-12 border-t border-border">
              {doctors.map((doctor, i) => (
                <Reveal
                  key={doctor.name}
                  delay={i * 80}
                  className="group flex items-center justify-between border-b border-border py-5"
                >
                  <span className="font-serif text-2xl text-foreground transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                    {doctor.name}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    DentaLounge
                  </span>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <Reveal variant="clip" className="h-full overflow-hidden rounded-sm">
              <div className="relative h-full min-h-[420px] w-full">
                <Image
                  src="/assets/treatment-room-1.jpg"
                  alt="A calm DentaLounge treatment room surrounded by plants and natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <blockquote className="absolute inset-x-0 bottom-0 p-8 lg:p-10">
                  <p className="text-balance font-serif text-2xl font-light italic leading-snug text-background lg:text-3xl">
                    Before we treat your smile, we listen to you.
                  </p>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
