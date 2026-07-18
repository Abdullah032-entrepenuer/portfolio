'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

/**
 * AboutPortal — an animated torus ring (portal gateway) that appears
 * as user scrolls into the About section.
 */
export default function AboutPortal() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { subscribe } = useScrollContext();

  const scrollState = useRef({ sectionIndex: 0, sectionProgress: 0 });
  useMemo(() => {
    subscribe((state) => {
      scrollState.current.sectionIndex = state.sectionIndex;
      scrollState.current.sectionProgress = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const { sectionIndex, sectionProgress } = scrollState.current;

    // Visibility: active during about section (index 3)
    let visibility = 0;
    if (sectionIndex === 2) {
      visibility = Math.max(0, (sectionProgress - 0.6) / 0.4);
    } else if (sectionIndex === 3) {
      visibility = 1;
    } else if (sectionIndex === 4) {
      visibility = Math.max(0, 1 - sectionProgress * 3);
    }

    if (groupRef.current) {
      const targetScale = visibility * 1.2;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.2;
      torusRef.current.rotation.y = time * 0.15;
      torusRef.current.rotation.z = time * 0.1;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -time * 0.3;
      innerRingRef.current.rotation.y = time * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {/* Outer portal ring */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2, 0.05, 16, 64]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner counter-rotating ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.5, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={1.0}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}
