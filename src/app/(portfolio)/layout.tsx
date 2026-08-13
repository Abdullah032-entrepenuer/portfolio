'use client';

import MagneticCursor from '@/components/ui/MagneticCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';
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
        <ScrollProgress />

        {/* UI layer */}
        <MagneticCursor />
        <Navbar />
        <div className="relative z-[1] w-full max-w-[100vw] overflow-x-clip">
          {children}
        </div>
        <Footer />
      </LenisProvider>
    </ScrollProvider>
  );
}
