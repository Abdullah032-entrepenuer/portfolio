'use client';

import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export default function BorderBeam({
  className = '',
  size = 250,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = '#00F0FF',
  colorTo = '#FFD700',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={{
        '--size': `${size}px`,
        '--duration': `${duration}s`,
        '--anchor': '90deg',
        '--border-width': `${borderWidth}px`,
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--delay': `-${delay}s`,
      } as React.CSSProperties}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] ${className}`}
    >
      <div 
        className="absolute aspect-square w-[calc(var(--size)*1px)] animate-border-beam rounded-[inherit] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:calc(var(--anchor)*1deg)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
        style={{
          animationDelay: 'var(--delay)',
        }}
      />
    </div>
  );
}
