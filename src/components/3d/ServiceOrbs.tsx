'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

/**
 * Service Orbs — 3D representations for each service offering.
 * Orbit formation that spreads apart as user scrolls into the services section.
 */

interface OrbConfig {
  geometry: 'icosahedron' | 'octahedron' | 'torusKnot';
  color: string;
  emissive: string;
  basePosition: [number, number, number];
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
}

const ORB_CONFIGS: OrbConfig[] = [
  {
    geometry: 'icosahedron',
    color: '#8B5CF6',
    emissive: '#8B5CF6',
    basePosition: [-3, 0, -2],
    orbitRadius: 3.5,
    orbitSpeed: 0.3,
    orbitOffset: 0,
  },
  {
    geometry: 'octahedron',
    color: '#06B6D4',
    emissive: '#06B6D4',
    basePosition: [3, 1, -2],
    orbitRadius: 3.5,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 0.667,
  },
  {
    geometry: 'torusKnot',
    color: '#F472B6',
    emissive: '#F472B6',
    basePosition: [0, -2, -2],
    orbitRadius: 3.5,
    orbitSpeed: 0.3,
    orbitOffset: Math.PI * 1.333,
  },
];

function ServiceOrb({ config, index }: { config: OrbConfig; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { subscribe } = useScrollContext();

  const scrollState = useRef({ sectionIndex: 0, sectionProgress: 0, velocity: 0 });
  useMemo(() => {
    subscribe((state) => {
      scrollState.current.sectionIndex = state.sectionIndex;
      scrollState.current.sectionProgress = state.sectionProgress;
      scrollState.current.velocity = state.velocity;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const { sectionIndex, sectionProgress } = scrollState.current;

    // Orbs are only visible around the services section (index 1)
    // Fade in as approaching, full during, fade out after
    let visibility = 0;
    if (sectionIndex === 0) {
      // Approaching: start fading in at 70% through hero
      visibility = Math.max(0, (sectionProgress - 0.7) / 0.3);
    } else if (sectionIndex === 1) {
      visibility = 1;
    } else if (sectionIndex === 2) {
      visibility = Math.max(0, 1 - sectionProgress * 2);
    }

    // Orbit around center
    const spread = sectionIndex >= 1 ? 1 : 0.3;
    const angle = time * config.orbitSpeed + config.orbitOffset;
    const radius = config.orbitRadius * spread;

    meshRef.current.position.x = Math.cos(angle) * radius;
    meshRef.current.position.y = Math.sin(angle * 0.7) * radius * 0.4 + config.basePosition[1] * spread;
    meshRef.current.position.z = Math.sin(angle) * radius * 0.3 + config.basePosition[2];

    // Rotation
    meshRef.current.rotation.x = time * 0.5 + index;
    meshRef.current.rotation.y = time * 0.3 + index * 2;

    // Scale with visibility
    const targetScale = visibility * (0.6 + Math.sin(time * 2 + index) * 0.05);
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.08));
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        {config.geometry === 'icosahedron' && <icosahedronGeometry args={[0.8, 1]} />}
        {config.geometry === 'octahedron' && <octahedronGeometry args={[0.8, 0]} />}
        {config.geometry === 'torusKnot' && <torusKnotGeometry args={[0.5, 0.15, 64, 8]} />}
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

export default function ServiceOrbs() {
  return (
    <group>
      {ORB_CONFIGS.map((config, i) => (
        <ServiceOrb key={i} config={config} index={i} />
      ))}
    </group>
  );
}
