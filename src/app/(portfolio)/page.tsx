import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VaultSection from '@/components/sections/VaultSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { getPortfolioData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Page() {
  const data = getPortfolioData();

  return (
    <main>
      <HeroSection data={data.hero} />
      <ServicesSection data={data.services} />
      <VaultSection data={data.projects} />
      <AboutSection data={data.about} />
      <ContactSection data={data.contact} />
    </main>
  );
}
