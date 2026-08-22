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
            Docs Engineer
          </h3>
        </FadeIn>
        
        <div className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide mb-16 text-center w-full text-white/90">
          <AnimatedText 
            text="I translate complex backend architectures and scalable systems into precise, maintainable documentation. As a hybrid Software Developer and Technical Writer, I build Docs-as-Code pipelines, craft API references, and design system blueprints that developers actually want to read. I don't just write about code—I read it, refactor it, and structure it so your engineering team can scale faster and build better." 
          />
        </div>

        <FadeIn delay={0.2} yOffset={20}>
          <ContactButton />
        </FadeIn>
      </div>

    </section>
  );
}
