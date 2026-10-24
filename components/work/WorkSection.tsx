'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { projects as defaultProjects, Project, ProjectTrack } from '@/data/projects';
import { StarIcon } from '@/components/ui/StarIcon';
import { Magnetic } from '@/lib/motion';
import ReflectiveCard from '@/components/ui/ReflectiveCard';

export function WorkSection() {
  const [projectsList, setProjectsList] = useState<Project[]>(defaultProjects);
  const [isLiveSynced, setIsLiveSynced] = useState(false);
  const [filter, setFilter] = useState<'all' | ProjectTrack>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function syncGitHub() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.projects && Array.isArray(data.projects)) {
            setProjectsList(data.projects);
            setIsLiveSynced(Boolean(data.isLive));
          }
        }
      } catch (err) {
        console.warn('Could not sync GitHub projects:', err);
      }
    }
    syncGitHub();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    filter === 'all'
      ? projectsList
      : projectsList.filter((p) => p.track === filter);

  const updateScrollState = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const current = el.scrollLeft;
    setScrollProgress(Math.min(100, Math.max(0, (current / maxScroll) * 100)));
    setCanScrollLeft(current > 10);
    setCanScrollRight(current < maxScroll - 10);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [filteredProjects]);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('div')?.clientWidth || 480;
    const offset = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="work" className="py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-6 border-b border-[var(--color)]/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[var(--silk)] font-semibold mb-3">
            <StarIcon className="text-[10px]" />
            <span>Product &amp; Systems Portfolio</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-[var(--color-light)]">
            Selected Work<span className="text-[var(--cobalt)]">.</span>
          </h2>
        </div>

        {/* Dynamic Controls: Filter Tabs & Horizontal Arrows */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Dynamic Colorful Track Toggle */}
          <div className="flex items-center p-1 rounded-full glass-pill text-[11px] font-medium">
            {(['all', 'backend', 'product'] as const).map((tab) => {
              const activeColorClass =
                tab === 'product'
                  ? 'btn-silk'
                  : tab === 'backend'
                  ? 'btn-violet'
                  : 'btn-cobalt';

              return (
                <button
                  key={tab}
                  onClick={() => {
                    setFilter(tab);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`relative px-4 py-1.5 rounded-full transition-colors capitalize cursor-pointer ${
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

          {/* Horizontal Slide Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? 'border-[var(--color)]/20 text-[var(--color-light)] hover:border-[var(--silk)] hover:bg-[var(--silk)]/10'
                  : 'border-[var(--color)]/5 text-[var(--muted)]/40 opacity-40 cursor-not-allowed'
              }`}
              title="Previous project"
            >
              ←
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? 'border-[var(--color)]/20 text-[var(--color-light)] hover:border-[var(--silk)] hover:bg-[var(--silk)]/10'
                  : 'border-[var(--color)]/5 text-[var(--muted)]/40 opacity-40 cursor-not-allowed'
              }`}
              title="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Guide Subtitle */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--muted)] mb-6 px-1">
        <div className="flex items-center gap-2">
          <span>Scroll or drag horizontally to inspect repositories ({filteredProjects.length} projects)</span>
          {isLiveSynced && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Synced with GitHub</span>
            </span>
          )}
        </div>
        <span className="hidden sm:inline">Shift + Scroll or use arrows ⇄</span>
      </div>

      {/* Horizontal Scrolling Projects Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 pt-2 px-1 focus:outline-none overscroll-x-contain"
        tabIndex={0}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  layout: { duration: 0.3 },
                  duration: 0.45,
                  delay: idx * 0.03,
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className={`w-[84vw] sm:w-[410px] md:w-[450px] flex-shrink-0 snap-start flex flex-col min-h-[450px] rounded-3xl transition-all duration-300 ${
                  isLight
                    ? 'hover:shadow-[0_24px_50px_-15px_rgba(37,99,235,0.15)]'
                    : 'hover:shadow-[0_24px_60px_-15px_rgba(236,72,153,0.20)]'
                }`}
              >
                <ReflectiveCard
                  theme={isLight ? 'light' : 'dark'}
                  tint="#ffffff"
                  grayscale={1}
                  width="100%"
                  height="100%"
                  radius={24}
                  metalness={0.25}
                  roughness={0.16}
                  blurStrength={10}
                  warp={0}
                  bevel={1.5}
                  shine={0.45}
                  glare={0.25}
                  tiltStrength={7}
                  className="w-full h-full"
                >
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[390px] p-2 sm:p-3">
                    <div className="flex flex-col gap-5">
                      {/* Top row: Track Badge + Index Counter */}
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span
                          className={`px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold text-[10px] font-mono ${
                            isLight
                              ? 'text-[#2563EB] bg-[rgba(37,99,235,0.10)] border border-[rgba(37,99,235,0.20)]'
                              : 'text-[#6F8CFF] bg-[rgba(59,91,255,0.16)] border border-[rgba(111,140,255,0.25)]'
                          }`}
                        >
                          {project.track}
                        </span>

                        <div
                          className={`flex items-center gap-2 font-mono text-[10px] ${
                            isLight ? 'text-[#64748B]' : 'text-[#7C7A94]'
                          }`}
                        >
                          <span>{String(idx + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}</span>
                        </div>
                      </div>

                      {/* Title & Summary Description */}
                      <div>
                        <Link href={`/work/${project.slug}`} className="group/title block">
                          <h3
                            className={`font-display text-xl sm:text-2xl font-bold tracking-tight mb-2.5 transition-colors duration-200 group-hover/title:text-[var(--silk)] line-clamp-2 ${
                              isLight ? 'text-[#0F172A]' : 'text-[#F4F1EA]'
                            }`}
                          >
                            {project.title}
                          </h3>
                        </Link>
                        <p
                          className={`font-body text-sm leading-relaxed mb-4 line-clamp-3 ${
                            isLight ? 'text-[#475569]' : 'text-[#B4B2C8]'
                          }`}
                        >
                          {project.summary}
                        </p>

                        {/* Clean architectural metric highlights with divider lines */}
                        <div
                          className={`grid grid-cols-2 gap-3 py-3 border-y my-1 ${
                            isLight
                              ? 'border-[rgba(15,23,42,0.08)]'
                              : 'border-[rgba(255,255,255,0.07)]'
                          }`}
                        >
                          {project.facts.slice(0, 4).map((fact, fIdx) => (
                            <div key={fIdx} className="text-xs">
                              <span
                                className={`font-mono text-[9px] block mb-0.5 ${
                                  isLight ? 'text-[#64748B]' : 'text-[#7C7A94]'
                                }`}
                              >
                                Result 0{fIdx + 1}
                              </span>
                              <span
                                className={`font-semibold text-[11px] leading-snug block ${
                                  isLight ? 'text-[#0F172A]' : 'text-[#F4F1EA]'
                                }`}
                              >
                                {fact}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Tech Stack Chips & Action CTA */}
                    <div
                      className={`flex flex-col gap-4 pt-4 border-t ${
                        isLight
                          ? 'border-[rgba(15,23,42,0.08)]'
                          : 'border-[rgba(255,255,255,0.07)]'
                      }`}
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] ${
                              isLight
                                ? 'bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)] text-[#334155]'
                                : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] text-[#C9C7DA]'
                            }`}
                          >
                            {item}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span
                            className={`px-2 py-0.5 rounded-full font-mono text-[9px] ${
                              isLight
                                ? 'text-[#64748B] bg-[rgba(15,23,42,0.05)] border border-[rgba(15,23,42,0.08)]'
                                : 'text-[#7C7A94] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)]'
                            }`}
                          >
                            +{project.stack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        {project.links.github ? (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-mono transition-colors flex items-center gap-1 ${
                              isLight
                                ? 'text-[#64748B] hover:text-[#0F172A]'
                                : 'text-[#7C7A94] hover:text-[#F4F1EA]'
                            }`}
                          >
                            <span>GitHub</span>
                            <span>↗</span>
                          </a>
                        ) : (
                          <span />
                        )}

                        <Magnetic strength={0.25}>
                          <Link
                            href={`/work/${project.slug}`}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm ${
                              isLight
                                ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                                : 'bg-[#F4F1EA] text-[#14122A] hover:bg-white'
                            }`}
                          >
                            <span>Case Study</span>
                            <span className="transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5">
                              ↗
                            </span>
                          </Link>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </ReflectiveCard>
              </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Horizontal Scroll Progress Bar */}
      <div className="w-full bg-[var(--color)]/10 h-1 rounded-full mt-4 overflow-hidden relative">
        <motion.div
          className="bg-gradient-to-r from-[var(--cobalt)] via-[var(--silk)] to-[var(--sun)] h-full rounded-full"
          style={{ width: `${Math.max(12, scrollProgress)}%` }}
          transition={{ ease: 'easeOut', duration: 0.15 }}
        />
      </div>
    </section>
  );
}
