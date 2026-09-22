import { HeroSection } from "@/components/hero-section"
import { TrilogySection } from "@/components/trilogy-section"
import { UniqueSection } from "@/components/unique-section"
import { DetailsSection } from "@/components/details-section"
import { WatchSlider } from "@/components/watch-slider"
import { EarlyBirdSection } from "@/components/early-bird-section"
import { MovementSection } from "@/components/movement-section"
import { ProductHighlightsSection } from "@/components/product-highlights-section"
import { RetailerReviewSection } from "@/components/retailer-review-section"
import { VipClubSection } from "@/components/vip-club-section"
import { TeamSection } from "@/components/team-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { DesignDnaSection } from "@/components/design-dna-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <TrilogySection />
        <UniqueSection />
        <DetailsSection />
        <WatchSlider />
        <DesignDnaSection />
        <EarlyBirdSection />
        <MovementSection />
        <ProductHighlightsSection />
        <RetailerReviewSection />
        <VipClubSection />
        <TeamSection />
        <RoadmapSection />
        <FinalCtaSection />

        {/* Closing editorial image — full-bleed, before the footer */}
        <section
          aria-label="Monichs Delta — closing visual"
          className="relative w-full overflow-hidden bg-[#0a0f1c]"
        >
          <img
            src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/MNC_I25_Ed_Trio-1-scaled.png"
            alt="Monichs Delta — closing editorial"
            loading="lazy"
            decoding="async"
            className="block h-auto w-full object-cover"
          />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
