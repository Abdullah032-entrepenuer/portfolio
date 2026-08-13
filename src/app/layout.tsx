import type { Metadata, Viewport } from 'next';
import { Kanit } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/ui/Preloader';

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0C0C0C',
};

export const metadata: Metadata = {
  title: 'Abdullah Awais - Software Developer and Architect',
  description: 'Abdullah Awais — 3D Creator and Architect portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable}`}
      data-theme="dark"
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-[#D7E2EA] bg-[#0C0C0C]" suppressHydrationWarning>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
