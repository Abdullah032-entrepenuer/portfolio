'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import { HeroData } from '@/lib/db';

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), {
  ssr: false,
  loading: () => <div className={styles.canvasPlaceholder} />,
});

export default function Hero({ data }: { data: HeroData }) {
  const containerRef = useRef<HTMLElement>(null);

  const words = data?.words || ['Precision', 'Immersive', 'Digital', 'Architecture.'];
  const subWords = data?.subWords || ['I', 'architect', 'high‑performance', 'digital', 'environments.'];
  const subText = data?.sub || '';
  const techList = data?.tech || [];

  return (
    <section ref={containerRef} className={styles.hero} id="hero" aria-label="Hero section">
      {/* 3D Canvas */}
      <div className={styles.canvasWrapper} aria-hidden="true">
        <HeroCanvas />
      </div>

      {/* Radial gradient overlays */}
      <div className={styles.gradientLeft} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className={styles.badge}
        >
          <span className={styles.badgeDot} />
          <span>Available for Projects</span>
        </motion.div>

        {/* Headline */}
        <h1 className={`text-hero ${styles.headline}`}>
          {words.map((word, wordIndex) => {
            const isHighlighted = word === 'Luxury.' || word.toLowerCase().includes('luxury') || word.toLowerCase().includes('digital') || wordIndex === words.length - 1;
            return (
              <span key={wordIndex} className={isHighlighted ? 'gradient-neon' : ''} style={{ display: 'inline-flex', overflow: 'hidden', paddingRight: '0.2em' }}>
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ y: '120%', rotate: 10, opacity: 0 }}
                    animate={{ y: '0%', rotate: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.3 + (wordIndex * 0.1) + (charIndex * 0.015)
                    }}
                    style={{ display: 'inline-block', transformOrigin: 'top left' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            );
          })}
          <br />
          <span className={styles.headlineSecond} style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap', marginTop: '12px' }}>
            {subWords.map((word, wordIndex) => (
              <span key={wordIndex} style={{ display: 'inline-flex', overflow: 'hidden', paddingRight: '0.25em' }}>
                <motion.span
                  initial={{ y: '120%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.6 + (wordIndex * 0.05)
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
          className={styles.sub}
        >
          {subText}
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1.0 }}
          className={styles.ctas}
        >
          <button
            id="cta-vault"
            className={`btn btn-primary ${styles.ctaPrimary}`}
            onClick={() => document.querySelector('#vault')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View the Vault — see selected projects"
          >
            View the Vault
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            id="cta-build"
            className={`btn btn-ghost ${styles.ctaGhost}`}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Let's Build — get in touch"
          >
            Let's Build
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className={styles.scrollIndicator} aria-hidden="true"
        >
          <div className={styles.scrollLine} />
          <span className="text-label">Scroll</span>
        </motion.div>
      </div>

      {/* Tech strip */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className={styles.techStrip} aria-label="Technology stack"
      >
        {techList.map((tech) => (
          <span key={tech} className={styles.techTag}>{tech}</span>
        ))}
      </motion.div>
    </section>
  );
}
