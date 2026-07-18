'use client';

import dynamic from 'next/dynamic';
import MagneticCursor from '@/components/ui/MagneticCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ScrollProvider } from '@/providers/ScrollContext';
import { LenisProvider } from '@/providers/LenisProvider';

const SceneProvider = dynamic(() => import('@/components/3d/SceneProvider'), {
  ssr: false,
  loading: () => null,
});

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ScrollProvider>
      <LenisProvider>
        {/* Global persistent 3D Canvas — always behind content */}
        <SceneProvider />

        {/* UI layer — sits above the 3D scene */}
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
