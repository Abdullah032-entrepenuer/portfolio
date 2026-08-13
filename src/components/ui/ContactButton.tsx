'use client';

import { motion } from 'framer-motion';

export default function ContactButton() {
  return (
    <motion.a
      href="mailto:abdullahawais034@gmail.com"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-4 rounded-full text-white font-medium text-lg tracking-wide uppercase overflow-hidden inline-block"
      style={{
        background: 'linear-gradient(90deg, #626771 0%, #303338 50%, #9DAAB5 100%)',
        boxShadow: 'inset 0px -2px 10px rgba(0,0,0,0.5), inset 0px 2px 10px rgba(255,255,255,0.2)',
      }}
    >
      {/* Subtle inner shine */}
      <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
      Contact
    </motion.a>
  );
}
