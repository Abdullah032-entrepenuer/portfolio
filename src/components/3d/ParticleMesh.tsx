'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 160;
const MAX_DISTANCE = 2.4;

function FloatingGlassCore() {
  const crystal1Ref = useRef<THREE.Mesh>(null);
  const crystal2Ref = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (crystal1Ref.current) {
      crystal1Ref.current.rotation.x += delta * 0.25;
      crystal1Ref.current.rotation.y += delta * 0.35;
    }
    if (crystal2Ref.current) {
      crystal2Ref.current.rotation.y -= delta * 0.2;
      crystal2Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group position={[3.2, 0, -1]}>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.6}>
        <Icosahedron ref={crystal1Ref} args={[1.5, 0]}>
          <meshPhysicalMaterial
            color="#10B981"
            roughness={0.15}
            metalness={0.2}
            transmission={0.8}
            thickness={1.2}
            ior={1.5}
            clearcoat={1.0}
            transparent
            opacity={0.65}
          />
        </Icosahedron>
      </Float>

      <Float speed={2.4} rotationIntensity={1.6} floatIntensity={1.2}>
        <Octahedron ref={crystal2Ref} args={[0.85, 0]} position={[-2.4, 1.8, -1]}>
          <meshPhysicalMaterial
            color="#6366F1"
            roughness={0.1}
            metalness={0.9}
            clearcoat={1.0}
            emissive="#6366F1"
            emissiveIntensity={0.25}
          />
        </Octahedron>
      </Float>
    </group>
  );
}

function ParticleGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer, camera } = useThree();

  const particles = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      vel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        )
      );
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    return geo;
  }, [particles]);

  const targetPointer = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, targetPointer);

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;

      positions[idx] += particles.velocities[i].x;
      positions[idx + 1] += particles.velocities[i].y;
      positions[idx + 2] += particles.velocities[i].z;

      const dx = positions[idx] - targetPointer.x;
      const dy = positions[idx + 1] - targetPointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2.8 && dist > 0.001) {
        const force = (2.8 - dist) * 0.008;
        positions[idx] += (dx / dist) * force;
        positions[idx + 1] += (dy / dist) * force;
      }

      if (Math.abs(positions[idx]) > 10) particles.velocities[i].x *= -1;
      if (Math.abs(positions[idx + 1]) > 10) particles.velocities[i].y *= -1;
      if (Math.abs(positions[idx + 2]) > 8) particles.velocities[i].z *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx1 = i * 3;
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const idx2 = j * 3;

        const dx = positions[idx1] - positions[idx2];
        const dy = positions[idx1 + 1] - positions[idx2];
        const dz = positions[idx1 + 2] - positions[idx2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePositions.push(
            positions[idx1],
            positions[idx1 + 1],
            positions[idx1 + 2],
            positions[idx2],
            positions[idx2 + 1],
            positions[idx2 + 2]
          );
          const alpha = (1.0 - dist / MAX_DISTANCE) * 0.45;
          lineColors.push(0.06, 0.72, 0.5, alpha, 0.39, 0.4, 0.94, alpha);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial size={0.045} color="#10B981" transparent opacity={0.65} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <FloatingGlassCore />
    </group>
  );
}

function WireframeFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-[#050507]"
      aria-hidden="true"
    >
      <div className="w-64 h-64 rounded-full border border-dashed border-[#10B981]/20 animate-spin" />
    </div>
  );
}

export default function ParticleMesh() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

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
      className="w-full h-full min-h-[400px] relative"
    >
      <Suspense fallback={<WireframeFallback />}>
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} color="#10B981" intensity={3} />
          <pointLight position={[5, 5, 5]} color="#6366F1" intensity={2.5} />
          <ParticleGraph />
        </Canvas>
      </Suspense>
    </div>
  );
}
