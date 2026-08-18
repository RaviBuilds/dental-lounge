export const clinic = {
  name: 'DentaLounge',
  tagline: 'Stress Free Dentistry',
  phoneDisplay: '+91 86395 76085',
  phoneRaw: '+918639576085',
  whatsapp: '918639576085',
  address: {
    line1: 'A.M. Residency, Vivekananda Colony',
    line2: 'Santosh Nagar, Mehdipatnam',
    city: 'Hyderabad, Telangana 500028',
  },
  mapsQuery: 'DentaLounge Mehdipatnam Hyderabad',
  rating: 5.0,
  reviewCount: 38,
} as const

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'Experience', href: '#craft' },
  { label: 'Space', href: '#space' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Treatments', href: '#treatments' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export type ExperienceStep = {
  index: string
  title: string
  body: string
}

export const experienceSteps: ExperienceStep[] = [
  {
    index: '01',
    title: 'Arrive',
    body: 'A calm, garden-side environment instead of a clinical waiting room. You settle in before anything begins.',
  },
  {
    index: '02',
    title: 'Understand',
    body: 'Your treatment is explained clearly and patiently, so nothing feels uncertain or rushed.',
  },
  {
    index: '03',
    title: 'Feel at ease',
    body: 'Gentle, empathetic care designed around your comfort at every step of the visit.',
  },
  {
    index: '04',
    title: 'Transform',
    body: 'Modern dentistry focused on meaningful, lasting outcomes you can see and feel.',
  },
]

export type Treatment = {
  category: string
  summary: string
  items: string[]
}

export const treatments: Treatment[] = [
  {
    category: 'Smile & Alignment',
    summary:
      'Straighter, more confident smiles through modern orthodontics tailored to your goals.',
    items: ['Invisalign / Clear Aligners', 'Braces', 'Damon Braces', 'Orthodontic Treatment'],
  },
  {
    category: 'Restorative Dentistry',
    summary:
      'Careful, precise treatment to restore comfort, function and the natural look of your teeth.',
    items: ['Root Canal Treatment', 'Crowns', 'Extractions'],
  },
  {
    category: 'Surgical Care',
    summary: 'Considered surgical treatment carried out gently and explained thoroughly.',
    items: ['Wisdom Tooth Treatment', 'Surgical Extraction'],
  },
  {
    category: 'Family & Pediatric',
    summary: 'Patient, reassuring dental care for children and the whole family.',
    items: ["Children's Dental Care", 'Pediatric Procedures', 'Preventive Guidance'],
  },
  {
    category: 'General Dental Care',
    summary: 'Everyday dental health, looked after with the same calm attention to detail.',
    items: ['Dental Consultations', 'Preventive Care', 'Routine Treatment'],
  },
]

export type Doctor = { name: string }

export const doctors: Doctor[] = [
  { name: 'Dr. Taha Mir' },
  { name: 'Dr. Manal Babar' },
  { name: 'Dr. Sidrah Maheen' },
  { name: 'Dr. Simren' },
]

export type TransformationCase = {
  id: string
  title: string
  detail: string
  image: string
  layout?: 'wide' | 'tall'
}

/* Grounded only in the supplied before/after material. No fabricated durations/costs. */
export const transformationCases: TransformationCase[] = [
  {
    id: 'case-front',
    title: 'A confident new smile',
    detail: 'Frontal view — orthodontic alignment',
    image: '/assets/transformation-front.jpg',
    layout: 'wide',
  },
  {
    id: 'case-profile',
    title: 'The same journey, in profile',
    detail: 'Profile view — the same patient',
    image: '/assets/transformation-profile.jpg',
  },
  {
    id: 'case-side',
    title: 'A softer facial balance',
    detail: 'Side view — the same patient',
    image: '/assets/transformation-side.jpg',
  },
  {
    id: 'case-5',
    title: 'Aligned and settled',
    detail: 'Intraoral before & after',
    image: '/assets/case-5.jpg',
  },
  {
    id: 'case-4',
    title: 'Occlusal correction',
    detail: 'Upper & lower arch — before & after',
    image: '/assets/case-4.jpg',
    layout: 'tall',
  },
  {
    id: 'case-9',
    title: 'Closing the gaps',
    detail: 'Intraoral before & after',
    image: '/assets/case-9.jpg',
  },
  {
    id: 'case-7',
    title: 'A balanced bite',
    detail: 'Lateral before & after',
    image: '/assets/case-7.jpg',
  },
  {
    id: 'case-8',
    title: 'Refined alignment',
    detail: 'Lateral before & after',
    image: '/assets/case-8.jpg',
  },
]

export type Review = {
  quote: string
  name: string
  theme: string
}

/* Excerpts reflect the recurring themes in DentaLounge's Google reviews. */
export const reviews: Review[] = [
  {
    quote:
      'The atmosphere is professional, calm, loving, clean, and incredibly welcoming. It genuinely feels like a sanctuary.',
    name: 'Google Review',
    theme: 'Calm & Welcoming',
  },
  {
    quote:
      'The doctors are highly professional, and the clinic is clean and modern. Everything was explained to me clearly.',
    name: 'Google Review',
    theme: 'Professional Doctors',
  },
  {
    quote: 'The most hygienic clinic I have ever visited. I felt completely at ease throughout.',
    name: 'Google Review',
    theme: 'Hygiene',
  },
  {
    quote:
      'Monthly appointments at DentaLounge are super chill. The team is gentle and always patient with my questions.',
    name: 'Google Review',
    theme: 'Gentle Care',
  },
  {
    quote:
      'A dental clinic that truly feels like a sanctuary. Warm staff, modern equipment and a genuinely stress-free experience.',
    name: 'Google Review',
    theme: 'Stress-Free',
  },
  {
    quote:
      'My child was nervous, but the pediatric care here was so kind and reassuring. We could not have asked for better.',
    name: 'Google Review',
    theme: 'Pediatric Care',
  },
]

export type WhyPillar = { title: string; body: string }

export const whyPillars: WhyPillar[] = [
  {
    title: 'Stress-Free by Design',
    body: 'The environment and patient experience are intentionally calming, from the garden to the chair.',
  },
  {
    title: 'Modern Dentistry',
    body: 'Contemporary dental equipment and up-to-date treatment approaches.',
  },
  {
    title: 'Personal Attention',
    body: 'Treatment is explained, and patients are treated with patience and empathy.',
  },
  {
    title: 'Proven Transformations',
    body: 'Real treatment cases and honest before & after evidence.',
  },
  {
    title: 'A Different Environment',
    body: 'Garden-integrated treatment spaces, unlike a conventional dental clinic.',
  },
  {
    title: 'Trusted by Patients',
    body: 'A strong Google reputation and recurring patient recommendations.',
  },
]
