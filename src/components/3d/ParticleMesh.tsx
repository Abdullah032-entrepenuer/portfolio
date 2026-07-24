'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 300;
const MAX_DISTANCE = 2.5;

function ParticleGraph() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport, camera } = useThree();

  // Create random positions and velocities
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

    // Project mouse to 3D space
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, targetPointer);

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      
      // Add velocity
      positions[idx] += particles.velocities[i].x;
      positions[idx + 1] += particles.velocities[i].y;
      positions[idx + 2] += particles.velocities[i].z;

      // Mouse interaction (repel slightly)
      const dx = positions[idx] - targetPointer.x;
      const dy = positions[idx + 1] - targetPointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        positions[idx] += (dx / dist) * force;
        positions[idx + 1] += (dy / dist) * force;
      }

      // Bounce off walls
      if (Math.abs(positions[idx]) > 10) particles.velocities[i].x *= -1;
      if (Math.abs(positions[idx + 1]) > 10) particles.velocities[i].y *= -1;
      if (Math.abs(positions[idx + 2]) > 10) particles.velocities[i].z *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Connect lines
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
    </group>
  );
}

export default function ParticleMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
    >
      <ParticleGraph />
    </Canvas>
  );
}
