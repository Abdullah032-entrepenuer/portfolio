'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FiDownload, FiArrowDown, FiArrowRight, FiCpu, FiActivity, FiLayers } from 'react-icons/fi';
import FadeIn from '@/components/ui/FadeIn';
import SpotlightCard from '@/components/ui/SpotlightCard';

const ParticleMesh = dynamic(() => import('@/components/3d/ParticleMesh'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full min-h-[400px] bg-[#050507] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="w-64 h-64 rounded-full border border-dashed border-[#10B981]/20 animate-pulse" />
    </div>
  ),
});

const liveMetrics = [
  '100k+ Vectors in Browser VRAM (WebGPU)',
  '60 FPS Force-Directed 3D R3F Graphs',
  'Sub-Second Groq LPU Multi-Agent RAG',
  'Production Next.js · TypeScript · PostGIS',
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-5rem)] w-full flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 overflow-hidden bg-[#050507]"
    >
      {/* 3D Spatial Web Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-65">
        <ParticleMesh />
      </div>

      {/* Subtle Ambient Radial Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 w-[36rem] h-[36rem] rounded-full bg-[#10B981]/[0.07] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-[#6366F1]/[0.08] blur-[130px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: High-Signal Engineering Positioning */}
          <div className="lg:col-span-8 space-y-7">
            <FadeIn yOffset={20}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#0B0C10]/90 border border-white/10 backdrop-blur-md shadow-lg">
                <span className="h-2 w-2 rounded-full bg-[#10B981] shrink-0 shadow-[0_0_8px_#10B981]" />
                <span className="font-mono text-[11px] sm:text-xs tracking-wider text-[#10B981] uppercase font-medium">
                  [ FULL-STACK AI ENGINEER · NEXT.JS ARCHITECT · SPATIAL WEB (R3F / WEBGPU) ]
                </span>
              </div>
            </FadeIn>

            <FadeIn yOffset={24} delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.15rem] font-extrabold tracking-tight leading-[1.06] text-white">
                Engineering Autonomous{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#6366F1]">
                  AI Systems
                </span>{' '}
                &amp; Spatial Web Architectures.
              </h1>
            </FadeIn>

            <FadeIn yOffset={24} delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-white/75 font-normal leading-relaxed max-w-3xl">
                I am <strong className="text-white font-semibold">Abdullah Awais</strong>—a Full-Stack
                AI Engineer and Published Systems Researcher. I build production Next.js platforms,
                sub-second Multi-Agent RAG pipelines, and 60 FPS 3D WebGL/WebGPU interfaces that scale
                from browser VRAM to distributed cloud clusters.
              </p>
            </FadeIn>

            {/* Live Metric Strip (Monospace Pills) */}
            <FadeIn yOffset={20} delay={0.3}>
              <div
                className="flex flex-wrap gap-2.5 pt-1"
                aria-label="Key Engineering Performance Metrics"
              >
                {liveMetrics.map((metric, idx) => (
                  <div
                    key={metric}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-mono text-xs border backdrop-blur-md ${
                      idx % 2 === 0
                        ? 'bg-[#10B981]/[0.07] border-[#10B981]/30 text-[#10B981]'
                        : 'bg-[#6366F1]/[0.08] border-[#6366F1]/30 text-[#A5B4FC]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        idx % 2 === 0 ? 'bg-[#10B981]' : 'bg-[#8B5CF6]'
                      }`}
                    />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* CTA Cluster */}
            <FadeIn yOffset={20} delay={0.4}>
              <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4">
                {/* Primary Button (High-Contrast White/Emerald) */}
                <a
                  href="#systems"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#10B981] text-[#050507] font-mono text-xs sm:text-sm font-bold tracking-wide uppercase hover:bg-[#34D399] transition-all shadow-[0_0_30px_rgba(16,185,129,0.35)]"
                >
                  <span>Explore Production Systems</span>
                  <FiArrowDown size={16} />
                </a>

                {/* Secondary Button (Glassmorphic + Icon) */}
                <a
                  href="/abdullah_awais_resume.pdf"
                  download="Abdullah_Awais_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#0B0C10]/90 border border-white/15 text-white font-mono text-xs sm:text-sm font-semibold hover:border-[#10B981]/60 hover:bg-white/[0.06] transition-all backdrop-blur-xl"
                >
                  <FiDownload size={16} className="text-[#10B981]" />
                  <span>Download ATS Resume (PDF)</span>
                </a>

                {/* Tertiary Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-3 py-3 font-mono text-xs sm:text-sm text-white/75 hover:text-[#10B981] transition-colors group"
                >
                  <span>Book 10-Min Technical Intro / Direct Email</span>
                  <FiArrowRight
                    size={15}
                    className="transform group-hover:translate-x-1 transition-transform text-[#10B981]"
                  />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Spatial Telemetry & Architect Identity Card */}
          <div className="lg:col-span-4">
            <FadeIn yOffset={25} delay={0.25}>
              <SpotlightCard
                className="p-5 sm:p-6 border border-white/10 bg-[#0B0C10]/90 shadow-2xl"
                spotlightColor="rgba(16, 185, 129, 0.14)"
                borderColor="rgba(16, 185, 129, 0.5)"
              >
                {/* Card Top Telemetry Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.07] font-mono text-[11px]">
                  <span className="text-white/50 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                    SYS.ARCHITECT // 01
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
                    ONLINE · 60 FPS
                  </span>
                </div>

                {/* Portrait with explicit aspect ratio to prevent CLS */}
                <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden bg-gradient-to-b from-[#12141C] to-[#050507] border border-white/[0.07] mb-5">
                  <Image
                    src="/profile-nobg.png"
                    alt="Abdullah Awais — Full-Stack AI Engineer and Spatial Web Architect"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover object-top scale-105 hover:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-[#10B981]">
                        Principal Systems Engineer
                      </div>
                      <div className="text-lg font-bold text-white tracking-tight">
                        Abdullah Awais
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[10px] text-white/80">
                      UTC+5
                    </span>
                  </div>
                </div>

                {/* Live Kernel Telemetry Readout */}
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-[#050507] border border-white/[0.06]">
                    <div className="text-white/40 flex items-center gap-1 mb-1">
                      <FiCpu className="text-[#10B981]" size={11} />
                      <span>VRAM</span>
                    </div>
                    <div className="text-white font-semibold">100k+ Vec</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050507] border border-white/[0.06]">
                    <div className="text-white/40 flex items-center gap-1 mb-1">
                      <FiActivity className="text-[#6366F1]" size={11} />
                      <span>RAG LPU</span>
                    </div>
                    <div className="text-white font-semibold">&lt;180ms</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050507] border border-white/[0.06]">
                    <div className="text-white/40 flex items-center gap-1 mb-1">
                      <FiLayers className="text-[#10B981]" size={11} />
                      <span>PUBLISHED</span>
                    </div>
                    <div className="text-white font-semibold">2 Papers</div>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
