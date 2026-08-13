'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 50%'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const characters = word.split('');
  const amount = range[1] - range[0];
  const step = amount / characters.length;

  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 0.2 }}>{word}</span>
      <span style={{ position: 'absolute', left: 0, top: 0, display: 'flex' }}>
        {characters.map((char, i) => {
          const start = range[0] + (i * step);
          const end = range[0] + ((i + 1) * step);
          const opacity = useTransform(progress, [start, end], [0, 1]);
          return (
            <motion.span key={i} style={{ opacity }}>
              {char}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
