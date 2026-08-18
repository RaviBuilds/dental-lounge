'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'

const featuredAngles = [
  { id: 'front', label: 'Front', image: '/assets/transformation-front.jpg', detail: 'Frontal smile transformation' },
  { id: 'profile', label: 'Profile', image: '/assets/transformation-profile.jpg', detail: 'Profile view of the same patient' },
  { id: 'smile', label: 'Smile', image: '/assets/transformation-side.jpg', detail: 'Three-quarter smile view' },
]

const clinicalCases = [
  { label: 'Intraoral', image: '/assets/case-5.jpg', detail: 'Intraoral before & after' },
  { label: 'Occlusal', image: '/assets/case-4.jpg', detail: 'Upper and lower arch views' },
  { label: 'Alignment', image: '/assets/case-9.jpg', detail: 'Intraoral alignment detail' },
  { label: 'Lateral', image: '/assets/case-7.jpg', detail: 'Lateral before & after' },
]

const additionalCases = [
  { image: '/assets/case-2.jpg', label: 'Smile transformation' },
  { image: '/assets/case-3.jpg', label: 'Facial balance' },
  { image: '/assets/case-8.jpg', label: 'Refined alignment' },
]

export function TransformationsSection() {
  const [angle, setAngle] = useState(0)
  const [position, setPosition] = useState(50)
  const [caseIndex, setCaseIndex] = useState(0)
  const current = featuredAngles[angle]

  const moveCase = (direction: number) => {
    setCaseIndex((value) => (value + direction + additionalCases.length) % additionalCases.length)
  }

  return (
    <section id="transformations" className="relative overflow-hidden bg-charcoal py-24 text-background lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><p className="kicker text-background/50">Real results</p></Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] sm:text-6xl">
              Real treatment. <span className="italic text-accent">Real</span> transformation.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/70">
              Every smile has its own story. Explore a selection of real treatment transformations from DentaLounge, documented from smile to clinical detail.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal variant="clip">
              <div className="relative overflow-hidden rounded-sm bg-black ring-1 ring-background/10">
                <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
                  <Image
                    key={current.id}
                    src={current.image}
                    alt={`${current.detail} at DentaLounge`}
                    fill
                    priority={angle === 0}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-contain transition-transform duration-700"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                  <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
                    <div className="absolute inset-y-0 -translate-x-1/2 border-l border-background/80" />
                    <div className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-background/80 bg-charcoal/80 shadow-xl">
                      <ChevronRight className="size-4" />
                    </div>
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-charcoal/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-background">Before</span>
                  <span className="absolute right-5 top-5 rounded-full bg-accent/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-charcoal">After</span>
                  <label className="absolute inset-0 cursor-ew-resize" aria-label="Compare before and after images">
                    <span className="sr-only">Drag to compare before and after</span>
                    <input
                      type="range"
                      min="15"
                      max="85"
                      value={position}
                      onChange={(event) => setPosition(Number(event.target.value))}
                      className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                    />
                  </label>
                </div>
              </div>
            </Reveal>
            <div className="transformations-case-note mt-6 flex flex-col gap-4 border-t border-background/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="kicker text-background/45">One patient · three views</p>
                <h3 className="mt-2 font-serif text-2xl">A cohesive transformation story</h3>
                <p className="mt-1 text-sm text-background/60">{current.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setAngle((value) => (value + 2) % 3)} aria-label="Previous angle" className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 transition hover:bg-background/10"><ArrowLeft className="size-4" /></button>
                <span className="text-xs uppercase tracking-[0.2em] text-background/50">{String(angle + 1).padStart(2, '0')} / 03</span>
                <button type="button" onClick={() => setAngle((value) => (value + 1) % 3)} aria-label="Next angle" className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 transition hover:bg-background/10"><ArrowRight className="size-4" /></button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="kicker text-background/45">Examine the result</p>
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {featuredAngles.map((item, index) => (
                <button key={item.id} type="button" onClick={() => setAngle(index)} aria-current={index === angle} className={cn('group min-w-28 text-left', index === angle ? 'text-background' : 'text-background/50')}>
                  <span className={cn('relative block aspect-[4/3] overflow-hidden rounded-sm ring-1 transition', index === angle ? 'ring-2 ring-accent' : 'ring-background/15 group-hover:ring-background/50')}>
                    <Image src={item.image} alt="" fill sizes="140px" className="object-cover transition duration-500 group-hover:scale-105" />
                  </span>
                  <span className="mt-3 block text-sm">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="transformations-case-context mt-10 border-l border-accent/60 pl-5">
              <p className="kicker text-background/45">The case</p>
              <p className="mt-4 font-serif text-2xl italic">The transformation is visible from every angle.</p>
              <p className="mt-4 text-sm leading-relaxed text-background/60">The same patient remains the focus throughout — a closer look at one documented result, not a mix of unrelated cases.</p>
            </div>
          </div>
        </div>

        <div className="mt-28 border-t border-background/15 pt-12 lg:mt-36">
          <Reveal><p className="kicker text-background/45">Clinical evidence</p></Reveal>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h3 className="max-w-xl font-serif text-3xl font-light sm:text-4xl">The details matter too.</h3>
            <p className="max-w-sm text-sm leading-relaxed text-background/60">Smile, teeth, and clinical detail — each view is presented as supplied, without unsupported claims.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {clinicalCases.map((item) => (
              <figure key={item.label} className="group">
                <div className="image-lift relative aspect-[4/5] overflow-hidden rounded-sm bg-black ring-1 ring-background/10"><Image src={item.image} alt={`${item.detail} at DentaLounge`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw" className="object-cover" /></div>
                <figcaption className="mt-3 text-sm text-background/70"><span className="text-background">{item.label}</span><span className="mx-2 text-accent">·</span>{item.detail}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-10 border-t border-background/15 pt-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="kicker text-accent">Separate case · X-ray evidence</p>
            <h3 className="mt-5 font-serif text-3xl font-light sm:text-4xl">From diagnosis to resolution.</h3>
            <p className="mt-4 text-sm leading-relaxed text-background/60">A wisdom-tooth X-ray comparison, shown separately from the featured smile transformation.</p>
          </div>
          <div className="lg:col-span-8"><div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-black ring-1 ring-background/10"><Image src="/assets/case-6-xray.jpg" alt="Wisdom-tooth X-ray comparison" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-contain" /></div></div>
        </div>

        <div className="mt-28 border-t border-background/15 pt-12">
          <div className="flex items-end justify-between gap-6"><div><p className="kicker text-background/45">More documented cases</p><h3 className="mt-4 font-serif text-3xl font-light">A wider view of the work.</h3></div><div className="flex gap-2"><button type="button" onClick={() => moveCase(-1)} aria-label="Previous documented case" className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 hover:bg-background/10"><ArrowLeft className="size-4" /></button><button type="button" onClick={() => moveCase(1)} aria-label="Next documented case" className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 hover:bg-background/10"><ArrowRight className="size-4" /></button></div></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">{additionalCases.map((item, index) => { const actual = (caseIndex + index) % additionalCases.length; const selected = additionalCases[actual]; return <figure key={`${selected.label}-${actual}`}><div className="image-lift relative aspect-[4/3] overflow-hidden rounded-sm bg-black"><Image src={selected.image} alt={`${selected.label} before and after`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain" /></div><figcaption className="mt-3 text-sm text-background/70">{selected.label}</figcaption></figure> })}</div>
        </div>
        <div className="transformations-closing mt-24 flex flex-col items-center gap-7 text-center">
          <p className="font-serif text-2xl italic text-background/70">Every case begins with listening.</p>
          <a href="#contact" className="inline-flex items-center gap-3 border-b border-accent/70 pb-2 text-sm text-background transition-colors hover:text-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent focus-visible:outline-offset-4">
            Begin with a consultation <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
