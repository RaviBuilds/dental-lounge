import { SiteNav } from '@/components/site-nav'
import { HeroSection } from '@/components/hero-section'
import { StorySection } from '@/components/story-section'
import { ExperienceSection } from '@/components/experience-section'
import { SpaceSection } from '@/components/space-section'
import { DoctorsSection } from '@/components/doctors-section'
import { TreatmentsSection } from '@/components/treatments-section'
import { TransformationsSection } from '@/components/transformations-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <StorySection />
        <DoctorsSection />
        <SpaceSection />
        <TreatmentsSection />
        <TransformationsSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
