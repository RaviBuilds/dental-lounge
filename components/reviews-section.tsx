import { ArrowRight, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { reviews, clinic } from '@/lib/site-data'

export function ReviewsSection() {
  const [featured, ...supporting] = reviews

  return (
    <section id="reviews" className="reviews-section relative overflow-hidden bg-stone py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reviews-intro flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="kicker text-primary">Patient stories</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] text-foreground sm:text-5xl">
                Trusted for how it <span className="italic text-primary">feels</span> — and the
                results.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="reviews-proof border-y border-border py-5" aria-label={`${clinic.rating.toFixed(1)} on Google from ${clinic.reviewCount} reviews`}>
              <div className="flex items-center gap-1 text-primary" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-light text-foreground">{clinic.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">on Google</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{clinic.reviewCount} reviews</p>
            </div>
          </Reveal>
        </div>

        <div className="reviews-feature mt-16 border-t border-border pt-10 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-8">
            <p className="kicker text-primary">{featured.theme}</p>
            <figure className="reviews-featured-quote relative mt-7 pl-7 sm:pl-10">
              <span aria-hidden="true" className="absolute -left-1 -top-7 font-serif text-7xl leading-none text-primary/25 sm:-left-2 sm:-top-10 sm:text-9xl">“</span>
              <blockquote className="max-w-3xl text-pretty font-serif text-3xl font-light leading-[1.12] text-foreground sm:text-4xl lg:text-5xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">{featured.name}</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100} className="mt-10 lg:col-span-4 lg:mt-0 lg:self-end">
            <p className="max-w-xs border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              A patient perspective on the feeling behind the care.
            </p>
          </Reveal>
        </div>

        <div className="reviews-support mt-20 border-t border-border pt-8 lg:mt-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker text-primary">More patient voices</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Different experiences, recurring reasons to feel at ease.</p>
            </div>
            <p className="hidden text-xs uppercase tracking-[0.16em] text-muted-foreground sm:block">Google reviews</p>
          </div>

          <div className="reviews-support-grid mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
            {supporting.map((review, i) => (
              <Reveal key={review.quote} delay={(i % 3) * 70} className="reviews-support-item lg:col-span-4">
                <article className="border-t border-border pt-5">
                  <p className="kicker text-muted-foreground">{review.theme}</p>
                  <blockquote className="mt-5 text-pretty font-serif text-xl font-light leading-relaxed text-foreground">&ldquo;{review.quote}&rdquo;</blockquote>
                  <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">{review.name}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="reviews-closing mt-24 flex flex-col items-center gap-6 border-t border-border pt-10 text-center lg:mt-32">
          <p className="max-w-xl font-serif text-2xl font-light italic text-foreground/75">Every patient brings a different reason to begin.</p>
          <a href="#contact" className="inline-flex items-center gap-3 border-b border-primary/60 pb-2 text-sm text-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-4">
            Book a consultation <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
