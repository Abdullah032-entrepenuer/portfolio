'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= delta * 0.15;
      wireframeRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group scale={1.8}>
      {/* Inner Distorted Core */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00F0FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Outer Wireframe Sphere */}
      <Sphere ref={wireframeRef} args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color="#FFD700"
          wireframe
          transparent
          opacity={0.25}
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
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#00F0FF" intensity={2} />
        <RotatingGlobe />
      </Canvas>
    </div>
  );
}
