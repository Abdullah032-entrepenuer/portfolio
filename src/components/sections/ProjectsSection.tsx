'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import LiveProjectButton from '@/components/ui/LiveProjectButton';

const projects = [
  {
    num: '01',
    category: 'Nextlevel Studio',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    num: '02',
    category: 'Creative Labs',
    images: [
      'https://images.unsplash.com/photo-1581822261290-991b38693d1b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    num: '03',
    category: 'Motion Dynamics',
    images: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
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
          <LiveProjectButton />
        </div>
      </div>

      {/* Right Content / Images Layout (2 left, 1 right) */}
      <div className="w-full md:w-2/3 h-full flex flex-col sm:flex-row gap-4 p-4 md:p-8 bg-black/20">
        <div className="w-full sm:w-1/2 flex flex-col gap-4 h-full">
          <div className="relative w-full h-1/2 rounded-xl md:rounded-2xl overflow-hidden">
            <Image src={project.images[0]} alt="Project thumbnail" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative w-full h-1/2 rounded-xl md:rounded-2xl overflow-hidden">
            <Image src={project.images[1]} alt="Project thumbnail" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full">
          <div className="relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden">
            <Image src={project.images[2]} alt="Project main" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
