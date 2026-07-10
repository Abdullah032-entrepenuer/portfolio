'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Counter animation (0 to 100)
      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: 2.5,
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
          }, 300);
        }
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#020202',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              overflow: 'hidden',
              display: 'flex'
            }}>
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#FAFAFA',
                  lineHeight: 1
                }}
              >
                SYSTEM.INIT
              </motion.span>
            </div>
            
            <div style={{
              width: '100%',
              maxWidth: '300px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              marginTop: '10px'
            }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--mint)', // Electric Violet
                  transformOrigin: 'left'
                }}
              />
            </div>

            <div style={{
               width: '100%',
               maxWidth: '300px',
               display: 'flex',
               justifyContent: 'space-between',
               fontFamily: 'var(--font-display)',
               fontSize: '0.8rem',
               fontWeight: 600,
               letterSpacing: '0.1em',
               color: 'rgba(250, 250, 250, 0.5)',
               marginTop: '5px'
            }}>
              <span>LXD</span>
              <span ref={counterRef}>000</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
