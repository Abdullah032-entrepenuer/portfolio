'use client';

import { useState } from 'react';

type Category = 'all' | 'research' | 'ai' | 'products';

interface SystemItem {
  id: string;
  category: Category;
  categoryLabel: string;
  title: string;
  description: string;
  metrics: string[];
  gradient: string;
  link: string;
  actionText: string;
  doiBadge?: string;
}

export default function SystemsShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const systems: SystemItem[] = [
    {
      id: 'edge-rag',
      category: 'research',
      categoryLabel: 'Research Publication',
      title: 'Zero-Latency Edge RAG Engine',
      description: 'Local-first retrieval-augmented generation running entirely on-device via WebGPU. Published paper on bypassing cloud round-trips for instant local intelligence.',
      metrics: ['0 ms TBT', '100k Vectors', 'WGSL', 'WebGPU'],
      gradient: 'from-electric-cyan/20 to-transparent',
      link: 'https://doi.org/10.5281/zenodo.21526081',
      actionText: 'View DOI Publication',
      doiBadge: 'DOI: 10.5281/zenodo.21526081'
    },
    {
      id: 'spatial-vis',
      category: 'research',
      categoryLabel: 'Research Publication',
      title: 'OffscreenCanvas Spatial Visualizer',
      description: 'Multi-threaded 3D rendering architecture bypassing the main thread for locked 60 FPS under heavy composite spatial loads.',
      metrics: ['60 FPS Locked', '0.04 ms² Var', 'Workers'],
      gradient: 'from-electric-gold/20 to-transparent',
      link: 'https://zenodo.org/records/21527199',
      actionText: 'View DOI Record',
      doiBadge: 'Zenodo ID: 21527199'
    },
    {
      id: 'synapse-ai',
      category: 'ai',
      categoryLabel: 'AI Knowledge Graph',
      title: 'Synapse AI',
      description: 'Interactive AI-powered 3D knowledge mapping platform. Generates interconnected concept graphs explored in custom 3D web-space or 2D flowcharts.',
      metrics: ['React Three Fiber', 'Knowledge Graph', 'AI Core'],
      gradient: 'from-blue-500/20 to-transparent',
      link: 'https://synapse-server-5bb8.onrender.com/',
      actionText: 'Launch Live Synapse Platform'
    },
    {
      id: 'auto-care',
      category: 'products',
      categoryLabel: 'Production E-Commerce',
      title: 'Auto Care Platform',
      description: 'Live e-commerce platform for auto parts vendors featuring smart oil-grade recommendations, category browsing, and WhatsApp ordering.',
      metrics: ['E-Commerce', 'React', 'Logistics'],
      gradient: 'from-green-500/20 to-transparent',
      link: 'https://www.auto-care.me',
      actionText: 'Visit Live Auto Care Store'
    }
  ];

  const filteredSystems = activeCategory === 'all' 
    ? systems 
    : systems.filter(sys => sys.category === activeCategory);

  return (
    <section id="systems" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-3 block">
              Architectures & Research
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              The Systems Showcase.
            </h2>
          </div>

          {/* Interactive Unique Filter Bar */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-obsidian-800/80 border border-white/10 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'research', label: 'Research & Papers' },
              { id: 'ai', label: 'AI & Spatial' },
              { id: 'products', label: 'Live Products' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as Category)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'bg-electric-cyan text-obsidian-900 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Unique Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredSystems.map((sys) => (
            <div 
              key={sys.id} 
              className="relative group rounded-3xl border border-white/10 bg-obsidian-800/40 backdrop-blur-xl overflow-hidden hover:border-white/25 transition-all duration-500 p-8 md:p-10 flex flex-col justify-between min-h-[380px]"
            >
              {/* Subtle hover gradient */}
              <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br ${sys.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-electric-cyan tracking-wider uppercase">
                    {sys.categoryLabel}
                  </span>
                  {sys.doiBadge && (
                    <span className="px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-[10px] font-mono text-electric-cyan">
                      {sys.doiBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-electric-cyan transition-colors duration-300">
                  {sys.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-8 font-light text-sm md:text-base">
                  {sys.description}
                </p>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {sys.metrics.map(metric => (
                    <span key={metric} className="px-3 py-1 rounded-md bg-obsidian-900 border border-white/10 text-[11px] font-mono text-white/70 uppercase tracking-wide">
                      {metric}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={sys.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-xl transition-all group/link"
                >
                  {sys.actionText}
                  <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
