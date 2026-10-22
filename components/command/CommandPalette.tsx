'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
import { StarIcon } from '@/components/ui/StarIcon';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sections = [
    { label: 'Selected Work', href: '/#work', badge: 'Section' },
    { label: 'Skills & Arsenal', href: '/#skills', badge: 'Section' },
    { label: 'Experience Timeline', href: '/#experience', badge: 'Section' },
    { label: 'About & Honors', href: '/#about', badge: 'Section' },
    { label: 'Contact', href: '/#contact', badge: 'Section' },
  ];

  const projectItems = projects.map((p) => ({
    label: p.title,
    href: `/work/${p.slug}`,
    badge: p.track.toUpperCase(),
  }));

  const allItems = [...sections, ...projectItems];

  const filtered = query
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl rounded-3xl glass-card border border-[var(--color)]/10 shadow-2xl shadow-black/90 overflow-hidden bg-[var(--background-light)] text-[var(--color)]"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-[var(--color)]/6 flex items-center gap-3 bg-[var(--background)]/70">
              <StarIcon className="text-base text-[var(--silk)]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, sections, or actions..."
                className="flex-1 bg-transparent border-0 outline-none text-sm text-[var(--color-light)] placeholder-[var(--muted)] font-mono"
              />
              <kbd className="px-2 py-0.5 rounded text-[10px] font-mono chip">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-[var(--muted)]">
                  No matching results found for &quot;{query}&quot;.
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--color)]/6 hover:text-[var(--color-light)] text-left text-xs transition-colors group"
                  >
                    <span className="font-display font-medium text-sm text-[var(--color)] group-hover:text-[var(--color-light)]">
                      {item.label}
                    </span>
                    <span className="chip font-mono text-[10px] px-2 py-0.5 rounded-full group-hover:text-[var(--silk)]">
                      {item.badge}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="p-3 bg-[var(--background)]/80 border-t border-[var(--color)]/6 flex justify-between items-center text-[10px] font-mono text-[var(--muted)]">
              <div className="flex gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile.email);
                  setIsOpen(false);
                }}
                className="hover:text-[var(--silk)] underline underline-offset-2"
              >
                Copy Email
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
