import React from 'react';

interface HeroBackdropProps {
  scrollProgress: number;
}

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ scrollProgress }) => {
  // Hero graphics fade out smoothly as user scrolls past hero
  const heroFade = Math.max(0, Math.min(1, 1 - scrollProgress * 5));

  // Subtle alternation between deep charcoal/navy #0B1118 and secondary #101923
  let currentBg = '#0B1118';
  if (scrollProgress >= 0.16 && scrollProgress < 0.38) {
    currentBg = '#101923';
  } else if (scrollProgress >= 0.38 && scrollProgress < 0.66) {
    currentBg = '#0B1118';
  } else if (scrollProgress >= 0.66 && scrollProgress < 0.86) {
    currentBg = '#101923';
  } else {
    currentBg = '#0B1118';
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        backgroundColor: currentBg,
        transition: 'background-color 0.4s ease'
      }}
    >
      {/* Exact Hero Background matching reference image with semi-circle and corner elements */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/portfolio/assets/hero-bg.png)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: heroFade,
          transition: 'opacity 0.25s ease-out'
        }}
      />
    </div>
  );
};
