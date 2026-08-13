'use client';

import FadeIn from '@/components/ui/FadeIn';
import AnimatedText from '@/components/ui/AnimatedText';
import ContactButton from '@/components/ui/ContactButton';
import Image from 'next/image';


export default function AboutSection() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8 bg-[#0C0C0C] overflow-hidden">
      
      {/* Background glow for depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center max-w-5xl text-center">
        <FadeIn yOffset={30}>
          <h2 className="text-[#D7E2EA] text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-4 opacity-70">
            About Me
          </h2>
          <h3 className="hero-heading text-4xl md:text-6xl font-black uppercase mb-16 tracking-tighter">
            Digital Architect
          </h3>
        </FadeIn>
        
        <div className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide mb-16 text-center w-full text-white/90">
          <AnimatedText 
            text="I architect high-performance digital environments. From server-side logic to immersive WebGL interfaces, I bridge the gap between abstract code and tactile user experiences. With deep expertise in React, Next.js, and Three.js, I engineer interactive data visualizations and digital luxury experiences that captivate and convert. Every system I design is built to scale. Every interface I craft is engineered for performance. This is the intersection of logic and aesthetic." 
          />
        </div>

        <FadeIn delay={0.2} yOffset={20}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
}
