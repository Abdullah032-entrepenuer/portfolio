'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counter.val).toString().padStart(3, '0');
          }
        },
        onComplete: () => {
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
          }, 600);
        }
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  const text = "SYSTEM.INIT";

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1000px',
            backgroundColor: '#020202',
            overflow: 'hidden'
          }}
        >
          {/* Abstract 3D Background Rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 360, rotateZ: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            exit={{ opacity: 0, scale: 1.5, transition: { duration: 1 } }}
            style={{
              position: 'absolute',
              width: '50vw',
              height: '50vw',
              minWidth: '300px',
              minHeight: '300px',
              border: '1px dashed rgba(139, 92, 246, 0.08)',
              borderRadius: '50%',
              transformStyle: 'preserve-3d',
              zIndex: 1
            }}
          >
            <div style={{ position: 'absolute', inset: '-10%', border: '1px solid rgba(6, 182, 212, 0.05)', borderRadius: '50%', transform: 'rotateX(60deg) rotateY(30deg)' }} />
            <div style={{ position: 'absolute', inset: '10%', border: '1px solid rgba(139, 92, 246, 0.05)', borderRadius: '50%', transform: 'rotateX(-60deg) rotateY(-30deg)' }} />
          </motion.div>

          {/* Content Wrapper */}
          <motion.div 
            exit={{ opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', zIndex: 10, width: '100%', maxWidth: '400px', padding: '0 20px', willChange: 'transform, opacity' }}
          >
            
            {/* 3D Text Reveal */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
              lineHeight: 1,
              display: 'flex',
              gap: '2px',
              margin: 0
            }}>
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, rotateX: -90, y: 40 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  style={{ display: 'inline-block', transformStyle: 'preserve-3d', transformOrigin: 'bottom center', willChange: 'transform, opacity' }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--mint)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--mint)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 10px var(--mint)' }} />
              Initializing 3D Environment
            </motion.div>
            
            {/* Elite Segmented Progress Bar */}
            <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)', position: 'relative', overflow: 'hidden', marginTop: '20px' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--mint)', transformOrigin: 'left', boxShadow: '0 0 15px var(--mint-glow)' }}
              />
              {/* Scanline passing over the bar */}
              <motion.div
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }}
              />
            </div>

            {/* Counters and HUD */}
            <div style={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
               fontFamily: 'var(--font-display)',
               fontSize: '0.75rem',
               fontWeight: 600,
               letterSpacing: '0.15em',
               color: 'rgba(250, 250, 250, 0.4)'
            }}>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>LXD // AURA</motion.span>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: '4px' }}>
                <span ref={counterRef} style={{ color: 'var(--text-primary)' }}>000</span>
                <span>%</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Luxury Exit Curtains */}
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50vh', backgroundColor: '#020202', zIndex: 5, transformOrigin: 'top' }}
          />
          <motion.div
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50vh', backgroundColor: '#020202', zIndex: 5, transformOrigin: 'bottom' }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}

