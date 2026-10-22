'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { usePrefersReducedMotion } from '@/lib/motion';

function subscribe() {
  return () => {};
}

export function CustomCursor() {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable on coarse pointer (touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (
        target.closest('a, button, input, textarea, [role="button"], .hoverable')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isClient || reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isVisible ? (isHovered ? 0.9 : 0.5) : 0,
          borderColor: isHovered ? 'var(--silk)' : 'var(--muted)',
          backgroundColor: isHovered
            ? 'rgba(232, 132, 158, 0.12)'
            : 'rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="w-9 h-9 rounded-full border border-solid pointer-events-none transition-colors"
      />

      {/* Center Precise Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovered ? 'var(--silk)' : 'var(--color-light)',
        }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        className="w-1.5 h-1.5 rounded-full pointer-events-none fixed top-0 left-0"
      />
    </div>
  );
}
