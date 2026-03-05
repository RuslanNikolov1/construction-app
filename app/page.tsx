import { BannerVideoScroll } from "@/features/banner-video/BannerVideoScroll";
import { IntroductionSection } from "@/features/introduction/IntroductionSection";
import { DesignSection } from "@/features/design-section/DesignSection";
import { ServicesSection } from "@/features/services-section/ServicesSection";
import { ConstructionSection } from "@/features/construction-section/ConstructionSection";
import { ScrollSnapController } from "@/features/scroll-snap/ScrollSnapController";

export default function Home() {
  return (
    <main>
      <ScrollSnapController />
      <BannerVideoScroll />
      <IntroductionSection />
      <DesignSection />
      <ServicesSection />
      <ConstructionSection />
    </main>
  );
}
