'use client';

import { profile } from '@/data/profile';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mb-8">
          About
        </h2>
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 font-body text-xl leading-relaxed space-y-6 text-[var(--ink)]/85">
            <p>
              I am {profile.name}, a {profile.roleLine.toLowerCase()} based in {profile.location}.
            </p>
            <p>
              {profile.heroDescriptor}
            </p>
            <div className="pt-4 border-t border-[var(--ink)]/10">
              <h3 className="font-display text-lg font-bold mb-3">Education</h3>
              <div className="space-y-3">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-semibold block">{edu.institution}</span>
                    <span className="opacity-80 block">{edu.degree} · {edu.period} ({edu.grade})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-8 border border-[var(--ink)]/15 rounded-lg bg-[var(--paper)]">
            <span className="text-xs uppercase tracking-wider text-[var(--cobalt)] font-semibold block mb-2">
              Focus Areas
            </span>
            <ul className="text-sm space-y-2 text-[var(--ink)]/80 font-body">
              <li>Design Systems &amp; UI/UX Research</li>
              <li>Data Engineering (Spark, Delta Lake)</li>
              <li>Applied ML &amp; Computer Vision</li>
              <li>Full-Stack Web Architectures</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
