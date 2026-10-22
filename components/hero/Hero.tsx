'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { profile } from '@/data/profile';
import { CornerBrackets } from '@/components/ui/CornerBrackets';
import { StarIcon } from '@/components/ui/StarIcon';
import { Magnetic } from '@/lib/motion';

export function Hero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-28 md:py-36 overflow-hidden bg-[var(--background)]">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--cobalt)]/12 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-[350px] h-[350px] bg-[var(--silk)]/8 blur-[120px] rounded-full" />
      </div>

      {/* Architectural framing corners & star */}
      <CornerBrackets />

      {/* Main Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-medium text-[var(--color)]/80 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Available for UI/UX &amp; Engineering Roles</span>
          <span className="text-[var(--color)]/30">•</span>
          <span className="text-[var(--silk)]">Chennai, India</span>
        </motion.div>

        {/* Small Intro Lead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl font-normal text-[var(--color)]/60 mb-3 tracking-wide"
        >
          I am {profile.name} and I am a
        </motion.p>

        {/* Giant Monolithic Display Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--color-light)] uppercase leading-[0.92] mb-6"
        >
          Designer <span className="text-[var(--silk)] font-serif italic font-normal">&amp;</span>
          <br />
          Developer<span className="text-[var(--cobalt)]">.</span>
        </motion.h1>

        {/* Core Descriptor (from CONTENT.md) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xl sm:text-2xl md:text-3xl text-[var(--color)]/80 max-w-2xl leading-relaxed mb-10"
        >
          {profile.heroDescriptor}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              className="px-7 py-3.5 rounded-full bg-[var(--color)] text-[var(--background)] font-display text-sm font-semibold tracking-wide hover:bg-[var(--silk)] transition-all duration-200 shadow-md flex items-center gap-2"
            >
              <span>Selected Work</span>
              <span>↓</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full glass-pill text-[var(--color)] font-display text-sm font-semibold tracking-wide hover:bg-[var(--color)]/10 hover:border-[var(--color)]/40 transition-all duration-200 flex items-center gap-2"
            >
              <span>Contact</span>
              <span>↗</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Live Status Bar Footer inside Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full pt-8 border-t border-[var(--color)]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-[var(--color)]/50"
        >
          <div className="flex items-center gap-2">
            <StarIcon className="text-sm text-[var(--silk)]" />
            <span>SRM Institute of Science and Technology · CGPA 8.5</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Big Data Analytics &amp; UI/UX</span>
            <span>•</span>
            <span className="text-[var(--color)]/80">
              Chennai {time ? `[${time}]` : ''}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
