'use client';

import { profile } from '@/data/profile';

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 bg-[var(--ink)] text-[var(--paper)] text-sm border-t border-[var(--paper)]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span>© 2026 {profile.name}. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--silk)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[var(--silk)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
