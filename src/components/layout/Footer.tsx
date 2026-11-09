'use client';

import { FiGithub, FiDownload, FiMail, FiArrowUpRight } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050507] border-t border-white/[0.07] text-white/70" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 font-mono text-base font-bold text-white tracking-wider">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
              <span>AA // SYSTEMS</span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Engineering Autonomous AI Systems &amp; Spatial Web Architectures. Built for sub-second
              inference, 60 FPS WebGL/WebGPU execution, and production full-stack scale.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B0C10] border border-white/[0.07] font-mono text-[11px] text-[#10B981]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>REMOTE READY · UTC+5 (EU &amp; US-EAST OVERLAP)</span>
            </div>
          </div>

          {/* Navigation Column */}
          <nav
            className="md:col-span-4 flex flex-col gap-2.5 font-mono text-xs"
            aria-label="Footer navigation"
          >
            <span className="text-white/40 uppercase tracking-widest mb-1">Architecture Index</span>
            <a href="#about" className="hover:text-[#10B981] transition-colors">
              01 // The Engineering Advantage
            </a>
            <a href="#systems" className="hover:text-[#10B981] transition-colors">
              02 // Flagship Production Systems
            </a>
            <a href="#research" className="hover:text-[#10B981] transition-colors">
              03 // Peer-Reviewed WebGPU &amp; WebGL Research
            </a>
            <a href="#contact" className="hover:text-[#10B981] transition-colors">
              04 // Dual-Mode Conversion Funnel
            </a>
          </nav>

          {/* Direct Actions Column */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="text-white/40 uppercase tracking-widest mb-1">Direct Channels</span>
            <a
              href="/abdullah_awais_resume.pdf"
              download="Abdullah_Awais_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/10 text-white hover:border-[#10B981]/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiDownload className="text-[#10B981]" />
                ATS Resume (PDF)
              </span>
              <FiArrowUpRight />
            </a>
            <a
              href="https://github.com/abdullah-032s"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/10 text-white hover:border-[#6366F1]/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FiGithub className="text-[#6366F1]" />
                GitHub Profile
              </span>
              <FiArrowUpRight />
            </a>
            <a
              href="mailto:abdullahawais034@gmail.com"
              className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0B0C10] border border-white/10 text-white hover:border-white/30 transition-colors"
            >
              <span className="flex items-center gap-2 truncate">
                <FiMail className="text-[#10B981] shrink-0" />
                <span className="truncate">abdullahawais034@gmail.com</span>
              </span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/40">
          <span>© {year} Abdullah Awais · All rights reserved</span>
          <span>Next.js · TypeScript · React Three Fiber · WebGPU · GSAP</span>
        </div>
      </div>
    </footer>
  );
}
