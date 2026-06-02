'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────── Distorted Sphere ─────────────── */
function DistortedSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.15 + mouse.y * 0.3;
    mesh.current.rotation.y = t * 0.2 + mouse.x * 0.3;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow>
        <icosahedronGeometry args={[1.6, 4]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.38}
          speed={2.2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          emissive="#3B0764"
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Wireframe Rings ─────────────── */
function OrbitRing({ radius, color, speed, tilt }: { radius: number; color: string; speed: number; tilt: number }) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.z = clock.getElapsedTime() * speed;
  });

  const lineObj = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.3, 0, 2 * Math.PI, false, 0);
    const points = curve.getPoints(120);
    const geo = new THREE.BufferGeometry().setFromPoints(
      points.map(p => new THREE.Vector3(p.x, p.y, 0))
    );
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const obj = new THREE.Line(geo, mat);
    obj.rotation.x = tilt;
    return obj;
  }, [radius, color, tilt]);

  return <primitive ref={lineRef} object={lineObj} />;
}

/* ─────────────── Floating Particles ─────────────── */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return [pos];
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#C8FF00"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ─────────────── Scene ─────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#C8FF00" />
      <pointLight position={[-5, -3, -5]} intensity={1.0} color="#8B5CF6" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#06B6D4" />

      <Stars radius={80} depth={50} count={2000} factor={3} saturation={0} fade speed={0.6} />
      <FloatingParticles />
      <DistortedSphere />
      <OrbitRing radius={2.8} color="#C8FF00" speed={0.5} tilt={Math.PI / 4} />
      <OrbitRing radius={3.4} color="#8B5CF6" speed={-0.35} tilt={Math.PI / 6} />
      <OrbitRing radius={4.0} color="#06B6D4" speed={0.22} tilt={Math.PI / 2.5} />
    </>
  );
}

/* ─────────────── HeroCanvas ─────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  );
}
