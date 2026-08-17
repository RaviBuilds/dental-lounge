'use client'

import { useEffect, useRef, useState } from 'react'
import { Maximize2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function DoctorsIntroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen) modalVideoRef.current?.play().catch(() => {})
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  return (
    <section className="section-rule relative overflow-hidden bg-background py-24 lg:py-36" aria-labelledby="doctors-intro-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="kicker text-primary">A personal introduction</p>
            <h2 id="doctors-intro-title" className="mt-6 max-w-3xl text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Before we treat your smile, we <span className="italic text-primary">listen.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Thoughtful care begins with understanding the person sitting in the chair. Meet the people who make DentaLounge feel different.
            </p>
          </Reveal>
        </div>

        <Reveal variant="clip" className="image-lift relative mx-auto w-full max-w-[30rem] overflow-hidden rounded-sm bg-charcoal">
          <div className="relative aspect-[9/16] w-full">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="DentaLounge doctors introducing the clinic and their approach to care"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/assets/doctors-intro.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-charcoal/10" />
            <div className="pointer-events-none absolute left-6 top-6 hidden items-center gap-3 text-background/70 sm:flex lg:left-10 lg:top-10">
              <span className="h-px w-10 bg-accent" />
              <span className="kicker">DentaLounge · Hyderabad</span>
            </div>
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 lg:inset-x-10 lg:bottom-10">
              <p className="max-w-md text-pretty font-serif text-xl font-light italic leading-snug text-background sm:text-2xl">
                The care is clinical. The feeling is personal.
              </p>
              <div className="flex shrink-0 items-center gap-2" aria-label="Video controls">
                <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause introduction video' : 'Play introduction video'} className="inline-flex size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm transition-colors hover:bg-charcoal/65">
                  {isPlaying ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4 fill-current" />}
                </button>
                <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute introduction video' : 'Mute introduction video'} className="hidden size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm transition-colors hover:bg-charcoal/65 sm:inline-flex">
                  {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
                <button type="button" onClick={() => setIsOpen(true)} aria-label="Watch introduction video fullscreen" className="inline-flex size-11 items-center justify-center rounded-full border border-background/45 bg-charcoal/35 text-background backdrop-blur-sm transition-colors hover:bg-charcoal/65">
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="DentaLounge doctor introduction" onClick={() => setIsOpen(false)}>
          <button type="button" onClick={() => setIsOpen(false)} aria-label="Close fullscreen video" className="absolute right-5 top-5 inline-flex size-11 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20">
            <X className="size-5" />
          </button>
          <div className="flex max-h-[88vh] max-w-[94vw] items-center justify-center overflow-hidden rounded-sm shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <video ref={modalVideoRef} className="max-h-[88vh] w-auto max-w-[94vw] bg-charcoal" controls playsInline>
              <source src="/assets/doctors-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
