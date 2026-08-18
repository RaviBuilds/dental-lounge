'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { doctors } from '@/lib/site-data'

const carePrinciples = [
  ['01', 'Listen', 'Understand the person before the procedure.'],
  ['02', 'Explain', 'Make the treatment understandable and clear.'],
  ['03', 'Precision', 'Approach treatment with care and attention to detail.'],
] as const

export function DoctorsSection() {
  const [selected, setSelected] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(([entry]) => {
      section.classList.toggle('is-scrolled', entry.boundingClientRect.top < 0 && entry.isIntersecting)
    }, { threshold: [0, 0.25] })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) modalVideoRef.current?.play().catch(() => {})
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play().then(() => setIsPlaying(true)).catch(() => {})
    else { video.pause(); setIsPlaying(false) }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const selectedDoctor = doctors[selected]

  return (
    <section ref={sectionRef} id="craft" className="people-section relative overflow-hidden bg-stone py-24 scroll-mt-24 lg:py-36" aria-labelledby="doctors-title">
      <span id="doctors" className="absolute -top-24" aria-hidden="true" />
      <div className="people-contour" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="people-intro grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><p className="kicker text-primary">The people</p></Reveal>
            <Reveal delay={80}>
              <h2 id="doctors-title" className="mt-6 max-w-xl text-balance font-serif text-4xl font-light leading-[1.03] text-foreground sm:text-5xl lg:text-[4.2rem]">
                Meet the people behind your <span className="italic text-primary">care.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Skill matters. So does how you make someone feel. Our team brings patience and warmth to every precise clinical moment.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220} className="people-principles lg:col-span-4 lg:col-start-9">
            <p className="kicker text-primary">The care behind the craft</p>
            <p className="mt-4 font-serif text-2xl font-light leading-tight text-foreground sm:text-3xl">Good dentistry is precise. Good care is personal.</p>
          </Reveal>
        </div>

        <div className="people-stage people-story-stage mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-4 lg:pt-8">
            <Reveal delay={120}>
              <div className="people-feature-label mb-6 flex items-center gap-3"><span className="h-px w-10 bg-primary" /><span className="kicker text-primary">Featured story · Dr. Taha Mir</span></div>
              <p className="max-w-sm font-serif text-2xl font-light leading-snug text-foreground sm:text-3xl">Before we treat your smile, we listen to you.</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="people-doctor-list mt-12" role="tablist" aria-label="Select a DentaLounge doctor">
                {doctors.map((doctor, index) => {
                  const active = selected === index
                  return (
                    <button key={doctor.name} type="button" role="tab" aria-selected={active} aria-controls="selected-doctor" onClick={() => setSelected(index)} className={`people-doctor-tab group relative flex w-full items-center justify-between border-b border-border py-5 text-left ${active ? 'is-active' : ''}`}>
                      <span className="font-serif text-2xl font-light sm:text-3xl">{doctor.name}</span>
                      <span className="flex items-center gap-3"><span className="kicker text-muted-foreground opacity-0 transition-opacity duration-500 group-[.is-active]:opacity-100">Selected</span><span className="people-tab-mark" aria-hidden="true">{active ? '—' : '+'}</span></span>
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <div id="selected-doctor" role="tabpanel" aria-label={`Selected doctor: ${selectedDoctor.name}`} className="people-film-column lg:col-span-7 lg:col-start-6">
            <Reveal variant="clip" className="people-film-frame group relative mx-auto w-fit max-w-full overflow-hidden rounded-[0.35rem] border border-accent/45 bg-charcoal p-1 lg:mx-0">
              <span className="people-film-arc" aria-hidden="true" />
              <div className="relative aspect-[9/16] h-[min(72vh,40rem)] max-h-[40rem] overflow-hidden rounded-[0.15rem] bg-charcoal sm:aspect-[4/5] lg:aspect-[4/5]">
                <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label="DentaLounge doctors introducing their approach to care" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
                  <source src="/assets/doctors-intro.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/10" />
                <div className="absolute left-6 top-6 hidden items-center gap-3 text-background/70 sm:flex lg:left-10 lg:top-10"><span className="h-px w-10 bg-accent" /><span className="kicker">Authentic film · Dr. Taha Mir</span></div>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 lg:inset-x-10 lg:bottom-10">
                  <div><p className="kicker text-background/70">Featured story · Dr. Taha Mir</p><p className="mt-1 text-xs text-background/55">Authentic DentaLounge introduction</p></div>
                  <div className="flex shrink-0 items-center gap-2 opacity-80 transition-opacity duration-500 group-hover:opacity-100 focus-within:opacity-100" aria-label="Video controls">
                    <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause introduction video' : 'Play introduction video'} className="inline-flex size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm hover:bg-charcoal/65">{isPlaying ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4 fill-current" />}</button>
                    <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute introduction video' : 'Mute introduction video'} className="hidden size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm hover:bg-charcoal/65 sm:inline-flex">{isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}</button>
                    <button type="button" onClick={() => setIsOpen(true)} aria-label="Watch introduction video fullscreen" className="inline-flex size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm hover:bg-charcoal/65"><Maximize2 className="size-4" /></button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160}>
          <div className="people-care-list people-care-progression mt-24 border-y border-primary/20 lg:mt-32">
            {carePrinciples.map(([index, title, copy]) => (
              <div key={index} className="people-care-row group grid gap-3 py-7 sm:grid-cols-[4rem_12rem_1fr] sm:items-baseline sm:gap-6">
                <span className="kicker text-muted-foreground">{index}</span>
                <h3 className="people-care-title font-serif text-2xl font-light text-foreground">{title}</h3>
                <p className="people-care-copy max-w-md text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="people-handoff mt-16 flex flex-col gap-4 border-t border-primary/15 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
            <p className="kicker text-primary">A considered experience, from the first hello</p>
            <a href="#space" className="kicker text-muted-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary">Continue to the space →</a>
          </div>
        </Reveal>
      </div>

      {isOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="DentaLounge doctor introduction" onClick={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)} aria-label="Close fullscreen video" className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"><X className="size-5" /></button>
        <div className="flex max-h-[88vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-sm shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <video ref={modalVideoRef} className="max-h-[88vh] w-auto max-w-[94vw] bg-charcoal" controls playsInline><source src="/assets/doctors-intro.mp4" type="video/mp4" /></video>
        </div>
      </div>}
    </section>
  )
}
