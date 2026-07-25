'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ServiceItem } from '@/lib/db';
import SpotlightCard from '@/components/ui/SpotlightCard';
import BorderBeam from '@/components/ui/BorderBeam';

const CapabilityMatrix3D = dynamic(() => import('@/components/3d/CapabilityMatrix3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

function ServicePanel({ service, index }: { service: ServiceItem; index: number }) {
  const panelRef = useRef<HTMLDivElement>(null);

  let gradientClass = "from-blue-500/20 to-transparent";
  let textClass = "text-blue-400 group-hover:text-blue-300";
  let borderHover = "hover:border-blue-500/30";
  let isFeatured = index === 0 || index === 1;
  
  if (service.accent === 'neon') {
    gradientClass = "from-electric-cyan/20 to-transparent";
    textClass = "text-electric-cyan group-hover:text-cyan-300";
    borderHover = "hover:border-electric-cyan/30";
  } else if (service.accent === 'violet') {
    gradientClass = "from-purple-500/20 to-transparent";
    textClass = "text-purple-400 group-hover:text-purple-300";
    borderHover = "hover:border-purple-500/30";
  } else if (service.accent === 'cyan') {
    gradientClass = "from-electric-cyan/20 to-transparent";
    textClass = "text-cyan-400 group-hover:text-cyan-300";
    borderHover = "hover:border-cyan-500/30";
  }

  useEffect(() => {
    if (!panelRef.current) return;
    const ctx = gsap.context(() => {
      // 3D Perspective Entrance Animation on Scroll
      gsap.fromTo(panelRef.current,
        { opacity: 0, y: 80, rotationX: 18, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={panelRef} style={{ opacity: 0 }}>
      <SpotlightCard
        className={`p-8 flex flex-col justify-between min-h-[380px] ${borderHover} group`}
        spotlightColor={
          service.accent === 'neon'
            ? 'rgba(0, 240, 255, 0.15)'
            : service.accent === 'violet'
            ? 'rgba(139, 92, 246, 0.15)'
            : 'rgba(6, 182, 212, 0.15)'
        }
      >
        {/* Rotating Border Beam for Featured Capabilities */}
        {isFeatured && (
          <BorderBeam
            size={280}
            duration={8}
            colorFrom={service.accent === 'neon' ? '#00F0FF' : '#8B5CF6'}
            colorTo={service.accent === 'neon' ? '#FFD700' : '#00F0FF'}
          />
        )}

        {/* Ambient Glow */}
        <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${gradientClass} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`} />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl ${textClass} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              {service.icon}
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 tracking-wider uppercase">
              {service.stat}
            </div>
          </div>
          
          <span className={`text-[11px] font-mono tracking-widest uppercase mb-2 block ${textClass} opacity-80`}>
            {service.label}
          </span>
          
          <h3 className="text-2xl font-bold tracking-tight text-white mb-4 group-hover:text-electric-cyan transition-colors duration-300">
            {service.title}
          </h3>
          
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            {service.desc}
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded md:rounded-md bg-obsidian-900/80 border border-white/5 text-[11px] font-mono text-white/50 uppercase tracking-wide group-hover:border-electric-cyan/30 group-hover:text-electric-cyan transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function ServicesSection({ data }: { data: ServiceItem[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesList = data || [];

  useEffect(() => {
    if (!headerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current!.children,
        { opacity: 0, y: 40, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header with 3D Quantum Matrix */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-20">
          <div ref={headerRef} className="lg:col-span-8">
            <span className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-4 block" style={{ opacity: 0 }}>
              Full Stack Software Engineer
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ opacity: 0 }}>
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-blue-400 to-electric-gold">Capabilities</span>.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl" style={{ opacity: 0 }}>
              Not just code — complete, scalable business solutions engineered to perform at the highest level of modern web standards.
            </p>
          </div>

          {/* Embedded 3D Physical Quantum Cube */}
          <div className="lg:col-span-4 hidden lg:block h-56">
            <CapabilityMatrix3D />
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {servicesList.map((service, i) => (
            <ServicePanel key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
