'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

const SHARD_COUNT = 150;

/**
 * KineticMonolith — the hero's signature 3D element.
 * An icosahedron core orbited by tessellated shards on a Fibonacci sphere.
 * Enhanced with scroll-driven dissolve and velocity-based chaos.
 */
function KineticMonolith() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const { subscribe } = useScrollContext();

  const scrollRef = useRef({ velocity: 0, sectionIndex: 0, sectionProgress: 0 });
  useMemo(() => {
    subscribe((state) => {
      scrollRef.current.velocity = state.velocity;
      scrollRef.current.sectionIndex = state.sectionIndex;
      scrollRef.current.sectionProgress = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Temp vectors for GC optimization
  const tempTargetPos = useMemo(() => new THREE.Vector3(), []);
  const tempWorldPos = useMemo(() => new THREE.Vector3(), []);
  const tempDir = useMemo(() => new THREE.Vector3(), []);
  const tempNoise = useMemo(() => new THREE.Vector3(), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const basePositions = useMemo(() => {
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < SHARD_COUNT; i++) {
      const y = 1 - (i / (SHARD_COUNT - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const v = new THREE.Vector3(x, y, z);
      const r = 2.4 + Math.random() * 0.8;
      v.multiplyScalar(r);

      const rot = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize())
      );
      rot.y += Math.random() * Math.PI * 2;

      pos.push({
        basePos: v,
        currentPos: v.clone(),
        baseRot: rot,
        currentRot: rot.clone(),
        scale: 0.6 + Math.random() * 1.2,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * 100,
        dissolveDir: v.clone().normalize(), // Direction to scatter when scrolling past hero
      });
    }
    return pos;
  }, []);

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const targetPointer = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();
    const { sectionIndex, sectionProgress, velocity } = scrollRef.current;

    // Dissolve factor: when scrolling past hero, shards scatter outward
    const dissolve = sectionIndex === 0
      ? Math.pow(sectionProgress, 2) * 0.5
      : Math.min(1, 0.5 + sectionProgress * 0.5);

    // Visibility: fade out as user scrolls deep into subsequent sections
    const visibilityFactor = sectionIndex <= 1 ? 1 : Math.max(0, 1 - (sectionIndex - 1) * 0.3);

    // Map mouse pointer to 3D world plane
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, targetPointer);

    if (meshRef.current) {
      for (let i = 0; i < SHARD_COUNT; i++) {
        const data = basePositions[i];

        const noiseX = Math.sin(time * data.speed + data.offset) * 0.15;
        const noiseY = Math.cos(time * data.speed * 0.8 + data.offset) * 0.15;
        const noiseZ = Math.sin(time * data.speed * 1.2 + data.offset) * 0.15;

        tempNoise.set(noiseX, noiseY, noiseZ);
        tempTargetPos.copy(data.basePos).add(tempNoise);

        // Dissolve: scatter shards outward
        tempTargetPos.addScaledVector(data.dissolveDir, dissolve * 6);

        // Velocity chaos: add extra displacement when scrolling fast
        const velChaos = Math.abs(velocity) * 0.1;
        tempTargetPos.x += Math.sin(time * 3 + i) * velChaos;
        tempTargetPos.y += Math.cos(time * 2.5 + i * 0.5) * velChaos;

        // Get world position for mouse repulsion
        tempWorldPos.copy(tempTargetPos);
        if (groupRef.current) {
          tempWorldPos.applyMatrix4(groupRef.current.matrixWorld);
        }

        // Mouse repulsion (only active when hero is visible)
        if (sectionIndex === 0) {
          const distToMouse = tempWorldPos.distanceTo(targetPointer);
          const maxDist = 3.8;
          if (distToMouse < maxDist) {
            const force = Math.pow((maxDist - distToMouse) / maxDist, 1.5);
            tempDir.copy(tempWorldPos).sub(targetPointer).normalize();
            tempTargetPos.add(tempDir.multiplyScalar(force * 3.5));
            data.currentRot.x += force * 0.15;
            data.currentRot.z += force * 0.15;
          } else {
            data.currentRot.x = THREE.MathUtils.lerp(data.currentRot.x, data.baseRot.x, 0.05);
            data.currentRot.z = THREE.MathUtils.lerp(data.currentRot.z, data.baseRot.z, 0.05);
          }
        }

        data.currentPos.lerp(tempTargetPos, 0.08);

        dummy.position.copy(data.currentPos);
        dummy.rotation.copy(data.currentRot);
        dummy.scale.setScalar(data.scale * visibilityFactor);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05 + pointer.x * 0.3;
      groupRef.current.rotation.x = pointer.y * 0.3;
      groupRef.current.updateMatrixWorld();
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = time * -0.2;
      coreRef.current.rotation.z = time * 0.1;
      const scale = (1.0 + Math.sin(time * 3) * 0.06) * visibilityFactor;
      coreRef.current.scale.setScalar(scale);
    }

    if (innerRef.current) {
      const scale = 0.85 * visibilityFactor;
      innerRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* The Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.3, 2]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={1.8}
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Inner crimson wireframe for depth */}
        <mesh ref={innerRef} scale={0.85}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.0}
            wireframe
          />
        </mesh>

        {/* Outer Monolith Shards */}
        <instancedMesh ref={meshRef} args={[undefined, undefined, SHARD_COUNT]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial
            color="#020202"
            metalness={1.0}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            envMapIntensity={3.0}
          />
        </instancedMesh>
      </group>
    </Float>
  );
}

/**
 * HeroMonolith — scroll-aware wrapper.
 * The monolith dissolves as user scrolls past the hero section.
 */
export default function HeroMonolith() {
  return <KineticMonolith />;
}
