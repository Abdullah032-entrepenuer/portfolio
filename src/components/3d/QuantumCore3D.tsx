'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';
import { MeshTransmissionMaterial } from '@react-three/drei';

/**
 * QuantumCore3D — A highly complex, mathematically driven TorusKnotGeometry 
 * rendered with a custom glass/metal PBR material that continuously morphs.
 * Acts as the centerpiece for the middle sections (Services and Vault Gallery).
 */
export default function QuantumCore3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { subscribe } = useScrollContext();

  const scrollState = useRef({ sectionIndex: 0, sectionProgress: 0, velocity: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    subscribe((state) => {
      scrollState.current.sectionIndex = state.sectionIndex;
      scrollState.current.sectionProgress = state.sectionProgress;
      scrollState.current.velocity = state.velocity;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track mouse for parallax/tilt
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const { sectionIndex, sectionProgress, velocity } = scrollState.current;

    // Visibility logic: Active heavily during Services (1) and Vault (2)
    let visibility = 0;
    if (sectionIndex === 0) {
      visibility = Math.max(0, (sectionProgress - 0.5) * 2); // Fades in at bottom of Hero
    } else if (sectionIndex === 1 || sectionIndex === 2) {
      visibility = 1;
    } else if (sectionIndex === 3) {
      visibility = Math.max(0, 1 - sectionProgress * 2); // Fades out as About comes in
    }

    if (groupRef.current) {
      // Smoothly scale based on visibility
      const targetScale = visibility * 1.5;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05));

      // Move it dynamically based on section
      // In Services (1), it could be on the right. In Vault (2), it could be centered behind the cards.
      let targetX = 0;
      let targetY = 0;
      let targetZ = -4; // Push back slightly

      if (sectionIndex === 1) {
        targetX = 3; 
        targetY = 1;
      } else if (sectionIndex === 2) {
        targetX = 0;
        targetY = 0;
        targetZ = -6; // Deeper behind vault cards
      }

      groupRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    }

    if (meshRef.current) {
      // Base rotation
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      
      // Add velocity-based spin distortion
      meshRef.current.rotation.z += velocity * 0.05;

      // Mouse-based subtle tilt
      const targetTiltX = mouse.current.y * 0.5;
      const targetTiltY = mouse.current.x * 0.5;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, meshRef.current.rotation.x + targetTiltX, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, meshRef.current.rotation.y + targetTiltY, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic TorusKnot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.4, 256, 64, 3, 4]} />
        {/* Elite Glass/Crystal Material using drei's MeshTransmissionMaterial */}
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#a8b1ff"
          attenuationDistance={2}
          attenuationColor="#ffffff"
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#00FFA3" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
