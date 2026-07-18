'use client';

import { createContext, useContext, useRef, useCallback } from 'react';

export interface ScrollState {
  /** 0-1 total page progress */
  progress: number;
  /** Current scroll speed in px/s */
  velocity: number;
  /** Scroll direction: 1 = down, -1 = up */
  direction: 1 | -1;
  /** Which section (0-based) is currently dominant */
  sectionIndex: number;
  /** 0-1 progress within the current section */
  sectionProgress: number;
  /** Actual scroll position in px */
  scrollY: number;
}

type ScrollListener = (state: ScrollState) => void;

interface ScrollContextType {
  /** Current scroll state (mutable ref for perf — no re-renders) */
  getState: () => ScrollState;
  /** Subscribe to scroll updates (called every RAF) */
  subscribe: (listener: ScrollListener) => () => void;
  /** Update scroll state (called by LenisProvider) */
  update: (partial: Partial<ScrollState>) => void;
}

const defaultState: ScrollState = {
  progress: 0,
  velocity: 0,
  direction: 1,
  sectionIndex: 0,
  sectionProgress: 0,
  scrollY: 0,
};

const ScrollContext = createContext<ScrollContextType>({
  getState: () => defaultState,
  subscribe: () => () => {},
  update: () => {},
});

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const stateRef = useRef<ScrollState>({ ...defaultState });
  const listenersRef = useRef<Set<ScrollListener>>(new Set());

  const getState = useCallback(() => stateRef.current, []);

  const subscribe = useCallback((listener: ScrollListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const update = useCallback((partial: Partial<ScrollState>) => {
    Object.assign(stateRef.current, partial);
    listenersRef.current.forEach((listener) => listener(stateRef.current));
  }, []);

  return (
    <ScrollContext.Provider value={{ getState, subscribe, update }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollContext() {
  return useContext(ScrollContext);
}

export { ScrollContext };
