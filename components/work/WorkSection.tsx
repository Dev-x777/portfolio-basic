'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { projects, ProjectTrack } from '@/data/projects';
import { StarIcon } from '@/components/ui/StarIcon';
import { Magnetic } from '@/lib/motion';

export function WorkSection() {
  const [filter, setFilter] = useState<'all' | ProjectTrack>('all');

  const filteredProjects =
    filter === 'all'
      ? projects
      : projects.filter((p) => p.track === filter);

  return (
    <section id="work" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-[var(--color)]/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
            <StarIcon className="text-[10px]" />
            <span>Portfolio</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-light)]">
            Selected Work<span className="text-[var(--cobalt)]">.</span>
          </h2>
        </div>

        {/* Dynamic Colorful Track Toggle */}
        <div className="flex items-center p-1 rounded-full glass-pill text-[11px] font-medium">
          {(['all', 'design', 'engineering'] as const).map((tab) => {
            const activeColorClass =
              tab === 'design'
                ? 'btn-silk'
                : tab === 'engineering'
                ? 'btn-violet'
                : 'btn-cobalt';

            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative px-4 py-1.5 rounded-full transition-colors capitalize ${
                  filter === tab
                    ? 'text-white font-semibold'
                    : 'text-[var(--muted)] hover:text-[var(--color)]'
                }`}
              >
                {filter === tab && (
                  <motion.div
                    layoutId="activeTrack"
                    className={`absolute inset-0 rounded-full ${activeColorClass}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards with Hover Animations */}
      <motion.div layout className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isDesign = project.track === 'design';

            return (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                whileHover={{ y: -6, scale: 1.008 }}
                transition={{
                  layout: { duration: 0.3 },
                  duration: 0.45,
                  delay: idx * 0.04,
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className="group relative rounded-3xl overflow-hidden glass-card p-6 sm:p-8 md:p-10 cursor-pointer hover:border-[var(--cobalt)]/40 hover:shadow-2xl hover:shadow-[var(--cobalt)]/10"
              >
                {/* Subtle Hover Gradient Flare */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--cobalt)]/[0.04] via-transparent to-[var(--silk)]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                {/* Subtle corner light blob */}
                <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-[var(--cobalt)]/[0.03] rounded-full blur-3xl group-hover:bg-[var(--silk)]/[0.08] transition-all duration-700" />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Top row: Track + Animated Star Sparkle + Index */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--muted)]">
                    <span
                      className={`chip px-3 py-1 rounded-full uppercase tracking-wider font-semibold transition-transform duration-300 group-hover:scale-105 ${
                        isDesign ? 'text-pink-500' : 'text-blue-500'
                      }`}
                    >
                      {project.track}
                    </span>

                    <div className="flex items-center gap-3">
                      <StarIcon className="text-xs text-[var(--silk)] opacity-0 group-hover:opacity-100 group-hover:rotate-90 group-hover:scale-125 transition-all duration-500" />
                      <span>0{idx + 1} / 0{filteredProjects.length}</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-light)] mb-3 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[var(--silk)]">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[var(--color)]/70 max-w-2xl leading-relaxed mb-5">
                      {project.summary}
                    </p>

                    {/* Metrics row with hover highlight */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-4 border-y border-[var(--color)]/10 transition-colors duration-300 group-hover:border-[var(--silk)]/25">
                      {project.facts.map((fact, fIdx) => (
                        <div
                          key={fIdx}
                          className="p-1 rounded-lg transition-colors duration-200 group-hover:bg-[var(--color)]/[0.02]"
                        >
                          <span className="font-mono text-[9px] text-[var(--muted)] block mb-0.5">
                            Metric 0{fIdx + 1}
                          </span>
                          <span className="font-semibold text-[var(--color-light)] text-xs group-hover:text-[var(--color-light)] transition-colors">
                            {fact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Stack & CTA */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="chip px-2.5 py-1 rounded-full font-mono transition-all duration-300 group-hover:border-[var(--cobalt)]/30 group-hover:bg-[var(--cobalt)]/5"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.links.github && project.links.github !== 'TODO' && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-mono text-[var(--muted)] hover:text-[var(--cobalt)] underline underline-offset-4 transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}

                      <Magnetic strength={0.25}>
                        <Link
                          href={`/work/${project.slug}`}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all duration-300 group-hover:scale-105 ${
                            isDesign ? 'btn-silk' : 'btn-cobalt'
                          }`}
                        >
                          <span>Case Study</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                            ↗
                          </span>
                        </Link>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
