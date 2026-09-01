'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navLinks, clinic } from '@/lib/site-data'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/85 py-3 shadow-[0_1px_0_0_var(--border)] backdrop-blur-md'
            : 'bg-transparent py-5',
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label="DentaLounge home"
          >
            <span
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500',
                scrolled ? 'bg-primary' : 'bg-background/90',
              )}
            >
              <Image
                src="/assets/dentalounge-logo.jpg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-auto rounded-full object-cover"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={cn(
                  'font-serif text-lg font-medium tracking-tight transition-colors duration-500',
                  scrolled ? 'text-foreground' : 'text-background',
                )}
              >
                DentaLounge
              </span>
              <span
                className={cn(
                  'text-[0.6rem] uppercase tracking-[0.24em] transition-colors duration-500',
                  scrolled ? 'text-muted-foreground' : 'text-background/70',
                )}
              >
                Stress Free Dentistry
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    'group relative text-sm transition-colors duration-300',
                    scrolled
                      ? 'text-foreground/70 hover:text-foreground'
                      : 'text-background/80 hover:text-background',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full',
                      scrolled ? 'bg-primary' : 'bg-background',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={cn(
                'hidden rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 md:inline-flex',
                scrolled
                  ? 'bg-primary text-primary-foreground hover:bg-teal-deep'
                  : 'bg-background text-foreground hover:bg-ivory',
              )}
            >
              Book Consultation
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden',
                scrolled ? 'text-foreground hover:bg-muted' : 'text-background hover:bg-background/10',
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={cn(
          'fixed inset-0 z-[60] flex flex-col bg-primary text-primary-foreground transition-all duration-500 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-serif text-lg">DentaLounge</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-background/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-1 px-8">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block border-b border-primary-foreground/15 py-4 font-serif text-3xl transition-all duration-500',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                )}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 px-8 pb-10">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-background px-6 py-4 text-center text-sm font-medium text-foreground"
          >
            Book a Consultation
          </a>
          <a
            href={`tel:${clinic.phoneRaw}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-4 text-sm"
          >
            <Phone className="h-4 w-4" />
            {clinic.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  )
}
