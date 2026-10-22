'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  cubicBezier,
} from 'motion/react';
import { skillCategories } from '@/data/skills';
import { StarIcon } from '@/components/ui/StarIcon';

const marbanEase = cubicBezier(0.645, 0.045, 0.355, 1);

function subscribeMobile(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

function getMobileSnapshot() {
  return window.innerWidth <= 768;
}

function getServerMobileSnapshot() {
  return false;
}

const metricsPerCategory = [
  {
    description:
      'With over 4 years in software and data engineering, I build full-stack architectures and low-latency systems where clean craft meets performance.',
    stats: [
      { label: 'Core Languages', value: '7+' },
      { label: 'CGPA at SRM IST', value: '8.5' },
    ],
  },
  {
    description:
      'Engineered distributed PySpark ETL pipelines, Delta Lake storage architectures, and high-precision computer vision surveillance models.',
    stats: [
      { label: 'Records Processed', value: '10M+' },
      { label: 'Recognition Accuracy', value: '95%' },
    ],
  },
  {
    description:
      'Designing design systems in Figma, collaborating across Git workflows, and turning complex metrics into intuitive interactive interfaces.',
    stats: [
      { label: 'Dynamic Pages Shipped', value: '50+' },
      { label: 'Usability Tests', value: '10+' },
    ],
  },
];

function SkillScrollItem({ skill, index }: { skill: string; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 92vh', 'end 20vh'],
  });

  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? 100 : 300, 0],
    { ease: marbanEase }
  );

  const opacity = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0.15, 1]);

  return (
    <motion.div
      ref={itemRef}
      style={{
        x,
        opacity,
        willChange: 'transform, opacity',
      }}
      className="group flex items-center justify-between py-2 sm:py-3 w-fit min-w-[240px] sm:min-w-[340px] cursor-default"
    >
      <span className="text-2xl sm:text-3xl md:text-3xl xl:text-4xl text-[var(--color)] group-hover:text-[var(--silk)] font-semibold tracking-tight transition-colors duration-200">
        {skill}
      </span>
      <span className="font-mono text-[10px] text-[var(--muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--cobalt)] transition-all ml-4">
        0{index + 1}
      </span>
    </motion.div>
  );
}

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

  const currentMeta =
    metricsPerCategory[activeCategory] || metricsPerCategory[0];

  return (
    <section id="skills" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-16">
        {/* Left Sticky Sidebar (Exactly matching Marban layout) */}
        <div className="md:sticky md:top-28 w-full md:w-[40%] hidden md:flex justify-between flex-col min-h-[78vh]">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
              <StarIcon className="text-[10px]" />
              <span>Technical Arsenal</span>
            </div>

            <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-3">
              Skills Overview
            </h2>

            <AnimatePresence mode="wait">
              <motion.h1
                key={activeCategory}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                className="font-display inline-block font-bold text-5xl lg:text-6xl text-[var(--color-light)] tracking-tighter"
              >
                {skillCategories[activeCategory]?.category || 'Skills'}
              </motion.h1>
            </AnimatePresence>

            <p className="font-body text-sm sm:text-base text-[var(--color)]/50 mt-4 max-w-[420px] leading-relaxed">
              {currentMeta.description}
            </p>
          </div>

          {/* Sticky Metric Counters */}
          <div className="pt-8 border-t border-[var(--color)]/8">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block mb-4">
              Impact &amp; Benchmarks
            </span>
            <div className="grid grid-cols-2 gap-6">
              {currentMeta.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[var(--color-light)] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--muted)] mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Vertical Divider (Sticky, matching Marban) */}
        <div className="border-l sticky opacity-60 hidden lg:flex border-[var(--color)]/10 h-screen md:top-0" />

        {/* Right Scrolling Column with Slide-In Animation */}
        <div className="w-full md:w-[48%] md:pb-48 space-y-16">
          {skillCategories.map((group, groupIdx) => (
            <div
              key={group.category}
              ref={(el) => {
                sectionRefs.current[groupIdx] = el;
              }}
              className="flex flex-col gap-6 pt-4 pb-12 border-b border-[var(--color)]/8 last:border-0"
            >
              {/* Mobile heading */}
              <div className="md:hidden block pb-3 border-b border-[var(--color)]/6">
                <div className="flex items-center gap-2 text-[10px] uppercase text-[var(--silk)] font-mono mb-1">
                  <StarIcon className="text-[10px]" />
                  <span>0{groupIdx + 1} / Skills</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-[var(--color-light)]">
                  {group.category}
                </h3>
              </div>

              {/* Skill Items with scroll slide-in animation */}
              <div className="flex flex-col gap-2 md:gap-3">
                {group.skills.map((skill, skillIdx) => (
                  <SkillScrollItem
                    key={skill}
                    skill={skill}
                    index={skillIdx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
