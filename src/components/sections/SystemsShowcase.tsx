'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiCpu, FiLayers } from 'react-icons/fi';
import SpotlightCard from '@/components/ui/SpotlightCard';
import ArchitectureDrawer, { ArchitectureItem } from '@/components/ui/ArchitectureDrawer';
import FadeIn from '@/components/ui/FadeIn';

type FilterId = 'all' | 'production' | 'spatial' | 'research';

interface SystemItem {
  id: string;
  num: string;
  title: string;
  categoryBadge: string;
  filterGroups: FilterId[];
  telemetryBadges: string[];
  summary: string;
  stack: string[];
  image?: string;
  imageAlt?: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCtaLabel: string;
  accent: 'emerald' | 'violet';
}

const architectureDetails: Record<string, ArchitectureItem> = {
  synapse: {
    id: 'synapse',
    title: '01 // SYNAPSE — Autonomous Multi-Agent 3D Spatial Knowledge Engine',
    subtitle:
      'Groq LPU-accelerated multi-agent RAG synthesizing unstructured corpora into 60 FPS React Three Fiber force-directed 3D graphs.',
    link: 'https://synapse-server-5bb8.onrender.com/',
    linkLabel: 'Launch Live Engine (synapse)',
    specifications: [
      { label: 'LLM Inference Engine', value: 'Sub-Second Groq LPU' },
      { label: 'Spatial Scene Target', value: '60 FPS R3F Force Graph' },
      { label: 'Retrieval Pipeline', value: 'Autonomous Multi-Agent RAG' },
      { label: 'State Synchronization', value: 'Zustand + WebGL Buffers' },
    ],
    architectureDiagram: `[Unstructured Corpus] ──► [Multi-Agent Chunker & Entity Extractor]
                                   │
                    ┌──────────────┴──────────────┐
                    ▼                             ▼
        [Groq LPU Semantic Graph]      [Hybrid Vector Embeddings]
                    └──────────────┬──────────────┘
                                   ▼
           [R3F InstancedMesh 3D Force-Directed Layout @ 60 FPS]`,
    codeSnippet: `// Synapse Multi-Agent Graph Synthesis & 3D Force-Directed R3F Buffer Update
export async function synthesizeSpatialKnowledgeGraph(corpus: string) {
  const [entities, relations] = await Promise.all([
    groqAgent.extractEntities(corpus, { model: 'llama-3.3-70b-versatile' }),
    groqAgent.extractSemanticEdges(corpus, { temperature: 0.1 }),
  ]);

  return computeForceDirectedLayout3D(entities, relations, {
    iterations: 120,
    repulsionStrength: -180,
    springLength: 2.4,
  });
}`,
  },
  autocare: {
    id: 'autocare',
    title: '02 // AUTOCARE (auto-care.me) — AI Automotive Marketplace & 3D Configurator',
    subtitle:
      'End-to-end automotive marketplace with real-time service bidding, AI maintenance diagnostics, and an interactive R3F 3D PBR customization studio.',
    link: 'https://www.auto-care.me',
    linkLabel: 'Visit Live Platform (auto-care.me)',
    specifications: [
      { label: '3D Configurator', value: 'Real-Time 3D PBR Studio' },
      { label: 'Diagnostics Engine', value: 'AI Maintenance Diagnostics' },
      { label: 'Marketplace Core', value: 'Live Bidding & Scheduling' },
      { label: 'Production Stack', value: 'Next.js · Node · MongoDB · R3F' },
    ],
    architectureDiagram: `[Vehicle Telemetry / User Input] ──► [AI Maintenance Diagnostics Engine]
                                              │
       ┌──────────────────────────────────────┴───────────────────────────┐
       ▼                                                                  ▼
[R3F 3D PBR Paint & Component Studio]                     [Real-Time Service Bidding Engine]`,
    codeSnippet: `// AutoCare Real-Time PBR Metallic-Roughness Material & AI Diagnostic Resolver
export function applyVehiclePBRPreset(mesh: THREE.Mesh, finish: PaintPreset) {
  const mat = mesh.material as THREE.MeshPhysicalMaterial;
  mat.color.set(finish.hex);
  mat.metalness = finish.metalness;       // 0.88 Metallic Flake
  mat.roughness = finish.roughness;       // 0.12 Micro-surface
  mat.clearcoat = 1.0;
  mat.clearcoatRoughness = 0.04;
  mat.needsUpdate = true;
}`,
  },
  'dhaba-3d': {
    id: 'dhaba-3d',
    title: '03 // DHABA-3D (dhaba-3d.com) — Interactive 3D Spatial E-Commerce Platform',
    subtitle:
      'Spatial 3D e-commerce storefront integrating a headless MedusaJS backend with interactive WebGL inspection and GSAP camera choreography.',
    link: 'https://dhaba-3d.com',
    linkLabel: 'Visit Live Storefront (dhaba-3d.com)',
    specifications: [
      { label: 'Commerce Engine', value: 'Headless MedusaJS Engine' },
      { label: '3D Product View', value: 'Interactive WebGL Inspection' },
      { label: 'Rendering Strategy', value: 'Next.js App Router SSR/ISR' },
      { label: 'Camera Physics', value: 'GSAP Scroll & Orbit Choreography' },
    ],
    architectureDiagram: `[Next.js App Router SSR] ◄──► [Headless MedusaJS Commerce API]
           │                                 │
           ▼                                 ▼
[R3F WebGL Product Stage + GSAP]    [Low-Latency Cart & Checkout Sync]`,
    codeSnippet: `// Dhaba-3D Camera Choreography & Headless MedusaJS Variant Synchronization
export function transitionCameraToProductStage(
  camera: THREE.PerspectiveCamera,
  stageTarget: THREE.Vector3
) {
  gsap.to(camera.position, {
    x: stageTarget.x + 1.8,
    y: stageTarget.y + 0.9,
    z: stageTarget.z + 3.2,
    duration: 1.1,
    ease: 'power3.inOut',
  });
}`,
  },
  'edge-rag': {
    id: 'edge-rag',
    title: '04 // RESEARCH — Zero-Latency Edge RAG via WebGPU Compute Shaders (PeerJ CS)',
    subtitle:
      'Decentralized client-side vector search via WebGPU compute shaders and OffscreenCanvas spatial thread isolation.',
    link: 'https://zenodo.org/records/21527199',
    linkLabel: 'Read PeerJ CS / Zenodo Preprint',
    specifications: [
      { label: 'VRAM Vector Capacity', value: '100k+ Quantized Vectors' },
      { label: 'Cloud Network Overhead', value: '0ms (100% On-Device GPU)' },
      { label: 'Render Isolation', value: 'OffscreenCanvas Worker Thread' },
      { label: 'Compute Kernel', value: 'WGSL @workgroup_size(64)' },
    ],
    architectureDiagram: `[Main UI Thread: Zero Blocking]
       │ (SharedArrayBuffer / Atomics)
       ├──► [Web Worker 1: WebGPU WGSL Compute Shader (100k+ Cosine Sim in VRAM)]
       └──► [Web Worker 2: OffscreenCanvas Three.js 60 FPS Spatial Graph]`,
    codeSnippet: `// WebGPU WGSL Quantized Cosine Similarity Kernel (100k+ Vectors in Browser VRAM)
@group(0) @binding(0) var<storage, read> queryVector: array<f32>;
@group(0) @binding(1) var<storage, read> dbVectors: array<f32>;
@group(0) @binding(2) var<storage, read_write> scores: array<f32>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let index = global_id.x;
  var dot: f32 = 0.0;
  var qNorm: f32 = 0.0;
  var vNorm: f32 = 0.0;
  for (var i: u32 = 0u; i < 384u; i = i + 1u) {
    let q = queryVector[i];
    let v = dbVectors[index * 384u + i];
    dot += q * v;
    qNorm += q * q;
    vNorm += v * v;
  }
  scores[index] = dot / (sqrt(qNorm) * sqrt(vNorm));
}`,
  },
  'webgl-sync': {
    id: 'webgl-sync',
    title: '05 // RESEARCH — Asynchronous State Synchronization in WebGL Spatial Graphs',
    subtitle:
      'Synchronizing high-frequency streaming generative AI token outputs with complex WebGL/Three.js scene graphs without React reconciliation bottlenecks.',
    link: 'https://zenodo.org/records/21526081',
    linkLabel: 'Read Preprint & Benchmark Telemetry',
    specifications: [
      { label: 'State Mutation Latency', value: 'Sub-Millisecond Sync' },
      { label: 'Frame Stability', value: 'Zero Frame Drops (60 FPS)' },
      { label: 'Ingestion Stream', value: 'Streaming LLM Token SSE/WS' },
      { label: 'Memory Architecture', value: 'Double-Buffered Float32Arrays' },
    ],
    architectureDiagram: `[Streaming LLM Token SSE] ──► [Lock-Free Ring Buffer Parser]
                                       │
                                       ▼ (Bypasses React VDOM Reconciliation)
                        [Direct Float32BufferAttribute GPU Upload]
                                       │
                                       ▼
                        [WebGL Instanced Spatial Scene Graph @ 60 FPS]`,
    codeSnippet: `// Lock-Free Streaming LLM Graph Mutation (Bypassing React VDOM Reconciliation)
export function commitStreamDeltaToInstancedMesh(
  mesh: THREE.InstancedMesh,
  nodeIndex: number,
  x: number,
  y: number,
  z: number,
  dummy: THREE.Object3D
) {
  dummy.position.set(x, y, z);
  dummy.updateMatrix();
  mesh.setMatrixAt(nodeIndex, dummy.matrix);
  mesh.instanceMatrix.needsUpdate = true;
}`,
  },
};

