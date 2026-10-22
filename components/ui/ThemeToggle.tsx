'use client';

import React, { useSyncExternalStore } from 'react';

function subscribeMounted() {
  return () => {};
}
function getMountedSnapshot() {
  return true;
}
function getServerMountedSnapshot() {
  return false;
}

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

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const isLight = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('theme', 'light');
      } catch {}
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-pill flex items-center justify-center opacity-0" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-pill flex items-center justify-center text-xs transition-all duration-300 hover:scale-110 active:scale-95 hover:border-[var(--cobalt)]/50 cursor-pointer"
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      {!isLight ? (
        <span className="flex items-center justify-center text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <circle cx="12" cy="12" r="4.5" />
            <line x1="12" y1="1.5" x2="12" y2="3.5" />
            <line x1="12" y1="20.5" x2="12" y2="22.5" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1.5" y1="12" x2="3.5" y2="12" />
            <line x1="20.5" y1="12" x2="22.5" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>
      ) : (
        <span className="flex items-center justify-center text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="w-4 h-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      )}
    </button>
  );
}
