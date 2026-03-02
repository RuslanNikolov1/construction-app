import { BannerVideoScroll } from "@/features/banner-video/BannerVideoScroll";
import { IntroductionSection } from "@/features/introduction/IntroductionSection";
import { DesignSection } from "@/features/design-section/DesignSection";
import { ServicesSection } from "@/features/services-section/ServicesSection";

export default function Home() {
  return (
    <main>
      <BannerVideoScroll />
      <IntroductionSection />
      <DesignSection />
      <ServicesSection />
    </main>
  );
}
