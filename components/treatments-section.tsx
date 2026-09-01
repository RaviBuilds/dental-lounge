'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { treatments } from '@/lib/site-data'

export function TreatmentsSection() {
  const [active, setActive] = useState(0)

  return (
    <section id="treatments" className="relative bg-background py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <Reveal>
            <p className="kicker text-primary">What we do</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
              Care organised around your goals — not a checklist.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ul className="border-t border-border">
              {treatments.map((treatment, i) => {
                const isOpen = active === i
                return (
                  <li key={treatment.category} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-sans text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'font-serif text-2xl transition-colors duration-300 sm:text-3xl',
                            isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary',
                          )}
                        >
                          {treatment.category}
                        </span>
                      </div>
                      <Plus
                        className={cn(
                          'mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-500',
                          isOpen && 'rotate-45 text-primary',
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        'grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isOpen ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-lg pl-8 text-base leading-relaxed text-muted-foreground">
                          {treatment.summary}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2 pl-8">
                          {treatment.items.map((item) => (
                            <li
                              key={item}
                              className="rounded-full bg-muted px-4 py-1.5 text-sm text-secondary-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <Reveal variant="clip" className="sticky top-28 overflow-hidden rounded-sm">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src="/assets/treatment-room-2.jpg"
                  alt="A modern DentaLounge treatment room with contemporary dental equipment beside a window"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-4 bg-primary px-6 py-5 text-primary-foreground">
                <Image
                  src="/assets/invisalign-provider.jpg"
                  alt="DentaLounge is an Invisalign provider"
                  width={120}
                  height={68}
                  className="h-12 w-auto rounded-sm object-cover"
                />
                <p className="text-sm leading-relaxed text-primary-foreground/85">
                  A certified Invisalign provider for discreet, modern alignment.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
