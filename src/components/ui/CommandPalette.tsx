'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiTerminal, FiExternalLink, FiCopy, FiCheck, FiArrowRight, FiCornerDownLeft } from 'react-icons/fi';

interface CommandOption {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null; // Toggle in navbar
      }
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
      label: 'Jump to Systems Showcase & Research',
      category: 'Navigation',
      action: () => {
        document.querySelector('#systems')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-services',
      label: 'Jump to Core Capabilities',
      category: 'Navigation',
      action: () => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-about',
      label: 'Jump to Person Behind Code (About)',
      category: 'Navigation',
      action: () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'nav-contact',
      label: 'Jump to Contact / Project Brief',
      category: 'Navigation',
      action: () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'doi-1',
      label: 'Copy Zenodo DOI: 10.5281/zenodo.21526081',
      category: 'Research Papers',
      action: () => handleCopy('https://doi.org/10.5281/zenodo.21526081'),
    },
    {
      id: 'doi-2',
      label: 'Copy Zenodo Record: 21527199',
      category: 'Research Papers',
      action: () => handleCopy('https://zenodo.org/records/21527199'),
    },
    {
      id: 'open-synapse',
      label: 'Launch Synapse AI Platform (Live)',
      category: 'External Apps',
      action: () => {
        window.open('https://synapse-server-5bb8.onrender.com/', '_blank');
        onClose();
      },
    },
    {
      id: 'open-autocare',
      label: 'Launch Auto Care Store (Live)',
      category: 'External Apps',
      action: () => {
        window.open('https://www.auto-care.me', '_blank');
        onClose();
      },
    },
    {
      id: 'email-copy',
      label: 'Copy Email Address: abdullahawais034@gmail.com',
      category: 'Actions',
      action: () => handleCopy('abdullahawais034@gmail.com'),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div 
      className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-obsidian-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-4 border-b border-white/10 bg-obsidian-800/50">
          <FiSearch className="text-electric-cyan text-lg mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section (e.g. 'systems', 'doi', 'synapse')..."
            className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none font-mono"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-white/50">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-white/40">
              No matching CLI commands found.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-electric-cyan/10 hover:border-electric-cyan/20 border border-transparent transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <FiTerminal className="text-white/40 group-hover:text-electric-cyan transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-electric-cyan transition-colors">
                      {cmd.label}
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">
                      {cmd.category}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {copiedText && cmd.label.includes(copiedText) ? (
                    <span className="text-xs font-mono text-green-400 flex items-center gap-1">
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
        <div className="px-4 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
          <span>Antigravity CLI v2.4 · Abdullah Awais</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
