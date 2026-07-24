'use client';

import dynamic from 'next/dynamic';
import MagneticCursor from '@/components/ui/MagneticCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollProvider } from '@/providers/ScrollContext';
import { LenisProvider } from '@/providers/LenisProvider';

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollProvider>
      <LenisProvider>
        {/* Sleek, high-performance ambient cyber grid background */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-obsidian-900 overflow-hidden">
          {/* Subtle Cyber Grid */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '40px 40px' 
            }} 
          />
          {/* Ambient Neon Radial Orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-electric-cyan/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-electric-gold/10 blur-[120px] rounded-full" />
        </div>

        {/* UI layer — sits above ambient backdrop */}
        <MagneticCursor />
        <Navbar />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
        <Footer />
      </LenisProvider>
    </ScrollProvider>
  );
}
