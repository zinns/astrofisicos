import { CalendarPreviewSection } from "@/components/sections/calendar-preview-section";
import { FeaturedContentSection } from "@/components/sections/featured-content-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamPreviewSection } from "@/components/sections/team-preview-section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { AudienceSection } from "@/components/sections/audience-section";
import { CosmicBackground } from "@/components/motion/cosmic-background";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <CosmicBackground />
      <div className="relative z-10">
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <FeaturedContentSection />
        <CalendarPreviewSection />
        <AudienceSection />
        <TeamPreviewSection />
        <FinalCtaSection />
      </div>
    </div>
  );
}

