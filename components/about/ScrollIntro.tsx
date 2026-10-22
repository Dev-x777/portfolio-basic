'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { StarIcon } from '@/components/ui/StarIcon';

interface WordProps {
  children: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Word({ children, range, progress }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-2.5 my-1">
      <motion.span style={{ opacity }} className="text-[var(--color-light)]">
        {children}
      </motion.span>
    </span>
  );
}

export function ScrollIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 40%'],
  });

  const statement =
    'I design user experiences that cut friction, and build data architectures that process millions of records with precision. From Figma wireframes and e-commerce conversion optimization to PySpark anomaly pipelines and real-time facial recognition, I engineer products where craft meets data.';

  const words = statement.split(' ');

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 sm:px-12 md:px-20 max-w-6xl mx-auto flex flex-col justify-center min-h-[60vh]"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[var(--silk)] font-semibold mb-8">
        <StarIcon className="text-sm" />
        <span>Philosophy &amp; Focus</span>
      </div>

      <p className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.25] text-[var(--color)]">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
