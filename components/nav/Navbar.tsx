'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@/components/ui/StarIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 transition-all duration-500 pointer-events-none flex justify-center ${
        scrolled ? 'pt-3 pb-3 backdrop-blur-sm' : ''
      }`}
    >
      <div className="w-full max-w-6xl flex justify-between items-center">
        {/* Brand - Slightly Bigger */}
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full glass-pill hover:border-[var(--silk)]/40 transition-all duration-300"
        >
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[var(--color-light)]">
            [shruti<span className="text-[var(--silk)]">.</span>]
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--muted)] border-l border-[var(--color)]/10 pl-2.5 ml-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to roles</span>
          </span>
        </Link>

        {/* Center Nav - Bigger Pill and Comfortable Touch Targets */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full glass-pill text-xs sm:text-[13px] font-medium text-[var(--muted)]">
          {[
            { id: 'work', label: 'Work' },
            { id: 'skills', label: 'Skills' },
            { id: 'experience', label: 'Experience' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-[var(--color-light)] bg-[var(--color)]/10 font-semibold border border-[var(--border-color)]'
                  : 'hover:text-[var(--color-light)] hover:bg-[var(--color)]/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Actions - Comfortably Sized */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <ThemeToggle />

          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'k', metaKey: true })
              );
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full glass-pill text-xs font-mono text-[var(--muted)] hover:text-[var(--color-light)] hover:border-[var(--cobalt)]/40 transition-all duration-200 cursor-pointer"
            title="Search (Cmd+K)"
          >
            <span>⌘K</span>
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('toggle-ask-shruti'));
            }}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full btn-silk text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <StarIcon className="text-xs" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
