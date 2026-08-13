'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const row1Images = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633398814782-777e467d0263?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop',
];

const row2Images = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1629252328221-c454e60fc900?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1633398815121-65f242055651?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614729939124-03290b8ede94?q=80&w=600&auto=format&fit=crop',
];

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '0%']);

  return (
    <section ref={containerRef} className="py-24 bg-[#0C0C0C] overflow-hidden flex flex-col gap-6">
      
      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-6 w-max">
        {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
          <div key={i} className="relative w-48 h-32 md:w-80 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/5">
            <Image src={src} alt="3D Render" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-6 w-max">
        {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
          <div key={i} className="relative w-48 h-32 md:w-80 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/5">
            <Image src={src} alt="3D Render" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>

    </section>
  );
}
