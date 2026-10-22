'use client';

import React from 'react';

interface SplitTextProps {
  children: string;
  by?: 'chars' | 'words';
  className?: string;
  charClassName?: string;
  wordClassName?: string;
}

/**
 * Accessible text splitter component.
 * Ensures screen readers hear the unified string through aria-label,
 * while rendering isolated spans for precise transform & opacity animations.
 */
export function SplitText({
  children,
  by = 'chars',
  className = '',
  charClassName = '',
  wordClassName = '',
}: SplitTextProps) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  if (by === 'words') {
    const words = children.split(' ');
    return (
      <span className={className} aria-label={children}>
        {words.map((word, wordIdx) => (
          <span
            key={wordIdx}
            aria-hidden="true"
            className={`inline-block ${wordClassName}`}
          >
            {word}
            {wordIdx < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    );
  }

  // by === 'chars'
  const words = children.split(' ');
  return (
    <span className={className} aria-label={children}>
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          aria-hidden="true"
          className={`inline-block whitespace-nowrap ${wordClassName}`}
        >
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              aria-hidden="true"
              className={`inline-block ${charClassName}`}
            >
              {char}
            </span>
          ))}
          {wordIdx < words.length - 1 ? (
            <span aria-hidden="true" className="inline-block">
              &nbsp;
            </span>
          ) : null}
        </span>
      ))}
    </span>
  );
}
