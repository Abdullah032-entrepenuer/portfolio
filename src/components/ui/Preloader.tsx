'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  const dismiss = useCallback(() => {
    setLoading(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const t1 = setTimeout(() => setStep(1), 220);
    const t2 = setTimeout(() => setStep(2), 480);

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 0.75,
        ease: 'power2.out',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counter.val).toString().padStart(3, '0');
          }
        },
        onComplete: () => {
          setTimeout(() => {
            dismiss();
          }, 180);
        },
      });
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('keydown', handleKeyDown);
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [dismiss]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          onClick={dismiss}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] px-6 cursor-pointer select-none"
          role="status"
          aria-label="System boot sequence"
        >
          {/* Ambient radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_60%)]" />

          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0B0C10]/90 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10B981]" />
                <span className="font-mono text-xs tracking-widest uppercase text-[#10B981]">
                  AA // KERNEL TELEMETRY v4.2
                </span>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="font-mono text-[11px] text-white/50 hover:text-white px-2.5 py-1 rounded border border-white/10 bg-white/5 transition-colors"
              >
                SKIP [ESC]
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs md:text-sm">
              <div className="flex items-center justify-between text-white/80">
                <span>MOUNTING WEBGPU COMPUTE SHADERS...</span>
                <span className="text-[#10B981] font-semibold">[OK]</span>
              </div>

              <div
                className={`flex items-center justify-between transition-opacity duration-200 ${
                  step >= 1 ? 'opacity-100 text-white/80' : 'opacity-30 text-white/40'
                }`}
              >
                <span>INITIALIZING MULTI-AGENT RAG PIPELINE...</span>
                <span className="text-[#10B981] font-semibold">[OK]</span>
              </div>

              <div
                className={`flex items-center justify-between transition-opacity duration-200 ${
                  step >= 2 ? 'opacity-100 text-white font-semibold' : 'opacity-30 text-white/40'
                }`}
              >
                <span>ABDULLAH AWAIS — FULL-STACK AI &amp; SPATIAL WEB ARCHITECT</span>
                <span className="text-[#6366F1] font-bold">[100%]</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="h-full w-full origin-left bg-gradient-to-r from-[#10B981] via-[#6366F1] to-[#8B5CF6]"
              />
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>VRAM ALLOCATION: READY</span>
              <div>
                <span ref={counterRef} className="text-[#10B981] font-semibold">
                  000
                </span>
                <span>%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
