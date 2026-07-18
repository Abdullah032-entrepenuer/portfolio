'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Lenis from 'lenis';
import { useScrollContext } from './ScrollContext';

interface LenisContextType {
  /** Get the Lenis instance (may be null during SSR / before mount) */
  getInstance: () => Lenis | null;
}

const LenisContext = createContext<LenisContextType>({
  getInstance: () => null,
});

/** Section IDs in order — used to compute sectionIndex */
const SECTION_IDS = ['hero', 'services', 'vault', 'about', 'contact'];

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);
  const { update } = useScrollContext();

  const getInstance = useCallback(() => lenisRef.current, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });
    lenisRef.current = lenis;

    // Compute which section is visible and update scroll context
    const computeSectionState = (scrollY: number) => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id));
      const viewportHeight = window.innerHeight;

      let currentIndex = 0;
      let currentProgress = 0;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionHeight = rect.height;

        // Section is "dominant" when its top is above the viewport center
        if (scrollY + viewportHeight / 2 >= sectionTop) {
          currentIndex = i;
          currentProgress = Math.min(
            1,
            Math.max(0, (scrollY + viewportHeight / 2 - sectionTop) / sectionHeight)
          );
        }
      }

      return { sectionIndex: currentIndex, sectionProgress: currentProgress };
    };

    // Lenis scroll handler
    lenis.on('scroll', (e: Lenis) => {
      const scrollY = e.scroll;
      const totalHeight = e.limit;
      const velocity = e.velocity;
      const direction = e.direction as 1 | -1;
      const progress = totalHeight > 0 ? scrollY / totalHeight : 0;

      const { sectionIndex, sectionProgress } = computeSectionState(scrollY);

      update({
        progress,
        velocity,
        direction,
        sectionIndex,
        sectionProgress,
        scrollY,
      });
    });

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Provide scroll-to for anchor navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"], button[data-scroll-to]');
      if (!target) return;

      const href = target.getAttribute('href') || target.getAttribute('data-scroll-to');
      if (!href || !href.startsWith('#')) return;

      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.2 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [update]);

  return (
    <LenisContext.Provider value={{ getInstance }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
