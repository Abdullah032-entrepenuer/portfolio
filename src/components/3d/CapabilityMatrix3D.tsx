'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Float } from '@react-three/drei';
import * as THREE from 'three';

function QuantumCube() {
  const outerCubeRef = useRef<THREE.Mesh>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerCubeRef.current) {
      outerCubeRef.current.rotation.x += delta * 0.4;
      outerCubeRef.current.rotation.y += delta * 0.5;
    }
    if (innerCubeRef.current) {
      innerCubeRef.current.rotation.y -= delta * 0.6;
      innerCubeRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group scale={1.2}>
        {/* Outer 3D Physical Glass Cube */}
        <Box ref={outerCubeRef} args={[1.8, 1.8, 1.8]}>
          <meshPhysicalMaterial
            color="#00F0FF"
            wireframe={false}
            roughness={0.1}
            metalness={0.2}
            transmission={0.8}
            thickness={1.2}
            ior={1.5}
            clearcoat={1.0}
            transparent
            opacity={0.6}
          />
        </Box>

        {/* Inner Metallic Core */}
        <Box ref={innerCubeRef} args={[1, 1, 1]}>
          <meshPhysicalMaterial
            color="#FFD700"
            roughness={0.05}
            metalness={0.95}
            emissive="#FFD700"
            emissiveIntensity={0.5}
          />
        </Box>
      </group>
    </Float>
  );
}

export default function CapabilityMatrix3D() {
  return (
    <div className="w-full h-full min-h-[220px] relative flex items-center justify-center pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} color="#00F0FF" intensity={3} />
        <pointLight position={[5, 5, 5]} color="#FFD700" intensity={2} />
        <QuantumCube />
      </Canvas>
    </div>
  );
}
