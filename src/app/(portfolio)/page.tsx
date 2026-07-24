import EliteHero from '@/components/sections/EliteHero';
import SystemsShowcase from '@/components/sections/SystemsShowcase';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { getPortfolioData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Page() {
  const data = getPortfolioData();

  return (
    <main>
      <EliteHero />
      <SystemsShowcase />
      <ServicesSection data={data.services} />
      <AboutSection data={data.about} />
      <ContactSection data={data.contact} />
    </main>
  );
}
