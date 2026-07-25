'use client';

import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[150] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-electric-cyan via-blue-500 to-electric-gold transition-all duration-150 ease-out shadow-[0_0_12px_#00F0FF]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
