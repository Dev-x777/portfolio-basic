'use client';

import { profile } from '@/data/profile';
import { Magnetic } from '@/lib/motion';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[var(--cobalt)] text-[var(--paper)]">
      <div className="max-w-5xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[var(--silk)] font-semibold block mb-4">
          Get in touch
        </span>
        <h2 className="font-display text-4xl md:text-8xl font-bold tracking-tight mb-8">
          Let&apos;s build something bold together.
        </h2>
        <p className="font-body text-xl max-w-xl text-[var(--paper)]/85 mb-12">
          Open to design engineering roles, data systems challenges, and collaborative ventures.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-8 py-4 bg-[var(--paper)] text-[var(--ink)] font-display text-lg font-bold rounded-full hover:bg-[var(--silk)] transition-colors focus-visible:outline-[var(--sun)]"
            >
              Send message
            </a>
          </Magnetic>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-[var(--silk)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
