'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center mix-blend-difference">
      {/* Assuming the 4 links are spread out, or we can use a centered layout. The prompt says 'justify-between' for the nav bar with 4 links. */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center text-[#D7E2EA] uppercase text-sm font-medium tracking-widest">
        <Link href="#about" className="hover:opacity-70 transition-opacity duration-300">About</Link>
        <Link href="#projects" className="hover:opacity-70 transition-opacity duration-300">Projects</Link>
        <Link href="#contact" className="hover:opacity-70 transition-opacity duration-300">Contact</Link>
      </div>
    </nav>
  );
}
