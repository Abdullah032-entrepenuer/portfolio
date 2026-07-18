'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette, Glitch } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useScrollContext } from '@/providers/ScrollContext';

export default function PostProcessingLayer() {
  const { subscribe } = useScrollContext();
  
  // Ref for dynamically adjusting effects
  const scrollState = useRef({ velocity: 0, sectionIndex: 0 });
  const glitchRef = useRef<any>(null);

  useMemo(() => {
    subscribe((state) => {
      scrollState.current.velocity = state.velocity;
      scrollState.current.sectionIndex = state.sectionIndex;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (!glitchRef.current) return;
    
    const { velocity, sectionIndex } = scrollState.current;
    
    // Trigger slight glitch on very fast scroll
    const vel = Math.abs(velocity);
    if (vel > 15) {
      glitchRef.current.active = true;
      glitchRef.current.factor = Math.min(vel / 50, 0.5);
    } else {
      glitchRef.current.active = false;
    }
  });

  return (
    <EffectComposer disableNormalPass multisampling={4}>
      {/* Bloom for emissive materials (monolith core, service orbs, neon accents) */}
      <Bloom 
        intensity={1.2} 
        luminanceThreshold={0.5} 
        luminanceSmoothing={0.9} 
        blendFunction={BlendFunction.SCREEN} 
      />
      
      {/* Cinematic noise/grain */}
      <Noise 
        premultiply 
        blendFunction={BlendFunction.OVERLAY} 
        opacity={0.3} 
      />
      
      {/* Vignette for depth */}
      <Vignette 
        eskil={false} 
        offset={0.1} 
        darkness={1.1} 
        blendFunction={BlendFunction.NORMAL} 
      />

      {/* Glitch effect triggered by high scroll velocity */}
      <Glitch
        ref={glitchRef}
        delay={[1.5, 3.5]} // min and max delay between glitches
        duration={[0.1, 0.3]} // min and max duration of a glitch
        strength={[0.1, 0.3]} // min and max strength
        active={false} // controlled via useFrame
        ratio={0.85}
      />
    </EffectComposer>
  );
}
