'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { transformationCases } from '@/lib/site-data'

export function TransformationsSection() {
  const [active, setActive] = useState(0)
  const current = transformationCases[active]
  const total = transformationCases.length
  const groupedAngles = transformationCases.slice(0, 3)

  const go = (dir: number) => setActive((prev) => (prev + dir + total) % total)

  return (
    <section id="transformations" className="relative bg-charcoal py-24 text-background lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <p className="kicker text-background/50">Transformations</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] sm:text-5xl">
                Real treatment. <span className="italic text-accent">Real</span> transformation.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="max-w-sm text-base leading-relaxed text-background/70">
              Every smile has a different story. Start with one patient’s
              journey, shown from three angles, then explore the supporting
              clinical views below.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Viewer */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-sm bg-black">
              <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                {transformationCases.map((item, i) => (
                  <Image
                    key={item.id}
                    src={item.image || '/placeholder.svg'}
                    alt={`${item.title} — ${item.detail} at DentaLounge`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className={cn(
                      'object-contain transition-opacity duration-700',
                      i === active ? 'opacity-100' : 'opacity-0',
                    )}
                    priority={i === 0}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl">{current.title}</h3>
                <p className="mt-1 text-sm text-background/60">{current.detail}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums text-background/60">
                  {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous case"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-background/25 transition-colors hover:bg-background/10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next case"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-background/25 transition-colors hover:bg-background/10"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="lg:col-span-4">
            <div className="mb-6 border-l border-accent/50 pl-5">
              <p className="kicker text-background/50">One patient, three views</p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-background/65">
                Use the primary view to move through the story, or select any supporting case. {groupedAngles.length} angles follow the same patient.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3 lg:grid-cols-2">
              {transformationCases.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View ${item.title}`}
                  aria-current={i === active}
                  className={cn(
                    'group relative aspect-square overflow-hidden rounded-sm ring-1 transition-all duration-300',
                    i === active
                      ? 'ring-2 ring-accent'
                      : 'ring-background/15 hover:ring-background/40',
                  )}
                >
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="120px"
                    className={cn(
                      'object-cover transition-all duration-500 group-hover:scale-105',
                      i === active ? 'opacity-100' : 'opacity-70',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
