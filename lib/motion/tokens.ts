/**
 * Motion tokens: shared easings, durations, and spring configs
 * Single source of truth for all animation parameters in the portfolio.
 */

export const easings = {
  // Primary curve from DESIGN.md: cubic-bezier(0.76, 0, 0.24, 1)
  primary: [0.76, 0, 0.24, 1] as const,
  // expo.out easing
  expoOut: [0.16, 1, 0.3, 1] as const,
  // Smooth standard ease
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

export const durations = {
  fast: 0.3,
  base: 0.5,
  medium: 0.7,
  slow: 1.0,
  heroName: 1.2,
};

export const springs = {
  magnetic: {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  toggle: {
    stiffness: 400,
    damping: 30,
  },
  cursor: {
    stiffness: 250,
    damping: 20,
  },
};
