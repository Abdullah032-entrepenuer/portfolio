'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  const words = text.trim().split(/\s+/);

  return (
    <p
      ref={containerRef}
      className={`leading-relaxed ${className}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            isLast={i === words.length - 1}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  isLast,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isLast: boolean;
}) {
  const opacity = useTransform(progress, range, [0.28, 1]);

  return (
    <>
      <motion.span
        style={{ opacity }}
        className="inline-block transition-colors duration-200"
      >
        {word}
      </motion.span>
      {!isLast && ' '}
    </>
  );
}
