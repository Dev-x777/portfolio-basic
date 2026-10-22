'use client';

import React from 'react';
import { motion } from 'motion/react';
import { experiences } from '@/data/experience';
import { StarIcon } from '@/components/ui/StarIcon';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto">
      <div className="mb-16">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
          <StarIcon className="text-[10px]" />
          <span>Timeline</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-light)]">
          Experience<span className="text-[var(--cobalt)]">.</span>
        </h2>
      </div>

      <div className="relative border-l border-[var(--color)]/8 pl-6 sm:pl-8 space-y-12">
        {experiences.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[27px] sm:-left-[35px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--background)] border-[1.5px] border-[var(--silk)]/60 group-hover:border-[var(--silk)] group-hover:bg-[var(--silk)]/20 transition-all duration-300" />

            <div className="p-5 sm:p-7 rounded-2xl glass-card">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <span className="chip px-2.5 py-1 rounded-full font-mono text-[var(--silk)]">
                  {item.period}
                </span>
                <span className="text-[9px] font-mono text-[var(--muted)]">
                  0{idx + 1}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--color-light)] mb-1">
                {item.role}
              </h3>
              <p className="font-mono text-xs text-[var(--muted)] mb-5">
                {item.organization}
              </p>

              <ul className="space-y-2.5 font-body text-sm text-[var(--color)]/60">
                {item.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <span className="text-[var(--silk)]/50 text-xs mt-0.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
