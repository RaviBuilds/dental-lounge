import { SiteNav } from '@/components/site-nav'
import { HeroSection } from '@/components/hero-section'
import { StorySection } from '@/components/story-section'
import { ExperienceSection } from '@/components/experience-section'
import { SpaceSection } from '@/components/space-section'
import { DoctorsSection } from '@/components/doctors-section'
import { TreatmentsSection } from '@/components/treatments-section'
import { TransformationsSection } from '@/components/transformations-section'
import { ClinicalProofSection } from '@/components/clinical-proof-section'
import { ReviewsSection } from '@/components/reviews-section'
import { ClinicVideoSection } from '@/components/clinic-video-section'
import { WhySection } from '@/components/why-section'
import { ContactSection } from '@/components/contact-section'
import { FinalCtaSection } from '@/components/final-cta-section'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <StorySection />
        <ExperienceSection />
        <SpaceSection />
        <DoctorsSection />
        <TreatmentsSection />
        <TransformationsSection />
        <ClinicalProofSection />
        <ReviewsSection />
        <ClinicVideoSection />
        <WhySection />
        <ContactSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  )
}
