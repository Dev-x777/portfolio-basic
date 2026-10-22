'use client';

import { skillCategories } from '@/data/skills';

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mb-16">
          Skills
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {skillCategories.map((group) => (
            <div key={group.category} className="space-y-4">
              <h3 className="font-display text-xl font-bold border-b border-[var(--ink)]/15 pb-2">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="font-body text-base text-[var(--ink)]/85">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
