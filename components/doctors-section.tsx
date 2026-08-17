'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { doctors } from '@/lib/site-data'

const qualities = ['Professional', 'Gentle', 'Patient', 'Empathetic', 'Attentive']

export function DoctorsSection() {
  const [selected, setSelected] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
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

  return (
    <section id="doctors" className="relative overflow-hidden bg-stone py-24 lg:py-36" aria-labelledby="doctors-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal><p className="kicker text-primary">The people</p></Reveal>
            <Reveal delay={80}>
              <h2 id="doctors-title" className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
                Meet the people behind your <span className="italic text-primary">care.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                Skill matters. So does how you make someone feel. Our team brings patience and warmth to every precise clinical moment.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Care qualities">
                {qualities.map((quality) => <li key={quality} className="rounded-full border border-border bg-background px-4 py-2 text-sm text-secondary-foreground">{quality}</li>)}
              </ul>
            </Reveal>

            <div className="mt-12 border-t border-border" role="tablist" aria-label="Select a DentaLounge doctor">
              {doctors.map((doctor, index) => {
                const active = selected === index
                return (
                  <button
                    key={doctor.name}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="selected-doctor"
                    onClick={() => setSelected(index)}
                    className="group flex w-full items-center justify-between border-b border-border py-5 text-left transition-colors hover:bg-background/45 focus-visible:bg-background/45"
                  >
                    <span className={`font-serif text-2xl transition-colors duration-300 sm:text-3xl ${active ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                      {doctor.name}
                    </span>
                    <span className="kicker text-muted-foreground">{active ? 'Selected' : 'DentaLounge'}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div id="selected-doctor" role="tabpanel" aria-label={`Selected doctor: ${doctors[selected].name}`} className="lg:col-span-7">
            <Reveal variant="clip" className="group relative mx-auto w-fit max-w-full overflow-hidden rounded-[0.35rem] border border-accent/45 bg-charcoal p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--background)_12%,transparent),0_18px_50px_color-mix(in_oklch,var(--charcoal)_28%,transparent)] lg:mx-0">
              <div className="relative h-[min(72vh,38rem)] max-h-[38rem] aspect-[9/16] overflow-hidden rounded-[0.15rem] bg-charcoal">
                <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" aria-label={`DentaLounge doctors introducing their approach to care`} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
                  <source src="/assets/doctors-intro.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-charcoal/10" />
                <div className="absolute left-6 top-6 hidden items-center gap-3 text-background/70 sm:flex lg:left-10 lg:top-10"><span className="h-px w-10 bg-accent" /><span className="kicker">DentaLounge · Hyderabad</span></div>
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 lg:inset-x-10 lg:bottom-10">
                  <div><p className="kicker text-background/70">{doctors[selected].name}</p><p className="mt-2 max-w-md text-pretty font-serif text-xl font-light italic leading-snug text-background sm:text-2xl">Before we treat your smile, we listen to you.</p></div>
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

        <Reveal>
          <div className="mx-auto mt-20 max-w-3xl border-y border-primary/20 py-10 text-center lg:mt-28 lg:py-14">
            <p className="kicker text-primary">The care behind the craft</p>
            <p className="mt-5 font-serif text-3xl font-light leading-tight text-foreground sm:text-4xl">Good dentistry is precise. Good care is personal.</p>
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
