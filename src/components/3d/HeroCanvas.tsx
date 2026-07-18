'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

function KineticMonolith() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Dynamic shard count based on screen size to guarantee mobile performance
  const SHARD_COUNT = useMemo(() => (isMobile ? 30 : 150), [isMobile]);

  // Temp vectors for garbage collection optimization
  const tempTargetPos = useMemo(() => new THREE.Vector3(), []);
  const tempWorldPos = useMemo(() => new THREE.Vector3(), []);
  const tempDir = useMemo(() => new THREE.Vector3(), []);
  const tempNoise = useMemo(() => new THREE.Vector3(), []);

  // Pre-calculate base positions on a sphere using the Fibonacci sphere algorithm
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const basePositions = useMemo(() => {
    const pos = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < SHARD_COUNT; i++) {
      const y = 1 - (i / (SHARD_COUNT - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      const v = new THREE.Vector3(x, y, z);
      // Give them a base radius to form a hollow sphere
      const r = 2.4 + Math.random() * 0.8;
      v.multiplyScalar(r);
      
      // Store original rotation to point outwards
      const rot = new THREE.Euler().setFromQuaternion(
         new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize())
      );
      
      // randomize rotation around local Y axis for variety
      rot.y += Math.random() * Math.PI * 2;
      
      pos.push({
        basePos: v,
        currentPos: v.clone(),
        baseRot: rot,
        currentRot: rot.clone(),
        scale: 0.6 + Math.random() * 1.2, // increased scale slightly since there are fewer shards
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * 100,
      });
    }
    return pos;
  }, [SHARD_COUNT]);

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const targetPointer = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();

    // Map mouse pointer to 3D world plane at z=0
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane, targetPointer);

    if (meshRef.current) {
      for (let i = 0; i < SHARD_COUNT; i++) {
        const data = basePositions[i];
        
        // Add gentle floating noise to base position
        const noiseX = Math.sin(time * data.speed + data.offset) * 0.15;
        const noiseY = Math.cos(time * data.speed * 0.8 + data.offset) * 0.15;
        const noiseZ = Math.sin(time * data.speed * 1.2 + data.offset) * 0.15;
        
        tempNoise.set(noiseX, noiseY, noiseZ);
        tempTargetPos.copy(data.basePos).add(tempNoise);

        // Get world position of the shard to compare with mouse
        tempWorldPos.copy(tempTargetPos);
        if (groupRef.current) {
            tempWorldPos.applyMatrix4(groupRef.current.matrixWorld);
        }

        // Repulsion logic
        const distToMouse = tempWorldPos.distanceTo(targetPointer);
        const maxDist = 3.8;
        if (distToMouse < maxDist && !isMobile) { // Disable mouse repulsion physics on mobile
          const force = Math.pow((maxDist - distToMouse) / maxDist, 1.5); // non-linear force
          tempDir.copy(tempWorldPos).sub(targetPointer).normalize();
          
          tempTargetPos.add(tempDir.multiplyScalar(force * 3.5));
          
          // Add chaotic rotation when repelled
          data.currentRot.x += force * 0.15;
          data.currentRot.z += force * 0.15;
        } else {
          // smoothly return rotation
          data.currentRot.x = THREE.MathUtils.lerp(data.currentRot.x, data.baseRot.x, 0.05);
          data.currentRot.z = THREE.MathUtils.lerp(data.currentRot.z, data.baseRot.z, 0.05);
        }

        // Smoothly lerp current position to target position
        data.currentPos.lerp(tempTargetPos, 0.08);

        dummy.position.copy(data.currentPos);
        dummy.rotation.copy(data.currentRot);
        dummy.scale.setScalar(data.scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    if (groupRef.current) {
      // Global group rotation for parallax
      groupRef.current.rotation.y = time * 0.05 + pointer.x * 0.3;
      groupRef.current.rotation.x = pointer.y * 0.3;
      groupRef.current.updateMatrixWorld();
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = time * -0.2;
      coreRef.current.rotation.z = time * 0.1;
      const scale = 1.0 + Math.sin(time * 3) * 0.06;
      coreRef.current.scale.setScalar(scale);
    }
  });

  return (
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

      {/* A secondary crimson wireframe inside for depth */}
      <mesh scale={0.85}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshStandardMaterial 
          color="#06B6D4" 
          emissive="#06B6D4" 
          emissiveIntensity={1.0} 
          wireframe 
        />
      </mesh>

      {/* The Outer Monolith Shards */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, SHARD_COUNT]}>
        {/* Polyhedron makes great shard shapes */}
        <tetrahedronGeometry args={[0.5, 0]} />
        {isMobile ? (
          <meshStandardMaterial 
            color="#020202" 
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={2.0}
          />
        ) : (
          <meshPhysicalMaterial 
            color="#020202" 
            metalness={1.0}
            roughness={0.05}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            envMapIntensity={3.0}
          />
        )}
      </instancedMesh>
    </group>
  );
}

/* ─────────────── Scene ─────────────── */
function Scene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2.0} color="#8B5CF6" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[0, 0, 3]} intensity={1.0} color="#F472B6" />

      {/* Environment map for hyper-realistic glass/obsidian reflections */}
      <Environment preset="city" resolution={isMobile ? 64 : 128} />

      {/* Completely disable stars on mobile to save performance */}
      {!isMobile && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.8} />}
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <KineticMonolith />
      </Float>
    </>
  );
}

/* ─────────────── HeroCanvas ─────────────── */
export default function HeroCanvas() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 50 }}
      dpr={isMobile ? [0.5, 1] : [1, 1.5]}
      performance={{ min: 0.1 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  );
}
