'use client';

import { useState } from 'react';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';
import BorderBeam from '@/components/ui/BorderBeam';
import ArchitectureDrawer, { ArchitectureItem } from '@/components/ui/ArchitectureDrawer';
import { playHoverSound, playClickSound } from '@/lib/soundEffects';

type Category = 'all' | 'research' | 'ai' | 'products';

interface ShowcaseProject {
  id: string;
  category: Category;
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  metrics: string[];
  gradient: string;
  link: string | null;
  actionText: string;
  doiBadge?: string;
  featured?: boolean;
}

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
  'synapse': {
    id: 'synapse',
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
  'coursecraft': {
    id: 'coursecraft',
    title: 'CourseCraft E-Learning Platform',
    subtitle: 'Full-Stack EdTech with automated certificate generation',
    link: '#',
    specifications: [
      { label: 'Payment Gateway', value: 'Stripe API' },
      { label: 'Certificates', value: 'Automated PDF Generation' },
      { label: 'Backend Stack', value: 'PHP / Node.js / MySQL' },
      { label: 'Security', value: 'JWT + Role-Based ACL' },
    ],
    codeSnippet: `// CourseCraft Automated Certificate Generation System
export async function generateCompletionCertificate(userId: string, courseId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  const course = await db.course.findUnique({ where: { id: courseId } });
  
  const certId = \`CERT-\${Date.now()}-\${Math.random().toString(36).substring(7).toUpperCase()}\`;
  const pdfBuffer = await renderCertificatePDF({ name: user.name, course: course.title, id: certId });
  
  return { certId, downloadUrl: await uploadToStorage(pdfBuffer) };
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
  'dairy-farm': {
    id: 'dairy-farm',
    title: 'Dairy Farm Management Dashboard',
    subtitle: 'AgriTech livestock tracking, milk production analytics & revenue system',
    link: '#',
    specifications: [
      { label: 'Real-Time Charts', value: 'Recharts / Chart.js' },
      { label: 'Livestock DB', value: 'MongoDB Aggregations' },
      { label: 'Analytics', value: 'Daily Production & Yields' },
      { label: 'Access Control', value: 'Role-Based Manager Auth' },
    ],
    codeSnippet: `// Livestock Milk Production Aggregation Pipeline
export async function getDailyProductionSummary(farmId: string, startDate: Date, endDate: Date) {
  return await MilkRecord.aggregate([
    { $match: { farmId, date: { $gte: startDate, $lte: endDate } } },
    { $group: { _id: "$date", totalLiters: { $sum: "$amount" }, avgQuality: { $avg: "$fatPercentage" } } },
    { $sort: { _id: 1 } }
  ]);
}`,
  },
  'car-bidding': {
    id: 'car-bidding',
    title: 'Car Bidding Auction Marketplace',
    subtitle: 'Real-time vehicle auctions with live WebSocket bids',
    link: '#',
    specifications: [
      { label: 'Real-Time Sync', value: 'WebSockets / Socket.io' },
      { label: 'Auction Engine', value: 'High-Concurrency Lock DB' },
      { label: 'UI Framework', value: 'Next.js 14 + Tailwind' },
      { label: 'Verification', value: 'Vehicle Ownership Proof' },
    ],
    codeSnippet: `// Real-Time High-Concurrency Bid Event Dispatcher
socket.on('submit_bid', async ({ auctionId, userId, amount }) => {
  const currentHighest = await getHighestBid(auctionId);
  if (amount <= currentHighest.amount) {
    return socket.emit('bid_rejected', { reason: 'Bid must be higher than current peak' });
  }
  const newBid = await recordBid({ auctionId, userId, amount });
  io.to(auctionId).emit('bid_updated', newBid);
});`,
  },
};

export default function SystemsShowcase() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedDrawerItem, setSelectedDrawerItem] = useState<ArchitectureItem | null>(null);

  const projects: ShowcaseProject[] = [
    {
      id: 'edge-rag',
      category: 'research',
      categoryLabel: 'Research Publication',
      title: 'Zero-Latency Edge RAG Engine',
      tagline: 'On-Device WebGPU Vector Search',
      description: 'Local-first retrieval-augmented generation running entirely on-device via WebGPU. Bypasses cloud round-trips for instant local vector search.',
      metrics: ['0 ms TBT', '100k Vectors', 'WGSL', 'WebGPU'],
      gradient: 'from-electric-cyan/20 to-transparent',
      link: 'https://doi.org/10.5281/zenodo.21526081',
      actionText: 'View DOI Publication',
      doiBadge: 'DOI: 10.5281/zenodo.21526081',
      featured: true,
    },
    {
      id: 'spatial-vis',
      category: 'research',
      categoryLabel: 'Research Publication',
      title: 'OffscreenCanvas Spatial Visualizer',
      tagline: 'Multi-Threaded 3D WebGL Pipeline',
      description: 'Multi-threaded 3D rendering architecture bypassing the main thread for locked 60 FPS under heavy composite spatial loads.',
      metrics: ['60 FPS Locked', '0.04 ms² Var', 'Workers'],
      gradient: 'from-electric-gold/20 to-transparent',
      link: 'https://zenodo.org/records/21527199',
      actionText: 'View DOI Record',
      doiBadge: 'Zenodo ID: 21527199',
      featured: false,
    },
    {
      id: 'synapse',
      category: 'ai',
      categoryLabel: 'AI & 3D WebGL',
      title: 'Synapse AI',
      tagline: 'Think in Three Dimensions.',
      description: 'Interactive AI-powered 3D knowledge mapping and concept graph visualization platform explored in custom 3D web-space or 2D flowcharts.',
      image: '/synapse-1.png',
      metrics: ['React Three Fiber', 'Knowledge Graph', 'AI Core'],
      gradient: 'from-blue-500/20 to-transparent',
      link: 'https://synapse-server-5bb8.onrender.com/',
      actionText: 'Launch Live Synapse Platform',
      featured: true,
    },
    {
      id: 'coursecraft',
      category: 'products',
      categoryLabel: 'EdTech & E-Learning',
      title: 'CourseCraft',
      tagline: 'Learn job-ready skills. Earn real certificates.',
      description: 'Full-stack e-learning platform featuring user auth, instructor admin dashboard, Stripe payments, and automated certificate generation.',
      image: '/coursecraft-1.jpeg',
      metrics: ['PHP', 'MySQL', 'Stripe', 'Certificates'],
      gradient: 'from-orange-500/20 to-transparent',
      link: null,
      actionText: 'View Architecture Specs',
      featured: false,
    },
    {
      id: 'auto-care',
      category: 'products',
      categoryLabel: 'E-Commerce & Logistics',
      title: 'Auto Care Platform',
      tagline: 'Your one-stop shop for quality auto parts.',
      description: 'Live e-commerce platform connecting users to auto parts vendors with smart oil-grade recommendations and WhatsApp checkout.',
      image: '/auto-care-1.jpeg',
      metrics: ['React', 'E-Commerce', 'Logistics', 'WhatsApp'],
      gradient: 'from-green-500/20 to-transparent',
      link: 'https://www.auto-care.me',
      actionText: 'Visit Live Auto Care Store',
      featured: true,
    },
    {
      id: 'dairy-farm',
      category: 'products',
      categoryLabel: 'AgriTech & Analytics',
      title: 'Dairy Farm Management',
      tagline: 'Modernizing agriculture with real-time tech.',
      description: 'Comprehensive AgriTech dashboard for dairy farms — tracking livestock, milk yields, production analytics, sales, and revenue.',
      image: '/dairy-farm-2.png',
      metrics: ['React', 'Node.js', 'MongoDB', 'Analytics'],
      gradient: 'from-emerald-500/20 to-transparent',
      link: null,
      actionText: 'View System Specs',
      featured: false,
    },
    {
      id: 'car-bidding',
      category: 'products',
      categoryLabel: 'Marketplace & Auctions',
      title: 'Car Bidding Platform',
      tagline: 'Find your ultimate ride.',
      description: 'Real-time vehicle auction marketplace with live WebSocket bidding, verified ownership records, and instant payment settlement.',
      image: '/car-bidding-1.jpeg',
      metrics: ['Next.js 14', 'WebSockets', 'Real-Time', 'Auctions'],
      gradient: 'from-indigo-500/20 to-transparent',
      link: null,
      actionText: 'View Bidding Engine Specs',
      featured: false,
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <section id="systems" className="py-32 bg-obsidian-900 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header & Category Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-sm font-mono tracking-widest text-electric-cyan uppercase mb-3 block">
                Work & Architecture Portfolio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Systems & <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-electric-gold">Production Work</span>.
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-obsidian-800/80 border border-white/10 backdrop-blur-md">
              {[
                { id: 'all', label: `All Systems (${projects.length})` },
                { id: 'research', label: 'Research & Papers (2)' },
                { id: 'ai', label: 'AI & WebGL (1)' },
                { id: 'products', label: 'Production Apps (4)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClickSound();
                    setActiveCategory(tab.id as Category);
                  }}
                  onMouseEnter={() => playHoverSound()}
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

          {/* Dynamic 7-Project Spotlight Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                className="p-8 md:p-10 flex flex-col justify-between min-h-[420px] hover:border-electric-cyan/40 transition-colors group"
                spotlightColor={
                  project.category === 'research'
                    ? 'rgba(0, 240, 255, 0.15)'
                    : project.category === 'ai'
                    ? 'rgba(139, 92, 246, 0.15)'
                    : 'rgba(255, 215, 0, 0.15)'
                }
              >
                {/* Border Beam for Featured Items */}
                {project.featured && (
                  <BorderBeam
                    size={320}
                    duration={8}
                    colorFrom={project.category === 'research' ? '#00F0FF' : '#8B5CF6'}
                    colorTo={project.category === 'research' ? '#FFD700' : '#00F0FF'}
                  />
                )}

                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-electric-cyan tracking-wider uppercase">
                      {project.categoryLabel}
                    </span>
                    {project.doiBadge && (
                      <span className="px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 text-[10px] font-mono text-electric-cyan">
                        {project.doiBadge}
                      </span>
                    )}
                  </div>

                  {/* Project Screenshot Preview if available */}
                  {project.image && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900/90 via-transparent to-transparent pointer-events-none" />
                    </div>
                  )}

                  <div className="text-xs font-mono text-electric-gold mb-2">{project.tagline}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-electric-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-8 font-light text-sm md:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-3 py-1 rounded-md bg-obsidian-900 border border-white/10 text-[11px] font-mono text-white/70 uppercase tracking-wide hover:border-electric-cyan/30 hover:text-electric-cyan transition-colors"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        playClickSound();
                        setSelectedDrawerItem(architectureDetails[project.id]);
                      }}
                      onMouseEnter={() => playHoverSound()}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white transition-all hover:scale-105 flex items-center gap-2"
                    >
                      ⚡ Inspect Code & Specs
                    </button>

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playClickSound()}
                        onMouseEnter={() => playHoverSound()}
                        className="px-4 py-2.5 rounded-xl bg-electric-cyan/10 hover:bg-electric-cyan/20 border border-electric-cyan/20 text-xs font-mono text-electric-cyan transition-all hover:scale-105 flex items-center gap-2"
                      >
                        {project.actionText} ↗
                      </a>
                    ) : (
                      <span className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-mono text-white/40 flex items-center gap-2">
                        Client Production Platform
                      </span>
                    )}
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
