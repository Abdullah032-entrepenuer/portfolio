'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const imagesRow1 = [
  '/coursecraft-1.jpeg',
  '/coursecraft-2.jpeg',
  '/synapse-1.png',
  '/synapse-2.png',
  '/dairy-farm-1.png',
];

const imagesRow2 = [
  '/dairy-farm-2.png',
  '/car-bidding-1.jpeg',
  '/car-bidding-2.jpeg',
  '/auto-care-1.jpeg',
  '/auto-care-2.jpeg',
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
        {[...imagesRow1, ...imagesRow1, ...imagesRow1].map((src, i) => (
          <div key={i} className="relative w-48 h-32 md:w-80 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden glass border-white/5">
            <Image src={src} alt="3D Render" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-6 w-max -ml-24">
        {[...imagesRow2, ...imagesRow2, ...imagesRow2].map((src, i) => (
          <div key={i} className="relative w-48 h-32 md:w-80 md:h-56 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl bg-white/5 border border-white/5">
            <Image src={src} alt="3D Render" fill className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </motion.div>

    </section>
  );
}
