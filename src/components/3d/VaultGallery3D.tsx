'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

const PANEL_COUNT = 5;

/**
 * VaultGallery3D — spatial project cards arranged on a curved arc.
 * Panels rotate with scroll, creating a carousel-like 3D gallery.
 */
function GalleryPanel({ index, total }: { index: number; total: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { subscribe } = useScrollContext();
  const scrollState = useRef({ sectionIndex: 0, sectionProgress: 0 });

  useMemo(() => {
    subscribe((state) => {
      scrollState.current.sectionIndex = state.sectionIndex;
      scrollState.current.sectionProgress = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Accent colors per project
  const colors = ['#F97316', '#8B5CF6', '#10B981', '#3B82F6', '#C8FF00'];

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const { sectionIndex, sectionProgress } = scrollState.current;

    // Visibility: active during vault section (index 2)
    let visibility = 0;
    if (sectionIndex === 1) {
      visibility = Math.max(0, (sectionProgress - 0.5) / 0.5);
    } else if (sectionIndex === 2) {
      visibility = 1;
    } else if (sectionIndex === 3) {
      visibility = Math.max(0, 1 - sectionProgress * 2);
    }

    // Arc arrangement: panels fan out from center
    const arcAngle = ((index - (total - 1) / 2) / total) * Math.PI * 0.6;
    const scrollOffset = sectionIndex === 2 ? sectionProgress * 0.5 : 0;
    const angle = arcAngle + scrollOffset + time * 0.02;

    const arcRadius = 6;
    meshRef.current.position.x = Math.sin(angle) * arcRadius;
    meshRef.current.position.z = Math.cos(angle) * arcRadius - arcRadius - 2;
    meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.1;

    // Face center
    meshRef.current.rotation.y = angle;

    // Scale with visibility
    const targetScale = visibility * 0.8;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.06));
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.4, 1.6]} />
      <meshStandardMaterial
        color={colors[index % colors.length]}
        emissive={colors[index % colors.length]}
        emissiveIntensity={0.15}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}

export default function VaultGallery3D() {
  return (
    <group>
      {Array.from({ length: PANEL_COUNT }, (_, i) => (
        <GalleryPanel key={i} index={i} total={PANEL_COUNT} />
      ))}
    </group>
  );
}
