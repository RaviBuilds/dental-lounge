import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

export const metadata: Metadata = {
  title: 'DentaLounge — Stress Free Dentistry | Mehdipatnam, Hyderabad',
  description:
    'A calmer approach to modern dentistry, designed around you. DentaLounge is a boutique, garden-integrated dental clinic in Mehdipatnam, Hyderabad offering Invisalign, braces, root canal, crowns, wisdom tooth and pediatric care.',
  keywords: [
    'DentaLounge',
    'Stress Free Dentistry',
    'Mehdipatnam dentist',
    'Hyderabad dental clinic',
    'Invisalign Hyderabad',
    'clear aligners',
    'Damon braces',
    'root canal',
    'pediatric dentistry',
  ],
  authors: [{ name: 'DentaLounge' }],
  openGraph: {
    title: 'DentaLounge — Stress Free Dentistry',
    description:
      'A calmer approach to modern dentistry, designed around you. Mehdipatnam, Hyderabad.',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/assets/garden.jpg' }],
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2b6d6d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
