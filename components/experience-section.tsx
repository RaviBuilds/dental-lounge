import { Reveal } from '@/components/reveal'
import { experienceSteps } from '@/lib/site-data'

export function ExperienceSection() {
  return (
    <section id="experience" className="relative bg-teal-deep py-24 text-background lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker text-background/60">The experience</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] sm:text-5xl">
              What a visit to DentaLounge{' '}
              <span className="italic text-accent">feels</span> like.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {experienceSteps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 100}
              className="group relative bg-teal-deep p-8 transition-colors duration-500 hover:bg-primary lg:p-9"
            >
              <span className="font-serif text-sm text-background/50">{step.index}</span>
              <span className="mt-6 block h-px w-10 origin-left bg-accent transition-all duration-500 group-hover:w-16" />
              <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
