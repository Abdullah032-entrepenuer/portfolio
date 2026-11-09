'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function BeaconRings() {
  const torus1Ref = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (torus1Ref.current) {
      torus1Ref.current.rotation.x += delta * 0.45;
      torus1Ref.current.rotation.y += delta * 0.7;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.y -= delta * 0.55;
      torus2Ref.current.rotation.z += delta * 0.35;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.25;
      coreRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group scale={1.25}>
      <Torus ref={torus1Ref} args={[1.45, 0.035, 24, 80]}>
        <meshPhysicalMaterial
          color="#10B981"
          metalness={0.9}
          roughness={0.12}
          clearcoat={1.0}
          emissive="#10B981"
          emissiveIntensity={0.25}
        />
      </Torus>

      <Torus ref={torus2Ref} args={[1.15, 0.04, 24, 80]}>
        <meshPhysicalMaterial
          color="#6366F1"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1.0}
          emissive="#6366F1"
          emissiveIntensity={0.25}
        />
      </Torus>

      <Icosahedron ref={coreRef} args={[0.6, 0]}>
        <meshPhysicalMaterial
          color="#10B981"
          wireframe
          roughness={0.1}
          metalness={0.8}
          emissive="#10B981"
          emissiveIntensity={0.45}
        />
      </Icosahedron>
    </group>
  );
}

export default function BeaconMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Interactive 3D Spatial Architecture Visualization"
      className="w-full h-full min-h-[220px] aspect-[16/9] relative flex items-center justify-center"
    >
      <Suspense
        fallback={
          <div className="w-24 h-24 rounded-full border border-dashed border-[#10B981]/30 animate-spin" />
        }
      >
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[5, 5, 5]} color="#10B981" intensity={3} />
          <pointLight position={[-5, -5, -5]} color="#6366F1" intensity={2} />
          <BeaconRings />
        </Canvas>
      </Suspense>
    </div>
  );
}
