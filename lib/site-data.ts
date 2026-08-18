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
  id: string
  name: string
  categoryId: string
  description: string
  helpsWith: string[]
  tags: string[]
  image: string
  alt: string
}

export type TreatmentCategory = {
  id: string
  number: string
  name: string
  summary: string
  treatments: Treatment[]
}

const treatmentImage = {
  aligners: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CLEAR%20ALIGNERS-SnBLwvxB9KN3tsdF3DSYYyKfenWZ9O.webp',
  braces: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BRACES-mjYMs5OCfU8NfhRuNmZ4kWFcuQsCpq.webp',
  wisdom: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WISDOM%20TEETH-0FPftyK6K0M5FIc2GGnNeUsqcmqRGa.webp',
  rootCanal: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ROOT%20CANAL-9iJT17swesk2V0zx3oQopX2aKwz9Xv.webp',
  crowns: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DENTAL%20CROWNS-pmrXnYrIpGFfYhXBXPdIePK3Rsr9ZW.webp',
  paediatric: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PAEDIATRIC%20DENTISTRY-R3cjpOSz9mBTnrrKXW3IJ2lfyKwi1H.webp',
  fillings: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DENTAL%20FILLINGS-4NdCjr5DiO2Hga61FZVhwSxJpx5tFe.webp',
  implants: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DENTAL%20IMPLANTS-tgtNKbgKaASVye7QTiPyDRz70YNSew.webp',
  consultation: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DENTAL%20CONSULTATION-odyiJg30tukEg8uFA7WdrHIHEMKU9M.webp',
  preventive: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PREVENTIVE%20CARE-JomroPdxsYXPEW8vHkE10saCqHZae5.webp',
}

const makeTreatment = (id: string, name: string, categoryId: string, description: string, helpsWith: string[], tags: string[], image: string, alt: string): Treatment => ({ id, name, categoryId, description, helpsWith, tags, image, alt })

export const treatmentCategories: TreatmentCategory[] = [
  { id: 'alignment', number: '01', name: 'Smile & Alignment', summary: 'Care for straighter smiles, comfortable bites, and thoughtful orthodontic planning.', treatments: [
    makeTreatment('aligners', 'Invisalign / Clear Aligners', 'alignment', 'Clear aligners are removable trays designed to gradually guide teeth toward a more even, comfortable position.', ['Teeth alignment', 'Crowding', 'Spacing', 'Bite-related concerns'], ['Orthodontics', 'Clear aligners', 'Smile alignment'], treatmentImage.aligners, 'A smiling woman holding a clear dental aligner beside her teeth'),
    makeTreatment('braces', 'Braces', 'alignment', 'Braces use carefully planned pressure to guide teeth and support a more balanced bite over time.', ['Crowding', 'Spacing', 'Bite alignment'], ['Orthodontics', 'Braces', 'Alignment'], treatmentImage.braces, 'Close-up of teeth with traditional braces'),
    makeTreatment('damon-braces', 'Damon Braces', 'alignment', 'Damon braces are a bracket-based orthodontic option used to address alignment and bite concerns.', ['Teeth alignment', 'Crowding', 'Bite concerns'], ['Orthodontics', 'Damon system'], treatmentImage.braces, 'Close-up of teeth with orthodontic braces'),
    makeTreatment('orthodontic-treatment', 'Orthodontic Treatment', 'alignment', 'Orthodontic treatment brings assessment, planning, and different alignment approaches together around your goals.', ['Crooked teeth', 'Spacing', 'Crowding', 'Bite concerns'], ['Orthodontics', 'Treatment planning'], treatmentImage.aligners, 'Clear aligner held beside a smiling patient'),
  ]},
  { id: 'restorative', number: '02', name: 'Restorative Dentistry', summary: 'Treatment that helps restore everyday comfort, function, and the natural structure of teeth.', treatments: [
    makeTreatment('fillings', 'Dental Fillings', 'restorative', 'A filling restores a tooth affected by decay or minor damage, helping bring back its shape and everyday function.', ['Tooth decay', 'Cavities', 'Minor tooth damage'], ['Restorative care', 'Tooth repair'], treatmentImage.fillings, 'Dental instrument placing a filling in a tooth'),
    makeTreatment('crowns', 'Dental Crowns', 'restorative', 'A crown covers and supports a tooth that needs more protection than a filling can provide.', ['Damaged teeth', 'Worn teeth', 'Tooth structure'], ['Restorative care', 'Tooth protection'], treatmentImage.crowns, 'Dental crown being placed over a prepared tooth'),
    makeTreatment('root-canal', 'Root Canal Treatment', 'restorative', 'Root canal treatment addresses inflammation or infection inside a tooth while keeping the natural tooth in place where possible.', ['Tooth infection', 'Inflammation', 'Deep decay'], ['Endodontics', 'Tooth preservation'], treatmentImage.rootCanal, 'Cross-section illustration of root canal treatment'),
    makeTreatment('implants', 'Dental Implants', 'restorative', 'Dental implants are used to replace a missing tooth with a supported restoration, following an individual assessment.', ['Missing teeth', 'Chewing function', 'Tooth replacement'], ['Tooth replacement', 'Implant dentistry'], treatmentImage.implants, 'Cross-section illustration of a dental implant'),
  ]},
  { id: 'surgical', number: '03', name: 'Surgical Care', summary: 'Considered surgical care explained clearly before treatment begins.', treatments: [makeTreatment('wisdom-teeth', 'Wisdom Teeth Removal', 'surgical', 'Wisdom teeth removal may be recommended when a wisdom tooth is causing discomfort, crowding, or difficulty cleaning.', ['Wisdom tooth discomfort', 'Crowding', 'Hard-to-clean areas'], ['Oral surgery', 'Wisdom teeth'], treatmentImage.wisdom, 'Illustration of an impacted wisdom tooth')]},
  { id: 'family', number: '04', name: 'Family & Pediatric', summary: 'Reassuring dental care for children and families, shaped around comfort and confidence.', treatments: [makeTreatment('paediatric', 'Paediatric Dentistry', 'family', 'Paediatric dentistry supports children with age-appropriate dental care, guidance, and a calm introduction to the clinic.', ['Growing teeth', 'Oral hygiene', 'Early concerns'], ['Children', 'Family care'], treatmentImage.paediatric, 'Dentist speaking with a child in a dental chair')]},
  { id: 'general', number: '05', name: 'General Dental Care', summary: 'Everyday dental care that helps you understand and look after your oral health.', treatments: [
    makeTreatment('consultations', 'Dental Consultations', 'general', 'A consultation creates space to understand your concerns, discuss options, and plan appropriate next steps.', ['New concerns', 'Treatment planning', 'Second opinions'], ['Consultation', 'Care planning'], treatmentImage.consultation, 'Dentist speaking with a patient during a consultation'),
    makeTreatment('preventive', 'Preventive Care', 'general', 'Preventive care focuses on regular review and practical guidance to help you maintain your oral health.', ['Regular reviews', 'Oral hygiene', 'Early concerns'], ['Prevention', 'Oral health'], treatmentImage.preventive, 'Dentist examining a patient during a check-up'),
    makeTreatment('routine', 'Routine Treatment', 'general', 'Routine treatment covers everyday dental needs identified during an assessment and discussed with you clearly.', ['Everyday dental needs', 'Oral health', 'Ongoing care'], ['General care', 'Dental health'], treatmentImage.preventive, 'Dentist examining a patient during a check-up'),
  ]},
]

export const treatments = treatmentCategories

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
