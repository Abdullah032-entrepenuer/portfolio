'use client';

import { useEffect, useRef } from 'react';
import { useScrollContext, ScrollState } from '@/providers/ScrollContext';

/**
 * Returns a ref that is updated every frame with current scroll velocity.
 * Uses a ref (not state) to avoid re-renders — read `.current` in useFrame or RAF.
 */
export function useScrollVelocity() {
  const { subscribe } = useScrollContext();
  const velocityRef = useRef(0);

  useEffect(() => {
    return subscribe((state: ScrollState) => {
      velocityRef.current = state.velocity;
    });
  }, [subscribe]);

  return velocityRef;
}

/**
 * Returns a ref with 0-1 page progress and a ref with 0-1 section progress.
 */
export function useScrollProgress() {
  const { subscribe } = useScrollContext();
  const progressRef = useRef(0);
  const sectionProgressRef = useRef(0);
  const sectionIndexRef = useRef(0);

  useEffect(() => {
    return subscribe((state: ScrollState) => {
      progressRef.current = state.progress;
      sectionProgressRef.current = state.sectionProgress;
      sectionIndexRef.current = state.sectionIndex;
    });
  }, [subscribe]);

  return { progressRef, sectionProgressRef, sectionIndexRef };
}
