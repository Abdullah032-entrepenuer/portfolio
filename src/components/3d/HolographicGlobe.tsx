'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const chromeCoreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.05;
    }
    if (chromeCoreRef.current) {
      chromeCoreRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group scale={1.8}>
      {/* Chrome Core Inner Mesh */}
      <Sphere ref={chromeCoreRef} args={[0.5, 32, 32]}>
        <meshPhysicalMaterial
          color="#FFD700"
          roughness={0.05}
          metalness={0.95}
          emissive="#FFD700"
          emissiveIntensity={0.4}
        />
      </Sphere>

      {/* Inner Distorted Physical Glass Shell */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00F0FF"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.8}
          thickness={1.5}
          transparent
          opacity={0.7}
        />
      </Sphere>

      {/* Outer Wireframe Ring */}
      <Sphere ref={wireframeRef} args={[1.25, 32, 32]}>
        <meshBasicMaterial
          color="#FFD700"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>
    </group>
  );
}

export default function HolographicGlobe() {
  return (
    <div className="w-full h-full min-h-[300px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} color="#00F0FF" intensity={3} />
        <pointLight position={[5, 5, 5]} color="#FFD700" intensity={2} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}
