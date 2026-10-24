'use client';

import React, { useState, useEffect } from 'react';
import Grainient from './Grainient';

// Signature portfolio dark palette with vivid electric cobalt, silk pink, and warm sun accents
const DARK_COLORS = ['#0A0A0A', '#151336', '#221c68', '#3B5BFF', '#FF4D7E', '#FFD84A'];
// Signature portfolio light palette with soft periwinkle and royal blue highlights
const LIGHT_COLORS = ['#F8F9FA', '#E2E8F0', '#C7D2FE', '#818CF8', '#2563EB'];

export function BackgroundGrainient() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700"
      style={{ opacity: isLight ? 0.7 : 0.85 }}
      aria-hidden="true"
    >
      <Grainient
        colors={isLight ? LIGHT_COLORS : DARK_COLORS}
        angle={55}
        flow={0.85}
        silk={0.35}
        speed={0.7}
        scale={1.05}
        softness={0.9}
        grainAmount={0.07}
        grainSize={1.2}
        grainAnimated={true}
        interactive={true}
        stir={1.3}
        clickSwirl={true}
        intro={true}
        lightMode={isLight}
        className="w-full h-full"
      />
    </div>
  );
}

export default BackgroundGrainient;
