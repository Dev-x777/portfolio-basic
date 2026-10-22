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
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
          <StarIcon className="text-sm" />
          <span>Background</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-light)]">
          About &amp; Honors<span className="text-[var(--cobalt)]">.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Education & Bio (8 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl glass-card">
            <span className="text-xs uppercase tracking-wider text-[var(--silk)] font-mono block mb-3">
              Education
            </span>
            <div className="space-y-6">
              {profile.education.map((edu, idx) => (
                <div key={idx} className="pb-4 border-b border-[var(--color)]/10 last:border-0 last:pb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-display text-xl font-bold text-[var(--color-light)]">
                      {edu.institution}
                    </h3>
                    <span className="text-xs font-mono text-[var(--color)]/50">
                      {edu.period}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[var(--color)]/70">
                    {edu.degree} · <span className="text-[var(--silk)] font-semibold">{edu.grade}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color)]/10">
              <span className="text-xs uppercase tracking-wider text-[var(--color)]/50 font-mono block mb-3">
                Key Coursework
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.coursework.map((course) => (
                  <span
                    key={course}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--color)]/5 border border-[var(--color)]/10 font-mono text-[var(--color)]/70"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & SIH Achievement (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-wider text-[var(--silk)] font-mono block mb-2 px-2">
            Certifications &amp; Hackathons
          </span>
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-5 rounded-2xl glass-card hover:border-[var(--silk)]/40 transition-colors flex items-center justify-between"
            >
              <div>
                <h4 className="font-display text-base font-semibold text-[var(--color-light)]">
                  {item.title}
                </h4>
                {item.issuer && (
                  <span className="text-xs font-mono text-[var(--color)]/50 mt-0.5 block">
                    {item.issuer}
                  </span>
                )}
              </div>
              <StarIcon className="text-sm text-[var(--silk)]/60" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
