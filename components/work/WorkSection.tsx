'use client';

import { projects } from '@/data/projects';
import Link from 'next/link';

export function WorkSection() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-[var(--ink)] text-[var(--paper)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-16 border-b border-[var(--paper)]/15 pb-6">
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight">
            Selected Work
          </h2>
          <span className="text-sm font-mono opacity-60">
            {projects.length} projects
          </span>
        </div>

        <div className="grid gap-12">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group border border-[var(--paper)]/10 p-6 md:p-8 rounded-lg flex flex-col md:flex-row justify-between gap-6 hover:border-[var(--silk)] transition-colors"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-[var(--silk)] mb-2 block">
                  {project.track}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-bold mb-3">
                  {project.title}
                </h3>
                <p className="font-body text-[var(--paper)]/80 max-w-xl text-base mb-4">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 bg-[var(--paper)]/10 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="self-end md:self-center">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-block text-sm font-medium underline underline-offset-4 hover:text-[var(--silk)]"
                >
                  View Case Study
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
