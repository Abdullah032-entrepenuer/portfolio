'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiTerminal, FiCheck, FiCornerDownLeft } from 'react-icons/fi';

interface CommandOption {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const commands: CommandOption[] = [
    {
      id: 'nav-systems',
      label: 'Jump to Flagship Production Systems & Research',
      category: 'Navigation',
      action: () => {
        document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-about',
      label: 'Jump to 01 // The Engineering Advantage (4-Pillar Matrix)',
      category: 'Navigation',
      action: () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-contact',
      label: 'Jump to Dual-Mode Conversion Funnel (Hire / Commission)',
      category: 'Navigation',
      action: () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'download-resume',
      label: 'Download ATS Resume (PDF)',
      category: 'Career & Hiring',
      action: () => {
        window.open('/abdullah_awais_resume.pdf', '_blank');
        onClose();
      },
    },
    {
      id: 'open-synapse',
      label: 'Launch SYNAPSE — Autonomous Multi-Agent 3D Knowledge Engine',
      category: 'Production Systems',
      action: () => {
        window.open('https://synapse-server-5bb8.onrender.com/', '_blank');
        onClose();
      },
    },
    {
      id: 'open-autocare',
      label: 'Visit AUTOCARE (auto-care.me) — AI Automotive Marketplace & 3D Studio',
      category: 'Production Systems',
      action: () => {
        window.open('https://www.auto-care.me', '_blank');
        onClose();
      },
    },
    {
      id: 'open-dhaba3d',
      label: 'Visit DHABA-3D (dhaba-3d.com) — Interactive 3D Spatial E-Commerce',
      category: 'Production Systems',
      action: () => {
        window.open('https://dhaba-3d.com', '_blank');
        onClose();
      },
    },
    {
      id: 'doi-edge-rag',
      label: 'Read Preprint: Zero-Latency Edge RAG via WebGPU Compute Shaders',
      category: 'Published Research',
      action: () => {
        window.open('https://zenodo.org/records/21527199', '_blank');
        onClose();
      },
    },
    {
      id: 'doi-webgl-sync',
      label: 'Read Preprint: Asynchronous State Sync in WebGL Spatial Graphs',
      category: 'Published Research',
      action: () => {
        window.open('https://zenodo.org/records/21526081', '_blank');
        onClose();
      },
    },
    {
      id: 'email-copy',
      label: 'Copy Direct Email: abdullahawais034@gmail.com',
      category: 'Direct Contact',
      action: () => handleCopy('abdullahawais034@gmail.com'),
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="w-full max-w-xl bg-[#0B0C10] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-4 border-b border-white/10 bg-[#050507]/60">
          <FiSearch className="text-[#10B981] text-lg mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to system (e.g. 'synapse', 'rag', 'resume')..."
            className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none font-mono"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/50 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-white/40">
              No matching system commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                type="button"
                onClick={cmd.action}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[#10B981]/10 hover:border-[#10B981]/30 border border-transparent transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <FiTerminal className="text-white/40 group-hover:text-[#10B981] transition-colors shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-[#10B981] transition-colors">
                      {cmd.label}
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">
                      {cmd.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {copiedText && cmd.label.includes(copiedText) ? (
                    <span className="text-xs font-mono text-[#10B981] flex items-center gap-1">
                      <FiCheck /> Copied
                    </span>
                  ) : (
                    <FiCornerDownLeft className="text-white/20 group-hover:text-white/60 text-xs" />
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-[#050507] border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>AA // SYSTEMS CLI · Abdullah Awais</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
          </div>
        </div>
      </div>
    </div>
  );
}
