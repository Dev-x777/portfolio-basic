'use client';

import React from 'react';
import { motion } from 'motion/react';
import { profile } from '@/data/profile';
import { achievements } from '@/data/achievements';
import { StarIcon } from '@/components/ui/StarIcon';

export function AboutSection() {
  return (
    <section id="about" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-20">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
          <StarIcon className="text-[10px]" />
          <span>Background</span>
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-light)]">
          About &amp; Honors<span className="text-[var(--cobalt)]">.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Education & Bio (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-6 sm:p-8 rounded-2xl glass-card">
            <span className="text-[10px] uppercase tracking-wider text-[var(--silk)] font-mono block mb-4">
              Education
            </span>
            <div className="space-y-6">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="pb-5 border-b border-[var(--color)]/6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--color-light)]">
                      {edu.institution}
                    </h3>
                    <span className="text-[10px] font-mono text-[var(--muted)]">
                      {edu.period}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[var(--color)]/60">
                    {edu.degree} · <span className="text-[var(--silk)] font-semibold">{edu.grade}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-[var(--color)]/6">
              <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-mono block mb-3">
                Key Coursework
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.coursework.map((course) => (
                  <span
                    key={course}
                    className="chip px-2.5 py-1 rounded-full font-mono text-[10px]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & SIH Achievement (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] uppercase tracking-wider text-[var(--silk)] font-mono block mb-2 px-1">
            Certifications &amp; Hackathons
          </span>
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-4 rounded-xl glass-card hover:border-[var(--silk)]/30 transition-colors flex items-center justify-between"
            >
              <div>
                <h4 className="font-display text-sm font-semibold text-[var(--color-light)]">
                  {item.title}
                </h4>
                {item.issuer && (
                  <span className="text-[10px] font-mono text-[var(--muted)] mt-0.5 block">
                    {item.issuer}
                  </span>
                )}
              </div>
              <StarIcon className="text-xs text-[var(--silk)]/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
