'use client';

import React, { useState } from 'react';
import { FiX, FiCopy, FiCheck, FiCode, FiLayers, FiActivity } from 'react-icons/fi';

export interface ArchitectureItem {
  id: string;
  title: string;
  subtitle: string;
  codeSnippet: string;
  specifications: { label: string; value: string }[];
  link: string;
}

interface ArchitectureDrawerProps {
  item: ArchitectureItem | null;
  onClose: () => void;
}

export default function ArchitectureDrawer({ item, onClose }: ArchitectureDrawerProps) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="w-full max-w-2xl h-full bg-obsidian-900 border-l border-white/10 shadow-2xl p-8 overflow-y-auto flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Header */}
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-electric-cyan uppercase mb-1">
                <FiLayers />
                <span>Architecture Inspection</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Inspector"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Specs Grid */}
          <div className="mb-8">
            <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FiActivity className="text-electric-gold" />
              <span>System Benchmarks & Specs</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {item.specifications.map((spec) => (
                <div key={spec.label} className="p-3.5 rounded-xl border border-white/5 bg-obsidian-800/50 backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-white/40 uppercase">{spec.label}</div>
                  <div className="text-sm font-mono font-bold text-electric-cyan mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Viewer */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                <FiCode className="text-electric-cyan" />
                <span>Engine Implementation (WGSL / TS)</span>
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors"
              >
                {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-white/80 overflow-x-auto leading-relaxed shadow-inner">
              <code>{item.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-6 border-t border-white/10">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-electric-cyan text-obsidian-900 font-bold text-sm tracking-wide uppercase hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          >
            Launch System / View Research Record ↗
          </a>
        </div>
      </div>
    </div>
  );
}
