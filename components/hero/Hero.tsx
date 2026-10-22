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
      {/* Corner ambient accents — positioned at outer edges away from center text */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--cobalt)]/[0.03] blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--silk)]/[0.03] blur-[140px] rounded-full" />
      </div>

      <CornerBrackets />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[10px] font-medium text-[var(--muted)] mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          <span>Available for design &amp; engineering roles</span>
          <span className="text-[var(--color)]/15">•</span>
          <span className="text-[var(--silk)]">Chennai</span>
        </motion.div>

        {/* Intro lead */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl font-normal text-[var(--muted)] mb-3 tracking-wide"
        >
          I am {profile.name} and I am a
        </motion.p>

        {/* Modern Aesthetic Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-syne)] text-6xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-extrabold tracking-[-0.04em] text-[var(--color-light)] leading-[0.9] mb-8 select-none"
        >
          <span>Designer</span>{' '}
          <span className="font-body italic font-normal text-[0.82em] text-[var(--silk)] px-1">
            &amp;
          </span>
          <br />
          <span>Developer</span>
          <span className="text-[var(--cobalt)]">.</span>
        </motion.h1>

        {/* Descriptor */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-lg sm:text-xl md:text-2xl text-[var(--color)]/60 max-w-xl leading-relaxed mb-12"
        >
          {profile.heroDescriptor}
        </motion.p>

        {/* CTA Buttons - Soft on eyes, premium studio finish */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-16"
        >
          <Magnetic strength={0.3}>
            <a
              href="#work"
              className="px-8 py-3.5 rounded-full btn-primary text-sm font-display font-semibold tracking-wide flex items-center gap-2.5 transition-all duration-300"
            >
              <span>Selected Work</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full btn-secondary text-sm font-display font-semibold tracking-wide flex items-center gap-2.5 transition-all duration-300"
            >
              <span>Contact</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* Info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full pt-6 border-t border-[var(--color)]/6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono text-[var(--muted)]"
        >
          <div className="flex items-center gap-2">
            <StarIcon className="text-[10px] text-[var(--silk)]/60" />
            <span>SRM Institute of Science and Technology · CGPA 8.5</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Big Data Analytics &amp; UI/UX</span>
            <span className="text-[var(--color)]/15">•</span>
            <span>
              Chennai {time ? `[${time}]` : ''}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
