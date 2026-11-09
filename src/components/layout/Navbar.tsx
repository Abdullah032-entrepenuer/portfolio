'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiDownload, FiCommand, FiMenu, FiX } from 'react-icons/fi';
import CommandPalette from '@/components/ui/CommandPalette';

export default function Navbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Monogram + Live Availability Pill */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="#"
              className="font-mono text-sm md:text-base font-bold tracking-wider text-white hover:text-[#10B981] transition-colors shrink-0 flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-sm bg-[#10B981]" />
              <span>AA // SYSTEMS</span>
            </Link>

            <div className="hidden xl:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0B0C10] border border-white/[0.08] text-[11px] font-mono text-white/80">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="tracking-wider text-[#10B981] font-medium">
                REMOTE READY · UTC+5 (FULL EU &amp; US-EAST OVERLAP)
              </span>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2 font-mono text-xs"
          >
            <a
              href="#systems"
              className="px-3 py-2 rounded-lg text-white/75 hover:text-white hover:bg-white/5 transition-colors"
            >
              Work
            </a>
            <a
              href="#about"
              className="px-3 py-2 rounded-lg text-white/75 hover:text-white hover:bg-white/5 transition-colors"
            >
              Architecture
            </a>
            <a
              href="#research"
              className="px-3 py-2 rounded-lg text-white/75 hover:text-white hover:bg-white/5 transition-colors"
            >
              Research
            </a>

            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open Command Palette"
              className="ml-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0B0C10] border border-white/10 text-white/80 hover:text-white hover:border-[#6366F1]/50 transition-all"
            >
              <FiCommand className="text-[#6366F1]" size={13} />
              <span className="hidden lg:inline">Command Palette</span>
              <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-white/60">
                ⌘K
              </kbd>
            </button>

            <a
              href="/abdullah_awais_resume.pdf"
              download="Abdullah_Awais_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] text-[#050507] font-semibold hover:bg-[#34D399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              <FiDownload size={14} />
              <span>Resume PDF</span>
            </a>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Command Palette"
              className="p-2 rounded-lg bg-[#0B0C10] border border-white/10 text-white/80"
            >
              <FiCommand size={16} />
            </button>
            <a
              href="/abdullah_awais_resume.pdf"
              download="Abdullah_Awais_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] text-[#050507] font-mono text-xs font-semibold"
            >
              <FiDownload size={12} />
              <span>Resume</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg bg-[#0B0C10] border border-white/10 text-white/80"
            >
              {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Sub-bar availability pill on tablet/mobile */}
        <div className="xl:hidden border-t border-white/[0.06] bg-[#050507]/90 px-4 py-1.5 flex items-center justify-center gap-2 font-mono text-[10px] text-[#10B981]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
          <span className="truncate">REMOTE READY · UTC+5 (FULL EU &amp; US-EAST OVERLAP)</span>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0B0C10] px-6 py-4 space-y-2 font-mono text-xs">
            <a
              href="#systems"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#10B981]"
            >
              01 // Work &amp; Production Systems
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#10B981]"
            >
              02 // Architecture &amp; 4-Pillar Matrix
            </a>
            <a
              href="#research"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#10B981]"
            >
              03 // Peer-Reviewed Research
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-white/80 hover:text-[#10B981]"
            >
              04 // Hire / Commission Project
            </a>
          </div>
        )}
      </header>

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
