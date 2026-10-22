'use client';

import { experiences } from '@/data/experience';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mb-16">
          Experience
        </h2>
        <div className="space-y-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="grid md:grid-cols-3 gap-6 border-l-2 border-[var(--cobalt)] pl-6"
            >
              <div>
                <span className="text-sm font-mono opacity-60 block mb-1">
                  {exp.period}
                </span>
                <h3 className="font-display text-xl font-bold">{exp.role}</h3>
                <span className="text-sm font-medium text-[var(--cobalt)] block">
                  {exp.organization}
                </span>
              </div>
              <div className="md:col-span-2">
                <ul className="space-y-2 font-body text-base text-[var(--ink)]/85 list-disc pl-5">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
