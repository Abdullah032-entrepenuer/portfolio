import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
};

export const metadata: Metadata = {
  title: 'Abdullah Awais — Full-Stack Developer & Senior Engineer',
  description:
    'Engineering Digital Luxury. Full-Stack Developer specializing in MERN, Next.js, and immersive 3D WebGL experiences. Available for high-performance freelance projects.',
  keywords: [
    'Full-Stack Developer', 'MERN Stack', 'Next.js', 'React Three Fiber',
    'WebGL', 'Three.js', 'Senior Engineer', 'Abdullah Awais', 'Freelance Developer',
  ],
  authors: [{ name: 'Abdullah Awais' }],
  openGraph: {
    title: 'Abdullah Awais — Full-Stack Developer & Senior Engineer',
    description: 'Engineering Digital Luxury. MERN, Next.js, and 3D web experiences.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdullah Awais — Full-Stack Developer & Senior Engineer',
    description: 'Engineering Digital Luxury. MERN, Next.js, and 3D web experiences.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
    >
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
