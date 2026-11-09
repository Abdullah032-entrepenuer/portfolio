'use client';

import { FiCpu, FiBox, FiDatabase, FiTerminal } from 'react-icons/fi';
import FadeIn from '@/components/ui/FadeIn';
import AnimatedText from '@/components/ui/AnimatedText';
import SpotlightCard from '@/components/ui/SpotlightCard';

const bentoPillars = [
  {
    index: 'PILLAR 01 // AI & COMPUTE',
    title: 'AI & Edge RAG Engineering',
    icon: FiCpu,
    accent: '#10B981',
    spotlightColor: 'rgba(16, 185, 129, 0.14)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
    metric: '100k+ Vectors in VRAM · <180ms LPU',
    description:
      'Architecting autonomous multi-agent synthesis workflows and zero-latency client-side vector retrieval directly inside browser GPU compute shaders.',
    skills: [
      'Multi-Agent Orchestration',
      'Client-Side WebGPU Vector Search',
      'Groq LPU Inference',
      'Semantic Knowledge Graphs',
      'Synthetic Data Pipelines',
    ],
  },
  {
    index: 'PILLAR 02 // 3D SPATIAL WEB',
    title: 'Spatial Web & 3D Graphics',
    icon: FiBox,
    accent: '#8B5CF6',
    spotlightColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: 'rgba(139, 92, 246, 0.5)',
    metric: '60 FPS Locked · OffscreenCanvas',
    description:
      'Building high-frame-rate interactive 3D scenes, force-directed knowledge graphs, and real-time PBR product configurators isolated from main-thread UI work.',
    skills: [
      'React Three Fiber (R3F)',
      'Three.js',
      'Custom GLSL/WGSL Shaders',
      'OffscreenCanvas Worker Isolation',
      'PBR Material Studios',
      'GSAP Scroll Physics',
    ],
  },
  {
    index: 'PILLAR 03 // FULL-STACK CORE',
    title: 'Full-Stack & Spatial GIS',
    icon: FiDatabase,
    accent: '#10B981',
    spotlightColor: 'rgba(16, 185, 129, 0.14)',
    borderColor: 'rgba(16, 185, 129, 0.5)',
    metric: 'SSR / Edge · Type-Safe SQL & GIS',
    description:
      'Shipping resilient, high-concurrency production platforms with type-safe relational/spatial data layers, real-time WebSocket state, and headless commerce.',
    skills: [
      'Next.js (App Router, SSR/ISR, Server Actions)',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'PostGIS',
      'Kysely ORM',
      'MongoDB',
      'Redis Pub/Sub & Caching',
      'MedusaJS',
    ],
  },
  {
    index: 'PILLAR 04 // INFRASTRUCTURE & SDKs',
    title: 'Systems Infrastructure & DevRel',
    icon: FiTerminal,
    accent: '#6366F1',
    spotlightColor: 'rgba(99, 102, 241, 0.15)',
    borderColor: 'rgba(99, 102, 241, 0.5)',
    metric: 'Reproducible Builds · Docs-as-Code',
    description:
      'Designing deterministic deployment pipelines, containerized microservices, developer SDKs, and architectural blueprints that scale engineering organizations.',
    skills: [
      'Containerized Virtualization',
      'Nix Flakes',
      'Docker',
      'CI/CD',
      'Open-Source SDK Architecture',
      'Enterprise API Documentation',
    ],
  },
];

export default function AboutSection() {
  const narrativeCopy =
    'Most engineers either build surface-level CRUD wrappers or stay locked in theoretical research. I bridge both worlds. As a Full-Stack AI Engineer, Spatial Web Developer, and Technical Architect, I ship revenue-ready Next.js applications, real-time 3D React Three Fiber experiences, and decentralized edge RAG engines—while authoring the rigorous system blueprints, SDKs, and Docs-as-Code pipelines that allow engineering teams to scale without friction.';

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full py-28 md:py-36 px-6 md:px-12 bg-[#050507] border-t border-white/[0.07] overflow-hidden"
    >
      {/* Subtle Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-[#6366F1]/[0.06] rounded-full blur-[140px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header & Narrative */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <FadeIn yOffset={20}>
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#10B981] mb-4">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span>01 // THE ENGINEERING ADVANTAGE</span>
            </div>

            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-8"
            >
              Full-Stack Velocity Meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#8B5CF6]">
                Peer-Reviewed Systems Rigor.
              </span>
            </h2>
          </FadeIn>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#0B0C10] border border-white/[0.07] shadow-xl">
            <AnimatedText
              text={narrativeCopy}
              className="text-base sm:text-lg md:text-xl text-white/85 font-normal leading-relaxed"
            />
          </div>
        </div>

        {/* Interactive 4-Pillar Bento Matrix */}
        <div id="architecture" className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {bentoPillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={i * 0.08} yOffset={24}>
                <SpotlightCard
                  className="p-7 sm:p-8 h-full"
                  spotlightColor={pillar.spotlightColor}
                  borderColor={pillar.borderColor}
                >
                  <div>
                    {/* Top Row: Index + Telemetry Metric */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-5 mb-6 border-b border-white/[0.07]">
                      <span className="font-mono text-xs tracking-wider uppercase text-white/50">
                        {pillar.index}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-md font-mono text-[11px] font-medium border"
                        style={{
                          color: pillar.accent,
                          borderColor: `${pillar.accent}40`,
                          backgroundColor: `${pillar.accent}12`,
                        }}
                      >
                        {pillar.metric}
                      </span>
                    </div>

                    {/* Icon + Pillar Title */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0"
                        style={{
                          borderColor: `${pillar.accent}40`,
                          backgroundColor: `${pillar.accent}15`,
                          color: pillar.accent,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {pillar.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-white/65 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Skill Pills */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                    {pillar.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-[#050507] border border-white/[0.08] font-mono text-xs text-white/80 hover:border-[#10B981]/40 hover:text-white transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
