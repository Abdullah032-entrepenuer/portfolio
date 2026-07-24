'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function BeaconRings() {
  const torus1Ref = useRef<THREE.Mesh>(null);
  const torus2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (torus1Ref.current) {
      torus1Ref.current.rotation.x += delta * 0.5;
      torus1Ref.current.rotation.y += delta * 0.8;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.y -= delta * 0.6;
      torus2Ref.current.rotation.z += delta * 0.4;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group scale={1.3}>
      {/* Outer Rotating Ring 1 */}
      <Torus ref={torus1Ref} args={[1.5, 0.02, 16, 100]}>
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.6} />
      </Torus>

      {/* Outer Rotating Ring 2 */}
      <Torus ref={torus2Ref} args={[1.2, 0.03, 16, 100]}>
        <meshBasicMaterial color="#FFD700" transparent opacity={0.5} />
      </Torus>

      {/* Pulsing Core */}
      <Icosahedron ref={coreRef} args={[0.6, 0]}>
        <meshStandardMaterial
          color="#00F0FF"
          wireframe
          emissive="#00F0FF"
          emissiveIntensity={0.8}
        />
      </Icosahedron>
    </group>
  );
}

export default function BeaconMesh() {
  return (
    <div className="w-full h-full min-h-[250px] relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} color="#00F0FF" intensity={2} />
        <BeaconRings />
      </Canvas>
    </div>
  );
}
