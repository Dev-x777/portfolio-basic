'use client';

import { profile } from '@/data/profile';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-24 md:px-12 bg-[var(--paper)] text-[var(--ink)]">
      <div className="pt-20">
        <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight uppercase leading-none">
          {profile.name}
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-body max-w-2xl text-[var(--ink)]/80">
          {profile.heroDescriptor}
        </p>
      </div>
      <div className="flex justify-between items-end border-t border-[var(--ink)]/10 pt-6">
        <span className="text-sm font-medium opacity-60">{profile.location}</span>
        <span className="text-sm font-medium opacity-60">{profile.roleLine}</span>
      </div>
    </section>
  );
}
