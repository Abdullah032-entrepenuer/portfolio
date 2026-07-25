'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 250;
const MAX_DISTANCE = 2.5;

function FloatingGlassCore() {
  const crystal1Ref = useRef<THREE.Mesh>(null);
  const crystal2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (crystal1Ref.current) {
      crystal1Ref.current.rotation.x += delta * 0.3;
      crystal1Ref.current.rotation.y += delta * 0.4;
    }
    if (crystal2Ref.current) {
      crystal2Ref.current.rotation.y -= delta * 0.25;
      crystal2Ref.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <group position={[3.5, 0, -1]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Main 3D Physical Glass Crystal */}
        <Icosahedron ref={crystal1Ref} args={[1.6, 0]}>
          <meshPhysicalMaterial
            color="#00F0FF"
            roughness={0.1}
            metalness={0.1}
            transmission={0.85}
            thickness={1.2}
            ior={1.5}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.7}
          />
        </Icosahedron>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        {/* Secondary Iridescent Chrome Polyhedron */}
        <Octahedron ref={crystal2Ref} args={[0.9, 0]} position={[-2.5, 2, -1]}>
          <meshPhysicalMaterial
            color="#FFD700"
            roughness={0.05}
            metalness={0.95}
            clearcoat={1.0}
            reflectivity={1.0}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </Octahedron>
      </Float>
    </group>
  );
}

function ParticleGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, camera } = useThree();

  const particles = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02));
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

    raycaster.setFromCamera(mouse, camera);
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

      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        positions[idx] += (dx / dist) * force;
        positions[idx + 1] += (dy / dist) * force;
      }

      if (Math.abs(positions[idx]) > 10) particles.velocities[i].x *= -1;
      if (Math.abs(positions[idx + 1]) > 10) particles.velocities[i].y *= -1;
      if (Math.abs(positions[idx + 2]) > 10) particles.velocities[i].z *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const linePositions = [];
    const lineOpacities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const idx1 = i * 3;
        const idx2 = j * 3;

        const dx = positions[idx1] - positions[idx2];
        const dy = positions[idx1 + 1] - positions[idx2];
        const dz = positions[idx1 + 2] - positions[idx2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DISTANCE) {
          linePositions.push(
            positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
            positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
          );
          const alpha = 1.0 - dist / MAX_DISTANCE;
          lineOpacities.push(alpha, alpha);
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineOpacities.flatMap(a => [0, 0.94, 1, a]), 4));
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <FloatingGlassCore />
    </group>
  );
}

export default function ParticleMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} color="#00F0FF" intensity={3} />
      <pointLight position={[5, 5, 5]} color="#FFD700" intensity={2} />
      <ParticleGraph />
    </Canvas>
  );
}
