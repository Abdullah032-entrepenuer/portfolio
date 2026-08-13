'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LiveProjectButton from '@/components/ui/LiveProjectButton';

const projects = [
  {
    num: '01',
    category: 'CourseCraft',
    images: [
      '/coursecraft-1.jpeg',
      '/coursecraft-2.jpeg',
      '/coursecraft-3.jpeg',
    ]
  },
  {
    num: '02',
    category: 'Synapse',
    link: 'https://synapse-server-5bb8.onrender.com/',
    images: [
      '/synapse-1.png',
      '/synapse-2.png',
      '/synapse-3.png',
    ]
  },
  {
    num: '03',
    category: 'Dairy Farm',
    images: [
      '/dairy-farm-1.png',
      '/dairy-farm-2.png',
      '/dairy-farm-3.png',
    ]
  },
  {
    num: '04',
    category: 'Car Bidding',
    images: [
      '/car-bidding-1.jpeg',
      '/car-bidding-2.jpeg',
      '/car-bidding-3.jpeg',
    ]
  },
  {
    num: '05',
    category: 'Auto Care',
    link: 'https://www.auto-care.me',
    images: [
      '/auto-care-1.jpeg',
      '/auto-care-2.jpeg',
      '/auto-care-3.jpeg',
    ]
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} id="projects" className="w-full bg-[#0C0C0C] rounded-t-[4rem] md:rounded-t-[6rem] -mt-20 relative z-30 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-24">
        <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-[#D7E2EA]">
          Project
        </h2>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16" style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, i) => (
          <ProjectCard 
            key={i} 
            project={project} 
            index={i} 
            totalCards={projects.length} 
            progress={scrollYProgress} 
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, totalCards, progress }: { project: any, index: number, totalCards: number, progress: any }) {
  // Sticky stacking logic
  // Card sticks to top. As you scroll past it, it scales down slightly.
  const targetScale = 1 - ((totalCards - 1 - index) * 0.05);
  const rangeStart = index / totalCards;
  const rangeEnd = (index + 1) / totalCards;
  
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  // Add a slight top offset for stacked effect
  const topOffset = `calc(15vh + ${index * 40}px)`;

  return (
    <motion.div 
      style={{ scale, top: topOffset }}
      className="sticky w-full h-[70vh] md:h-[80vh] bg-[#151515] rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl mb-24"
    >
      {/* Left Content / Header info */}
      <div className="w-full md:w-1/3 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
        <div>
          <span className="text-6xl md:text-8xl font-bold text-white/10 block mb-4">{project.num}</span>
          <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-[#D7E2EA] mb-8">{project.category}</h3>
        </div>
        <div>
          {project.link && <LiveProjectButton href={project.link} />}
        </div>
      </div>

      {/* Right Content / Images Layout (Horizontal Scroll) */}
      <div className="w-full md:w-2/3 h-full flex overflow-x-auto overflow-y-hidden gap-4 p-4 md:p-8 bg-black/20 snap-x snap-mandatory custom-scrollbar">
        {project.images.map((img: string, idx: number) => (
          <div key={idx} className="relative w-[85%] sm:w-[60%] shrink-0 h-full rounded-xl md:rounded-2xl overflow-hidden snap-center">
            <Image src={img} alt={`Project image ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
