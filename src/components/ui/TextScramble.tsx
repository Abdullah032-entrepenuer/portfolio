'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function TextScramble({
  text,
  className = '',
  scrambleOnHover = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isAnimatingRef = useRef(false);

  const scramble = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / 3) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, 25);
  };

  useEffect(() => {
    scramble();
  }, [text]);

  return (
    <span
      className={`inline-block font-mono cursor-default ${className}`}
      onMouseEnter={() => scrambleOnHover && scramble()}
    >
      {displayText}
    </span>
  );
}
