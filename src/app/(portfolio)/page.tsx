import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Vault from '@/components/sections/Vault';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import { getPortfolioData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function Page() {
  const data = getPortfolioData();

  return (
    <main>
      <Hero data={data.hero} />
      <Services data={data.services} />
      <Vault data={data.projects} />
      <About data={data.about} />
      <Contact data={data.contact} />
    </main>
  );
}
