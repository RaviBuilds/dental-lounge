import { Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { reviews, clinic } from '@/lib/site-data'

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-stone py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
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
            <div className="flex items-center gap-4 rounded-sm border border-border bg-background px-6 py-5">
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="font-serif text-2xl text-foreground">{clinic.rating.toFixed(1)}</span>{' '}
                  on Google · {clinic.reviewCount} reviews
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {reviews.map((review, i) => (
            <Reveal
              key={review.quote}
              delay={(i % 3) * 90}
              className="break-inside-avoid rounded-sm border border-border bg-background p-7 transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {review.theme}
                </span>
              </div>
              <blockquote className="mt-5 text-pretty font-serif text-lg font-light leading-relaxed text-foreground">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm text-muted-foreground">{review.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
