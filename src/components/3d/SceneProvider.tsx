'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, PerformanceMonitor } from '@react-three/drei';
import Environment3D from './Environment3D';
import ScrollReactor from './ScrollReactor';
import HeroMonolith from './HeroMonolith';
import ServiceOrbs from './ServiceOrbs';
import VaultGallery3D from './VaultGallery3D';
import AboutPortal from './AboutPortal';
import ContactBeacon from './ContactBeacon';
import ExpertiseMatrix from './ExpertiseMatrix';
/**
 * Global Three.js scene that persists across the entire portfolio lifecycle.
 * Rendered as a fixed backdrop behind all HTML content.
 * Never re-initializes — the 3D world is always alive.
 */
export default function SceneProvider() {
  return (
    <div
      id="scene-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <PerformanceMonitor
          onDecline={() => {
            /* Handled by adaptive quality in Environment3D */
          }}
        >
          <Suspense fallback={null}>
            {/* Persistent atmospheric layer */}
            <Environment3D />

            {/* Scroll-driven reactor (camera, uniforms) */}
            <ScrollReactor />

            {/* Section-specific 3D elements */}
            <HeroMonolith />
            <ServiceOrbs />
            <VaultGallery3D />
            <AboutPortal />
            <ExpertiseMatrix />
            <ContactBeacon />

            {/* Preload all assets during preloader phase */}
            <Preload all />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
