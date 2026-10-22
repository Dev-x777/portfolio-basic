'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { skillCategories } from '@/data/skills';
import { StarIcon } from '@/components/ui/StarIcon';

const metricsPerCategory = [
  {
    title: 'Languages',
    description:
      'Core programming foundations spanning systems languages, algorithms, and full-stack development.',
    stats: [
      { label: 'DSA & Core Languages', value: '7' },
      { label: 'CGPA at SRM IST', value: '8.5' },
    ],
  },
  {
    title: 'Technologies',
    description:
      'Big Data analytics pipelines, distributed Delta Lake architectures, machine learning, and computer vision.',
    stats: [
      { label: 'Records Ingested & Queried', value: '10M+' },
      { label: 'Facial Recognition Accuracy', value: '95%' },
    ],
  },
  {
    title: 'Tools',
    description:
      'Professional toolchain for interface design in Figma, version control in Git, and business intelligence dashboards.',
    stats: [
      { label: 'Dynamic Pages Shipped', value: '50+' },
      { label: 'Usability Tests Run', value: '10+' },
    ],
  },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (
          rect.top < window.innerHeight * 0.45 &&
          rect.bottom > window.innerHeight * 0.25
        ) {
          setActiveCategory(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentMeta = metricsPerCategory[activeCategory] || metricsPerCategory[0];

  return (
    <section id="skills" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-20">
        {/* Left Sticky Sidebar (Exact marban mechanic) */}
        <div className="md:sticky md:top-32 w-full md:w-[42%] flex flex-col justify-between md:min-h-[65vh]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
              <StarIcon className="text-sm" />
              <span>Technical Arsenal</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[var(--color-light)] mb-4">
                  {skillCategories[activeCategory]?.category || 'Skills'}
                </h2>
                <p className="font-body text-base sm:text-lg text-[var(--color)]/70 max-w-md leading-relaxed mb-8">
                  {currentMeta.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Stats / Metrics Block */}
          <div className="pt-8 border-t border-[var(--color)]/10 grid grid-cols-2 gap-6">
            {currentMeta.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-light)] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-[var(--color)]/50 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider line */}
        <div className="hidden lg:block w-px bg-[var(--color)]/10 self-stretch" />

        {/* Right Scroll Column where skills scrub into view */}
        <div className="w-full md:w-[50%] space-y-24 pb-20">
          {skillCategories.map((group, groupIdx) => (
            <div
              key={group.category}
              ref={(el) => {
                sectionRefs.current[groupIdx] = el;
              }}
              className="pt-6"
            >
              {/* Mobile Heading */}
              <div className="md:hidden mb-6 pb-2 border-b border-[var(--color)]/10">
                <span className="text-xs uppercase text-[var(--silk)] font-mono block">
                  Category 0{groupIdx + 1}
                </span>
                <h3 className="font-display text-3xl font-bold text-[var(--color-light)]">
                  {group.category}
                </h3>
              </div>

              {/* Skills Items List */}
              <div className="flex flex-col gap-4">
                {group.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.4,
                      delay: skillIdx * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl glass-card hover:border-[var(--silk)]/40 hover:bg-[var(--color)]/5 transition-all duration-200"
                  >
                    <span className="font-display text-xl sm:text-2xl font-semibold text-[var(--color)] group-hover:text-[var(--color-light)] group-hover:translate-x-1 transition-all">
                      {skill}
                    </span>
                    <span className="font-mono text-xs text-[var(--color)]/40 group-hover:text-[var(--silk)] transition-colors">
                      0{skillIdx + 1}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
