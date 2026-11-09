'use client';

import React, { useState, useEffect } from 'react';
import { FiX, FiCopy, FiCheck, FiCode, FiLayers, FiActivity, FiExternalLink } from 'react-icons/fi';

export interface ArchitectureItem {
  id: string;
  title: string;
  subtitle: string;
  codeSnippet: string;
  architectureDiagram?: string;
  specifications: { label: string; value: string }[];
  link: string;
  linkLabel?: string;
}

interface ArchitectureDrawerProps {
  item: ArchitectureItem | null;
  onClose: () => void;
}

export default function ArchitectureDrawer({ item, onClose }: ArchitectureDrawerProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && item) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`System Architecture Inspector: ${item.title}`}
    >
      <div
        className="w-full max-w-2xl h-full bg-[#0B0C10] border-l border-white/10 shadow-2xl p-6 sm:p-8 overflow-y-auto flex flex-col justify-between custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Header */}
          <div className="flex justify-between items-start gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] uppercase mb-1.5">
                <FiLayers />
                <span>System Architecture &amp; Telemetry Blueprint</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">{item.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close Architecture Drawer"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Specs Grid */}
          <div className="mb-8">
            <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FiActivity className="text-[#10B981]" />
              <span>Quantified System Benchmarks &amp; Telemetry</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3.5 rounded-xl border border-white/[0.07] bg-[#050507]"
                >
                  <div className="text-[10px] font-mono text-white/45 uppercase">{spec.label}</div>
                  <div className="text-sm font-mono font-bold text-[#10B981] mt-1">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ASCII / Pipeline Architecture Topology if provided */}
          {item.architectureDiagram && (
            <div className="mb-8">
              <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FiLayers className="text-[#8B5CF6]" />
                <span>Dataflow &amp; Execution Topology</span>
              </h3>
              <pre className="p-4 rounded-xl bg-[#050507] border border-[#6366F1]/25 font-mono text-[11px] text-[#A5B4FC] overflow-x-auto leading-relaxed">
                <code>{item.architectureDiagram}</code>
              </pre>
            </div>
          )}

          {/* Code Snippet Viewer */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-mono text-white/50 uppercase tracking-widest flex items-center gap-2">
                <FiCode className="text-[#10B981]" />
                <span>Core Implementation Kernel (WGSL / TypeScript)</span>
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/75 hover:text-white transition-colors"
              >
                {copied ? <FiCheck className="text-[#10B981]" /> : <FiCopy />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-[#050507] border border-white/10 font-mono text-xs text-white/85 overflow-x-auto leading-relaxed shadow-inner">
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
            className="w-full py-4 rounded-xl bg-[#10B981] text-[#050507] font-mono font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-[#34D399] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            <span>{item.linkLabel || 'Launch Production System / Read Preprint'}</span>
            <FiExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
