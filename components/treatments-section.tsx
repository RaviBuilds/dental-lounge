'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import { treatmentCategories } from '@/lib/site-data'

export function TreatmentsSection() {
  const [activeCategory, setActiveCategory] = useState('alignment')
  const [activeTreatment, setActiveTreatment] = useState('aligners')
  const category = useMemo(() => treatmentCategories.find((item) => item.id === activeCategory) ?? treatmentCategories[0], [activeCategory])
  const treatment = category.treatments.find((item) => item.id === activeTreatment) ?? category.treatments[0]

  function selectCategory(categoryId: string) {
    const next = treatmentCategories.find((item) => item.id === categoryId) ?? treatmentCategories[0]
    setActiveCategory(next.id)
    setActiveTreatment(next.treatments[0].id)
  }

  return (
    <section id="treatments" className="treatments-editorial relative scroll-mt-24 bg-background py-24 lg:py-36" aria-labelledby="treatments-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <Reveal><p className="kicker text-primary">What we do</p></Reveal>
          <Reveal delay={80}>
            <h2 id="treatments-title" className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Care organised around your goals — not a checklist.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">Different areas of dental care, brought together around what you need — with space to understand the options before deciding what comes next.</p>
          </Reveal>
        </div>

        <div className="treatments-layout mt-14 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <nav aria-label="Treatment categories" className="treatment-categories">
            <div className="border-t border-border">
              {treatmentCategories.map((item) => {
                const isActive = item.id === category.id
                return (
                  <div key={item.id} className="treatment-category border-b border-border">
                    <button type="button" aria-expanded={isActive} aria-controls={`category-${item.id}`} onClick={() => selectCategory(item.id)} className={cn('treatment-category-trigger group flex w-full items-center justify-between gap-4 py-6 text-left', isActive && 'is-active')}>
                      <span className="flex items-baseline gap-4"><span className="font-mono text-[0.68rem] text-muted-foreground">{item.number}</span><span className="font-serif text-2xl font-light sm:text-[1.7rem]">{item.name}</span></span>
                      <span className="font-mono text-lg text-muted-foreground" aria-hidden="true">{isActive ? '×' : '+'}</span>
                    </button>
                    <div id={`category-${item.id}`} hidden={!isActive} className="pb-6 pl-8">
                      <p className="mb-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                      <div className="grid gap-1">
                        {item.treatments.map((entry) => {
                          const selected = entry.id === treatment.id
                          return <button key={entry.id} type="button" aria-pressed={selected} onClick={() => setActiveTreatment(entry.id)} className={cn('treatment-item group flex w-full items-center gap-3 py-2 text-left text-sm', selected && 'is-selected')}><span className="treatment-item-marker" aria-hidden="true">{selected ? '—' : '·'}</span><span>{entry.name}</span></button>
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </nav>

          <article key={`${category.id}-${treatment.id}`} className="treatment-detail" aria-live="polite">
            <div className="mb-7 flex items-center gap-3"><span className="h-px w-10 bg-primary" /><span className="kicker text-primary">{category.name}</span></div>
            <div className="grid gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,1.2fr)] md:items-start md:gap-10">
              <div className="order-2 md:order-1">
                <p className="kicker text-muted-foreground">Active treatment</p>
                <h3 className="mt-4 text-balance font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl">{treatment.name}</h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{treatment.description}</p>
                <div className="mt-7"><p className="kicker text-foreground">Helps with</p><ul className="mt-4 grid gap-2 text-sm text-muted-foreground">{treatment.helpsWith.map((item) => <li key={item} className="flex items-baseline gap-3"><span className="h-px w-4 bg-primary" />{item}</li>)}</ul></div>
                <div className="mt-7 flex flex-wrap gap-2">{treatment.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-3 py-1.5 text-xs text-secondary-foreground">{tag}</span>)}</div>
              </div>
              <figure className="treatment-image order-1 overflow-hidden rounded-sm bg-muted md:order-2" aria-label={`${treatment.name} image`}>
                <img src={treatment.image} alt={treatment.alt} className="aspect-[4/3] h-full w-full object-cover" />
                <figcaption className="border-t border-border px-4 py-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">{category.number} / {treatment.name}</figcaption>
              </figure>
            </div>
          </article>
        </div>

        <div className="treatments-handoff mt-20 flex items-center justify-end gap-4 border-t border-border pt-6 lg:mt-28"><span className="kicker text-muted-foreground">What care can change</span><span className="h-px w-16 bg-primary" /></div>
      </div>
    </section>
  )
}
