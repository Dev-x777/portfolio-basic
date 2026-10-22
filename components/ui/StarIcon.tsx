import React from 'react';

interface StarIconProps {
  className?: string;
  size?: number | string;
}

export function StarIcon({ className = '', size = '1em' }: StarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block text-current ${className}`}
      aria-hidden="true"
    >
      <path
        d="M42 0C42 23.196 60.804 42 84 42C60.804 42 42 60.804 42 84C42 60.804 23.196 42 0 42C23.196 42 42 23.196 42 0Z"
        fill="currentColor"
      />
    </svg>
  );
}
