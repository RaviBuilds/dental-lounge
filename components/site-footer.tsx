import Image from 'next/image'
import { navLinks, clinic } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/dentalounge-logo.jpg"
                alt="DentaLounge logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="leading-none">
                <p className="font-serif text-xl">DentaLounge</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-background/60">
                  {clinic.tagline}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-background/70">
              A boutique, garden-integrated dental clinic in Mehdipatnam,
              Hyderabad — where modern dentistry feels calm and human.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.24em] text-background/50">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/75 transition-colors hover:text-background"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-xs uppercase tracking-[0.24em] text-background/50">Visit</p>
            <address className="mt-5 not-italic leading-relaxed text-sm text-background/75">
              {clinic.address.line1}
              <br />
              {clinic.address.line2}
              <br />
              {clinic.address.city}
            </address>
            <a
              href={`tel:${clinic.phoneRaw}`}
              className="mt-4 inline-block text-sm text-background/90 transition-colors hover:text-background"
            >
              {clinic.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-6 text-xs text-background/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} DentaLounge. All rights reserved.
          </p>
          <p>Mehdipatnam, Hyderabad, Telangana, India</p>
        </div>
      </div>
    </footer>
  )
}
