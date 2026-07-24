'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const ParticleMesh = dynamic(() => import('@/components/3d/ParticleMesh'), { ssr: false });

export default function EliteHero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-obsidian-900 text-white">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <ParticleMesh />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 mt-20 md:mt-0">
        <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-cyan"></span>
          </span>
          <span className="text-xs font-mono tracking-[0.2em] text-electric-cyan uppercase">Systems Online</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 leading-[1.05]">
          Engineering High-Performance <br className="hidden md:block" /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-cyan to-blue-500">Spatial Web</span> & Edge AI.
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-white/60 font-light mb-12 leading-relaxed tracking-wide">
          I architect zero-latency digital environments. From WebGPU computational pipelines to immersive React Three Fiber spatial interfaces, I build systems that scale at the edge.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="#systems" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:scale-[1.02] hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
            Explore Systems
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <a href="https://github.com/Abdullah032-entrepenuer" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-white/10 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/20 transition-all text-center">
            View GitHub
          </a>
        </div>
      </div>

      {/* Subtle bottom gradient for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-obsidian-900 to-transparent pointer-events-none z-10" />
    </section>
  );
}
