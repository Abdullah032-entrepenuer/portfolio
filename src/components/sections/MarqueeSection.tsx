'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const imagesRow1 = [
  '/synapse-1.png',
  '/auto-care-1.jpeg',
  '/dhaba3d.png',
  '/synapse-2.png',
  '/auto-care-2.jpeg',
];

const imagesRow2 = [
  '/synapse-3.png',
  '/auto-care-3.jpeg',
  '/car-bidding-1.jpeg',
  '/coursecraft-1.jpeg',
  '/dairy-farm-2.png',
];

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-35%', '0%']);

  return (
    <section
      ref={containerRef}
      aria-hidden="true"
      className="py-16 bg-[#050507] border-y border-white/[0.06] overflow-hidden flex flex-col gap-5 select-none"
    >
      {/* Row 1 */}
      <motion.div style={{ x: x1 }} className="flex gap-5 w-max">
        {[...imagesRow1, ...imagesRow1].map((src, i) => (
          <div
            key={i}
            className="relative w-56 h-36 md:w-80 md:h-48 aspect-[16/10] flex-shrink-0 rounded-2xl overflow-hidden bg-[#0B0C10] border border-white/[0.07]"
          >
            <Image
              src={src}
              alt=""
              role="presentation"
              fill
              sizes="(max-width: 768px) 224px, 320px"
              className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>

      {/* Row 2 */}
      <motion.div style={{ x: x2 }} className="flex gap-5 w-max -ml-24">
        {[...imagesRow2, ...imagesRow2].map((src, i) => (
          <div
            key={i}
            className="relative w-56 h-36 md:w-80 md:h-48 aspect-[16/10] flex-shrink-0 rounded-2xl overflow-hidden bg-[#0B0C10] border border-white/[0.07]"
          >
            <Image
              src={src}
              alt=""
              role="presentation"
              fill
              sizes="(max-width: 768px) 224px, 320px"
              className="object-cover opacity-75 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
