'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

const PARTICLE_COUNT = 1500;

/**
 * Atmosphere color presets per section.
 * Smoothly interpolated based on scroll position.
 */
const ATMOSPHERES = [
  { fog: new THREE.Color('#0d0520'), light1: '#8B5CF6', light2: '#06B6D4', light3: '#F472B6', intensity: 1.0 },  // Hero
  { fog: new THREE.Color('#060f14'), light1: '#06B6D4', light2: '#8B5CF6', light3: '#06B6D4', intensity: 0.8 },  // Services
  { fog: new THREE.Color('#120a06'), light1: '#F97316', light2: '#8B5CF6', light3: '#F472B6', intensity: 0.9 },  // Vault
  { fog: new THREE.Color('#060a14'), light1: '#8B5CF6', light2: '#3B82F6', light3: '#06B6D4', intensity: 0.7 },  // About
  { fog: new THREE.Color('#140614'), light1: '#F472B6', light2: '#8B5CF6', light3: '#F472B6', intensity: 1.2 },  // Contact
];

/**
 * Nebula particle system — always on, velocity-reactive.
 */
function NebulaParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { subscribe } = useScrollContext();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const velocityRef = useRef(0);
  const sectionRef = useRef(0);
  const sectionProgressRef = useRef(0);

  // Subscribe to scroll updates
  useMemo(() => {
    subscribe((state) => {
      velocityRef.current = state.velocity;
      sectionRef.current = state.sectionIndex;
      sectionProgressRef.current = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-calculate particle data
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20 - 5
        ),
        baseSpeed: 0.1 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.03,
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.002,
          (Math.random() - 0.5) * 0.001
        ),
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    const vel = Math.abs(velocityRef.current);
    const velFactor = Math.min(vel / 5, 1);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i];
      const speed = p.baseSpeed * (1 + velFactor * 3);

      // Floating motion + velocity stretch
      dummy.position.set(
        p.position.x + Math.sin(time * speed + p.offset) * 0.3,
        p.position.y + Math.cos(time * speed * 0.7 + p.offset) * 0.3 + p.drift.y * time * 100,
        p.position.z + Math.sin(time * speed * 0.5 + p.offset) * 0.2
      );

      // Scale up slightly when scrolling fast
      const dynamicScale = p.scale * (1 + velFactor * 0.5);
      dummy.scale.setScalar(dynamicScale);

      // Stretch along Y when velocity is high (speed lines effect)
      if (velFactor > 0.3) {
        dummy.scale.y = dynamicScale * (1 + velFactor * 2);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial
        color="#FAFAFA"
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}

/**
 * Dynamic lighting rig that shifts color temperature per section.
 */
function AtmosphericLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const light3Ref = useRef<THREE.PointLight>(null);
  const { subscribe } = useScrollContext();

  const sectionRef = useRef(0);
  const progressRef = useRef(0);

  useMemo(() => {
    subscribe((state) => {
      sectionRef.current = state.sectionIndex;
      progressRef.current = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tempColor = useMemo(() => new THREE.Color(), []);
  const targetColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const idx = sectionRef.current;
    const t = progressRef.current;
    const current = ATMOSPHERES[idx] || ATMOSPHERES[0];
    const next = ATMOSPHERES[Math.min(idx + 1, ATMOSPHERES.length - 1)] || current;

    if (light1Ref.current) {
      tempColor.set(current.light1);
      targetColor.set(next.light1);
      light1Ref.current.color.lerp(tempColor.lerp(targetColor, t), 0.05);
      light1Ref.current.intensity = THREE.MathUtils.lerp(
        light1Ref.current.intensity,
        THREE.MathUtils.lerp(current.intensity * 2, next.intensity * 2, t),
        0.05
      );
    }
    if (light2Ref.current) {
      tempColor.set(current.light2);
      targetColor.set(next.light2);
      light2Ref.current.color.lerp(tempColor.lerp(targetColor, t), 0.05);
    }
    if (light3Ref.current) {
      tempColor.set(current.light3);
      targetColor.set(next.light3);
      light3Ref.current.color.lerp(tempColor.lerp(targetColor, t), 0.05);
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={light1Ref} position={[5, 5, 5]} intensity={2.0} color="#8B5CF6" />
      <pointLight ref={light2Ref} position={[-5, -3, -5]} intensity={1.5} color="#06B6D4" />
      <pointLight ref={light3Ref} position={[0, 0, 3]} intensity={1.0} color="#F472B6" />
    </>
  );
}

/**
 * Environment3D — the always-on atmospheric backbone.
 * Contains particles, adaptive lighting, starfield, and fog.
 */
export default function Environment3D() {
  const { scene } = useThree();
  const { subscribe } = useScrollContext();

  const sectionRef = useRef(0);
  const progressRef = useRef(0);
  const targetFog = useMemo(() => new THREE.Color(), []);

  useMemo(() => {
    subscribe((state) => {
      sectionRef.current = state.sectionIndex;
      progressRef.current = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize fog
  useMemo(() => {
    scene.fog = new THREE.FogExp2('#0d0520', 0.015);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (!scene.fog) return;
    const fog = scene.fog as THREE.FogExp2;
    const idx = sectionRef.current;
    const t = progressRef.current;
    const current = ATMOSPHERES[idx] || ATMOSPHERES[0];
    const next = ATMOSPHERES[Math.min(idx + 1, ATMOSPHERES.length - 1)] || current;

    targetFog.copy(current.fog).lerp(next.fog, t);
    fog.color.lerp(targetFog, 0.03);
  });

  return (
    <>
      <AtmosphericLights />
      <NebulaParticles />
      <Stars
        radius={80}
        depth={50}
        count={800}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <Environment preset="city" resolution={64} />
    </>
  );
}
