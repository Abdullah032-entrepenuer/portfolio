'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import LiveProjectButton from '@/components/ui/LiveProjectButton';

const projects = [
  {
    num: '01',
    category: 'Synapse',
    link: 'https://synapse-server-5bb8.onrender.com/',
    label: 'View Live App',
    description: 'A robust AI-driven platform showcasing high-performance processing and technical robustness.',
    images: [
      '/synapse-1.png',
      '/synapse-2.png',
      '/synapse-3.png',
    ]
  },
  {
    num: '02',
    category: 'Research: Zero-Latency Edge RAG',
    link: 'https://zenodo.org/records/21527199',
    label: 'Read Preprint',
    description: 'Breakthrough zero-latency, fully decentralized Edge RAG and spatial computing architecture. Eliminates cloud dependency using WebAssembly-backed quantization and WebGPU compute engines for 100k+ vector similarity searches directly in VRAM.',
    images: [
      '/coursecraft-1.jpeg', 
      '/coursecraft-2.jpeg',
    ]
  },
  {
    num: '03',
    category: 'Research: WebGL State Sync',
    link: 'https://zenodo.org/records/21526081',
    label: 'Read Preprint',
    description: 'Architectural Benchmarking of Asynchronous State Synchronization in WebGL Spatial Graphs Driven by Real-Time Generative AI Pipelines. Detailed documentation on sub-millisecond execution and rendering architectures.',
    images: [
      '/car-bidding-1.jpeg', 
      '/dairy-farm-1.png',
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
          Projects & Research
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
  const targetScale = 1 - ((totalCards - 1 - index) * 0.05);
  const rangeStart = index / totalCards;
  const rangeEnd = (index + 1) / totalCards;
  
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const topOffset = `calc(15vh + ${index * 40}px)`;

  // Drag to scroll logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.div 
      style={{ scale, top: topOffset }}
      className="sticky w-full h-auto min-h-[70vh] md:h-[80vh] md:min-h-0 bg-[#151515] rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl mb-24"
    >
      {/* Left Content / Header info */}
      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 bg-black/40 backdrop-blur-sm z-10">
        <div>
          <span className="text-5xl md:text-7xl font-bold text-white/10 block mb-4">{project.num}</span>
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-[#D7E2EA] mb-6">{project.category}</h3>
          {project.description && (
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mb-8">
              {project.description}
            </p>
          )}
        </div>
        <div>
          {project.link && <LiveProjectButton href={project.link} label={project.label} />}
        </div>
      </div>

      {/* Right Content / Images Layout (Horizontal Scroll) */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`w-full md:w-2/3 min-h-[40vh] md:min-h-0 h-full flex overflow-x-auto overflow-y-hidden gap-4 p-4 md:p-8 bg-black/20 snap-x snap-mandatory custom-scrollbar ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {project.images.map((img: string, idx: number) => (
          <div key={idx} className="relative w-[85%] sm:w-[60%] shrink-0 h-full rounded-xl md:rounded-2xl overflow-hidden snap-center pointer-events-none">
            <Image src={img} alt={`Project image ${idx + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
