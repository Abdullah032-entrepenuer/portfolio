'use client';

import { useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import BorderBeam from '@/components/ui/BorderBeam';
import ArchitectureDrawer, { ArchitectureItem } from '@/components/ui/ArchitectureDrawer';

type Category = 'all' | 'research' | 'ai' | 'products';

const architectureDetails: Record<string, ArchitectureItem> = {
  'edge-rag': {
    id: 'edge-rag',
    title: 'Zero-Latency Edge RAG Engine',
    subtitle: 'Local-first retrieval-augmented generation running entirely on-device via WebGPU',
    link: 'https://doi.org/10.5281/zenodo.21526081',
    specifications: [
      { label: 'Vector Index Size', value: '100,000 Embeddings' },
      { label: 'Time To First Token', value: '0 ms (Local WGSL)' },
      { label: 'Compute Backend', value: 'WebGPU (F16 Matrix Multiply)' },
      { label: 'Publication ID', value: 'DOI: 10.5281/zenodo.21526081' },
    ],
    codeSnippet: `// WebGPU WGSL Cosine Similarity Kernel (On-Device Vector Search)
@group(0) @binding(0) var<storage, read> queryVector: array<f32>;
@group(0) @binding(1) var<storage, read> dbVectors: array<f32>;
@group(0) @binding(2) var<storage, read_write> scores: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  var dotProduct: f32 = 0.0;
  var queryNorm: f32 = 0.0;
  var vectorNorm: f32 = 0.0;

  for (var i: u32 = 0u; i < 384u; i = i + 1u) {
    let q = queryVector[i];
    let v = dbVectors[index * 384u + i];
    dotProduct += q * v;
    queryNorm += q * q;
    vectorNorm += v * v;
  }
  scores[index] = dotProduct / (sqrt(queryNorm) * sqrt(vectorNorm));
}`,
  },
  'spatial-vis': {
    id: 'spatial-vis',
    title: 'OffscreenCanvas Spatial Visualizer',
    subtitle: 'Multi-threaded 3D rendering architecture bypassing main UI thread',
    link: 'https://zenodo.org/records/21527199',
    specifications: [
      { label: 'Frame Target', value: '60 FPS Locked' },
      { label: 'Frame Variance', value: '0.04 ms²' },
      { label: 'Thread Sync', value: 'SharedArrayBuffer + Atomics' },
      { label: 'Zenodo Record', value: 'ID: 21527199' },
    ],
    codeSnippet: `// Web Worker Thread - OffscreenCanvas Rendering Loop
import * as THREE from 'three';

self.onmessage = (evt) => {
  if (evt.data.type === 'init') {
    const canvas = evt.data.canvas;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.width / canvas.height, 0.1, 1000);
    
    function render(time) {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
};`,
  },
  'synapse-ai': {
    id: 'synapse-ai',
    title: 'Synapse AI Knowledge Mapping Platform',
    subtitle: '3D spatial graph generation & dynamic 2D flowchart engine',
    link: 'https://synapse-server-5bb8.onrender.com/',
    specifications: [
      { label: 'Frontend Engine', value: 'React Three Fiber / R3F' },
      { label: 'Graph Layout', value: '3D Force-Directed Graph' },
      { label: 'State Sync', value: 'Zustand + WebSockets' },
      { label: 'Deployment', value: 'Render Production Node' },
    ],
    codeSnippet: `// Synapse 3D Force-Directed Node Connection Compute
export function updateGraphPhysics(nodes: Node[], links: Link[]) {
  links.forEach(link => {
    const source = nodes[link.source];
    const target = nodes[link.target];
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dz = target.z - source.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    const force = (dist - link.distance) * 0.05;
    
    source.vx += (dx / dist) * force;
    target.vx -= (dx / dist) * force;
  });
}`,
  },
  'auto-care': {
    id: 'auto-care',
    title: 'Auto Care Production E-Commerce',
    subtitle: 'High-throughput auto parts store with oil recommendation engine',
    link: 'https://www.auto-care.me',
    specifications: [
      { label: 'Framework', value: 'React + Node.js' },
      { label: 'Ordering', value: 'Instant WhatsApp Direct Link' },
      { label: 'Recommendation', value: 'Vehicle Oil-Grade Engine' },
      { label: 'Status', value: 'Live Production' },
    ],
    codeSnippet: `// Smart Vehicle Oil-Grade Matching Algorithm
export function recommendOilGrade(make: string, model: string, year: number, mileage: number) {
  const baseSpec = vehicleDatabase[make]?.[model]?.[year];
  if (mileage > 150000) {
    return { grade: '10W-40 High Mileage', synth: 'Full Synthetic' };
  }
  return { grade: baseSpec?.recommendedOil || '5W-30', synth: 'Synthetic Blend' };
}`,
  },
};

export default function SystemsShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<ArchitectureItem | null>(null);

  const systems = [
    {
      id: 'edge-rag',
      category: 'research' as Category,
      categoryLabel: 'Research Publication',
      title: 'Zero-Latency Edge RAG Engine',
      description: 'Local-first retrieval-augmented generation running entirely on-device via WebGPU. Published paper on bypassing cloud round-trips for instant local intelligence.',
      metrics: ['0 ms TBT', '100k Vectors', 'WGSL', 'WebGPU'],
      gradient: 'from-electric-cyan/20 to-transparent',
      link: 'https://doi.org/10.5281/zenodo.21526081',
      actionText: 'View DOI Publication',
      doiBadge: 'DOI: 10.5281/zenodo.21526081',
      featured: true,
    },
    {
      id: 'spatial-vis',
      category: 'research' as Category,
      categoryLabel: 'Research Publication',
      title: 'OffscreenCanvas Spatial Visualizer',
      description: 'Multi-threaded 3D rendering architecture bypassing the main thread for locked 60 FPS under heavy composite spatial loads.',
      metrics: ['60 FPS Locked', '0.04 ms² Var', 'Workers'],
      gradient: 'from-electric-gold/20 to-transparent',
      link: 'https://zenodo.org/records/21527199',
      actionText: 'View DOI Record',
      doiBadge: 'Zenodo ID: 21527199',
      featured: false,
    },
    {
      id: 'synapse-ai',
      category: 'ai' as Category,
      categoryLabel: 'AI Knowledge Graph',
      title: 'Synapse AI',
      description: 'Interactive AI-powered 3D knowledge mapping platform. Generates interconnected concept graphs explored in custom 3D web-space or 2D flowcharts.',
      metrics: ['React Three Fiber', 'Knowledge Graph', 'AI Core'],
      gradient: 'from-blue-500/20 to-transparent',
      link: 'https://synapse-server-5bb8.onrender.com/',
      actionText: 'Launch Live Synapse Platform',
      featured: true,
    },
    {
      id: 'auto-care',
      category: 'products' as Category,
      categoryLabel: 'Production E-Commerce',
      title: 'Auto Care Platform',
      description: 'Live e-commerce platform for auto parts vendors featuring smart oil-grade recommendations, category browsing, and WhatsApp ordering.',
      metrics: ['E-Commerce', 'React', 'Logistics'],
      gradient: 'from-green-500/20 to-transparent',
      link: 'https://www.auto-care.me',
      actionText: 'Visit Live Auto Care Store',
      featured: false,
    },
  ];

  const filteredSystems = activeCategory === 'all'
    ? systems
    : systems.filter((sys) => sys.category === activeCategory);

  return (
    <>
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

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-obsidian-800/80 border border-white/10 backdrop-blur-md">
              {[
                { id: 'all', label: 'All Systems' },
                { id: 'research', label: 'Research & Papers' },
                { id: 'ai', label: 'AI & Spatial' },
                { id: 'products', label: 'Live Products' },
              ].map((tab) => (
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

          {/* Dynamic Spotlight Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredSystems.map((sys) => (
              <SpotlightCard
                key={sys.id}
                className="p-8 md:p-10 flex flex-col justify-between min-h-[400px]"
                spotlightColor={
                  sys.category === 'research'
                    ? 'rgba(0, 240, 255, 0.15)'
                    : sys.category === 'ai'
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(255, 215, 0, 0.15)'
                }
              >
                {/* Border Beam for Featured items */}
                {sys.featured && (
                  <BorderBeam
                    size={300}
                    duration={8}
                    colorFrom={sys.category === 'research' ? '#00F0FF' : '#3B82F6'}
                    colorTo={sys.category === 'research' ? '#FFD700' : '#00F0FF'}
                  />
                )}

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
                    {sys.metrics.map((metric) => (
                      <span key={metric} className="px-3 py-1 rounded-md bg-obsidian-900 border border-white/10 text-[11px] font-mono text-white/70 uppercase tracking-wide">
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedDrawerItem(architectureDetails[sys.id])}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white transition-all flex items-center gap-2"
                    >
                      ⚡ Inspect Code & Specs
                    </button>
                    <a
                      href={sys.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-electric-cyan/10 hover:bg-electric-cyan/20 border border-electric-cyan/20 text-xs font-mono text-electric-cyan transition-all flex items-center gap-2"
                    >
                      {sys.actionText} ↗
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* Code Inspector Drawer */}
      <ArchitectureDrawer
        item={selectedDrawerItem}
        onClose={() => setSelectedDrawerItem(null)}
      />
    </>
  );
}
