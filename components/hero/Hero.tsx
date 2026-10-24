'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { profile } from '@/data/profile';
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
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-28 md:py-36 overflow-hidden bg-transparent">
      {/* Corner ambient accents — positioned at outer edges away from center text */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[var(--cobalt)]/[0.03] blur-[140px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--silk)]/[0.03] blur-[140px] rounded-full" />
      </div>

      {/* Architectural Studio Hero Section (Blending completely into background) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto p-4 sm:p-8 md:p-12">
        {/* Abstract Background Geometry (Concentric Elliptical Orbits & Ambient Glows) */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
          {/* Luminous dual aura flares */}
          <div className="absolute -top-24 left-1/4 w-80 h-80 bg-[var(--cobalt)]/[0.16] blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-[var(--silk)]/[0.16] blur-[120px] rounded-full" />

          {/* Abstract SVG Orbital Geometry */}
          <svg
            viewBox="0 0 800 800"
            className="w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] opacity-65 animate-[spin_90s_linear_infinite]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="400" cy="400" r="350" stroke="var(--color)" strokeWidth="1.2" strokeDasharray="4 8" opacity="0.45" />
            <circle cx="400" cy="400" r="270" stroke="var(--cobalt)" strokeWidth="1.3" strokeDasharray="8 12" opacity="0.55" />
            <ellipse cx="400" cy="400" rx="360" ry="160" stroke="url(#heroOrbitGrad1)" strokeWidth="1.6" opacity="0.75" transform="rotate(-30 400 400)" />
            <ellipse cx="400" cy="400" rx="380" ry="130" stroke="url(#heroOrbitGrad2)" strokeWidth="1.4" strokeDasharray="6 10" opacity="0.65" transform="rotate(35 400 400)" />
            <defs>
              <linearGradient id="heroOrbitGrad1" x1="0" y1="0" x2="800" y2="800" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--cobalt)" stopOpacity="0.8" />
                <stop offset="0.5" stopColor="var(--silk)" stopOpacity="0.9" />
                <stop offset="1" stopColor="var(--sun)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="heroOrbitGrad2" x1="800" y1="0" x2="0" y2="800" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--silk)" stopOpacity="0.8" />
                <stop offset="1" stopColor="var(--cobalt)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Architectural Curved Corner Borders (Blending seamlessly) */}
        {/* Top-Left Corner */}
        <div className="pointer-events-none absolute top-0 left-0 sm:top-1 sm:left-1 flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[var(--color)]/55 rounded-tl-xl" />
          <span className="text-[9px] font-mono tracking-widest text-[var(--muted)]/80 hidden sm:inline">[01 // HERO]</span>
        </div>

        {/* Top-Right Corner */}
        <div className="pointer-events-none absolute top-0 right-0 sm:top-1 sm:right-1 flex items-center gap-2">
          <span className="text-[9px] font-mono tracking-widest text-[var(--muted)]/80 hidden sm:inline">[SYS // 2026]</span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[var(--color)]/55 rounded-tr-xl" />
        </div>

        {/* Bottom-Left Corner */}
        <div className="pointer-events-none absolute bottom-0 left-0 sm:bottom-1 sm:left-1 flex items-center gap-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[var(--color)]/55 rounded-bl-xl" />
          <span className="text-[9px] font-mono tracking-widest text-[var(--muted)]/80 hidden sm:inline">[CRAFT × DATA]</span>
        </div>

        {/* Bottom-Right Corner with Abstract Rotating Star */}
        <div className="pointer-events-none absolute bottom-0 right-0 sm:bottom-1 sm:right-1 flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.15, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            <StarIcon className="text-xs text-[var(--silk)]" />
          </motion.div>
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[var(--color)]/55 rounded-br-xl" />
        </div>

        {/* Floating Abstract Ambient Star Accents */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-12 right-12 sm:top-14 sm:right-16 text-[var(--silk)]/65 hidden md:block"
        >
          <StarIcon className="text-lg" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-20 left-12 text-[var(--cobalt)]/65 hidden md:block"
        >
          <StarIcon className="text-sm" />
        </motion.div>

        {/* Inner Content */}
        <div className="flex flex-col items-center text-center">
          {/* Availability pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-[10px] font-medium text-[var(--muted)] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span>Available for Product &amp; Backend Engineering roles</span>
            <span className="text-[var(--color)]/15">•</span>
            <span className="text-[var(--silk)]">{profile.location}</span>
          </motion.div>

          {/* Intro lead - Bright, crisp, and clearly legible */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl font-medium text-[var(--color-light)] mb-3 tracking-wide drop-shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
          >
            I am <span className="font-semibold text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.35)]">{profile.name}</span> and I build
          </motion.p>

          {/* Aesthetic Bold Display Headline in Bricolage Grotesque */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.2rem] font-extrabold tracking-[-0.035em] text-[var(--color-light)] leading-[0.92] mb-7 select-none"
            style={{ fontVariationSettings: '"opsz" 96, "wdth" 100, "wght" 800' }}
          >
            <span>Product</span>{' '}
            <span className="font-body italic font-normal text-[0.82em] text-[var(--silk)] px-1 drop-shadow-[0_0_24px_rgba(255,77,126,0.65)]">
              &amp;
            </span>
            <br />
            <span>Backend</span>
            <span className="text-[var(--cobalt)] drop-shadow-[0_0_24px_rgba(59,91,255,0.7)]">.</span>
          </motion.h1>

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-base sm:text-lg md:text-xl text-[var(--color)]/80 max-w-xl leading-relaxed mb-10"
          >
            {profile.heroDescriptor}
          </motion.p>

          {/* CTA Buttons - Cobalt & Signature Vibrant Pink */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Magnetic strength={0.3}>
              <a
                href="#work"
                className="px-8 py-3.5 rounded-full btn-cobalt text-sm font-semibold tracking-wide flex items-center gap-2.5 transition-all duration-300"
              >
                <span>Selected Work</span>
                <span className="text-xs transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="px-8 py-3.5 rounded-full btn-silk text-sm font-semibold tracking-wide flex items-center gap-2.5 transition-all duration-300"
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
              <span>SRM Institute of Science and Technology · CGPA 9.01</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Distributed Systems &amp; Product Engineering</span>
              <span className="text-[var(--color)]/15">•</span>
              <span>
                India {time ? `[${time}]` : ''}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
