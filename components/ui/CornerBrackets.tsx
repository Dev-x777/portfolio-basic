import React from 'react';
import { StarIcon } from './StarIcon';

export function CornerBrackets() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-between p-6 sm:p-10 md:p-16 max-w-7xl mx-auto w-full h-full">
      {/* Top Corners */}
      <div className="flex justify-between items-start opacity-35">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-tl-xl border-l-2 border-t-2 border-[var(--color)]" />
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-tr-xl border-r-2 border-t-2 border-[var(--color)]" />
      </div>

      {/* Bottom Corners */}
      <div className="flex justify-between items-end">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-bl-xl border-l-2 border-b-2 border-[var(--color)] opacity-35" />
        <StarIcon className="text-3xl md:text-5xl rotate-12 text-[var(--silk)] opacity-80" />
      </div>
    </div>
  );
}
