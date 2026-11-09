import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Syne, Kanit } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/ui/Preloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-kanit',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050507',
};

export const metadata: Metadata = {
  title: 'Abdullah Awais — Full-Stack AI Engineer & Spatial Web Architect',
  description:
    'Full-Stack AI Engineer, Next.js Architect, and Published Systems Researcher specializing in Autonomous Multi-Agent RAG, WebGPU Compute Shaders, and 60 FPS React Three Fiber 3D Web Architectures.',
  keywords: [
    'Abdullah Awais',
    'Full-Stack AI Engineer',
    'Next.js Architect',
    'Spatial Web',
    'React Three Fiber',
    'WebGPU',
    'Multi-Agent RAG',
    'Three.js',
    'TypeScript',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${syne.variable} ${kanit.variable}`}
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-[#F3F4F6] bg-[#050507] selection:bg-[#10B981]/30 selection:text-[#10B981]" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
