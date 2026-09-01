'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function ClinicVideoSection() {
  const [open, setOpen] = useState(false)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) modalVideoRef.current?.play().catch(() => {})
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section className="relative bg-charcoal">
      <div className="relative h-[70svh] min-h-[460px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/exterior-night.jpg"
          aria-hidden="true"
        >
          <source src="/assets/clinic-tour.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-charcoal/45" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Play the DentaLounge clinic film"
              className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-background/90 text-foreground transition-all duration-500 hover:scale-110 hover:bg-background"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-background/30 [animation-duration:2.5s]" />
              <Play className="h-6 w-6 translate-x-0.5 fill-current" />
            </button>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl text-balance font-serif text-3xl font-light leading-tight text-background sm:text-4xl">
              Come see where stress-free dentistry begins.
            </p>
          </Reveal>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="DentaLounge clinic film"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="w-full max-w-4xl overflow-hidden rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="auto"
              poster="/assets/exterior-night.jpg"
            >
              <source src="/assets/clinic-tour.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  )
}
