'use client';

import { useState, useEffect } from 'react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[var(--paper)] text-[var(--ink)] w-full max-w-lg rounded-xl shadow-2xl border border-[var(--ink)]/15 overflow-hidden">
        <div className="p-4 border-b border-[var(--ink)]/10 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a command or jump to section..."
            className="w-full bg-transparent outline-none text-base font-body text-[var(--ink)]"
            autoFocus
          />
          <kbd className="text-xs px-2 py-1 bg-[var(--ink)]/10 rounded">ESC</kbd>
        </div>
        <div className="p-4 text-xs text-[var(--ink)]/60">
          Command palette initialized for WS E.
        </div>
      </div>
    </div>
  );
}
