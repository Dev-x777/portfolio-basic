'use client';

import { useState } from 'react';

export function AskShruti() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-full bg-[var(--ink)] text-[var(--paper)] text-sm font-medium shadow-lg hover:bg-[var(--cobalt)] transition-colors border border-[var(--paper)]/20 focus-visible:outline-[var(--sun)]"
      >
        Ask Shruti
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 md:w-96 bg-[var(--paper)] text-[var(--ink)] p-5 rounded-2xl shadow-2xl border border-[var(--ink)]/15">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--ink)]/10">
            <span className="font-display font-bold text-base">Ask Shruti (AI)</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-[var(--ink)]/70 mb-4 font-body">
            Grounded strictly in verified portfolio facts. Ask about engineering projects or design leadership.
          </p>
          <div className="text-xs bg-[var(--paper)] border border-[var(--ink)]/10 p-3 rounded text-[var(--ink)]/60">
            Assistant is ready for questions in Phase 1 (WS E).
          </div>
        </div>
      )}
    </div>
  );
}
