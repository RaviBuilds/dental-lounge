'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ArrowRight, Expand, MapPin, Pause, Play, Star, Volume2, VolumeX, X } from 'lucide-react'
import { clinic } from '@/lib/site-data'

const SCENE_DURATIONS = [8000, 7000, 8000, 7000]
const SCENE_COUNT = SCENE_DURATIONS.length
const TRANSITION_MS = 1100

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return isDesktop
}

export function HeroSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  /* A scene can request a temporary hold on auto-advance (e.g. Scene 3 while the user watches the unmuted film). */
  const [hold, setHold] = useState(false)
  const reduced = usePrefersReducedMotion()

  const goTo = useCallback((index: number) => {
    setActive(((index % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT)
  }, [])

  const goNext = useCallback(() => {
    setActive((current) => (current + 1) % SCENE_COUNT)
  }, [])

  useEffect(() => {
    if (paused || hold) return
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % SCENE_COUNT)
    }, SCENE_DURATIONS[active])
    return () => window.clearTimeout(timer)
  }, [active, paused, hold])

  return (
    <section
      id="top"
      aria-label="DentaLounge introduction"
      aria-roledescription="cinematic sequence"
      className="relative h-[92svh] min-h-[34rem] w-full overflow-hidden bg-charcoal lg:h-[86vh] lg:max-h-[54rem]"
    >
      {/* Scene panels */}
      <SceneOne active={active === 0} index={0} current={active} reduced={reduced} />
      <SceneTwo active={active === 1} index={1} current={active} reduced={reduced} />
      <SceneThree
        active={active === 2}
        index={2}
        current={active}
        reduced={reduced}
        onHoldChange={setHold}
        onRequestNext={goNext}
      />
      <SceneFour active={active === 3} index={3} current={active} reduced={reduced} />

      {/* Persistent overlay: progress + controls (stays fixed while scenes slide) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 pb-6 sm:pb-8 lg:px-10">
          <div className="pointer-events-auto flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.2em] text-background/75 tabular-nums">
              {String(active + 1).padStart(2, '0')} <span className="text-background/40">/ 0{SCENE_COUNT}</span>
            </span>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero scenes">
              {SCENE_DURATIONS.map((duration, index) => {
                const isActive = index === active
                return (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to scene ${index + 1}`}
                    onClick={() => goTo(index)}
                    className="group relative h-4 w-8 sm:w-10"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-background/30 transition-colors group-hover:bg-background/50" />
                    <span
                      className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent ${
                        isActive ? 'dl-hero-progress-fill' : 'scale-x-0'
                      }`}
                      style={
                        isActive && !reduced
                          ? { animationDuration: `${duration}ms`, animationPlayState: paused || hold ? 'paused' : 'running' }
                          : undefined
                      }
                    />
                  </button>
                )
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? 'Resume hero sequence' : 'Pause hero sequence'}
            className="pointer-events-auto inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-background/70 transition-colors hover:text-background"
          >
            {paused ? <Play className="size-3.5 fill-current" /> : <Pause className="size-3.5" />}
            <span className="hidden sm:inline">{paused ? 'Play' : 'Pause'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Shared scene wrapper — handles horizontal slide / reduced crossfade */
/* ------------------------------------------------------------------ */

type SceneProps = {
  active: boolean
  index: number
  current: number
  reduced: boolean
  onHoldChange?: (hold: boolean) => void
  onRequestNext?: () => void
}

function ScenePanel({
  active,
  index,
  current,
  reduced,
  className,
  children,
}: SceneProps & { className?: string; children: React.ReactNode }) {
  const offset = index - current
  const style = reduced
    ? { opacity: active ? 1 : 0, transitionProperty: 'opacity', transitionDuration: `${TRANSITION_MS}ms` }
    : {
        transform: `translate3d(${offset * 100}%, 0, 0)`,
        transitionProperty: 'transform',
        transitionDuration: `${TRANSITION_MS}ms`,
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }

  return (
    <div
      role="tabpanel"
      aria-hidden={!active}
      style={style}
      className={`absolute inset-0 h-full w-full will-change-transform ${
        active ? '' : 'pointer-events-none'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

function SceneKicker({ children, tone = 'light' }: { children: React.ReactNode; tone?: 'light' | 'accent' }) {
  return (
    <span className={`kicker inline-flex items-center gap-2.5 ${tone === 'accent' ? 'text-accent' : 'text-background/70'}`}>
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {children}
    </span>
  )
}

function PrimaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-ivory sm:px-7 sm:py-4"
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  )
}

function SecondaryCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-background/40 px-6 py-3.5 text-sm font-medium text-background backdrop-blur-sm transition-colors duration-300 hover:bg-background/10 sm:px-7 sm:py-4"
    >
      {children}
    </a>
  )
}

/* Subtle content reveal keyed to the active scene */
function sceneContentClass(active: boolean, reduced: boolean) {
  if (reduced) return ''
  return `transition-all duration-700 ease-out ${active ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-6 opacity-0'}`
}

/* ------------------------------------------------------------------ */
/* SCENE 1 — THE PLACE                                                */
/* ------------------------------------------------------------------ */

function SceneOne(props: SceneProps) {
  const { active, reduced } = props
  return (
    <ScenePanel {...props}>
      <video
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/exterior-night.jpg"
        aria-hidden="true"
      >
        <source src="/assets/clinic-tour.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-charcoal/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/15 to-transparent" />
      <div className="absolute -right-20 top-1/4 hidden h-[26rem] w-[26rem] rounded-[48%_52%_55%_45%] border border-accent/25 lg:block" aria-hidden="true" />

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-24 lg:px-10 lg:pb-28">
          <div className={`max-w-3xl ${sceneContentClass(active, reduced)}`}>
            <SceneKicker>
              <MapPin className="size-3.5" aria-hidden="true" />
              Mehdipatnam · Hyderabad
            </SceneKicker>
            <h1 className="mt-5 max-w-3xl text-balance font-serif text-[3.25rem] font-light leading-[0.94] text-background sm:text-6xl lg:text-8xl">
              Dentistry,
              <br />
              without the <span className="italic text-accent">stress.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-background/85 sm:mt-7 sm:text-lg">
              A calmer approach to modern dentistry, designed around you — where clinical excellence meets a garden, glass and quiet warmth.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
              <PrimaryCta href="#contact">Book a Consultation</PrimaryCta>
              <SecondaryCta href="#experience">Explore DentaLounge</SecondaryCta>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-background/20 pt-4 text-background/80 sm:mt-8">
              <div className="flex items-center gap-2" aria-label={`${clinic.rating} out of 5 stars from ${clinic.reviewCount} Google reviews`}>
                <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-3 fill-current" />
                  ))}
                </span>
                <span className="text-sm font-medium text-background">{clinic.rating.toFixed(1)} on Google</span>
                <span className="text-xs text-background/65">· {clinic.reviewCount} Reviews</span>
              </div>
              <span className="hidden h-4 w-px bg-background/25 sm:block" aria-hidden="true" />
              <div className="flex items-center gap-2 text-xs text-background/70">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Invisalign provider
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}

/* ------------------------------------------------------------------ */
/* SCENE 2 — THE SPACE                                                */
/* ------------------------------------------------------------------ */

/* Per-element staggered reveal for Scene 2 — background → label → headline → copy → CTA → metadata */
function sceneTwoReveal(active: boolean, reduced: boolean, delay: number) {
  if (reduced) return { className: '', style: undefined as React.CSSProperties | undefined }
  return {
    className: `transition-all duration-[850ms] ease-out ${
      active ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
    }`,
    style: { transitionDelay: active ? `${delay}ms` : '0ms' },
  }
}

function SceneTwo(props: SceneProps) {
  const { active, reduced } = props
  const label = sceneTwoReveal(active, reduced, 120)
  const heading = sceneTwoReveal(active, reduced, 260)
  const copy = sceneTwoReveal(active, reduced, 420)
  const cta = sceneTwoReveal(active, reduced, 580)
  const meta = sceneTwoReveal(active, reduced, 760)
  return (
    <ScenePanel {...props}>
      {/* Background layer — recropped toward glass treatment rooms + garden, roof de-emphasised */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 will-change-transform ${
            !reduced && active ? 'dl-scene2-motion' : ''
          }`}
          style={!reduced && !active ? { transform: 'scale(1.06)' } : undefined}
        >
          <Image
            src="/assets/hero-garden.jpg"
            alt="DentaLounge glass treatment rooms opening onto a lush green garden at dusk"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[62%_78%] sm:object-[center_74%] lg:object-[center_70%]"
          />
        </div>
      </div>

      {/* Lighter, warmer, greener grade — distinct from Scene 1, contrast preserved at the base */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/82 via-charcoal/12 to-charcoal/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-transparent to-transparent" />
      <div
        className="absolute inset-0 mix-blend-soft-light opacity-40"
        style={{ background: 'linear-gradient(to top right, color-mix(in oklch, #d99a52 55%, transparent), transparent 55%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-24 lg:px-10 lg:pb-28">
          <div className="max-w-2xl">
            <div className={label.className} style={label.style}>
              <SceneKicker>The Space</SceneKicker>
            </div>
            <h2
              style={heading.style}
              className={`mt-5 max-w-xl text-balance font-serif text-[2.75rem] font-light leading-[0.98] text-background sm:text-6xl lg:text-7xl ${heading.className}`}
            >
              A dental clinic that doesn&apos;t <span className="italic text-accent">feel</span> like one.
            </h2>
            <p
              style={copy.style}
              className={`mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/90 sm:text-lg ${copy.className}`}
            >
              Glass treatment rooms. Garden views. A quieter way to experience care.
            </p>
            <div style={cta.style} className={`mt-8 sm:mt-9 ${cta.className}`}>
              <SecondaryCta href="#space">Explore DentaLounge</SecondaryCta>
            </div>
            {/* Restrained editorial metadata — a quiet differentiator, not a stat card */}
            <div
              style={meta.style}
              className={`mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-background/20 pt-4 sm:mt-9 ${meta.className}`}
            >
              <span className="flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-background/85">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Garden-facing treatment rooms
              </span>
              <span className="hidden h-3 w-px bg-background/25 sm:block" aria-hidden="true" />
              <span className="text-[0.7rem] uppercase tracking-[0.24em] text-background/55">
                Glass · Garden · Quiet warmth
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}

/* ------------------------------------------------------------------ */
/* SCENE 3 — THE PEOPLE                                               */
/* ------------------------------------------------------------------ */

const DOCTOR_VIDEO_SRC = '/assets/doctors-intro.mp4'
const DOCTOR_VIDEO_CUE = 3 /* doctor begins speaking ~4s in; enter mid-approach */
const DEFAULT_PORTRAIT_RATIO = 9 / 16

function frameEntranceTransform(active: boolean, reduced: boolean, isDesktop: boolean) {
  if (reduced) return undefined
  if (isDesktop) {
    return active
      ? 'perspective(1400px) translate3d(0, 0, 0) rotateY(-8deg) rotateX(4deg) rotateZ(-2deg) scale(1)'
      : 'perspective(1400px) translate3d(5%, 70px, -150px) rotateY(-18deg) rotateX(11deg) rotateZ(-6deg) scale(0.9)'
  }
  return active
    ? 'translate3d(0, 0, 0) rotateZ(-1deg) scale(1)'
    : 'translate3d(0, 42px, 0) rotateZ(-2.5deg) scale(0.95)'
}

function SceneThree(props: SceneProps) {
  const { active, reduced, onHoldChange, onRequestNext } = props
  const isDesktop = useIsDesktop()

  const inlineVideoRef = useRef<HTMLVideoElement | null>(null)
  const modalVideoRef = useRef<HTMLVideoElement | null>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef(active)
  activeRef.current = active

  const [aspect, setAspect] = useState(DEFAULT_PORTRAIT_RATIO)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  /* While the user watches the unmuted film, we stop looping and hold the hero auto-advance. */
  const [watchingFull, setWatchingFull] = useState(false)

  /* Capture the video's true aspect ratio so the frame never shows side gutters */
  const handleMeta = useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget
    if (video.videoWidth && video.videoHeight) {
      setAspect(video.videoWidth / video.videoHeight)
    }
  }, [])

  /* Enter / leave: start from the cue point when the scene becomes active, pause + reset when it leaves */
  useEffect(() => {
    const video = inlineVideoRef.current
    if (!video) return
    if (active) {
      const start = () => {
        try {
          video.currentTime = DOCTOR_VIDEO_CUE
        } catch {
          /* metadata not ready — the loadedmetadata handler will retry */
        }
        video.muted = true
        setIsMuted(true)
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
      if (video.readyState >= 1) start()
      else video.addEventListener('loadedmetadata', start, { once: true })
    } else {
      video.pause()
      setIsPlaying(false)
      /* Leaving the scene: drop any full-watch hold so the sequence resumes cleanly */
      setWatchingFull(false)
      setIsMuted(true)
      video.muted = true
      onHoldChange?.(false)
    }
  }, [active, onHoldChange])

  const togglePlay = useCallback(() => {
    const video = inlineVideoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = inlineVideoRef.current
    if (!video) return
    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)

    if (!nextMuted) {
      /* Unmuted: the user wants to watch the full film — stop looping and hold the hero. */
      video.loop = false
      setWatchingFull(true)
      onHoldChange?.(true)
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      /* Re-muted: resume the ambient loop and let the sequence auto-advance again. */
      video.loop = true
      setWatchingFull(false)
      onHoldChange?.(false)
    }
  }, [onHoldChange])

  /* Fired only while watching full (loop disabled): resume the sequence and move to the next scene. */
  const handleEnded = useCallback(() => {
    setWatchingFull(false)
    setIsPlaying(false)
    onHoldChange?.(false)
    onRequestNext?.()
  }, [onHoldChange, onRequestNext])

  const openLightbox = useCallback(() => {
    inlineVideoRef.current?.pause()
    setIsPlaying(false)
    setLightboxOpen(true)
  }, [])

  /* Lightbox lifecycle: scroll lock, cue-point start with sound, focus + Escape handling */
  useEffect(() => {
    if (!lightboxOpen) return
    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const video = modalVideoRef.current
    if (video) {
      const start = () => {
        try {
          video.currentTime = DOCTOR_VIDEO_CUE
        } catch {
          /* retry via loadedmetadata below */
        }
        video.muted = false
        video.play().catch(() => {})
      }
      if (video.readyState >= 1) start()
      else video.addEventListener('loadedmetadata', start, { once: true })
    }

    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setLightboxOpen(false)
        return
      }
      if (event.key === 'Tab' && overlayRef.current) {
        const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow
      modalVideoRef.current?.pause()
      openerRef.current?.focus()
      if (activeRef.current) {
        const inline = inlineVideoRef.current
        if (inline) {
          inline.play().then(() => setIsPlaying(true)).catch(() => {})
        }
      }
    }
  }, [lightboxOpen])

  const entranceTransform = frameEntranceTransform(active, reduced, isDesktop)

  return (
    <ScenePanel {...props}>
      {/* Softened environment — real DentaLounge interior, pushed back so the film object reads as foreground */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/assets/hero-doctor-bg.webp"
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          className="scale-105 object-cover object-center blur-[2px] lg:blur-[3px]"
        />
      </div>
      {/* Directional scrim — keeps the interior legible while text stays readable on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/30" />
      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(120% 90% at 65% 45%, transparent 45%, color-mix(in oklch, var(--charcoal) 65%, transparent) 100%)' }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-start px-6 lg:items-center lg:px-10">
        <div className="grid w-full items-center gap-6 pb-14 pt-24 sm:pt-28 lg:grid-cols-12 lg:gap-10 lg:pb-16 lg:pt-16">
          {/* Text */}
          <div className={`order-2 lg:order-1 lg:col-span-6 ${sceneContentClass(active, reduced)}`}>
            <SceneKicker>The People</SceneKicker>
            <h2 className="mt-5 max-w-xl text-balance font-serif text-[2.3rem] font-light leading-[1.02] text-background sm:text-5xl lg:text-6xl">
              Before we treat your smile, we <span className="italic text-accent">listen</span> to you.
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-background/85 sm:text-lg">
              Thoughtful care begins with understanding the person in the chair.
            </p>
            <p className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-background/55">
              Professional · Gentle · Patient · Empathetic
            </p>
            <div className="mt-7 sm:mt-8">
              <PrimaryCta href="#doctors">Meet the Team</PrimaryCta>
            </div>
          </div>

          {/* Portrait film object — floats into place on desktop, dominant + practical on mobile */}
          <div
            className="order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end"
            style={{ perspective: isDesktop && !reduced ? '1400px' : undefined }}
          >
            <div
              className="w-auto max-w-full will-change-transform"
              style={{
                transform: entranceTransform,
                opacity: active || reduced ? 1 : 0,
                transformStyle: !reduced && isDesktop ? 'preserve-3d' : undefined,
                transition: reduced
                  ? 'opacity 900ms ease-out'
                  : 'transform 1200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out',
              }}
            >
              {/* Gentle idle float once settled */}
              <div className={active && isDesktop && !reduced ? 'dl-film-float' : undefined}>
                {/* Frame chrome — graphite edge + thin teal accent + soft depth */}
                <div className="group relative rounded-[0.55rem] border border-accent/40 bg-gradient-to-b from-charcoal/85 to-charcoal/95 p-[3px] shadow-[0_34px_80px_-12px_color-mix(in_oklch,var(--charcoal)_75%,transparent)] backdrop-blur-sm">
                  <div className="pointer-events-none absolute inset-0 rounded-[0.55rem] ring-1 ring-inset ring-background/10" aria-hidden="true" />
                  <div
                    className="relative h-[37vh] max-h-[21rem] min-h-[14rem] w-auto overflow-hidden rounded-[0.4rem] bg-charcoal sm:h-[48vh] sm:max-h-[27rem] lg:h-[62vh] lg:max-h-[34rem]"
                    style={{ aspectRatio: String(aspect) }}
                  >
                    <video
                      ref={inlineVideoRef}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster="/assets/hero-doctor-bg.webp"
                      onLoadedMetadata={handleMeta}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      aria-label="DentaLounge doctors introducing their approach to care"
                    >
                      <source src={DOCTOR_VIDEO_SRC} type="video/mp4" />
                    </video>

                    {/* Legibility gradients for chrome + metadata */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/25" />

                    {/* Poster-state play affordance when autoplay is blocked */}
                    {!isPlaying && active && (
                      <button
                        type="button"
                        onClick={togglePlay}
                        aria-label="Play doctor introduction"
                        className="absolute inset-0 z-10 flex items-center justify-center bg-charcoal/30 transition-colors hover:bg-charcoal/15"
                      >
                        <span className="flex size-16 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
                          <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
                        </span>
                      </button>
                    )}

                    {/* Live indicator — kept clear of the video's own branding */}
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-charcoal/50 px-2.5 py-1 backdrop-blur-sm">
                      <span className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                      <span className="text-[0.5rem] font-medium uppercase tracking-[0.2em] text-background/80">Film</span>
                    </div>

                    {/* Bottom control cluster — belongs to the DentaLounge frame */}
                    <div className="absolute inset-x-3 bottom-3 z-20 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 rounded-full bg-charcoal/55 p-1 backdrop-blur-md">
                        <button
                          type="button"
                          onClick={togglePlay}
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                          className="flex size-8 items-center justify-center rounded-full text-background/85 transition-colors hover:bg-background/15 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {isPlaying ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4 fill-current" />}
                        </button>
                        <button
                          type="button"
                          onClick={toggleMute}
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          className="flex size-8 items-center justify-center rounded-full text-background/85 transition-colors hover:bg-background/15 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                        </button>
                      </div>
                      <button
                        ref={openerRef}
                        type="button"
                        onClick={openLightbox}
                        aria-label="Watch fullscreen"
                        className="flex items-center gap-1.5 rounded-full bg-charcoal/55 py-1.5 pl-3 pr-2.5 text-[0.6rem] uppercase tracking-[0.18em] text-background/85 backdrop-blur-md transition-colors hover:bg-charcoal/75 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <span className="hidden sm:inline">Watch</span>
                        <Expand className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox — portrait-native viewing experience.
          Portaled to <body> so `fixed` escapes the transformed scene panel and covers the viewport. */}
      {lightboxOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="DentaLounge doctor introduction, fullscreen"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md"
          >
          <button
            type="button"
            aria-label="Close fullscreen video"
            onClick={() => setLightboxOpen(false)}
            className="absolute inset-0 -z-10 h-full w-full cursor-default"
            tabIndex={-1}
          />
          <div className="relative flex h-full max-h-full items-center justify-center">
            <div
              className="relative h-full max-h-[88vh] w-auto overflow-hidden rounded-[0.5rem] border border-accent/30 bg-charcoal shadow-2xl"
              style={{ aspectRatio: String(aspect) }}
            >
              <video
                ref={modalVideoRef}
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                poster="/assets/hero-doctor-bg.webp"
                aria-label="DentaLounge doctors introducing their approach to care"
              >
                <source src={DOCTOR_VIDEO_SRC} type="video/mp4" />
              </video>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close fullscreen video"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-background/10 text-background backdrop-blur-md transition-colors hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          </div>,
          document.body,
        )}
    </ScenePanel>
  )
}

/* ------------------------------------------------------------------ */
/* SCENE 4 — THE PROOF                                                */
/* ------------------------------------------------------------------ */

function SceneFour(props: SceneProps) {
  const { active, reduced } = props
  const reveal = (delay: string) =>
    reduced
      ? ''
      : `transition-all duration-700 ease-out ${active ? `translate-y-0 opacity-100 ${delay}` : 'translate-y-5 opacity-0'}`

  return (
    <ScenePanel {...props}>
      <Image
        src="/assets/hero-proof-bg.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className={`dl-scene4-atmosphere object-cover object-center ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/40" />
      <div className={`dl-scene4-wash absolute inset-y-0 right-0 w-1/2 ${active ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-10">
        <div className="grid w-full items-center gap-8 pb-20 pt-24 sm:pb-24 sm:pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-16 lg:pt-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className={reveal('delay-100')}>
              <SceneKicker>Real Patient Case</SceneKicker>
            </div>
            <h2 className={`mt-5 max-w-xl text-balance font-serif text-[2.5rem] font-light leading-[0.98] text-background sm:text-5xl lg:text-[4.25rem] ${reveal('delay-200')}`}>
              Real treatment. Real <span className="italic text-accent">transformation.</span>
            </h2>
            <p className={`mt-5 max-w-md text-pretty text-base leading-relaxed text-background/85 sm:text-lg ${reveal('delay-300')}`}>
              See what thoughtful treatment can change.
            </p>
            <div className={`mt-7 sm:mt-8 ${reveal('delay-[400ms]')}`}>
              <PrimaryCta href="#transformations">See Our Results</PrimaryCta>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:col-span-7 lg:justify-end">
            <figure className={`relative w-fit max-w-full ${reveal('delay-150')} ${reduced ? '' : 'lg:[perspective:1200px]'}`}>
              <div className="dl-scene4-frame overflow-hidden rounded-[0.4rem] border border-background/30 bg-background/10 p-1.5 backdrop-blur-sm">
                <Image
                  src="/assets/hero-transformation.jpg"
                  alt="Authentic DentaLounge patient shown before and after treatment, with the clinic's own Before and After labels"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 1023px) 78vw, 38vw"
                  className="h-auto w-[74vw] max-w-[21rem] rounded-[0.25rem] sm:w-[48vw] lg:w-full lg:max-w-[27rem]"
                />
              </div>
              <figcaption className={`mt-3 text-center text-[0.6rem] uppercase tracking-[0.24em] text-background/60 lg:text-left ${reveal('delay-500')}`}>
                Actual DentaLounge patient · unretouched result
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}
