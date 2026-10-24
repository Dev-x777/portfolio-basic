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
    category: 'Languages',
    focus: 'Systems & Algorithms',
    description:
      'Proficient across backend and systems languages, from Java, Python, and C++ for distributed algorithms to TypeScript, Go, and SQL.',
    stats: [
      { label: 'Core Languages', value: '10+' },
      { label: 'CGPA at SRMIST', value: '9.01' },
    ],
  },
  {
    category: 'Frameworks & Backend',
    focus: 'Microservices & Full-Stack',
    description:
      'Building scalable product architectures and high-throughput microservices using Spring Boot, Node.js, Express, React, and Flutter.',
    stats: [
      { label: 'Repositories Shipped', value: '20+' },
      { label: 'Product Users', value: '1,000+' },
    ],
  },
  {
    category: 'Systems & Tools',
    focus: 'Distributed Concurrency',
    description:
      'Architecting distributed rate limiters with atomic Redis Lua scripts, Dockerized Azure pipelines, and PostgreSQL persistence with zero race conditions.',
    stats: [
      { label: 'Load Test Requests', value: '10K+' },
      { label: 'Response Latency', value: '<5ms' },
    ],
  },
  {
    category: 'Machine Learning',
    focus: 'Vision & Medical AI',
    description:
      'Training deep convolutional neural networks and computer vision pipelines for clinical autism screening and optical music recognition.',
    stats: [
      { label: 'CNN Image Samples', value: '5,000+' },
      { label: 'Model Accuracy', value: '86%+' },
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
    [isMobile ? 80 : 260, 0],
    { ease: marbanEase }
  );

  const opacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 0.2, 1]);

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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const focalLine = window.innerHeight * 0.4;
        let selectedIdx = 0;
        let bestDistance = Infinity;

        sectionRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // Active if current section encompasses the focal line
          if (rect.top <= focalLine && rect.bottom >= focalLine) {
            selectedIdx = idx;
            bestDistance = 0;
            return;
          }
          // Otherwise find closest edge
          const distance = Math.min(
            Math.abs(rect.top - focalLine),
            Math.abs(rect.bottom - focalLine)
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            selectedIdx = idx;
          }
        });

        setActiveCategory((prev) => (prev !== selectedIdx ? selectedIdx : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = (index: number) => {
    const el = sectionRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentMeta =
    metricsPerCategory[activeCategory] || metricsPerCategory[0];

  return (
    <section id="skills" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-16">
        {/* Left Sticky Sidebar (Solidly pinned throughout right-side scroll) */}
        <div className="md:sticky md:top-28 lg:top-32 self-start w-full md:w-[44%] lg:w-[42%] hidden md:flex flex-col">
          {/* Eyebrow & Index Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold">
              <StarIcon className="text-[10px]" />
              <span>Technical Arsenal</span>
            </div>
            <span className="font-mono text-[11px] text-[var(--muted)]">
              0{activeCategory + 1} / 0{skillCategories.length}
            </span>
          </div>

          {/* Quick-Jump Category Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {skillCategories.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <button
                  key={cat.category}
                  onClick={() => scrollToCategory(idx)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-full transition-all duration-200 border ${
                    isActive
                      ? 'bg-[var(--cobalt)]/15 text-[var(--cobalt)] border-[var(--cobalt)]/40 font-semibold shadow-xs'
                      : 'bg-transparent text-[var(--muted)] border-[var(--border-subtle)] hover:text-[var(--color)] hover:border-[var(--border-color)]'
                  }`}
                >
                  {cat.category}
                </button>
              );
            })}
          </div>

          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] mb-2">
            Category Focus
          </h2>

          {/* Active Category Title with smooth blur transition */}
          <div className="min-h-[72px] lg:min-h-[84px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeCategory}
                initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
                className="font-display font-bold text-4xl lg:text-5xl xl:text-6xl text-[var(--color-light)] tracking-tighter leading-tight"
              >
                {skillCategories[activeCategory]?.category || 'Skills'}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Dynamic Category Description */}
          <div className="min-h-[64px] mt-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
                className="font-body text-sm sm:text-base text-[var(--color)]/70 leading-relaxed max-w-[420px]"
              >
                {currentMeta.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Constant Changing Metrics Glass Card */}
          <div className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/60 backdrop-blur-md p-6 relative overflow-hidden shadow-sm">
            {/* Ambient accent top light */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[var(--cobalt)]/12 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--cobalt)] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  Impact &amp; Benchmarks
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--chip-bg)] border border-[var(--border-subtle)] text-[var(--color)]/80">
                {currentMeta.focus}
              </span>
            </div>

            {/* Changing Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 min-h-[90px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  transition={{ duration: 0.32, ease: [0.25, 0.8, 0.25, 1] }}
                  className="contents"
                >
                  {currentMeta.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-display text-4xl lg:text-5xl font-bold text-[var(--color-light)] tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--muted)] mt-1.5 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center Vertical Divider (Subtle architectural separation) */}
        <div className="self-stretch border-l border-[var(--color)]/10 hidden lg:block opacity-40 ml-4 mr-2" />

        {/* Right Scrolling Column with Slide-In Animation */}
        <div className="w-full md:w-[50%] lg:w-[48%] md:pb-48 space-y-16 overflow-x-clip">
          {skillCategories.map((group, groupIdx) => (
            <div
              key={group.category}
              ref={(el) => {
                sectionRefs.current[groupIdx] = el;
              }}
              className="flex flex-col gap-6 pt-4 pb-12 border-b border-[var(--color)]/8 last:border-0"
            >
              {/* Mobile heading & inline metrics (Responsive for small viewports) */}
              <div className="md:hidden block pb-4 border-b border-[var(--color)]/8 space-y-3">
                <div className="flex items-center justify-between text-[10px] uppercase text-[var(--silk)] font-mono">
                  <div className="flex items-center gap-1.5">
                    <StarIcon className="text-[10px]" />
                    <span>0{groupIdx + 1} / Skills</span>
                  </div>
                  <span className="text-[var(--muted)]">
                    {metricsPerCategory[groupIdx]?.focus}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-[var(--color-light)]">
                  {group.category}
                </h3>
                <p className="font-body text-xs text-[var(--color)]/60 leading-relaxed">
                  {metricsPerCategory[groupIdx]?.description}
                </p>
                {/* Mobile inline metrics pills */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {metricsPerCategory[groupIdx]?.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--card-bg)]/80 p-3"
                    >
                      <span className="font-display text-2xl font-bold text-[var(--color-light)] block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--muted)] block mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
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
