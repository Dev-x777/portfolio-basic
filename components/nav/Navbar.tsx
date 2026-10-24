'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { StarIcon } from '@/components/ui/StarIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { GooeyNav } from '@/components/ui/GooeyNav';

function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });
  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains('light');
}

function getServerThemeSnapshot() {
  return false;
}

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const isLight = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['work', 'skills', 'experience', 'about', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.href === `#${activeSection}`)
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 py-6 transition-all duration-500 pointer-events-none flex justify-center ${
        scrolled ? 'pt-3.5 pb-3.5 backdrop-blur-md' : ''
      }`}
    >
      <div className="w-full max-w-6xl flex justify-between items-center">
        {/* Brand - Generously Sized */}
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full glass-pill hover:border-[var(--silk)]/40 transition-all duration-300 shadow-sm"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--color-light)]">
            [dev<span className="text-[var(--silk)]">.</span>]
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--muted)] border-l border-[var(--color)]/10 pl-3 ml-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to roles</span>
          </span>
        </Link>

        {/* Center Nav - GooeyNav with WebGL Liquid Droplets */}
        <div className="pointer-events-auto hidden md:flex items-center">
          <GooeyNav
            items={navItems}
            activeIndex={activeIndex}
            theme={isLight ? 'light' : 'dark'}
            size="sm"
            frame={true}
            color="#2230F5"
            activeTextColor="#ffffff"
            colors={['#2230F5', '#EC4899', '#6366F1']}
            particleCount={14}
            spread={48}
            animationTime={550}
            timeVariance={200}
            gooeyness={0.5}
            wobble={0.4}
            hoverEffect={true}
            onChange={(_index, item) => {
              if (item.href && item.href.startsWith('#')) {
                const el = document.querySelector(item.href);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />
        </div>

        {/* Right Actions - Comfortably Sized */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true })
              );
            }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full glass-pill text-xs font-mono text-[var(--muted)] hover:text-[var(--color-light)] hover:border-[var(--cobalt)]/40 transition-all duration-200 cursor-pointer"
            title="Search (Cmd+K)"
          >
            <span>⌘K</span>
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('toggle-ask-dev'));
            }}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full btn-silk text-xs sm:text-sm font-semibold cursor-pointer shadow-sm hover:scale-105 transition-all duration-200"
          >
            <StarIcon className="text-xs text-white" />
            <span>Ask Dev</span>
          </button>
        </div>
      </div>
    </header>
  );
}
