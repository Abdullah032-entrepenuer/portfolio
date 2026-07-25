'use client';

import { useState, useEffect } from 'react';

export default function TelemetryHUD() {
  const [fps, setFps] = useState(60);
  const [webGpuSupport, setWebGpuSupport] = useState<boolean | null>(null);

  useEffect(() => {
    // Check WebGPU capability
    if (typeof navigator !== 'undefined' && 'gpu' in navigator) {
      setWebGpuSupport(true);
    } else {
      setWebGpuSupport(false);
    }

    // Measure live FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="inline-flex items-center gap-4 px-4 py-2 rounded-2xl bg-obsidian-800/80 border border-white/10 backdrop-blur-xl text-xs font-mono text-white/70 shadow-lg">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
        <span className="text-white font-semibold">{fps} FPS</span>
      </div>

      <div className="h-3 w-px bg-white/10" />

      <div className="flex items-center gap-1.5">
        <span className="text-white/40">LATENCY:</span>
        <span className="text-electric-gold font-semibold">0.4ms</span>
      </div>

      <div className="h-3 w-px bg-white/10" />

      <div className="flex items-center gap-1.5">
        <span className="text-white/40">WEBGPU:</span>
        <span className={webGpuSupport ? 'text-green-400 font-semibold' : 'text-cyan-400 font-semibold'}>
          {webGpuSupport === null ? 'INIT' : webGpuSupport ? 'ACTIVE' : 'FALLBACK'}
        </span>
      </div>
    </div>
  );
}
