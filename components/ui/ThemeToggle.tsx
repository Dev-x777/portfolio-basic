'use client';

import React, { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';



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
    attributeFilter: ['class', 'data-theme'],
  });
  window.addEventListener('themechange', callback);
  return () => {
    observer.disconnect();
    window.removeEventListener('themechange', callback);
  };
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

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Avoid double-triggering while another transition is in progress
    if (document.documentElement.classList.contains('theme-transitioning')) {
      return;
    }

    const nextIsLight = !isLight;
    const nextTheme = nextIsLight ? 'light' : 'dark';

    const updateDOM = () => {
      if (nextIsLight) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
      try {
        localStorage.setItem('theme', nextTheme);
      } catch {}
      window.dispatchEvent(new Event('themechange'));
    };

    // Fallback: If View Transitions API is not supported or user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      updateDOM();
      return;
    }

    // Get the toggle button's center coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Compute the radius needed to cover the farthest corner of the viewport
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    document.documentElement.classList.add('theme-transitioning');

    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          updateDOM();
        });
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          } as KeyframeAnimationOptions
        );
      });

      transition.finished.finally(() => {
        document.documentElement.classList.remove('theme-transitioning');
      });
    } catch {
      // In case View Transition was aborted or failed
      document.documentElement.classList.remove('theme-transitioning');
      updateDOM();
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-pill flex items-center justify-center opacity-0" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.90 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-pill flex items-center justify-center text-xs hover:border-[var(--cobalt)]/50 cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!isLight ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center justify-center text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
          >
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
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center justify-center text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
              className="w-4 h-4"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
