'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

/**
 * Camera positions per section — smoothly interpolated.
 * [x, y, z, fov]
 */
const CAMERA_STATES: [number, number, number, number][] = [
  [0, 0, 8.5, 50],    // Hero: centered, standard
  [0, 0.5, 9, 48],    // Services: slight pull back
  [0, 0, 8, 52],      // Vault: closer, wider
  [0, -0.3, 9, 46],   // About: slight drift down
  [0, 0, 7.5, 55],    // Contact: close, wide — urgency
];

/**
 * ScrollReactor — bridges scroll velocity/progress → camera + scene.
 * Runs inside the R3F Canvas every frame.
 */
export default function ScrollReactor() {
  const { camera } = useThree();
  const { subscribe } = useScrollContext();

  const velocityRef = useRef(0);
  const sectionRef = useRef(0);
  const sectionProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Subscribe once
  useMemo(() => {
    subscribe((state) => {
      velocityRef.current = state.velocity;
      sectionRef.current = state.sectionIndex;
      sectionProgressRef.current = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track mouse for parallax
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const perspCam = camera as THREE.PerspectiveCamera;
    if (!perspCam.isPerspectiveCamera) return;

    const idx = sectionRef.current;
    const t = sectionProgressRef.current;
    const vel = velocityRef.current;
    const velAbs = Math.abs(vel);

    // Interpolate camera position between current and next section
    const current = CAMERA_STATES[idx] || CAMERA_STATES[0];
    const next = CAMERA_STATES[Math.min(idx + 1, CAMERA_STATES.length - 1)] || current;

    targetPos.set(
      THREE.MathUtils.lerp(current[0], next[0], t),
      THREE.MathUtils.lerp(current[1], next[1], t),
      THREE.MathUtils.lerp(current[2], next[2], t)
    );

    // Add mouse parallax
    targetPos.x += mouseRef.current.x * 0.3;
    targetPos.y += mouseRef.current.y * 0.2;

    // Smooth camera position
    tempPos.copy(perspCam.position);
    tempPos.lerp(targetPos, 0.04);
    perspCam.position.copy(tempPos);

    // FOV: expand slightly when scrolling fast (speed feel)
    const targetFov = THREE.MathUtils.lerp(current[3], next[3], t);
    const velocityFov = targetFov + Math.min(velAbs, 4) * 1.2;
    perspCam.fov = THREE.MathUtils.lerp(perspCam.fov, velocityFov, 0.06);
    perspCam.updateProjectionMatrix();

    // Subtle camera roll based on scroll direction
    const targetRoll = vel * 0.003;
    perspCam.rotation.z = THREE.MathUtils.lerp(perspCam.rotation.z, targetRoll, 0.05);
  });

  return null;
}
