'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

const BEACON_PARTICLES = 80;

/**
 * ContactBeacon — a pulsing orb/beacon that guides the eye toward the contact CTA.
 * Beacon intensity increases as user approaches the contact section.
 */
export default function ContactBeacon() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
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

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particleData = useMemo(() => {
    return Array.from({ length: BEACON_PARTICLES }, (_, i) => ({
      angle: (i / BEACON_PARTICLES) * Math.PI * 2,
      radius: 1.5 + Math.random() * 1.5,
      speed: 0.5 + Math.random() * 1.5,
      yOffset: (Math.random() - 0.5) * 2,
      scale: 0.02 + Math.random() * 0.04,
    }));
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const { sectionIndex, sectionProgress } = scrollState.current;

    // Visibility: active during contact section (index 4)
    let visibility = 0;
    if (sectionIndex === 3) {
      visibility = Math.max(0, (sectionProgress - 0.5) / 0.5);
    } else if (sectionIndex === 4) {
      visibility = 1;
    }

    if (groupRef.current) {
      const targetScale = visibility;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));
    }

    // Pulsing core
    if (coreRef.current) {
      const pulse = 1 + Math.sin(time * 3) * 0.15;
      coreRef.current.scale.setScalar(pulse * 0.5);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.5 + Math.sin(time * 4) * 0.5;
    }

    // Rotating rings
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.5;
      ringsRef.current.rotation.x = Math.sin(time * 0.3) * 0.3;
    }

    // Orbiting particles
    if (particlesRef.current) {
      for (let i = 0; i < BEACON_PARTICLES; i++) {
        const p = particleData[i];
        const angle = p.angle + time * p.speed;
        dummy.position.set(
          Math.cos(angle) * p.radius,
          p.yOffset + Math.sin(time * p.speed + i) * 0.3,
          Math.sin(angle) * p.radius
        );
        dummy.scale.setScalar(p.scale);
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      }
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Pulsing core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#F472B6"
          emissive="#F472B6"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Orbital rings */}
      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.015, 8, 64]} />
          <meshStandardMaterial color="#F472B6" emissive="#F472B6" emissiveIntensity={1} transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[1.5, 0.01, 8, 64]} />
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.8} transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Orbiting particles */}
      <instancedMesh ref={particlesRef} args={[undefined, undefined, BEACON_PARTICLES]}>
        <sphereGeometry args={[1, 4, 4]} />
        <meshBasicMaterial
          color="#F472B6"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  );
}
