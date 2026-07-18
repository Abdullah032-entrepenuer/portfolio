'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import { HeroData } from '@/lib/db';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useLenis } from '@/providers/LenisProvider';

export default function HeroSection({ data }: { data: HeroData }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getInstance } = useLenis();

  // Magnetic effect on CTA buttons
  const primaryBtnRef = useMagneticEffect({ strength: 0.25, radius: 60 });
  const ghostBtnRef = useMagneticEffect({ strength: 0.2, radius: 50 });

  const words = data?.words || ['Engineering', 'Digital', 'Luxury.'];
  const subWords = data?.subWords || [];
  const subText = data?.sub || '';
  const techList = data?.tech || [];

  useEffect(() => {
    // GSAP staggered entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Badge slides in
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.3
        );
      }

      // Words reveal with stagger
      const wordEls = headlineRef.current?.querySelectorAll('[data-word]');
      if (wordEls?.length) {
        tl.fromTo(wordEls,
          { opacity: 0, y: 60, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.08,
            ease: 'power4.out',
          },
          0.5
        );
      }

      // Sub text
      if (subRef.current) {
        tl.fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          1.0
        );
      }

      // CTAs
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
          1.2
        );
      }

      // Scroll indicator
      if (scrollRef.current) {
        tl.fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.8
        );
      }
    });

    return () => ctx.revert();
  }, [data]);

  const scrollTo = (target: string) => {
    const lenis = getInstance();
    const el = document.querySelector(target);
    if (lenis && el) {
      lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
    }
  };

  return (
    <section
      ref={containerRef}
      className={styles.hero}
      id="hero"
      aria-label="Hero section"
    >
      {/* Gradient overlays for depth — 3D shows through transparently */}
      <div className={styles.gradientLeft} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      {/* Content — floats above the global 3D scene */}
      <div className={`container ${styles.content}`}>
        {/* Badge */}
        <div ref={badgeRef} className={styles.badge} style={{ opacity: 0 }}>
          <span className={styles.badgeDot} />
          <span>Available for Projects</span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className={`text-hero ${styles.headline}`}>
          {words.map((word, i) => {
            const isHighlighted = word === 'Luxury.' || word.toLowerCase().includes('luxury') || word.toLowerCase().includes('digital') || i === words.length - 1;
            return (
              <span key={i} data-word className={`${styles.word} ${isHighlighted ? 'gradient-neon' : ''}`} style={{ display: 'inline-block', opacity: 0 }}>
                {word}
              </span>
            );
          })}
          <br />
          <span className={styles.headlineSecond}>
            {subWords.map((word, i) => (
              <span key={i} data-word className={styles.word} style={{ display: 'inline-block', opacity: 0 }}>
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subheadline */}
        <p ref={subRef} className={styles.sub} style={{ opacity: 0 }}>
          {subText}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className={styles.ctas}>
          <button
            ref={primaryBtnRef as React.RefObject<HTMLButtonElement | null>}
            id="cta-vault"
            className={`btn btn-primary ${styles.ctaPrimary}`}
            onClick={() => scrollTo('#vault')}
            aria-label="View the Vault — see selected projects"
          >
            View the Vault
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            ref={ghostBtnRef as React.RefObject<HTMLButtonElement | null>}
            id="cta-build"
            className={`btn btn-ghost ${styles.ctaGhost}`}
            onClick={() => scrollTo('#contact')}
            aria-label="Let's Build — get in touch"
          >
            Let&apos;s Build
          </button>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className={styles.scrollIndicator} aria-hidden="true" style={{ opacity: 0 }}>
          <div className={styles.scrollLine} />
          <span className="text-label">Scroll</span>
        </div>
      </div>

      {/* Tech strip */}
      <div className={styles.techStrip} aria-label="Technology stack">
        {techList.map((tech) => (
          <span key={tech} className={styles.techTag}>{tech}</span>
        ))}
      </div>
    </section>
  );
}
