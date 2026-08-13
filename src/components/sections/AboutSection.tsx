'use client';

import FadeIn from '@/components/ui/FadeIn';
import AnimatedText from '@/components/ui/AnimatedText';
import ContactButton from '@/components/ui/ContactButton';
import Image from 'next/image';

const cornerImages = [
  { src: 'https://images.unsplash.com/photo-1614729939124-03290b8ede94?q=80&w=400&auto=format&fit=crop', position: 'top-10 left-10 md:top-20 md:left-20' }, // Moon-ish
  { src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=400&auto=format&fit=crop', position: 'top-10 right-10 md:top-20 md:right-20' }, // 3D object
  { src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop', position: 'bottom-10 left-10 md:bottom-20 md:left-20' }, // Lego-ish
  { src: 'https://images.unsplash.com/photo-1633398814782-777e467d0263?q=80&w=400&auto=format&fit=crop', position: 'bottom-10 right-10 md:bottom-20 md:right-20' }, // 3D group
];

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8 bg-[#0C0C0C] overflow-hidden">
      
      {/* Corner Images */}
      {cornerImages.map((img, i) => (
        <div key={i} className={`absolute z-0 ${img.position} hidden md:block`}>
          <FadeIn delay={i * 0.2}>
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl opacity-60 hover:opacity-100 transition-opacity duration-500">
              <Image src={img.src} alt="Decorative 3D element" fill className="object-cover" />
            </div>
          </FadeIn>
        </div>
      ))}

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-4xl text-center">
        <FadeIn yOffset={30}>
          <h2 className="hero-heading text-5xl md:text-8xl font-bold uppercase mb-12 tracking-tighter">
            About Me
          </h2>
        </FadeIn>
        
        <div className="text-xl md:text-3xl lg:text-4xl font-medium leading-snug tracking-tight mb-16 text-left md:text-center w-full">
          <AnimatedText 
            text="I'm a self-taught multidisciplinary creator specializing in 3D design and motion graphics. My passion lies in crafting visually compelling and dynamic experiences that push the boundaries of digital art. With a keen eye for detail and a love for innovation, I bring ideas to life through a blend of technical skill and artistic vision." 
          />
        </div>

        <FadeIn delay={0.2} yOffset={20}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
}
