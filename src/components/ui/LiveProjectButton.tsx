'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function LiveProjectButton({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ backgroundColor: '#D7E2EA', color: '#0C0C0C' }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#D7E2EA] text-[#D7E2EA] uppercase text-sm tracking-wider font-medium transition-colors duration-300"
    >
      Live Project
      <ArrowUpRight className="w-4 h-4" />
    </motion.a>
  );
}
