'use client';

import { achievements } from '@/data/achievements';

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-[var(--paper)] text-[var(--ink)] border-t border-[var(--ink)]/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mb-16">
          Honors &amp; Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-[var(--ink)]/15 rounded-lg bg-[var(--paper)] flex flex-col justify-between"
            >
              <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
              {item.issuer && (
                <span className="text-xs uppercase tracking-wider text-[var(--cobalt)] font-medium">
                  {item.issuer}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
