import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Vault from '@/components/sections/Vault';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Page() {
  return (
    <main>
      <Hero />
      <Services />
      <Vault />
      <About />
      <Contact />
    </main>
  );
}
