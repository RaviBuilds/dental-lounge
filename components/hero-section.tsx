'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, MapPin, Pause, Play, Star } from 'lucide-react'
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

export function HeroSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const goTo = useCallback((index: number) => {
    setActive(((index % SCENE_COUNT) + SCENE_COUNT) % SCENE_COUNT)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % SCENE_COUNT)
    }, SCENE_DURATIONS[active])
    return () => window.clearTimeout(timer)
  }, [active, paused])

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
      <SceneThree active={active === 2} index={2} current={active} reduced={reduced} />
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
                      style={isActive && !reduced && !paused ? { animationDuration: `${duration}ms` } : undefined}
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

type SceneProps = { active: boolean; index: number; current: number; reduced: boolean }

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

function SceneTwo(props: SceneProps) {
  const { active, reduced } = props
  return (
    <ScenePanel {...props}>
      <Image
        src="/assets/hero-garden.jpg"
        alt="DentaLounge clinic at dusk — red-tiled roof, glass treatment rooms and a lush garden"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 to-transparent" />

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 sm:pb-24 lg:px-10 lg:pb-28">
          <div className={`max-w-2xl ${sceneContentClass(active, reduced)}`}>
            <SceneKicker>The Space</SceneKicker>
            <h2 className="mt-5 max-w-xl text-balance font-serif text-[2.75rem] font-light leading-[0.98] text-background sm:text-6xl lg:text-7xl">
              A dental clinic that doesn&apos;t <span className="italic text-accent">feel</span> like one.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/85 sm:text-lg">
              Glass treatment rooms. Garden views. A quieter way to experience care.
            </p>
            <div className="mt-8 sm:mt-9">
              <SecondaryCta href="#space">Explore DentaLounge</SecondaryCta>
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

function SceneThree(props: SceneProps) {
  const { active, reduced } = props
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (active) video.play().catch(() => {})
  }, [active])

  return (
    <ScenePanel {...props}>
      <Image
        src="/assets/hero-doctor-bg.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center"
      />
      {/* Directional scrim — keeps the interior visible on the media side, text legible on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-charcoal/15 lg:to-charcoal/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/20" />

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

          {/* Portrait video — editorial film frame on desktop, dominant media on mobile */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
            <div
              className={`group relative w-fit max-w-full overflow-hidden rounded-[0.4rem] border border-accent/45 bg-charcoal/70 p-1 shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--background)_12%,transparent),0_24px_60px_color-mix(in_oklch,var(--charcoal)_45%,transparent)] backdrop-blur-sm ${
                reduced ? '' : 'transition-all duration-700 ease-out'
              } ${active || reduced ? 'translate-y-0 scale-100 opacity-100 delay-150' : 'translate-y-4 scale-[0.98] opacity-0'}`}
            >
              <div className="relative aspect-[9/16] h-[38vh] max-h-[24rem] min-h-[15rem] overflow-hidden rounded-[0.2rem] bg-charcoal sm:h-[48vh] sm:max-h-[30rem] lg:h-[58vh] lg:max-h-[34rem]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/assets/hero-doctor-bg.webp"
                  aria-label="DentaLounge doctors introducing their approach to care"
                >
                  <source src="/assets/doctors-intro.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-background/75">
                  <span className="h-px w-6 bg-accent" aria-hidden="true" />
                  <span className="kicker text-[0.6rem]">A word from the team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}

/* ------------------------------------------------------------------ */
/* SCENE 4 — THE PROOF                                                */
/* ------------------------------------------------------------------ */

function SceneFour(props: SceneProps) {
  const { active, reduced } = props
  return (
    <ScenePanel {...props}>
      <Image
        src="/assets/hero-proof-bg.webp"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/45 to-charcoal/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/25" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 lg:px-10">
        <div className="grid w-full items-center gap-8 pb-16 pt-24 sm:pt-28 lg:grid-cols-12 lg:gap-12 lg:pb-16 lg:pt-16">
          {/* Text */}
          <div className={`order-2 lg:order-1 lg:col-span-6 ${sceneContentClass(active, reduced)}`}>
            <SceneKicker>Real Patient Case</SceneKicker>
            <h2 className="mt-5 max-w-xl text-balance font-serif text-[2.3rem] font-light leading-[1.02] text-background sm:text-5xl lg:text-6xl">
              Real treatment. Real <span className="italic text-accent">transformation.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-background/85 sm:text-lg">
              See what thoughtful treatment can change.
            </p>
            <div className="mt-7 sm:mt-8">
              <PrimaryCta href="#transformations">See Our Results</PrimaryCta>
            </div>
          </div>

          {/* Authentic composite before/after — one faithful artifact */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6 lg:justify-end">
            <figure
              className={`relative w-fit max-w-full ${reduced ? '' : 'transition-all duration-700 ease-out'} ${
                active || reduced ? 'translate-y-0 rotate-0 opacity-100 delay-150' : 'translate-y-5 opacity-0'
              }`}
            >
              <div className="overflow-hidden rounded-[0.4rem] border border-background/25 bg-background/5 p-1.5 shadow-[0_28px_70px_color-mix(in_oklch,var(--charcoal)_50%,transparent)] backdrop-blur-sm">
                <Image
                  src="/assets/hero-transformation.jpg"
                  alt="Authentic DentaLounge patient shown before and after treatment, with the clinic's own Before and After labels"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 1023px) 78vw, 30vw"
                  className="h-auto w-[76vw] max-w-[22rem] rounded-[0.25rem] sm:w-[52vw] lg:w-full lg:max-w-[24rem]"
                />
              </div>
              <figcaption className="mt-3 text-center text-[0.6rem] uppercase tracking-[0.24em] text-background/55 lg:text-left">
                Actual DentaLounge patient · unretouched result
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </ScenePanel>
  )
}
