'use client';

import React from 'react';
import { StarIcon } from '@/components/ui/StarIcon';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 px-6 sm:px-12 md:px-20 border-t border-[var(--color)]/10 text-xs font-mono text-[var(--color)]/40 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <StarIcon className="text-xs text-[var(--silk)]" />
        <span>© 2026 Dev · Designed &amp; engineered with care.</span>
      </div>

      <button
        onClick={scrollToTop}
        className="hover:text-[var(--color)] transition-colors flex items-center gap-1.5"
      >
        <span>Back to top</span>
        <span>↑</span>
      </button>
    </footer>
  );
}
