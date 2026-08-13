import HeroSection from '@/components/sections/HeroSection';
import MarqueeSection from '@/components/sections/MarqueeSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="bg-[#0C0C0C] min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
