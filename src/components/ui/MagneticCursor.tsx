'use client';

import { useEffect, useRef } from 'react';

/**
 * MagneticCursor — Premium cursor replacement with context awareness.
 *
 * Features:
 * - Smooth-following ring with spring physics
 * - Magnetic pull toward interactive elements
 * - Context morphing (expand on buttons, crosshair on 3D)
 * - Velocity trail on fast movement
 */
export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let prevX = 0, prevY = 0;
    let velocity = 0;
    let rafId: number;
    let isHoveringInteractive = false;
    let magnetTarget: { x: number; y: number } | null = null;

    const TRAIL_COUNT = 5;
    const trailPositions = Array.from({ length: TRAIL_COUNT }, () => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      velocity = Math.sqrt(dx * dx + dy * dy);
      prevX = mouseX;
      prevY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check for nearby interactive elements (magnetic pull)
      const nearbyElements = document.elementsFromPoint(e.clientX, e.clientY);
      let foundInteractive = false;

      for (const el of nearbyElements) {
        if (
          el.matches('a, button, [data-cursor="pointer"], input, textarea, select') &&
          !el.matches('[data-cursor="none"]')
        ) {
          foundInteractive = true;
          const rect = el.getBoundingClientRect();
          magnetTarget = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
          break;
        }
      }

      if (!foundInteractive) {
        magnetTarget = null;
      }
    };

    const animate = () => {
      // Determine effective position (with magnetic pull)
      let effectiveX = mouseX;
      let effectiveY = mouseY;

      if (magnetTarget && isHoveringInteractive) {
        const pullStrength = 0.2;
        effectiveX = mouseX + (magnetTarget.x - mouseX) * pullStrength;
        effectiveY = mouseY + (magnetTarget.y - mouseY) * pullStrength;
      }

      // Dot follows immediately
      dot.style.transform = `translate(${effectiveX}px, ${effectiveY}px) translate(-50%, -50%)`;

      // Ring follows with spring-like lag
      const springFactor = isHoveringInteractive ? 0.15 : 0.1;
      ringX += (effectiveX - ringX) * springFactor;
      ringY += (effectiveY - ringY) * springFactor;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      // Trail — only visible at high velocity
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trailPositions[i].x += (trailPositions[i - 1].x - trailPositions[i].x) * 0.3;
        trailPositions[i].y += (trailPositions[i - 1].y - trailPositions[i].y) * 0.3;
      }
      trailPositions[0].x = effectiveX;
      trailPositions[0].y = effectiveY;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const trail = trailRefs.current[i];
        if (trail) {
          const opacity = velocity > 8 ? Math.max(0, (1 - i / TRAIL_COUNT) * 0.3 * Math.min(velocity / 30, 1)) : 0;
          trail.style.transform = `translate(${trailPositions[i].x}px, ${trailPositions[i].y}px) translate(-50%, -50%)`;
          trail.style.opacity = String(opacity);
        }
      }

      velocity *= 0.9;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => {
      isHoveringInteractive = true;
      dot.style.width = '8px';
      dot.style.height = '8px';
      ring.style.width = '50px';
      ring.style.height = '50px';
      ring.style.borderColor = 'var(--neon)';
      ring.style.borderWidth = '2px';
    };

    const onMouseLeaveInteractive = () => {
      isHoveringInteractive = false;
      magnetTarget = null;
      dot.style.width = '6px';
      dot.style.height = '6px';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(250, 250, 250, 0.4)';
      ring.style.borderWidth = '1px';
    };

    const addInteractiveListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);
    addInteractiveListeners();

    const observer = new MutationObserver(addInteractiveListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const cursorBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 99998,
    borderRadius: '50%',
    willChange: 'transform',
  };

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          ...cursorBase,
          width: '6px',
          height: '6px',
          backgroundColor: '#FAFAFA',
          mixBlendMode: 'difference',
          transition: 'width 0.3s cubic-bezier(0.23,1,0.32,1), height 0.3s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          ...cursorBase,
          width: '36px',
          height: '36px',
          border: '1px solid rgba(250, 250, 250, 0.4)',
          transition: 'width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.3s ease, border-width 0.3s ease',
        }}
      />

      {/* Velocity trail dots */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          style={{
            ...cursorBase,
            width: `${4 - i * 0.5}px`,
            height: `${4 - i * 0.5}px`,
            backgroundColor: 'var(--neon)',
            opacity: 0,
            transition: 'opacity 0.15s ease',
          }}
        />
      ))}
    </>
  );
}
