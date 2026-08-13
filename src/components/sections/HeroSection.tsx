'use client';

import FadeIn from '@/components/ui/FadeIn';
import Magnet from '@/components/ui/Magnet';
import ContactButton from '@/components/ui/ContactButton';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Start completely on the right side (35vw) so the name is unobstructed, and move to center (-50%)
  const imageX = useTransform(scrollYProgress, [0, 1], ['35vw', '-50%']);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-between pt-32 pb-12 px-8 md:px-16 overflow-x-clip bg-[#0C0C0C]">
      
      {/* Top / Main Heading */}
      <div className="z-10 mt-10">
        <FadeIn yOffset={30}>
          <h1 className="hero-heading text-6xl md:text-8xl lg:text-[11rem] font-black leading-[0.9] tracking-tighter uppercase drop-shadow-2xl">
            Abdullah <br /> Awais
          </h1>
        </FadeIn>
        <FadeIn yOffset={30} delay={0.2}>
          <p className="text-[#D7E2EA] text-xl md:text-3xl font-light mt-4 tracking-wide uppercase">
            Software Developer <br /> & Architect
          </p>
        </FadeIn>
      </div>

      {/* Center Absolute Portrait */}
      <motion.div 
        style={{ x: imageX, y: '-50%' }}
        className="absolute top-1/2 left-1/2 z-20 pointer-events-auto origin-center"
      >
        <FadeIn delay={0.4} duration={1}>
          <Magnet strength={0.2}>
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src="/profile-nobg.png"
                alt="Abdullah Awais"
                fill
                className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
            </div>
          </Magnet>
        </FadeIn>
      </motion.div>

      {/* Bottom Row */}
      <div className="z-10 flex flex-col md:flex-row justify-between items-end gap-8 mt-auto">
        <FadeIn delay={0.6} yOffset={20} className="max-w-md">
          <p className="text-[#D7E2EA]/70 text-sm md:text-base leading-relaxed">
            I craft immersive, high-performance digital experiences blending 3D engineering with modern web architecture. Elevating ideas into interactive realities.
          </p>
        </FadeIn>
        <FadeIn delay={0.8} yOffset={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