const systemsList: SystemItem[] = [
  {
    id: 'synapse',
    num: '01',
    title: '01 // SYNAPSE — Autonomous Multi-Agent 3D Spatial Knowledge Engine',
    categoryBadge: 'Production AI & Spatial Web',
    filterGroups: ['all', 'production', 'spatial'],
    telemetryBadges: [
      'Sub-Second Groq LPU Inference',
      '60 FPS R3F Force Graph',
      'Autonomous Multi-Agent RAG',
    ],
    summary:
      'Architected an autonomous multi-agent knowledge synthesis platform that ingests unstructured corpora and synthesizes them into interactive, real-time 3D force-directed knowledge graphs. Combines Groq hardware acceleration with custom hybrid RAG pipelines and spatial clustering.',
    stack: [
      'Next.js',
      'TypeScript',
      'React Three Fiber',
      'Three.js',
      'Groq API',
      'Multi-Agent RAG',
      'Tailwind CSS',
    ],
    image: '/synapse-1.png',
    imageAlt:
      'Synapse Autonomous Multi-Agent 3D Spatial Knowledge Engine rendering a 60 FPS force-directed graph in React Three Fiber',
    primaryCta: {
      label: 'Launch Live Engine',
      href: 'https://synapse-server-5bb8.onrender.com/',
    },
    secondaryCtaLabel: 'Inspect System Architecture',
    accent: 'emerald',
  },
  {
    id: 'autocare',
    num: '02',
    title: '02 // AUTOCARE (auto-care.me) — AI Automotive Marketplace & 3D Configurator',
    categoryBadge: 'Production Full-Stack & 3D Web',
    filterGroups: ['all', 'production', 'spatial'],
    telemetryBadges: [
      'Real-Time 3D PBR Studio',
      'AI Maintenance Diagnostics',
      'Live Bidding Engine',
    ],
    summary:
      'Engineered an end-to-end automotive management marketplace featuring real-time service bidding workflows, automated scheduling, AI-driven vehicle maintenance diagnostics, and an interactive React Three Fiber 3D studio for real-time paint and component customization.',
    stack: [
      'Next.js',
      'Node.js',
      'Express',
      'MongoDB',
      'React Three Fiber',
      'WebGL',
      'AI Diagnostics',
    ],
    image: '/auto-care-1.jpeg',
    imageAlt:
      'AutoCare AI Automotive Marketplace and real-time 3D PBR vehicle studio on auto-care.me',
    primaryCta: {
      label: 'Visit auto-care.me',
      href: 'https://www.auto-care.me',
    },
    secondaryCtaLabel: 'Inspect System Architecture',
    accent: 'emerald',
  },
  {
    id: 'dhaba-3d',
    num: '03',
    title: '03 // DHABA-3D (dhaba-3d.com) — Interactive 3D Spatial E-Commerce Platform',
    categoryBadge: 'Production Full-Stack & 3D Web',
    filterGroups: ['all', 'production', 'spatial'],
    telemetryBadges: [
      'Headless MedusaJS Engine',
      'Interactive WebGL Inspection',
      'SSR Optimized',
    ],
    summary:
      'Built and launched a spatial 3D e-commerce storefront integrating a headless MedusaJS commerce backend with interactive 3D product inspection, camera choreography, and low-latency cart state synchronization.',
    stack: ['Next.js', 'TypeScript', 'React Three Fiber', 'MedusaJS', 'Tailwind CSS', 'GSAP'],
    image: '/dhaba3d.png',
    imageAlt:
      'Dhaba-3D Interactive 3D Spatial E-Commerce storefront integrating headless MedusaJS and WebGL inspection',
    primaryCta: {
      label: 'Visit dhaba-3d.com',
      href: 'https://dhaba-3d.com',
    },
    secondaryCtaLabel: 'Inspect System Architecture',
    accent: 'emerald',
  },
  {
    id: 'edge-rag',
    num: '04',
    title: '04 // RESEARCH — Zero-Latency Edge RAG via WebGPU Compute Shaders (PeerJ CS)',
    categoryBadge: 'Published Research & Edge AI',
    filterGroups: ['all', 'research'],
    telemetryBadges: [
      '100k+ Vectors in VRAM',
      '0ms Cloud Network Overhead',
      'OffscreenCanvas Thread Isolation',
    ],
    summary:
      'Authored manuscript ("Zero-latency edge RAG: decentralized client-side vector search via WebGPU compute shaders and OffscreenCanvas spatial thread isolation"). Eliminates cloud vector DB latency and server costs by executing quantized cosine similarity searches directly inside browser GPU compute shaders while isolating 3D rendering on worker threads.',
    stack: [
      'WebGPU (WGSL)',
      'WebAssembly',
      'OffscreenCanvas',
      'Client-Side RAG',
      'Vector Quantization',
    ],
    primaryCta: {
      label: 'Read Preprint',
      href: 'https://zenodo.org/records/21527199',
    },
    secondaryCtaLabel: 'View Benchmark Telemetry',
    accent: 'violet',
  },
  {
    id: 'webgl-sync',
    num: '05',
    title: '05 // RESEARCH — Asynchronous State Synchronization in WebGL Spatial Graphs',
    categoryBadge: 'Published Research & Spatial Computing',
    filterGroups: ['all', 'spatial', 'research'],
    telemetryBadges: [
      'Sub-Millisecond State Sync',
      'Zero Frame Drops',
      'Streaming LLM Graph Mutation',
    ],
    summary:
      'Architectural benchmarking and reference implementation for synchronizing high-frequency streaming generative AI token outputs with complex WebGL/Three.js scene graphs without triggering React reconciliation bottlenecks.',
    stack: ['WebGL', 'Three.js', 'Concurrent State Buffers', 'WebSockets / SSE', 'TypeScript'],
    primaryCta: {
      label: 'Read Preprint',
      href: 'https://zenodo.org/records/21526081',
    },
    secondaryCtaLabel: 'View Architecture Diagram',
    accent: 'violet',
  },
];

