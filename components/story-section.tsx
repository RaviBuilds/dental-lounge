'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/reveal'

const principles = [
  {
    number: '01',
    title: 'LESS CLINICAL',
    text: 'A calmer environment that helps take the anxiety out of a dental visit.',
    marker: 'arc',
  },
  {
    number: '02',
    title: 'LESS INTIMIDATING',
    text: 'Doctors who take the time to explain what is happening, answer questions and help you feel informed.',
    marker: 'ring',
  },
  {
    number: '03',
    title: 'MORE HUMAN',
    text: 'Gentle, patient care designed around the person in the chair — not just the procedure.',
    marker: 'curve',
  },
]

export function StorySection() {
  const [activePrinciple, setActivePrinciple] = useState(0)
  const principleRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const index = Number((visible.target as HTMLElement).dataset.index)
          if (!Number.isNaN(index)) setActivePrinciple(index)
        }
      },
      { threshold: [0.2, 0.5, 0.8], rootMargin: '-25% 0px -35% 0px' },
    )

    principleRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="idea-section relative overflow-hidden bg-background py-28 lg:py-40" aria-labelledby="idea-title">
      <div className="idea-contour" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="idea-opening grid gap-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-28">
          <div className="relative z-10 lg:col-span-6 lg:pt-8">
            <Reveal><p className="kicker text-primary">The idea</p></Reveal>
            <Reveal delay={80}>
              <h2 id="idea-title" className="mt-6 max-w-3xl text-balance font-serif text-5xl font-light leading-[0.98] text-foreground sm:text-6xl lg:text-8xl">
                Not your usual
                <br />
                dental clinic.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-9 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>We believe exceptional dentistry should feel different.</p>
                <p className="text-foreground">Less clinical. Less intimidating. More human.</p>
                <p>At DentaLounge, modern dental care meets a calm environment designed to help you feel at ease from the moment you arrive — so the treatment feels like the smallest part of the visit.</p>
              </div>
            </Reveal>
          </div>

          <div className="idea-image-wrap relative z-10 lg:col-span-5 lg:col-start-8 lg:-mt-6">
            <div className="idea-image-object relative overflow-hidden">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/assets/treatment-room-1.jpg"
                  alt="A DentaLounge treatment room opening onto tropical greenery through full glass walls"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="idea-image object-cover"
                />
              </div>
            </div>
            <div className="idea-annotation idea-annotation-top"><span /> GARDEN-FACING<br />TREATMENT ROOMS</div>
            <div className="idea-annotation idea-annotation-bottom">GLASS · GARDEN · QUIET WARMTH <span /></div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">Treatment rooms open directly onto the garden — greenery is part of the care.</p>
          </div>

          <div className="relative z-10 lg:col-span-8 lg:col-start-3 lg:pt-10">
            <Reveal><p className="kicker text-primary">What it feels like</p></Reveal>
            <Reveal delay={100}>
              <figure className="idea-primary-quote relative mt-8 pl-8 sm:pl-14">
                <span aria-hidden="true" className="idea-quote-mark absolute -left-1 -top-7 font-serif text-7xl leading-none text-primary/35 sm:-left-2 sm:-top-10 sm:text-9xl">“</span>
                <blockquote className="idea-quote-text max-w-4xl font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">A dental clinic that truly feels like a sanctuary.</blockquote>
                <figcaption className="mt-7 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">— Sabah Lathwala · Google Review</figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="relative z-10 lg:col-span-10 lg:col-start-2 lg:pt-10">
            <Reveal>
              <div className="mb-8 flex items-end gap-6 border-b border-border pb-5">
                <h3 className="font-serif text-3xl font-light text-foreground sm:text-4xl">The experience, in practice.</h3>
              </div>
            </Reveal>
            <div className="idea-principles">
              {principles.map((principle, index) => (
                <article
                  key={principle.number}
                  ref={(node) => { principleRefs.current[index] = node }}
                  data-index={index}
                  className={`idea-principle ${activePrinciple === index ? 'is-active' : ''}`}
                >
                  <span className="idea-principle-number">{principle.number}</span>
                  <h4 className="font-serif text-3xl font-light text-foreground sm:text-4xl">{principle.title}</h4>
                  <p className="idea-principle-copy">{principle.text}</p>
                  <span className={`idea-marker idea-marker-${principle.marker}`} aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>

          <div className="relative z-10 lg:col-span-6 lg:col-start-7 lg:pt-4">
            <Reveal delay={100}>
              <figure className="idea-secondary-quote border-l border-primary/50 pl-6 sm:pl-8">
                <p className="kicker text-primary">The unexpected compliment</p>
                <blockquote className="mt-5 font-serif text-2xl font-light leading-tight text-foreground sm:text-3xl">“Monthly appointments at DentaLounge are super chill and something i look forward to.”</blockquote>
                <figcaption className="mt-5 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">— Sahel Akram · Google Review</figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="relative z-10 border-t border-border pt-8 lg:col-span-12 lg:pt-10">
            <Reveal>
              <a href="#space" className="idea-space-bridge group flex items-center justify-between gap-6 text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
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
