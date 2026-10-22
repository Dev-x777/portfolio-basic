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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-[var(--color)]/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
            <StarIcon className="text-sm" />
            <span>Portfolio</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-light)]">
            Selected Work<span className="text-[var(--cobalt)]">.</span>
          </h2>
        </div>

        {/* Track Toggle Filter */}
        <div className="flex items-center p-1 rounded-full glass-pill text-xs font-medium">
          {(['all', 'design', 'engineering'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`relative px-4 py-2 rounded-full transition-colors capitalize ${
                filter === tab
                  ? 'text-[var(--background)] font-semibold'
                  : 'text-[var(--color)]/60 hover:text-[var(--color)]'
              }`}
            >
              {filter === tab && (
                <motion.div
                  layoutId="activeTrack"
                  className="absolute inset-0 rounded-full bg-[var(--color)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid / Stack Cards */}
      <motion.div layout className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative rounded-3xl overflow-hidden glass-card p-6 sm:p-10 md:p-14 hover:border-[var(--silk)]/40 transition-all duration-300"
            >
              {/* Subtle accent corner glow on hover */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-[var(--cobalt)]/10 rounded-full blur-3xl group-hover:bg-[var(--silk)]/15 transition-all duration-500" />

              <div className="relative z-10 flex flex-col justify-between h-full gap-8">
                {/* Top Row: Track & Index */}
                <div className="flex justify-between items-center text-xs font-mono text-[var(--color)]/50">
                  <span className="px-3 py-1 rounded-full bg-[var(--color)]/5 border border-[var(--color)]/10 uppercase tracking-wider text-[var(--silk)]">
                    {project.track}
                  </span>
                  <span>0{idx + 1} / 0{filteredProjects.length}</span>
                </div>

                {/* Middle: Title & Descriptor */}
                <div>
                  <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-light)] mb-4 group-hover:text-[var(--silk)] transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-base sm:text-lg md:text-xl text-[var(--color)]/80 max-w-3xl leading-relaxed mb-6">
                    {project.summary}
                  </p>

                  {/* Highlight Fact Callouts */}
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 py-4 border-y border-[var(--color)]/10 my-6">
                    {project.facts.map((fact, fIdx) => (
                      <div key={fIdx} className="text-xs">
                        <span className="font-mono text-[var(--color)]/40 block mb-0.5">
                          Metric 0{fIdx + 1}
                        </span>
                        <span className="font-semibold text-[var(--color-light)] text-sm">
                          {fact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Stack badges & Case Study CTA */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--color)]/5 border border-[var(--color)]/10 text-[var(--color)]/70 font-mono"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.links.github && project.links.github !== 'TODO' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[var(--color)]/60 hover:text-[var(--color)] underline underline-offset-4"
                      >
                        GitHub ↗
                      </a>
                    )}

                    <Magnetic strength={0.25}>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color)] text-[var(--background)] text-xs font-semibold hover:bg-[var(--silk)] transition-colors"
                      >
                        <span>Case Study</span>
                        <span>↗</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