const filterTabs: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All Systems [5]' },
  { id: 'production', label: 'Production AI & Full-Stack [3]' },
  { id: 'spatial', label: 'Spatial 3D & WebGL [4]' },
  { id: 'research', label: 'Published Research [2]' },
];

export default function SystemsShowcase() {
  const [activeFilter, setActiveFilter] = useState<FilterId>('all');
  const [drawerItem, setDrawerItem] = useState<ArchitectureItem | null>(null);

  const visibleSystems = systemsList.filter((item) =>
    item.filterGroups.includes(activeFilter)
  );

  return (
    <>
      <section
        id="systems"
        aria-labelledby="systems-heading"
        className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[#050507] border-t border-white/[0.07]"
      >
        {/* Anchor for #research */}
        <div id="research" className="absolute -top-20" aria-hidden="true" />
        {/* Anchor for #projects */}
        <div id="projects" className="absolute -top-20" aria-hidden="true" />

        <div className="max-w-7xl mx-auto">
          {/* Header + Category Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <FadeIn yOffset={20}>
              <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#10B981] mb-4">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span>02 // FLAGSHIP PRODUCTION SYSTEMS &amp; PEER-REVIEWED RESEARCH</span>
              </div>
              <h2
                id="systems-heading"
                className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                Production Platforms &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#8B5CF6]">
                  Published Systems.
                </span>
              </h2>
            </FadeIn>

            {/* Category Filter Bar */}
            <div
              role="tablist"
              aria-label="Filter production systems and research"
              className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0B0C10] border border-white/10 self-start lg:self-auto"
            >
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
                      isActive
                        ? 'bg-[#10B981] text-[#050507] font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'text-white/65 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Systems Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {visibleSystems.map((item, idx) => {
              const isResearch = item.accent === 'violet';
              const spanClass =
                visibleSystems.length === 5 && idx === 0
                  ? 'lg:col-span-12'
                  : 'lg:col-span-6';

              return (
                <div key={item.id} className={spanClass}>
                  <SpotlightCard
                    className="p-6 sm:p-8 h-full"
                    spotlightColor={
                      isResearch ? 'rgba(139, 92, 246, 0.14)' : 'rgba(16, 185, 129, 0.14)'
                    }
                    borderColor={
                      isResearch ? 'rgba(139, 92, 246, 0.5)' : 'rgba(16, 185, 129, 0.5)'
                    }
                  >
                    <div
                      className={`grid grid-cols-1 ${
                        visibleSystems.length === 5 && idx === 0 && item.image
                          ? 'xl:grid-cols-12 gap-8 items-center'
                          : 'gap-6'
                      }`}
                    >
                      {/* Screenshot or Research Compute Visual */}
                      {item.image ? (
                        <div
                          className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#050507] border border-white/10 group ${
                            visibleSystems.length === 5 && idx === 0 ? 'xl:col-span-6' : ''
                          }`}
                        >
                          <Image
                            src={item.image}
                            alt={item.imageAlt || item.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 600px"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent opacity-70" />
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-[#10B981]">
                            {item.categoryBadge}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/[0.07]">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#6366F1]/15 border border-[#6366F1]/40 font-mono text-xs text-[#A5B4FC]">
                            <FiCpu size={13} className="text-[#8B5CF6]" />
                            <span>{item.categoryBadge}</span>
                          </span>
                          <span className="font-mono text-xs text-white/40">
                            PEER-REVIEWED MANUSCRIPT
                          </span>
                        </div>
                      )}

                      {/* Content Column */}
                      <div
                        className={`flex flex-col justify-between ${
                          visibleSystems.length === 5 && idx === 0 && item.image
                            ? 'xl:col-span-6'
                            : ''
                        }`}
                      >
                        <div>
                          {/* Quantified Telemetry Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.telemetryBadges.map((badge) => (
                              <span
                                key={badge}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] font-medium border ${
                                  isResearch
                                    ? 'bg-[#6366F1]/10 border-[#6366F1]/35 text-[#C4B5FD]'
                                    : 'bg-[#10B981]/10 border-[#10B981]/35 text-[#10B981]'
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isResearch ? 'bg-[#8B5CF6]' : 'bg-[#10B981]'
                                  }`}
                                />
                                {badge}
                              </span>
                            ))}
                          </div>

                          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                            {item.title}
                          </h3>

                          <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                            {item.summary}
                          </p>
                        </div>

                        {/* Tech Stack Pills & CTAs */}
                        <div className="space-y-5 pt-4 border-t border-white/[0.07]">
                          <div className="flex flex-wrap gap-1.5">
                            {item.stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md bg-[#050507] border border-white/[0.08] font-mono text-[11px] text-white/75"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <a
                              href={item.primaryCta.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                                isResearch
                                  ? 'bg-[#6366F1] text-white hover:bg-[#8B5CF6] shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                                  : 'bg-[#10B981] text-[#050507] hover:bg-[#34D399] shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                              }`}
                            >
                              <span>{item.primaryCta.label}</span>
                              <FiExternalLink size={13} />
                            </a>

                            <button
                              type="button"
                              onClick={() => setDrawerItem(architectureDetails[item.id])}
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 font-mono text-xs text-white transition-all"
                            >
                              <FiLayers size={13} className="text-[#10B981]" />
                              <span>{item.secondaryCtaLabel}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ArchitectureDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
    </>
  );
}
