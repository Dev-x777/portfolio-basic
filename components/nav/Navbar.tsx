'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarIcon } from '@/components/ui/StarIcon';

interface NavbarProps {
  onOpenChat?: () => void;
  onOpenCommand?: () => void;
}

export function Navbar({ onOpenChat, onOpenCommand }: NavbarProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5 transition-all duration-300 pointer-events-none flex justify-center ${
        scrolled ? 'translate-y-0' : 'translate-y-0'
      }`}
    >
      <div className="w-full max-w-6xl flex justify-between items-center">
        {/* Brand Logo */}
        <Link
          href="/"
          className="pointer-events-auto group flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill hover:border-[var(--silk)]/40 transition-colors"
        >
          <span className="font-display text-base font-bold tracking-tight text-[var(--color)]">
            [shruti<span className="text-[var(--silk)]">.</span>]
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[var(--color)]/60 border-l border-[var(--color)]/15 pl-2 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to roles</span>
          </span>
        </Link>

        {/* Center Navigation Pill */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 p-1 rounded-full glass-pill text-xs font-medium text-[var(--color)]/70">
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
              className={`px-3.5 py-1.5 rounded-full transition-all duration-200 hover:text-[var(--color-light)] hover:bg-[var(--color)]/10 ${
                activeSection === item.id
                  ? 'text-[var(--background)] bg-[var(--color)] font-semibold shadow-xs'
                  : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => {
              if (onOpenCommand) {
                onOpenCommand();
              } else {
                window.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'k', metaKey: true })
                );
              }
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill text-xs text-[var(--color)]/70 hover:text-[var(--color)] hover:border-[var(--color)]/30 transition-colors"
            title="Search or jump to section (Cmd+K)"
          >
            <span>Cmd+K</span>
          </button>

          <button
            onClick={() => {
              if (onOpenChat) {
                onOpenChat();
              } else {
                window.dispatchEvent(new CustomEvent('toggle-ask-shruti'));
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--color)] text-[var(--background)] hover:bg-[var(--silk)] text-xs font-semibold transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
          >
            <StarIcon className="text-xs" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
