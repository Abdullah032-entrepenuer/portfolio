'use client';

import { useEffect, useRef, useCallback } from 'react';

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

/**
 * useMagneticEffect — Makes an element subtly pull toward the cursor.
 * Attach the returned ref to any button/link for a magnetic hover effect.
 */
export function useMagneticEffect({ strength = 0.3, radius = 80 }: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    if (!ref.current) return;
    const el = ref.current;
    // Smooth lerp to target
    const currentTransform = el.style.transform;
    el.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius) * strength;
        posRef.current.x = dx * force;
        posRef.current.y = dy * force;
      } else {
        posRef.current.x *= 0.85;
        posRef.current.y *= 0.85;
      }
    };

    const onMouseLeave = () => {
      posRef.current.x = 0;
      posRef.current.y = 0;
      el.style.transform = 'translate(0px, 0px)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    };

    el.addEventListener('mousemove', onMouseMove as EventListener);
    el.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove as EventListener);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strength, radius, animate]);

  return ref;
}
