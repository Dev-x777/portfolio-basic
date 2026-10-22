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
      className="relative min-h-[85vh] flex flex-col justify-between py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--cobalt)]/15 rounded-full blur-[140px]" />

      <div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-6">
          <StarIcon className="text-sm" />
          <span>Get In Touch</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[var(--color-light)] leading-[0.95] max-w-5xl mb-8"
        >
          Let&apos;s engineer something extraordinary<span className="text-[var(--silk)]">.</span>
        </motion.h2>

        <p className="font-body text-xl sm:text-2xl text-[var(--color)]/70 max-w-xl leading-relaxed mb-12">
          Open to design engineering roles, full-stack systems, and data analytics challenges.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${profile.email}`}
              className="px-8 py-4 rounded-full bg-[var(--color)] text-[var(--background)] font-display text-base font-bold hover:bg-[var(--silk)] transition-all duration-200 shadow-xl flex items-center gap-2"
            >
              <span>Send an Email</span>
              <span>↗</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 rounded-full glass-pill text-xs font-mono text-[var(--color)] hover:border-[var(--silk)]/40 transition-colors"
            >
              {copied ? '✓ Copied to clipboard' : `Copy: ${profile.email}`}
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Floating Pill Social Bar like marban */}
      <div className="pt-20 border-t border-[var(--color)]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-xs font-mono text-[var(--color)]/60">
        <div className="flex items-center gap-2 p-1.5 rounded-full glass-pill">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full hover:bg-[var(--color)] hover:text-[var(--background)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="px-4 py-2 rounded-full hover:bg-[var(--color)] hover:text-[var(--background)] transition-colors"
          >
            Email
          </a>
          <span className="px-4 py-2 text-[var(--color)]/30">
            LinkedIn (TODO)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span>Phone: {profile.phone}</span>
          <span>•</span>
          <span className="text-[var(--silk)]">Chennai, India</span>
        </div>
      </div>
    </section>
  );
}
