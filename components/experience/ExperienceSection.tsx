'use client';

import React from 'react';
import { motion } from 'motion/react';
import { experiences } from '@/data/experience';
import { StarIcon } from '@/components/ui/StarIcon';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-4 sm:px-8 md:px-16 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
          <StarIcon className="text-sm" />
          <span>Timeline</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-light)]">
          Experience<span className="text-[var(--cobalt)]">.</span>
        </h2>
      </div>

      {/* Timeline items */}
      <div className="relative border-l border-[var(--color)]/15 pl-6 sm:pl-10 space-y-16">
        {experiences.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Glowing timeline node */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--background)] border-2 border-[var(--silk)] group-hover:scale-125 group-hover:bg-[var(--silk)] transition-all duration-300" />

            <div className="p-6 sm:p-8 rounded-3xl glass-card hover:border-[var(--silk)]/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--color)]/5 border border-[var(--color)]/10 text-[var(--silk)]">
                  {item.period}
                </span>
                <span className="text-xs font-mono text-[var(--color)]/40">
                  Role 0{idx + 1}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-light)] mb-1">
                {item.role}
              </h3>
              <p className="font-mono text-sm text-[var(--color)]/70 mb-6">
                {item.organization}
              </p>

              <ul className="space-y-3 font-body text-base text-[var(--color)]/85">
                {item.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="text-[var(--silk)] text-sm mt-1">•</span>
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
