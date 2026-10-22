'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { profile } from '@/data/profile';
import { StarIcon } from '@/components/ui/StarIcon';
import { Magnetic } from '@/lib/motion';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-[80vh] flex flex-col justify-between py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--cobalt)]/[0.02] rounded-full blur-[140px]" />

      <div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-6">
          <StarIcon className="text-[10px]" />
          <span>Get In Touch</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-light)] leading-[0.95] max-w-5xl mb-6"
        >
          Let&apos;s engineer something extraordinary<span className="text-[var(--silk)]">.</span>
        </motion.h2>

        <p className="font-body text-lg sm:text-xl text-[var(--color)]/50 max-w-lg leading-relaxed mb-10">
          Open to design engineering roles, full-stack systems, and data analytics challenges.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${profile.email}`}
              className="px-7 py-3.5 rounded-full btn-cobalt text-sm font-display font-bold flex items-center gap-2.5 shadow-lg shadow-blue-600/30 hover:scale-105 transition-all duration-300"
            >
              <span>Send an Email</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={handleCopyEmail}
              className={`px-5 py-3.5 rounded-full text-[11px] font-mono transition-all duration-300 hover:scale-105 ${
                copied
                  ? 'bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-500/40'
                  : 'btn-outline hover:border-[var(--silk)]/60 hover:text-[var(--silk)]'
              }`}
            >
              {copied ? '✓ Copied to clipboard' : `${profile.email}`}
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Footer Social Bar */}
      <div className="pt-16 border-t border-[var(--color)]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 text-[10px] font-mono text-[var(--muted)]">
        <div className="flex items-center gap-1.5 p-1 rounded-full glass-pill">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200"
          >
            GitHub ↗
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="px-3.5 py-1.5 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-200"
          >
            Email ↗
          </a>
          <span className="px-3.5 py-1.5 text-[var(--color)]/15">
            LinkedIn (TODO)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>{profile.phone}</span>
          <span className="text-[var(--color)]/10">•</span>
          <span className="text-[var(--silk)]/60">Chennai, India</span>
        </div>
      </div>
    </section>
  );
}
