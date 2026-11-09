import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AboutSection from '@/components/sections/AboutSection';
import SystemsShowcase from '@/components/sections/SystemsShowcase';
import ContactSection from '@/components/sections/ContactSection';
import portfolioData from '@/data/portfolio.json';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="bg-[#050507] min-h-screen text-[#F3F4F6]">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SystemsShowcase />
      <ContactSection data={portfolioData.contact} />
    </main>
  );
}
