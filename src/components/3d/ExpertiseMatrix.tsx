'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollContext } from '@/providers/ScrollContext';

const SKILLS = [
  { name: 'React', level: 95, desc: 'Component architecture, Hooks, Context, Performance Optimization.' },
  { name: 'Next.js', level: 95, desc: 'App Router, SSR/SSG, API Routes, Middleware, Vercel Edge.' },
  { name: 'Three.js', level: 85, desc: 'WebGL, Shaders, PBR Materials, Physics, Scene Graph.' },
  { name: 'Node.js', level: 90, desc: 'REST APIs, Microservices, Event Loop, Streams, Auth.' },
  { name: 'System Design', level: 88, desc: 'Scalable cloud architectures, Database schema design, High availability.' },
  { name: 'Figma', level: 90, desc: 'Prototyping, Design Systems, Wireframing, UI/UX.' },
  { name: 'TypeScript', level: 90, desc: 'Static typing, Generics, Utility types, Next.js integration.' },
  { name: 'MongoDB', level: 85, desc: 'Aggregation pipelines, Indexing, Data modeling, Mongoose.' },
  { name: 'PostgreSQL', level: 80, desc: 'Relational logic, Joins, Triggers, Prisma ORM.' },
  { name: 'WebGL', level: 80, desc: 'GLSL, Fragment/Vertex Shaders, Render Pipeline.' },
  { name: 'TailwindCSS', level: 95, desc: 'Utility-first design, Design token variables, Responsive.' },
  { name: 'Docker', level: 75, desc: 'Containerization, Docker Compose, CI/CD.' },
  { name: 'AWS', level: 80, desc: 'S3, EC2, Lambda, CloudFront, Route53.' },
  { name: 'GSAP', level: 85, desc: 'Advanced timeline animations, ScrollTrigger, Physics.' },
  { name: 'WebSockets', level: 85, desc: 'Real-time bidirectional communication, Socket.io.' },
];

function getFibonacciSpherePoints(samples: number, radius: number) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); 
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2; 
    const radiusAtY = Math.sqrt(1 - y * y); 
    const theta = phi * i; 
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

export default function ExpertiseMatrix() {
  const groupRef = useRef<THREE.Group>(null);
  const { subscribe } = useScrollContext();
  const [activeNode, setActiveNode] = useState<any>(null);
  
  // Create sphere points based on skills count
  const points = useMemo(() => getFibonacciSpherePoints(SKILLS.length, 3.2), []);
  
  // Track scroll section (About is index 3)
  const scrollState = useRef({ sectionIndex: 0, progress: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  
  const { viewport } = useThree();

  useMemo(() => {
    subscribe((state) => {
      scrollState.current.sectionIndex = state.sectionIndex;
      scrollState.current.progress = state.sectionProgress;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smoothly interpolate mouse for tilt
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, targetX, 0.1);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, targetY, 0.1);

    // Auto-rotation + Mouse tilt
    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.rotation.x = -mouse.current.y;
    groupRef.current.rotation.z = -mouse.current.x * 0.5;

    // Scroll visibility logic (About section is index 3)
    const isVisible = scrollState.current.sectionIndex === 3;
    const targetScale = isVisible ? 1 : 0.001; // Scale to near zero when not in About section
    
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    
    // Position it to the right side of the screen if wide, or centered if mobile
    const targetPosX = viewport.width > 8 ? 2.5 : 0;
    const targetPosY = viewport.width > 8 ? 0 : 2;
    groupRef.current.position.lerp(new THREE.Vector3(targetPosX, targetPosY, 0), 0.05);
  });

  return (
    <>
      <group ref={groupRef}>
        {SKILLS.map((skill, i) => (
          <SkillNode 
            key={skill.name} 
            position={points[i]} 
            skill={skill} 
            onClick={() => setActiveNode(skill)} 
          />
        ))}
        {/* Core structure */}
        <mesh>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshBasicMaterial color="#020202" wireframe transparent opacity={0.1} />
        </mesh>
      </group>
      
      {/* HTML Overlay for the active skill */}
      {activeNode && (
        <Html center position={[viewport.width > 8 ? 2.5 : 0, 0, 4]} zIndexRange={[100, 0]}>
          <div style={{
            background: 'rgba(2, 2, 2, 0.85)',
            border: '1px solid var(--mint)',
            padding: '2rem',
            borderRadius: '12px',
            color: '#fff',
            width: '320px',
            backdropFilter: 'blur(12px)',
            fontFamily: 'var(--font-body)',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.15)',
            transform: 'translateY(-50%)',
            pointerEvents: 'auto'
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {activeNode.name}
            </h3>
            <div style={{
              width: '100%',
              height: '2px',
              background: 'rgba(255,255,255,0.1)',
              marginBottom: '1rem',
              position: 'relative'
            }}>
               <div style={{
                 position: 'absolute',
                 left: 0,
                 top: 0,
                 height: '100%',
                 width: `${activeNode.level}%`,
                 background: 'var(--mint)',
                 boxShadow: '0 0 10px var(--mint)'
               }} />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {activeNode.desc}
            </p>
            <button 
              onClick={() => setActiveNode(null)}
              style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--mint)';
                e.currentTarget.style.color = 'var(--mint)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              DISMISS
            </button>
          </div>
        </Html>
      )}
    </>
  );
}

function SkillNode({ position, skill, onClick }: { position: THREE.Vector3, skill: any, onClick: () => void }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate relative scale based on proficiency (80-95 maps to 0.7-1.1)
  const scale = ((skill.level - 70) / 25) * 0.5 + 0.6;
  
  useFrame(({ camera }) => {
    if (ref.current) {
      // Billboarding
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group position={position} ref={ref} scale={scale}>
      {/* Visual node indicator */}
      <mesh position={[0, -0.2, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? "#06B6D4" : "#8B5CF6"} 
          transparent 
          opacity={hovered ? 1 : 0.6} 
        />
      </mesh>

      <Text
        fontSize={hovered ? 0.35 : 0.28}
        color={hovered ? '#06B6D4' : 'rgba(250, 250, 250, 0.85)'}
        anchorX="center"
        anchorY="middle"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        material-toneMapped={false}
      >
        {skill.name}
      </Text>
    </group>
  );
}
