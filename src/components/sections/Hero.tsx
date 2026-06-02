'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';

const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), {
  ssr: false,
  loading: () => <div className={styles.canvasPlaceholder} />,
});

const words = ['Engineering', 'Digital', 'Luxury.'];
const subWords = ['Bridging', 'the', 'gap', 'between', 'high‑performance', 'code', 'and', 'high‑fidelity', 'design.'];

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Staggered word reveal
    const spans = headlineRef.current?.querySelectorAll<HTMLSpanElement>('[data-word]');
    if (!spans) return;
    spans.forEach((span, i) => {
      span.style.animationDelay = `${0.1 + i * 0.08}s`;
      span.classList.add(styles.wordVisible);
    });
  }, []);

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
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Available for Projects</span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className={`text-hero ${styles.headline}`}>
          {words.map((word, i) => (
            <span key={i} data-word className={`${styles.word} ${word === 'Luxury.' ? 'gradient-neon' : ''}`}>
              {word}
            </span>
          ))}
          <br />
          <span className={styles.headlineSecond}>
            {subWords.map((word, i) => (
              <span key={i} data-word className={styles.word}>
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <p className={styles.sub}>
          Full‑Stack Developer specializing in MERN architectures
          and immersive 3D web experiences.
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
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
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <div className={styles.scrollLine} />
          <span className="text-label">Scroll</span>
        </div>
      </div>

      {/* Tech strip */}
      <div className={styles.techStrip} aria-label="Technology stack">
        {['React', 'Next.js', 'Node.js', 'MongoDB', 'Three.js', 'TypeScript', 'WebGL', 'Express'].map((tech) => (
          <span key={tech} className={styles.techTag}>{tech}</span>
        ))}
      </div>
    </section>
  );
}
